import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { RequestsComponent } from './requests/requests.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './view/view.component';
import {HttpClientModule} from '@angular/common/http';
import { GroupCreateComponent } from './group-create/group-create.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import {ReactiveFormsModule} from '@angular/forms'
import { RequestDataComponent } from './request-data/request-data.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { CreateRequest2Component } from './create-request2/create-request2.component';
// importing font awesome 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';



@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    RequestsComponent,
    HeaderComponent,
    ViewComponent,
    GroupCreateComponent,
    CreateRequestComponent,
    RequestDataComponent,
    GroupEditComponent,
    CreateRequest2Component,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    CodemirrorModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
