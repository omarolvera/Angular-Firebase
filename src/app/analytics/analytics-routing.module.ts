import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsHomeComponent } from "./analytics-home/analytics-home.component";

const routes: Routes = [
  {
    path: '',
    component: AnalyticsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
