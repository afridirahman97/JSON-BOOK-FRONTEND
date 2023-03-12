import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {GroupDataService} from "../group-data.service";
import {DeleteGroupService} from "../delete-group.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  topSection: "topSection" = "topSection";
  headers = ["Name", "Url", "Header", "Req", "Res"];
  group:any;
  rows:any;
  constructor(private router:Router,private route: ActivatedRoute,private http: HttpClient, private data: GroupDataService, private del:DeleteGroupService) {
    this.rows=[];
  }

  performCreateRequest() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupId: this.group.groupId,
        groupName:this.group.groupName
      }
    };
    this.router.navigate(['/request/create'],navigationExtras);
  }

  ngOnInit(): void {
    console.log("request")
    this.route.queryParams.subscribe(params => {
      this.group = params;
      console.log(this.group);
      console.log("param")
      console.log(params["groupId"])
      this.data.getRequestById(Number(this.group["groupId"])).subscribe(data =>{
        //console.warn(data)
        this.rows = data;
        console.log(this.rows);
      })
    });
  }
}
