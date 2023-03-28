import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GroupDataService } from "../group-data.service";
import { DeleteGroupService } from "../delete-group.service";
// importing font-awesome emoji
import { faPlusSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  searchQuery: string = "";
  filteredTableData: any;

  stringifyParam(requestHeader: any) {
    let header = JSON.stringify(JSON.parse(requestHeader), null, 4)
    return header;
  }

  stringifyHeader(requestParam: any) {
    let params = JSON.stringify(JSON.parse(requestParam), null, 4)
    return params;
  }


  //headers = ["Name", "URL", "Header", "Request Method", "Request Params", "Request Body", "Actions"]; Don't cut this line
  topSection: "topSection" = "topSection";
  headers = ["Name", "URL", "Request Method", "Request Body", "Actions"];
  rows: any;
  faPlusSquare = faPlusSquare;
  faeye = faEye;

  test: any;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private data: GroupDataService, private del: DeleteGroupService) {
    this.data.getRequest().subscribe(data => {
      //console.warn(data)
      this.rows = data
      this.filteredTableData = data
      console.log(this.rows)
      //this.test = Object.assign({}, ...this.rows);
      //this.test = JSON.stringify(this.rows.requestParam, null, 4)
      //console.log(this.test)
      //console.log(this.rows)
    })
  }

  ngOnInit(): void {
    console.log(this.rows)
  }


  performCreate() {
    this.router.navigate(['/request/create'])
  }

  viewResponses(id: number) {
    this.router.navigate(['requests/responses/' + id])
  }
  createRequest(id: number) {
    this.data.createResponse(id).subscribe(data => {
      console.log(data);
      let response = JSON.stringify(data, (key, value) => {
        if (typeof value === 'string' && value.length > 50) {
          return value.slice(0, 50) + '...';
        }
        return value;
      });
      Swal.fire({
        title: 'Success',
        text: "Completed",
        confirmButtonColor: '#9DC08B',
        icon: 'success',

      }).then(() => {
        this.router.navigate(['requests/responses/' + id]);
      });
      console.log(data);
    })
  }

  filterTable() {
    this.filteredTableData = this.rows.filter((row: { requestName: string; }) =>
      row.requestName.toLowerCase().includes(this.searchQuery.toLowerCase())

    );
    console.log(this.filteredTableData)
  }


}
