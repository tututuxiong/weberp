import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardSuper implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = state.url;

        console.log("auth-guard-super is called.");

        return this.checkPermission(url);
    }

    checkPermission(url: string) : boolean {

        if (this.authService.isLoggedIn()) {
            console.log("user is logged in.")
            if (this.authService.isPermitted(0)) {
                console.log("user is permitted.");
                return true; 
            } else {
                console.log("user is not permitted.");
                this.router.navigate(['/dashboard', {auth_res: false}]);
                return false;
            }
        }

        else {
            this.authService.redirectUrl = url;

            this.router.navigate(['/login']);
            return false;
        }

    }
}