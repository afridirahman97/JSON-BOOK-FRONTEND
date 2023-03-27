import { Component, Type } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { GroupDataService } from '../group-data.service';
import {DeleteGroupService} from "../delete-group.service";
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
//importing necessary font awesome emojis for group component
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; 
import { faPlusSquare, faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons'; 
import { Pass } from 'codemirror';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

   groupNameSearch : string = '';
   topSection: "topSection" = "topSection";
   tabButtonPadding: "tabButtonPadding" = "tabButtonPadding";
   navButton: "navButton" = "navButton";
   htmlBody: "htmlBody" = "htmlBody";
   rows: any;
   faCoffee = faCoffee;
   faPlusSquare = faPlusSquare;
   faMagnifyingGlass = faMagnifyingGlass;
   group_name : string = "";
  //  search_data : constant;

  constructor(private router: Router, private data: GroupDataService,private del:DeleteGroupService) {
    this.data.getData().subscribe(data =>{
      //console.warn(data)
     
      this.rows = data;
      // this.group_name = this.rows.groupName
      // console.log(this.rows)
      // console.log("data" + data)
      // console.log(typeof this.rows)
      // console.log("search value: " + this.groupNameSearch)
      
      // for (const k in this.rows) {
      //   const v = this.rows[k];
      //   console.log(v.groupName);
      // }

      // console.log("search results from constructot: " + this.groupNameSearch)
      
    })

  
  }

  headers = ["Group Name", "Actions"];
  




  performEdit(id: number){
    /*alert( id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id
      }
    };
    this.router.navigate(['/group/create'],navigationExtras)*/
    this.router.navigate(['group/edit/'+id]);
  }

  performView(id: number, name: string){
    //this.router.navigate(['/groups/'+id])
    /*let navigationExtras: NavigationExtras = {
      queryParams: {
        groupId: id,
        groupName:name
      }
    };*/
    this.router.navigate(['/groups/view/'+id])
  }


  performDelete(id: number,name:String){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, you want to delete this group ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
      confirmButtonColor: '#9DC08B',
    }).then((result) => {
      if (result.value) {
        this.del.deleteData(id)
        Swal.fire({
          title:'Removed',
          text:'This has been deleted successfully',
          confirmButtonColor: '#9DC08B',
          icon : 'success',
        }).then(()=>{
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

  performSearch(){
    if(this.groupNameSearch != ""){
      console.log(this.groupNameSearch)
    }else{
      console.log("you did't search any group !")
    }

    this.data.getData()
    for (const k in this.rows) {
      const row = this.rows[k];
      console.log("from row: "+row.groupName)
      if (row.groupName == this.groupNameSearch){
        const search_data = this.rows[k]
        console.log("Hola: "+search_data)
        console.log("gjkfr: "+ search_data[0])
        // this.rows = row;
        // this.router.navigate(['/groups/'])
      }
      // console.log(k + " value of k");
      console.log(row.groupName);
    }
    
  }
}

