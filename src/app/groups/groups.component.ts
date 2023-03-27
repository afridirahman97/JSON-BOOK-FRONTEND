import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GroupDataService } from '../group-data.service';
import { DeleteGroupService } from "../delete-group.service";
import Swal from 'sweetalert2';
//importing necessary font awesome emojis for group component
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from '../shared-data-service.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

  searchQuery: string = "";
  filteredTableData: any;
  topSection: "topSection" = "topSection";
  tabButtonPadding: "tabButtonPadding" = "tabButtonPadding";
  navButton: "navButton" = "navButton";
  htmlBody: "htmlBody" = "htmlBody";
  rows: any;
  faCoffee = faCoffee;
  faPlusSquare = faPlusSquare;



  constructor(
    private router: Router,
    private data: GroupDataService,
    private del: DeleteGroupService,
    private sharedData: SharedDataService) {
    this.data.getData().subscribe(data => {
      //console.warn(data)
      this.rows = data
      this.filteredTableData = data
      //console.log(this.rows)

    })
  }

  headers = ["Group Name", "Actions"];





  performEdit(id: number) {
    /*alert( id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupID: id
      }
    };
    this.router.navigate(['/group/create'],navigationExtras)*/
    this.router.navigate(['group/edit/' + id]);
  }

  performView(id: number, name: string) {
    //this.router.navigate(['/groups/'+id])
    /*let navigationExtras: NavigationExtras = {
      queryParams: {
        groupId: id,
        groupName:name
      }
    };*/
    this.router.navigate(['/groups/view/' + id])
    this.sharedData.updateRowData(name)
  }


  performDelete(id: number, name: String) {
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
          title: 'Removed',
          text: 'This has been deleted successfully',
          confirmButtonColor: '#9DC08B',
          icon: 'success',
        }).then(() => {
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

  filterTable() {
    this.filteredTableData = this.rows.filter((row: { groupName: string; }) =>
      row.groupName.toLowerCase().includes(this.searchQuery.toLowerCase())

    );
    // console.log(this.filteredTableData)
  }
}

