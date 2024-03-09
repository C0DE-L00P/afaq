import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private apiService: ApiService) { }

  getUserStats = (): Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Statistics/GetUsersStatistics');
  }

  getFinancialStats = (): Observable<Response> => {
    return this.apiService.get(this.apiService.BASE_URL+'/api/Statistics/GetFinancialStatistics');
  }
}
