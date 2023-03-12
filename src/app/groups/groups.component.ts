import { Component , HostListener } from '@angular/core';
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
   tabButtonPadding: "tabButtonPadding" = "tabButtonPadding";
   rows: any;



  constructor(private router: Router, private data: GroupDataService,private del:DeleteGroupService) {
    this.data.getData().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      //console.log(this.rows)

    })
  }


  headers = ["ID", "Group Name", "Actions"];

  



  performEdit(id: number){
    alert( id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id
      }
    };
    this.router.navigate(['/group/create'],navigationExtras)
  }

  performView(id: number){
    this.router.navigate(['/groups/'+id])
  }

  performDelete(id: number,name:String){
    alert(name)
    this.del.deleteData(id)
  }


  performCreate() {
    this.router.navigate(['/group/create'])
  }
}
