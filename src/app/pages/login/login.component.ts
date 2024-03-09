import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //TODO make it reactive form
  //TODO Validations
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  errMsg: string = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async login() {
    this.errMsg = '';
    this.authService
      .adminLogin(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.authService.userData = res.user

          // If all good
          this.router.navigate(['dashboard']);
        },
        (err) => {
          console.log('HTTP Error', err);
          this.errMsg = err.message;
        },
      );
  }
}
