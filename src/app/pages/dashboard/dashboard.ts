import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Map, NavigationControl, FullscreenControl } from 'maplibre-gl';
import { ChartModule } from 'primeng/chart';
import { Tokenservice } from '../../core/services/tokenservice/tokenservice';
import { jwtDecode } from 'jwt-decode';

interface Statistics {
  titr: string;
  number: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private mapInstance: Map | undefined;
  private token = inject(Tokenservice);
  Statistics: Statistics[] = [
    { titr: 'active', number: 23 },
    { titr: 'not-active', number: 35 },
    { titr: 'out of otders', number: 21 },
  ];
  ngOnInit(): void {
    console.log(jwtDecode(this.token.getAccessToken()!));
    console.log(11);
    ///////////////map//////////////
    this.mapInstance = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [51.389, 35.689],
      zoom: 4,
    });
    this.mapInstance.addControl(new NavigationControl(), 'top-right');
    this.mapInstance.addControl(new FullscreenControl(), 'top-right');
  }

  ngOnDestroy(): void {
    this.mapInstance?.remove();
  }
  ///////////////////////chart////////////////////
  chartData = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'نمونه',
        data: [10, 20, 30],
        backgroundColor: ['#03a9f4', '#bb991b', '#ccc'],
      },
    ],
  };
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
}
