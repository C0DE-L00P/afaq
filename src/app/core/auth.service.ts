import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) { }

  userData:User|null = null;
  IsAuthenticated: boolean = true

  adminLogin = (email:string, password:string) : Observable<{token: string; user: User}> => {
    return this.apiService.post(this.apiService.BASE_URL+'/api/Auth/login', {email, password}, httpOptions)
  }

  logout() {
    localStorage.removeItem('token');
    this.userData = null;
  }
}
