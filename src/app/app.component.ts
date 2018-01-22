import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  constructor( public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
