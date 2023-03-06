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

  headers = ["ID", "Group Name", "RequestID", "Actions"];
  
  rows = [
    {
      "ID" : 1,
      "GroupName":"Frist Group",
      "RequestID": 11
     
    },
    {
      "ID" : 2,
      "GroupName":"second Group",
      "RequestID": 12
     
    },
    {
      "ID" : 3,
      "GroupName":"third Group",
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
