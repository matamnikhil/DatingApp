import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User;
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
registerForm: FormGroup;
bsConfig: Partial<BsDatepickerConfig>;

constructor(private authService: AuthService,private router: Router,
  private alertify: AlertifyService,private fb: FormBuilder) { }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('',Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmpassword: new FormControl('', Validators.required)
    // }, this.passwordMatchVaildator);
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender:['male'],
      username: ['', Validators.required],
      knownAs:['', Validators.required],
      dateOfBirth:[null, Validators.required],
      city:['', Validators.required],
      country:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmpassword: ['',Validators.required]
    },{validator: this.passwordMatchVaildator});
  }

  passwordMatchVaildator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true}
  }

  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success('registration successs');
      }, error => {
        this.alertify.error(error);
      },() => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        })
      })
    }
    // console.log(this.model);
    // this.authService.register(this.model).subscribe(() => {
    //   //console.log("registed");
    //   this.alertify.success("registed success");
    // }, error => {
    //   //console.log(error);
    //   this.alertify.error(error);
    // });
    //console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
