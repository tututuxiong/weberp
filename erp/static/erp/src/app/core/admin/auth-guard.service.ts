import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = state.url;

        return this.checkPermission(url);
    }

    checkPermission(url: string) : boolean {
        if (this.authService.isPermitted(1)) { return true; }

        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
    }
}