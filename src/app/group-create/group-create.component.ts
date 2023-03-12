import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements  OnInit{
  form: FormGroup;
  groupId:number| null;
  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.groupId= null;
    this.form = new FormGroup({
      groupName: new FormControl('')
    });
  }
  onSubmit() {
    const formData = this.form.value;
    console.log(formData);
    let url='http://localhost:8080/group_list';
    this.http.post(url, formData).subscribe(
      () => {
        console.log('Form data posted successfully!');
        this.form.reset();
      },
      error => {
        console.error('Error posting form data:', error);
      }
    );
    if(this.groupId !=null){

    }
    else{

      console.log("post complete")
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = Number(params['groupID']);
      console.log(this.groupId)
      console.log(params)
    });
  }

}
