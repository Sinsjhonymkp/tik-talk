import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from './AuthService';
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { ITokenResponse } from "./auth.interface";

let isRefreshing: boolean = false;

export const authTokenInseptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService | null = inject(AuthService)
    const token: string | null = authService.token

    if (!token) return next(req);

    if (isRefreshing) {
        return refreshAndProcceced(authService, req, next)
    }

    return next(addToken(req, token))
        .pipe(
            catchError(error => {
                if (error.status === 403) {
                    return refreshAndProcceced(authService, req, next)
                }
                return throwError(error)
            }
            )
        )
}

const refreshAndProcceced = (authServise: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!isRefreshing) {
        isRefreshing = true

        return authServise.refreshAuthToken()
            .pipe(
                switchMap((res: ITokenResponse) => {
                    isRefreshing = false
                    return next(addToken(req, res.access_token))
                })
            )
    }
    return next(addToken(req, authServise.token))
}

const addToken = (req: HttpRequest<any>, token: string | null) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`

        }

    })
}






