import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {
  form: FormGroup;
  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.form = new FormGroup({
      id: new FormControl(),
      url: new FormControl(''),
      header: new FormControl(''),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
      groupEntity: new FormControl()
    });
  }
  onSubmit() {
    const formData = this.form.value;
    formData.groupEntity=JSON.parse(formData.groupEntity);
    console.log(formData)
    //'{"groupId": 1,"groupName": "with request2"}'
    let url='http://localhost:8080/request';
    this.http.post(url, formData).subscribe(
      () => {
        console.log('Form data posted successfully!');
        this.form.reset();
      },
      error => {
        console.error('Error posting form data:', error);
      }
    );
  }
}
