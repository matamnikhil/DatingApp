import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService,private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe(() => {
      //console.log("registed");
      this.alertify.success("registed success");
    }, error => {
      //console.log(error);
      this.alertify.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
