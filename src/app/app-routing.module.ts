import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { RequestsComponent } from './requests/requests.component';
import { ViewComponent } from './view/view.component';
import {GroupCreateComponent} from "./group-create/group-create.component";
import {CreateRequestComponent} from "./create-request/create-request.component";
import {RequestComponent} from "./request/request.component";
import { RequestDataComponent } from './request-data/request-data.component';

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
  },
  {
    component: GroupCreateComponent,
    path:'group/create'
  },

  {
    component: RequestComponent,
    path:'group/requests'

  },

  {
  component: CreateRequestComponent,
  path:'request/create'
  },
  {
    component : RequestDataComponent,
    path:'a'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
