import { Component, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef, Inject } from '@angular/core';
import { TrackApiService } from "../../shared/shared";
import { ITrack } from '../../models/track';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from "ng2-charts";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss']

})
export class AnalyticsHomeComponent implements OnInit {
  @ViewChild("baseChart") chart: BaseChartDirective;
  tracks: ITrack[] = [];
  itemIndex: any;
  isNewItem: boolean = false;
  buttonText: string = 'Update';
  currentData: Array<any> = [];
  standardData: Array<any> = [];
  model: ITrack = {
    name: "",
    current: "",
    date: "",
    hb: "",
    kpi1: "",
    id: "",
    kpi2: "",
    standard: ""
  };



  constructor(public trackApiService: TrackApiService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.loadTracks();
    this.resetForm();

  }

  resetForm() {
    this.model = {
      name: "",
      current: "",
      date: "",
      hb: "",
      kpi1: "",
      id: "",
      kpi2: "",
      standard: ""
    };
    this.isNewItem = false;
  }

  loadTracks() {

    this.currentData.splice(0);
    this.standardData.splice(0);
    this.trackApiService.getTracks().subscribe((result: ITrack[]) => {
      this.tracks = result;
      this.tracks.map(a => { return parseFloat(a.standard); }).forEach(x => this.standardData.push(x));
      this.tracks.map(a => { return parseFloat(a.current); }).forEach(x => this.currentData.push(x));
      this.reloadChart();
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    },
      error => {
        console.log(<any>error);
      }
    );


  }

  reloadChart() {
    if (this.chart !== undefined) {
      this.chart.chart.destroy();
      this.chart.chart = 0;
      this.chart.datasets = this.lineChartData;
      this.chart.labels = this.lineChartLabels;
      this.chart.ngOnInit();
      this.chart.chart.update();

    }
  }

  edit(item: ITrack, index: any) {
    this.model = item;
    this.itemIndex = index;
    this.isNewItem = false;
  }

  update(isValid: boolean) {
    if (isValid) {
      this.trackApiService.updateTrack(this.model, this.itemIndex, this.isNewItem).subscribe((response) => {
        this.toastr.success('Notification', 'The track has been updated');
        this.resetForm();
        this.loadTracks();
        this.isNewItem = false;
      });
    }
  }


  newItem() {
    this.resetForm();
    this.isNewItem = true;
  }

  addTrack(isValid: boolean) {

    if (isValid) {
      if (this.isNewItem) {
        let index = this.tracks.length + 1;
        this.model.id = `${index}`;
        this.itemIndex = index - 1;

      }

      this.trackApiService.addTrack(this.model, this.itemIndex, this.isNewItem).subscribe((response) => {
        this.toastr.success('Notification', 'New track has been added');
        this.resetForm();
        this.loadTracks();
        this.isNewItem = false;
      });
    }
  }




  //chart


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

