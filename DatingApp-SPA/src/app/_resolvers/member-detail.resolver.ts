import { Injectable, OnInit } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from 'src/_services/user.service';
import { AlertifyService } from 'src/_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberDetailResolver implements Resolve<User> {

    constructor(private router: Router,
        private userService: UserService,
        private alertify: AlertifyService
        ) {}

    resolve(router: ActivatedRouteSnapshot): Observable<User> {

        return this.userService.getUser(router.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data.');
                this.router.navigate(['members']);
                return of(null);

            })
        );
    }
}
