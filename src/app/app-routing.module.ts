import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { RequestsComponent } from './requests/requests.component';
import { ViewComponent } from './view/view.component';
import {GroupCreateComponent} from "./group-create/group-create.component";
import {CreateRequestComponent} from "./create-request/create-request.component";
import {RequestComponent} from "./request/request.component";
import { RequestDataComponent } from './request-data/request-data.component';
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {CreateRequest2Component} from "./create-request2/create-request2.component";

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
    path:'groups/view/:id'
  },
  {
    component: CreateRequest2Component,
    path:'groups/view/:id/create-request'
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
  },
  {component:GroupEditComponent,
    path:'group/edit/:id'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
