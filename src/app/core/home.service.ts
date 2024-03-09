import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiService: ApiService) { }
  
  getCoordinates = () : Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Location/GetAllLocations', null)
  }
  
}
