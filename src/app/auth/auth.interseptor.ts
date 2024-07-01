import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from './AuthService';
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from "rxjs";
import { ITokenResponse } from "./auth.interface";

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInseptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService | null = inject(AuthService)
    const token: string | null = authService.token

    if (!token) return next(req);

    if (isRefreshing$.value) {
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
    if (!isRefreshing$.value) {
       isRefreshing$.next(true)

        return authServise.refreshAuthToken()
            .pipe(
                switchMap((res: ITokenResponse) => {
                    
                    return next(addToken(req, res.access_token)).pipe(
                        tap(() => {
                            isRefreshing$.next(false)
                        })
                    )
                })
            )
    }
    
    if (req.url.includes('refresh'))  return next(addToken(req, authServise.token!))
    return isRefreshing$.pipe(
        filter(isRefreshing$ => !isRefreshing$),
        switchMap(res => {  
            return next(addToken(req, authServise.token!))
        })
    )
}

const addToken = (req: HttpRequest<any>, token: string | null) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`

        }

    })
}






