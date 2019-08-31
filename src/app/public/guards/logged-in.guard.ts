import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './../services/auth.service';
​
@Injectable()
export class LoggedInGuard implements CanActivate {
    
    constructor(public authService: AuthService, public router: Router) {
    }
​
    canActivate() {
        if(this.authService.loggedIn()) {
            this.router.navigate(['dashboard/flujo-de-caja']);
            return false;
        } else {
            return true;
        }
    }
​
}