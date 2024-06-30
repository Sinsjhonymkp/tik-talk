import { Component,   inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { IMenuItems } from '../../data/interfaces/profile.interface';
import {NgFor} from "@angular/common";
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import {AsyncPipe} from "@angular/common";
import {CommonModule} from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";


@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [SvgIconComponent, NgFor, SubscriberCardComponent, RouterModule, AsyncPipe, CommonModule, ImgUrlPipe]
})
export class SidebarComponent {
  profileServise = inject(ProfileService)


    
me = this.profileServise.me;

  subscribers$ = this.profileServise.getSubscribersShortList();

  menuItems: IMenuItems[] = [
    {
      label: 'Моя страница',
      icon: "home",
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: "chat",
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: "lopa",
      link: 'search'
    }
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileServise.getMe());
   }
}
