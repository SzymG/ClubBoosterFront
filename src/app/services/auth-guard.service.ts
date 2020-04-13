import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user-service/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(this.userService.isAuthenticated());
        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['home'], {skipLocationChange: true});
        }

        return this.userService.isAuthenticated();
    }
}
