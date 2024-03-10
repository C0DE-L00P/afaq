import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  userData:any = {name: 'Admin',url: ''};
  notifications = [{title: 'test', createdAt: '03-03-2024'}];

  constructor(private authService: AuthService, private router:Router){
    if(authService.userData)
    this.userData = authService.userData
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
  } 
}
