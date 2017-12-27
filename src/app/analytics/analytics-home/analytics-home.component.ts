import { Component, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef, Inject, Input } from '@angular/core';
import { TrackApiService } from '../../shared/shared';
import { ITrack } from '../../models/track';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from 'ng2-charts';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import animateScrollTo from 'animated-scroll-to';


@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss']

})
export class AnalyticsHomeComponent implements OnInit {
  @ViewChild('baseChart') chart: BaseChartDirective;
  tracks: ITrack[] = [];
  modelData: ITrack;
  isNewItem = false;
  itemIndex: any;
  currentData: Array<any> = [];
  standardData: Array<any> = [];



  constructor(public trackApiService: TrackApiService) {

  }

  ngOnInit() {
    this.loadTracks();
  }


  loadTracks() {

    this.currentData.splice(0);
    this.standardData.splice(0);
    this.trackApiService.getTracks().subscribe((result: ITrack[]) => {
      this.tracks = result;
      this.tracks.map(a => parseFloat(a.standard)).forEach(x => this.standardData.push(x));
      this.tracks.map(a => parseFloat(a.current)).forEach(x => this.currentData.push(x));
      this.reloadChart();
    },
      error => {
        console.log(<any>error);
      }
    );


  }

  onNotify(message: boolean): void {
    if (message) {
      this.loadTracks();
      this.isNewItem = false;
    }
  }

  reloadChart() {
    if (this.chart !== undefined) {
      this.chart.datasets = this.lineChartData;
      this.chart.labels = this.lineChartLabels;
      this.chart.chart.update();
    }
  }

  newItem() {
    this.isNewItem = true;
  }


  edit(item: ITrack, index: any) {
    this.modelData = item;
    this.itemIndex = index;
    this.isNewItem = false;
  }

  // chart



  public lineChartData: Array<any> = [
    { data: this.currentData, label: 'Current' },
    { data: this.standardData, label: 'Standard' }

  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartOptions: any = {
    responsive: true, scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    {

      borderColor: 'green',
      pointBorderColor: '#fff',

    },
    {
      borderColor: 'purple',

      pointBorderColor: '#fff',

    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

}

