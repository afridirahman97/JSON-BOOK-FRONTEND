import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupDataService } from '../group-data.service';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

   topSection: "topSection" = "topSection";
   rows: any;
   
   

  constructor(private router: Router, private data: GroupDataService) {
    this.data.getData().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      //console.log(this.rows)
     
    })
  }
  
  


  headers = ["ID", "Group Name", "Actions"];

  
  
  // rows = [
  //   {
  //     "groupId" : 1,
  //     "GroupName":"Frist Group",
     
  //   },
  //   {
  //     "groupId" : 2,
  //     "GroupName":"second Group",

     
  //   },
  //   {
  //     "groupId" : 3,
  //     "GroupName":"third Group",

     
  //   },
  // ]


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
