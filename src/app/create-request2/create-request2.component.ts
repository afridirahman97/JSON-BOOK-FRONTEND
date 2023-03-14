import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-request2',
  templateUrl: './create-request2.component.html',
  styleUrls: ['./create-request2.component.css']
})
export class CreateRequest2Component implements OnInit{
  form: FormGroup;
  groupId:any;
  constructor(private route: ActivatedRoute,private http: HttpClient, private router: Router) {

    this.form = new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
      header: new FormControl(''),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
    });
    //this.form.addControl("groupEntity",new FormControl());

  }
  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
  }
  onSubmit() {
    let formData = this.form.value;
    let groupEntity={
      groupId:this.groupId
    }
    let request = {
      name: formData.name,
      header:formData.header,
      url: formData.url,
      reqBody:formData.reqBody,
      resBody:formData.resBody,
      groupEntity:groupEntity
    };
    console.log("here")
    console.log(formData);
    console.log(request);
    console.log("here")
    let url='http://localhost:8080/request';
    this.http.post(url,request).subscribe(
      () => {
        console.log('Form data posted successfully!');
        this.form.reset();
        Swal.fire({
          title:'Success',
          text:'New Request has been created',
          confirmButtonColor: '#9DC08B',
          icon : 'success',

        }).then(() =>{
        this.router.navigateByUrl('/groups/view/'+this.groupId);
        });
      },
      error => {
        console.error('Error posting form data:', error);
      }
    );
  }

}
