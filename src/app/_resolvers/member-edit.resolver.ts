import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service'
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
  
   constructor(private userService: UserService,
    private route: Router, private authService: AuthService,
    private alertify: AlertifyService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem getting your data');
                this.route.navigate(['/members']);
                return of(null);
            })
        )
    }


}