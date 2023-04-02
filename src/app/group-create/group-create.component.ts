import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})


export class GroupCreateComponent implements OnInit {


  form: FormGroup;
  groupId: number | null;
  token: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.groupId = null;
    this.form = new FormGroup({
      groupName: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = Number(params['groupID']);
      console.log(this.groupId)
      console.log(params)
    });



  }

  onSubmit() {
    const formData = this.form.value;
    console.log(formData)
    if (formData.groupName === "") {
      Swal.fire({
        title: 'Error',
        text: 'New group must have a name',
        icon: 'error',
        confirmButtonColor: '#9DC08B',
      })
    } else {

      this.token = localStorage.getItem('accessToken')
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.token,
          'Content-Type': 'application/json'
        })
      };

      let id = localStorage.getItem('id')
      let url = `http://localhost:8080/groups/${id}`;
      this.http.post(url, formData,  httpOptions).subscribe(
        () => {
          console.log('Form data posted successfully!');
          this.form.reset();
          Swal.fire({
            title: 'Success',
            text: 'New Group has been created',
            confirmButtonColor: '#9DC08B',
            icon: 'success',

          }).then(() => {
            this.router.navigateByUrl('/groups');;

          });
        },
        error => {
          console.error('Error posting form data:', error);
        }
      );
    }
  }



}
