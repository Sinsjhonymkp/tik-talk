import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { FormSettings, Iprofile } from '../interfaces/profile.interface';
import {  Pageble } from '../interfaces/pageble.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  baseApiUrl: String = 'https://icherniakov.ru/yt-course';
  http: HttpClient = inject(HttpClient);

  me = signal<Iprofile | null>(null);
  




  getTestAccounts() {
    return this.http.get<Iprofile[]>(`${this.baseApiUrl}/account/test_accounts`)
  }

  getMe() {
    return this.http.get<Iprofile>(`${this.baseApiUrl}/account/me`).pipe(
      tap(res => this.me.set(res))
    )
  }

  getSubscribers(): Observable<Pageble<Iprofile>> {
    return this.http.get<Pageble<Iprofile>>(`${this.baseApiUrl}/account/subscribers/`);
  }
  
getSubscribersShortList(){
  return this.http.get<Pageble<Iprofile>>(`${this.baseApiUrl}/account/subscriptions/`)
  .pipe(
    map(res => res.items.slice( 0, 3))
  )
}
getAccount (id:string){
  return this.http.get<Iprofile>(`${this.baseApiUrl}/account/${id}`)
}

patchProfile(profile: Partial<Iprofile>){
  return this.http.patch<Iprofile>(`${this.baseApiUrl}/account/me`, profile)
}

uploadAvatar(file:File){
  const fd = new FormData();
  fd.append('image', file);
  return this.http.post<Iprofile>(`${this.baseApiUrl}/account/upload_image`, fd)
}
}