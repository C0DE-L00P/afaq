import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) { }

  userData:User|null = null;
  IsAuthenticated: boolean = true

  adminLogin = (email:string, password:string) : Observable<{token: string; user: User}> => {
    return this.apiService.post(this.apiService.BASE_URL+'/api/Auth/login', {email, password})
  }

  logout() {
    localStorage.removeItem('token');
    this.userData = null;
  }
}
