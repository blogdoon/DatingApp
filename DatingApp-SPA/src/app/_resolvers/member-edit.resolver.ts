import { Injectable, OnInit } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from 'src/_services/user.service';
import { AlertifyService } from 'src/_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/_services/auth.service';

@Injectable()

export class MemberEditResolver implements Resolve<User> {

    constructor(private router: Router, private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService
        ) {}

    resolve(router: ActivatedRouteSnapshot): Observable<User> {
        const userId = this.authService.decodedToken.nameid;
        return this.userService.getUser(userId).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data.');
                this.router.navigate(['/members']);
                return of(null);

            })
        );
    }
}
