import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServise = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);
  

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  text: any;


  onSubmit() {
    if (this.form.valid) {
      this.authServise.login(this.form.value)
        .subscribe(res => {
          this.router.navigate(['/search'])
          console.log(res)
        })
    }
  }
}

