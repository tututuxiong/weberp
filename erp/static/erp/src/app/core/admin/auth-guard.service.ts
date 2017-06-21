import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    /* Authentication guard API */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Fetch target url from RouterStateSnapShot
        let url = state.url;

        return this.checkPermission(url);
    }

    checkPermission(url: string) : boolean {

        if (this.authService.isLoggedIn()) {
            if (this.authService.isPermitted(1)) {
                // Navigation is allowed.
                return true; 
            } else {
                /* If user is not permitted to access target url, 
                redirect to dashboard with additional information. */
                this.router.navigate(['/dashboard', {auth_res: false}]);
                return false;
            }
        }

        else {
            // User is not logged in.
            // Save the target url.
            this.authService.redirectUrl = url;
            // Redirect user to login page.
            this.router.navigate(['/login']);
            return false;
        }

    }
}