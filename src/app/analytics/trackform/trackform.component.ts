import { Component, OnInit, ViewContainerRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { TrackApiService } from '../../shared/shared';
import { ITrack } from '../../models/track';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import animateScrollTo from 'animated-scroll-to';


@Component({
  selector: 'app-trackform',
  templateUrl: './trackform.component.html',
  styleUrls: ['./trackform.component.scss']
})
export class TrackformComponent implements OnInit {
  @Input() tracks: ITrack[] = [];
  @Input() isNewItem = false; 
  @Input() model: ITrack = {
    name: '',
    current: '',
    date: '',
    hb: '',
    kpi1: '',
    id: '',
    kpi2: '',
    standard: ''
  };
  @Input() itemIndex: any;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public trackApiService: TrackApiService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.resetForm();
  }


  resetForm() {
    this.model = {
      name: '',
      current: '',
      date: '',
      hb: '',
      kpi1: '',
      id: '',
      kpi2: '',
      standard: ''
    };
    this.isNewItem = false;

  }

  update(isValid: boolean) {

    if (isValid) {
      this.trackApiService.updateTrack(this.model, this.itemIndex, this.isNewItem).subscribe((response) => {
        this.toastr.success('The track has been updated', 'Notification');
        this.resetForm();
        animateScrollTo(0);
        this.notify.emit(true);
        this.isNewItem = false;
      });
    }
  }

  addTrack(isValid: boolean) {

    if (isValid) {

      if (this.isNewItem) {
        const index = this.tracks.length + 1;
        this.model.id = `${index}`;
        this.itemIndex = index - 1;
      }

      this.trackApiService.addTrack(this.model, this.itemIndex, this.isNewItem).subscribe((response) => {
        this.toastr.success('New track has been added', 'Notification');
        this.resetForm();
        animateScrollTo(0);
        this.notify.emit(true);
        this.isNewItem = false;
      });

    }
  }

  cancelForm() {
    this.resetForm();
  }

}