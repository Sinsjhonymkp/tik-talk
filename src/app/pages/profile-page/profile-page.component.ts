import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import {AsyncPipe, CommonModule} from "@angular/common";
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { Iprofile } from '../../data/interfaces/profile.interface';
import { Pageble } from '../../data/interfaces/pageble.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
    imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, ImgUrlPipe, PostFeedComponent, RouterModule, CommonModule]
})
export class ProfilePageComponent {
public profileServise = inject(ProfileService);
subscribers$: Observable<Iprofile[]> | undefined;
myId: number | undefined;
public subscription: Subscription | null = null;

route = inject(ActivatedRoute);
me$ = toObservable(this.profileServise.me)




profile$ = this.route.params.pipe(
    switchMap(({id}) => {
        if (id === 'me') {
            this.myId  = id;
            return this.me$
        }

            return this.profileServise.getAccount(id)
    })
)

ngOnInit(): void {
    this.subscription = this.profileServise.getMe().pipe(
        map((response: Iprofile) => response.id)
      ).subscribe(id => {
        this.myId = id;
        console.log(this.myId);
      });
    this.subscribers$ = this.profileServise.getSubscribers().pipe(
      map((response: Pageble<Iprofile>) => response.items) // предположим, что подписчики находятся в свойстве `content`
    );
}
}
