import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
 
  constructor(private apiService: ApiService) { }
  
  getLocations = (): Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Location/GetAllLocations');
  }

  getPaths = (): Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Location/GetAllPaths');
  }
}
