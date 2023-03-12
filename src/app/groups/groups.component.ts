import { Component } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { GroupDataService } from '../group-data.service';
import {DeleteGroupService} from "../delete-group.service";



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

   topSection: "topSection" = "topSection";
   rows: any;


  constructor(private router: Router, private data: GroupDataService,private del:DeleteGroupService) {
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
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id
      }
    };
    this.router.navigate(['/group/create'],navigationExtras)
  }

  performView(id: number,name:String){
    // this.router.navigate(['/groups/'+id])
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupId: id,
        groupName:name
      }
    };
    this.router.navigate(['group/requests'],navigationExtras)
  }

  performDelete(id: number,name:String){
    alert(name)
    this.del.deleteData(id)
  }


  performCreate() {
    this.router.navigate(['/group/create'])
  }
}
