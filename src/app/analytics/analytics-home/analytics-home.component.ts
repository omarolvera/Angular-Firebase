import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Inject, Input, AfterViewInit } from '@angular/core';
import { TrackApiService } from '../../shared/shared';
import { ITrack } from '../../models/track';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from 'ng2-charts';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import animateScrollTo from 'animated-scroll-to';
import { TrackformModalComponent } from '../../modals/trackformModal.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss']

})
export class AnalyticsHomeComponent implements OnInit {

  @ViewChild('baseChart') chart: BaseChartDirective;
  @ViewChild(TrackformModalComponent) trackForm;
  tracks: ITrack[] = [];
  currentData: Array<any> = [];
  standardData: Array<any> = [];

  public lineChartData: Array<any> = [
    { data: this.currentData, label: 'Current' },
    { data: this.standardData, label: 'Standard' }

  ];

  public lineChartLabels: Array<any> = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

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

  constructor(public trackApiService: TrackApiService, private modalService: NgbModal,  public toastr: ToastsManager) {
    
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
    }
    );


  }


  reloadChart() {
    if (this.chart !== undefined) {
      this.chart.datasets = this.lineChartData;
      this.chart.labels = this.lineChartLabels;
      this.chart.chart.update();
    }
  }

  newItem() {

    const myModal = this.modalService.open(TrackformModalComponent);
    myModal.componentInstance.resetForm();
    myModal.componentInstance.isNewItem = true;
    myModal.componentInstance.tracks = this.tracks;
    myModal.result.then((result) => {
      this.loadTracks();
      this.toastr.success('New track has been added', 'Notification');
    }, (reason) => {

    });

  }


  edit(item: ITrack, index: any) {

    const myModalForm = this.modalService.open(TrackformModalComponent);
    myModalForm.componentInstance.resetForm();
    myModalForm.componentInstance.model = item;
    myModalForm.componentInstance.itemIndex = index;
    myModalForm.componentInstance.isNewItem = false;


    myModalForm.result.then((result) => {
      this.loadTracks();
      this.toastr.success('The track has been updated', 'Notification');
    }, (reason) => {
    });


  }
}
