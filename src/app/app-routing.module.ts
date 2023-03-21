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
import { TestComponent } from './test/test.component';
import {ViewResponseComponent} from "./view-response/view-response.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    component: GroupsComponent,
    path:'groups',
    canActivate: [AuthGuard] 
  },
  {
    component: RequestsComponent,
    path:'requests',
    canActivate: [AuthGuard] 
    

  },
  {
    component: ViewComponent,
    path:'groups/view/:id',
    canActivate: [AuthGuard] 
  },
  {
    component: CreateRequest2Component,
    path:'groups/view/:id/create-request',
    canActivate: [AuthGuard] 
  },

  {
    component: GroupCreateComponent,
    path:'group/create',
    canActivate: [AuthGuard] 
  },

  {
    component: RequestComponent,
    path:'group/requests',
    canActivate: [AuthGuard] 

  },

  {
  component: CreateRequestComponent,
  path:'request/create',
  canActivate: [AuthGuard] 
  },
  {
    component : RequestDataComponent,
    path:'a',
    canActivate: [AuthGuard] 
  },
  {
    component:GroupEditComponent,
    path:'group/edit/:id',
    canActivate: [AuthGuard] 
  },
  {
    component: ViewResponseComponent,
    path:'requests/responses/:id',
    canActivate: [AuthGuard] 

  },
  {
    component: TestComponent,
    path:'test'

  },
  {
    component : HomeComponent,
    path:'home',
    canActivate: [AuthGuard] 
  },
  {
    component: LoginPageComponent,
    path:'login',
   // redirectTo:'login',
   // pathMatch:'full'
  },
  {
    component:SignupPageComponent,
    path:'signup'
  },
  // { 
  //   path: '', 
  //   component: HomeComponent, 
  //   canActivate: [AuthGuard] 
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
