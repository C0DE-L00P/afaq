import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }
  
  getUsers = () : Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Location/GetAllLocations', null)
  }
}
