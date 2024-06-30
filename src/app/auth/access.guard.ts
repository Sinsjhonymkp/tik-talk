import { Inject, inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from './AuthService';

export function canActivateAuth() {
    const router: Router  = inject(Router)
    const isLoggedIn: boolean = inject(AuthService).isAuth
    console.log("та самая хуйня", isLoggedIn)
    if (isLoggedIn) {
        return true;
    }
else  { return router.createUrlTree(['/login'])}
   
}   