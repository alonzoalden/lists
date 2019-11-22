import { DashboardComponent } from './dashboard/dashboard.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'edit',
    component: EditListComponent
  },
  {
    path: 'edit/:id',
    component: EditListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
