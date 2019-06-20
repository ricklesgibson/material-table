import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';
import { HomeComponent } from './home/home.component';
import {WidgetDetailComponent} from './widget-detail/widget-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'widgets',
    component: WidgetComponent
  },
  {
    path: 'widgets/:id',
    component: WidgetDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
