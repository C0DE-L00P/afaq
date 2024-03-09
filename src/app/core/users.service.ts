import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }
  
  getUsers = (pageNumber: number = 1, pageSize:number = 10) : Observable<Response> => {
    return this.apiService.post(this.apiService.BASE_URL+'/api/UsersApp',{
      "pageNumber": 1,
      "pageSize": 10
    })
  }

  getUser = (id:number): Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/UsersApp/'+id)
  }

  //! Name and Email are required
  updateUser = (id:number, formData: FormData): Observable<Response> => {
    return this.apiService.post(this.apiService.BASE_URL+'/api/UsersApp/'+id, formData)
  }
  deleteUser = (id:number): Observable<Response> => {
    return this.apiService.delete(this.apiService.BASE_URL+'/api/UsersApp/'+id)
  }
}
