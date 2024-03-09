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
  styleUrl: './home.component.css'
})
export class HomeComponent {

  coordinates:Coordinate[]|null = []

  constructor(private locationsService: LocationsService, private statisticsService: StatisticsService){}

  ngOnInit(){
    this.locationsService.getLocations().subscribe(
      res=> {
        if(!res.success) throw res.message

        this.coordinates = res.data
      },
      err => console.error(err)
    )
  }
}
