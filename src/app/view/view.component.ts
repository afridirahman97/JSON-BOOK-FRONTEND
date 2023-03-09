import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  topSection: "topSection" = "topSection";

  groupId : any;
  constructor(private route: ActivatedRoute){}


  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
  }

 



}
