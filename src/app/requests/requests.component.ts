import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GroupDataService} from "../group-data.service";
import {DeleteGroupService} from "../delete-group.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  topSection: "topSection" = "topSection";
  headers = ["Name", "Url", "Header", "Req", "Res"];
  rows:any;
  constructor(private router:Router,private route: ActivatedRoute,private http: HttpClient, private data: GroupDataService, private del:DeleteGroupService) {
    this.data.getRequest().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      //console.log(this.rows)
    })
  }


}
