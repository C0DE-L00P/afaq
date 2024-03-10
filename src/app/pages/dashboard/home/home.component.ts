import { LocationsService } from './../../../core/locations.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatisticsService } from '../../../core/statistics.service';
// import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  locations: Coordinate[] | null = [];
  paths:Coordinate[] = [];
  financials: FinancialRecord[] = [];
  usersStats:UsersStatsRecord[] = [];

  constructor(
    private locationsService: LocationsService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.getLocations();
    this.getPaths();

    this.getFinancials();
    this.getUsersStats();
  }

  getLocations() {
    this.locationsService.getLocations().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.locations = res.data;
      },
      (err) => console.error(err)
    );
  }

  getPaths() {
    this.locationsService.getPaths().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.paths = res.data;
      },
      (err) => console.error(err)
    );
  }

  getFinancials() {
    this.statisticsService.getFinancialStats().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.financials = res.data;
      },
      (err) => console.error(err)
    );
  }

  getUsersStats() {
    this.statisticsService.getUserStats().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.usersStats = res.data;
      },
      (err) => console.error(err)
    );
  }
}
