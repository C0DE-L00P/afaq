import { UsersService } from './../../core/users.service';
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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private usersService: UsersService,
  ) {}

  errMsg: string = '';
  isLoading = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async login() {
    this.isLoading = true;
    this.errMsg = '';
    this.authService
      .adminLogin(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.authService.userData = res.user
          

          // //Last login
          // this.usersService.updateUser(res.user.id, res.user.userName)

          // If all good
          this.router.navigate(['dashboard']);
        },
        (err) => {
          console.log('HTTP Error', err);
          this.errMsg = err.message;
        },
        ()=> this.isLoading=false
      );
  }
}
