import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import {Location} from '@angular/common';
import { RequestDataService } from '../request-data.service';
import { RequestComponent } from '../request/request.component';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  topSection: "topSection" = "topSection";
  groupId : any;
  groupName: any;
  rows: any;
  // a : any;
   b : any

  displayElement = false;


  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private data: RequestDataService){


  }

  headers = ["Header", "Request Name", "Request Body", "Response Body", "URL"];

 

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
    console.log(this.groupId);
    this.data.getRequestById(this.groupId).subscribe(data =>{
      
      if( Object.keys(data).length === 0 ){
        //do nothing
      } else{
        this.displayElement=true
      }
      console.log(this.displayElement)
      this.rows = data;
    
      console.log(this.rows);
      console.log(this.rows[0].groupEntity);
      // this.a = this.rows[0].groupEntity.groupId;
     this.b = this.rows[0].groupEntity.groupName;
     // console.log(this.b)

     

    })

    // if( this.rows === null ){
    //   this.displayElement = false
      
    // }else{
    //   //do nothing
    //   console.log('coming here');
    //   console.log(this.rows)
    // }

    // console.log(this.displayElement)
    
    

  }
  performCreate() {
    this.router.navigate([`/groups/view/${this.groupId}/create-request`]);
  }

  backClicked() {
    this.location.back(); // <-- go back to previous location on cancel
    //console.log('asdas')
  }





}
