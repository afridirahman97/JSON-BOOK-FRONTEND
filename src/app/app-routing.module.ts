import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { RequestsComponent } from './requests/requests.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    component: GroupsComponent,
    path:'groups',
  },
  {
    component: RequestsComponent,
    path:'requests'

  },
  {
    component: ViewComponent,
    path:'groups/:id'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
