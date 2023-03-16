import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { GroupDataService } from '../group-data.service';
// importing font-awesome emoji
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'; 
import Swal from "sweetalert2";
import { FormArray, FormBuilder, Validators } from '@angular/forms';

interface MyMap {
  [key: string]: string;
}

interface MyMap2 {
  [key: string]: string;
}

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit{
  form: FormGroup;
  private group: any;
  ids: any;
  faPlusSquare = faPlusSquare;
  mappedHeader : any;
  headerFormatted : any;
  paramsFormatted : any;
  //for maping header values 
  myMap: MyMap = {};
  myMap2: MyMap2 = {};

  

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, 
    private groupID: GroupDataService, 
    private router: Router, 
    private formBuilder: FormBuilder) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';  

    this.form = new FormGroup({
      name: new FormControl(),
      url: new FormControl(''),
      header: new FormArray([
        new FormGroup({
          key: new FormControl(''),
          value: new FormControl('')
        })
      ]),

      params: new FormArray([
        new FormGroup({
          key: new FormControl(''),
          value: new FormControl('')
        })
      ]),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
    });

  
  }

  
  get userFormParams () {
    return this.form.get('params') as FormArray
  }

  get userFormGroups () {
    return this.form.get('header') as FormArray
  }

  get f(){
    return this.form.controls;
  }

  addHeader(){
    const control = <FormArray>this.form.controls['header'];
    control.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  removeHeader(index: number){
    if(index > 0 ){
    const control = <FormArray>this.form.controls['header'];
    control.removeAt(index);
    }else{
      Swal.fire({
        title:'Stop',
        text:'Must have atleast one Header',
        confirmButtonColor: '#9DC08B',
        icon : 'warning',

      })
    } 
    //console.log(index)   
  }


  addParams(){
    const control = <FormArray>this.form.controls['params'];
    control.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  removeParams(index: number){
    const control = <FormArray>this.form.controls['params'];
    control.removeAt(index);    
  }



  onSubmit() {
    const formData = this.form.value;
  
    
    let groupEntity = {
      groupId : +(this.selectedTeam)
    }


    //formatting params
    var collectParams = this.form.get('params') as FormArray;
    this.paramsFormatted = collectParams.value;
    //console.log(this.headerFormatted)
    const paramsFormattedString: string = JSON.stringify(this.paramsFormatted);
    const forParams: { key: string, value: string }[] = JSON.parse(paramsFormattedString);
    forParams.forEach(item => {
      this.myMap2[item.key] = item.value;
    });
    //console.log(this.myMap); // Output: { "a": "asd", "b": "dsfdf" }


    //formatting params
    var collectHeader = this.form.get('header') as FormArray;
    this.headerFormatted = collectHeader.value;
    //console.log(this.headerFormatted)
    const headerFormattedString: string = JSON.stringify(this.headerFormatted);
    const forHeader: { key: string, value: string }[] = JSON.parse(headerFormattedString);
    forHeader.forEach(item => {
      this.myMap[item.key] = item.value;
    });


    let request = {
      name: formData.name,
      header: JSON.stringify(this.myMap),
      params:JSON.stringify(this.myMap2),
      url: formData.url,
      reqBody:formData.reqBody,
      resBody:formData.resBody,
      id: formData.id,
      groupEntity:groupEntity
    };
   // console.log(formData);
   // console.log(request);
    console.log(this.group);
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
        Swal.fire({
          title:'Success',
          text:'New Request has been created',
          confirmButtonColor: '#9DC08B',
          icon : 'success',

        }).then(() =>{
        this.router.navigateByUrl('/requests');
        });
      },
      error => {
        console.error('Error posting form data:', error);
        Swal.fire({
          title:'Error',
          text:'Something went wrong',
          confirmButtonColor: '#9DC08B',
          icon : 'error',

        })
      }
    );
  }
 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.group = params;
    });

    this.groupID.getData().subscribe(ids => {
      this.ids = ids;
    });

  }

  selectedTeam = '';
	onSelected(value:string): void {
		this.selectedTeam = value;
    console.log(this.selectedTeam)
	}



}
