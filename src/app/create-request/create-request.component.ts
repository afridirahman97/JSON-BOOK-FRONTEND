import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit{
  form: FormGroup;
  private group: any;
  constructor(private route: ActivatedRoute,private http: HttpClient) {

    this.form = new FormGroup({
      name: new FormControl(),
      url: new FormControl(''),
      header: new FormControl(''),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
    });
    //this.form.addControl("groupEntity",new FormControl());

  }
  onSubmit() {
    const formData = this.form.value;

    let request = {
      name: formData.name,
      header:formData.header,
      url: formData.url,
      reqBody:formData.reqBody,
      resBody:formData.resBody,
      groupEntity:this.group
    };
    console.log("here")
    console.log(formData);
    console.log(request);
    console.log(this.group.groupID);
    console.log("here")
    //formData.groupEntity=JSON.parse(formData.groupEntity);
    //console.log(formData)
    //'{"groupId": 1,"groupName": "with request2"}'
    //formData.groupEntity=this.group;
    let url='http://localhost:8080/request';

    this.http.post(url,request).subscribe(
      () => {
        console.log('Form data posted successfully!');
        this.form.reset();
      },
      error => {
        console.error('Error posting form data:', error);
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.group = params;
      console.log(this.group);
      //this.group["groupID"]=Number(this.group["groupID"]);
      //this.group.control['groupEntity'].setValue(this.group);
    });
  }
}
