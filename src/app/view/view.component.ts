import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestDataService } from '../request-data.service';
import { RequestComponent } from '../request/request.component';
// importing font-awesome emoji
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from '../shared-data-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  stringifyBody(requestBody: any) {
    let body = JSON.stringify(JSON.parse(requestBody), null, 4)
    console.log(body)
    return body;
  }

  stringifyHeader(requestParam: any) {
    let params = JSON.stringify(JSON.parse(requestParam), null, 4)
    return params;
  }
  Groupdata: any;
  topSection: "topSection" = "topSection";
  groupId: any;
  groupName: any;
  rows: any;
  displayElement = false;
  faPlusSquare = faPlusSquare;


  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private location: Location, 
    private data: RequestDataService,
    private sharedData: SharedDataService
    ) {


  }

  headers = ["Request Name", "Header", "Request Body", "Response Body", "URL"];

  userFlow = history.state.data;

  ngOnInit(): void {
    this.sharedData.currentRowData.subscribe((data) => {
      this.Groupdata = data;
      console.log(this.Groupdata)
    });


    this.groupId = this.route.snapshot.paramMap.get('id');
    console.log(this.groupId);
    this.data.getRequestById(this.groupId).subscribe(data => {

      if (Object.keys(data).length === 0) {
        //do nothing
      } else {
        this.displayElement = true
      }
      console.log(this.displayElement)
      console.log(data);
      this.rows = data;
      this.groupName = this.rows[0].groups.groupName

    })

  }
  performCreate() {
    this.router.navigate([`/groups/view/${this.groupId}/create-request`]);
  }

  backClicked() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
