import { Component } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { GroupDataService } from '../group-data.service';
import {DeleteGroupService} from "../delete-group.service";
import Swal from 'sweetalert2';


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


  headers = ["Group Name", "Actions"];

  



  performEdit(id: number){
    alert( id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id,
        
      }
    };
    this.router.navigate(['/group/create'],navigationExtras)
  }

  performView(id: number, name: string){
    //this.router.navigate(['/groups/'+id])
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id,
        groupName: name
        
      }
    };
    this.router.navigate(['/groups/'+id],navigationExtras)
  }
  

  performDelete(id: number,name:String){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, you want to delete this group ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.del.deleteData(id)
        Swal.fire('Removed!', 'Group successfully deleted', 'success').then(()=>{
          location.reload();
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Group is still in the database', 'error');
      }
    });
  }

  
  performCreate() {
    this.router.navigate(['/group/create'])
  }
}
