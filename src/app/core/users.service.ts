import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'authority': 'fronttest.wabcgroup.com',
  'accept': 'application/json, text/plain, */*',
});

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  addUser(
    username: string,
    name: string,
    email: string,
    password?: string,
    file?: File
  ): Observable<any> {
    let formData = new FormData();
    formData.append('UserName', username);
    formData.append('Name', name);
    formData.append('Email', email);
    if (password) formData.append('Password', password);
    if (file) formData.append('File', file, file.name);

    return this.apiService.post(
      this.apiService.BASE_URL + '/api/Auth/AddUser',
      formData,
      { headers }
    );
  }

  getUsers = (
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<User[]> => {
    return this.apiService.post(this.apiService.BASE_URL + '/api/UsersApp', {
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };

  getUser = (id: number): Observable<User> => {
    return this.apiService.get(
      this.apiService.BASE_URL + '/api/UsersApp/' + id
    );
  };

  //! Name and Email are required
  updateUser = (id: number,
    name: string,
    email: string,
    username: string,
    password: string = '12345678',
    file?: File
    ):Observable<any> => {

    let formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('UserName', username);
    formData.append('Password', password);
    
    if (file) formData.append('File', file);
    
    return this.apiService.post(
      this.apiService.BASE_URL + '/api/UsersApp/Edit/' + id,
      formData,
      { headers }
    );
  };


  deleteUser = (id: number): Observable<Response> => {
    return this.apiService.delete(
      this.apiService.BASE_URL + '/api/UsersApp/' + id
    );
  };
}
