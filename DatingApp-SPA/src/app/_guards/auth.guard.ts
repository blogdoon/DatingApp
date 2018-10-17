import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { AlertifyService } from 'src/_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
    ) {}

  canActivate():  | boolean {
    if (!this.authService.loggedIn()) {
      this.alertify.error('You shall not pass!');
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
