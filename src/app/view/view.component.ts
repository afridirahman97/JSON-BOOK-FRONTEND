import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import {Location} from '@angular/common';
import { RequestDataService } from '../request-data.service';



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
  a : any;
  b : any


  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private data: RequestDataService){
    this.data.getData().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      console.log(this.rows)
      console.log(this.rows[0].groupEntity)
      this.a = this.rows[0].groupEntity.groupId
      this.b = this.rows[0].groupEntity.groupName

    })

  }


  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.groupId = params['groupID']
      this.groupName = params['groupName'];
     
    });
   // console.log(this.groupId,this.groupName)
    
  }
  performCreate() {
    this.router.navigate(['/group/create'])
  }

  backClicked() {
    this.location.back(); // <-- go back to previous location on cancel
    //console.log('asdas')
  }

 



}
