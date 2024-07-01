import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { debounce, debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  private fb = inject(FormBuilder)
 private profileServise:ProfileService = inject(ProfileService)
 searchForm = this.fb.group ({
  firstName: [''],
  lastName: [''],
  stack: [''],
})

constructor() {
  this.searchForm.valueChanges.pipe(
    startWith({}),
    debounceTime(300),
    switchMap(formValue => {
      return this.profileServise.filterProfiles(formValue)
    }),takeUntilDestroyed()
  ).subscribe(val => console.log('val :', val))
  
}
}
