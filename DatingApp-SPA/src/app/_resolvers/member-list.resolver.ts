import { Injectable, OnInit } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from 'src/_services/user.service';
import { AlertifyService } from 'src/_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {

    constructor(private router: Router,
        private userService: UserService,
        private alertify: AlertifyService
        ) {}

    resolve(router: ActivatedRouteSnapshot): Observable<User[]> {

        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data.');
                this.router.navigate(['home']);
                return of(null);

            })
        );
    }
}
