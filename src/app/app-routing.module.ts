import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { RequestsComponent } from './requests/requests.component';
import { ViewComponent } from './view/view.component';
import {GroupCreateComponent} from "./group-create/group-create.component";

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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
