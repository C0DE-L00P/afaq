import { CommonModule } from '@angular/common';
import { HomeService } from './../../../core/home.service';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,GoogleMapsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  coordinates:Coordinate[]|null = []

  constructor(private homeService: HomeService){}
  ngOnInit(){
    this.homeService.getCoordinates().subscribe(
      res=> {
        if(!res.success) throw res.message

        this.coordinates = res.data
      },
      err => console.error(err)
    )
  }
}
