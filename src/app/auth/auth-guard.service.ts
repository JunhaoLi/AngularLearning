import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const result = this.authService.isAuthenticated();
        if (!result) {
            this.router.navigate(['/']);
        }
        return result;
    }
}