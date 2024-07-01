import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { Iprofile } from '../../data/interfaces/profile.interface';
import { ProfileFiltersComponent } from "./profile-filters/profile-filters.component";
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-search-pages',
    standalone: true,
    templateUrl: './search-pages.component.html',
    styleUrl: './search-pages.component.scss',
    imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe]
})
export class SearchPagesComponent {

  private profileService: ProfileService = inject(ProfileService);
  public profiles = this.profileService.filteredProfiles
  constructor() {
   
  }
}
