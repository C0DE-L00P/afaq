import { LocationsService } from './../../../core/locations.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption, graphic } from 'echarts';
import { StatisticsService } from '../../../core/statistics.service';
import {
  GoogleMap,
  MapDirectionsRenderer,
  MapMarker,
  MapPolyline,
} from '@angular/google-maps';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    MapMarker,
    MapDirectionsRenderer,
    NgxEchartsDirective,
    MapPolyline,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [provideEcharts()],
})
export class HomeComponent {
  //=============== Map
  center: google.maps.LatLngLiteral = {
    //Center on Egypt
    lat: 30.081498094664965,
    lng: 31.339617463054996,
  };
  zoom = 15;
  display: google.maps.LatLngLiteral | null = null;

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.display = event.latLng.toJSON();
  }

  //Marker

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.markerPositions.push(event.latLng.toJSON());
  }

  locations: Coordinate[] | null = [];
  // paths: Coordinate[] = [];
  financials: FinancialRecord[] = [];
  usersStats: UsersStatsRecord[] = [];

  constructor(private locationsService: LocationsService,private statisticsService: StatisticsService) {}

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

        this.markerPositions = res.data.map((i: Coordinate) => ({
          lat: i.latitude,
          lng: i.longitude,
        }));
      },
      (err) => console.error(err)
    );
  }

  
  carPosition: google.maps.LatLngLiteral = { 
    lat: 30.081498094664965,
    lng: 31.339617463054996,
   };

  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#006aff',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  roadPath: google.maps.LatLngLiteral[] = [];
  trackingCenter: google.maps.LatLngLiteral = {
    lat: 30.081498094664965,
    lng: 31.339617463054996,
  };

  getPaths() {
    this.locationsService.getPaths().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.roadPath = res.data.map((i:Coordinate)=> ({lat: i.latitude,lng: i.longitude}));

        const pathLength = this.roadPath.length;

        let index = 0;
        interval(2000).subscribe(() => {
          this.trackingCenter =  this.roadPath[index];
          this.carPosition = this.roadPath[index];
          index = (index + 1) % pathLength;
        });
      },
      (err) => console.error(err)
    );
  }

  getFinancials() {
    this.statisticsService.getFinancialStats().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.financials = res.data;
        this.CreateFinancialCharts();
      },
      (err) => console.error(err)
    );
  }

  getUsersStats() {
    this.statisticsService.getUserStats().subscribe(
      (res) => {
        if (!res.success) throw res.message;

        this.usersStats = res.data;
        this.CreateUsersCharts();
      },
      (err) => console.error(err)
    );
  }

  //!======================= Chart
  financialChartOptions: EChartsOption = {
    color: ['#fecc4c', '#55efba'],
    legend: {},
    tooltip: {},
    dataset: {
      // Provide a set of data
      source: [
        ['Money', 'Expense', 'Revenue'],
        ...this.financials.map((i: FinancialRecord) => [
          i.month,
          i.expense,
          i.revenue,
        ]),
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }],
  };

  financialChartMergeOptions: EChartsOption = {};

  CreateFinancialCharts() {
    let arr = this.financials.map((i: FinancialRecord) => [
      i.month,
      i.expense,
      i.revenue,
    ]);

    this.financialChartMergeOptions = {
      dataset: {
        source: [['Money', 'Expense', 'Revenue'], ...arr],
      },
    };
  }

  usersChartOptions: EChartsOption = {
    color: ['#efb438'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#efb438',
        },
      },
    },
    // legend: {
    //   data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    // },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Users',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#efb438',
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: '#fae9c5',
            },
            {
              offset: 1,
              color: '#fae9c500',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
    ],
  };

  usersChartMergeOptions: EChartsOption = {};

  CreateUsersCharts() {
    this.usersChartMergeOptions = {
      xAxis: {
        data: this.usersStats.map((i: UsersStatsRecord) => i.month),
      },
      series: {
        data: this.usersStats.map((i: UsersStatsRecord) => i.numberOfUsers),
      },
    };
  }
}
