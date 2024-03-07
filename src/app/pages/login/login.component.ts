import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
//TODO make it reactive form
//TODO Validations
constructor(private router:Router){}

login(){
  
  //If all good
  this.router.navigate(['dashboard'])
}
}
