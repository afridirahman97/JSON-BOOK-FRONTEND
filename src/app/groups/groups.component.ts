import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupDataService } from '../group-data.service';
import { DeleteGroupService } from "../delete-group.service";
import Swal from 'sweetalert2';
//importing necessary font awesome emojis for group component
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from '../shared-data-service.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

  users: object = {};
  searchQuery: string = "";
  filteredTableData: any;
  topSection: "topSection" = "topSection";
  tabButtonPadding: "tabButtonPadding" = "tabButtonPadding";
  navButton: "navButton" = "navButton";
  htmlBody: "htmlBody" = "htmlBody";
  rows: any;
  faCoffee = faCoffee;
  faPlusSquare = faPlusSquare;
  role: any;
  AdminHere: Boolean = false;
  token: any;

  constructor(
    private router: Router,
    private data: GroupDataService,
    private del: DeleteGroupService,
    private sharedData: SharedDataService,
    private http: HttpClient) {
    this.data.getData().subscribe(data => {
      //console.warn(data)
      this.rows = data
      this.filteredTableData = data
      //console.log(this.rows)

    })
  }

  headers = ["Group Name", "Actions"];

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole')
    console.log(this.role)
    if (this.role === "ADMIN") {
      this.AdminHere = true;
    } else {
      // do nothing 
    }

  }

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

  async performShare(id: number) {

    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };

    this.http.get('http://localhost:8080/api/v2/list-of-users', httpOptions).subscribe(async (response) => {
      this.users = response;
      console.log(this.users);
      console.log(typeof this.users)

      const { value: name } = await Swal.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: this.users,
        inputPlaceholder: 'Select a User',
        showCancelButton: true,

      })

      if (name) {
        this.token = localStorage.getItem('accessToken')
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': this.token,
            'Content-Type': 'application/json'
          })
        };
        this.http.get(`http://localhost:8080/groups/${id}/add-new-user/${name}`, httpOptions).subscribe((response) => {
          // Swal.fire(`You selected: ${name}`);
          Swal.fire({
            title: 'Successfully Shared',
            text: 'This group has been successfully shared',
            confirmButtonColor: '#9DC08B',
            icon: 'success',
          });
        });

      }
    });






    // console.log(id)
    // console.log(Uid)
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
  }
}

