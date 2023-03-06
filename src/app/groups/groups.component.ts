import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

   topSection: "topSection" = "topSection";


  constructor(private router: Router) {}

  headers = ["ID", "RequestID", "Actions"];
  
  rows = [
    {
      "ID" : 1,
      "RequestID": 11
     
    },
    {
      "ID" : 2,
      "RequestID": 12
     
    },
    {
      "ID" : 3,
      "RequestID": 13
     
    },
  ]


  performEdit(id: number){
    alert( id)
  }

  performView(id: number){
    this.router.navigate(['/groups/'+id])
  }

  performDelete(id: number){
    alert(id)
  }


 
}
