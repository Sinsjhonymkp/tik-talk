import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { Iprofile } from '../../data/interfaces/profile.interface';


@Component({
  selector: 'app-search-pages',
  standalone: true,
  templateUrl: './search-pages.component.html',
  styleUrl: './search-pages.component.scss',
  imports: [ProfileCardComponent]
})
export class SearchPagesComponent {

  private profileService: ProfileService = inject(ProfileService);
  public profiles: Iprofile[] = [];
  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val;
        console.log(val);
      });
  }
}
