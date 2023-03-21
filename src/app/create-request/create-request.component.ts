import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GroupDataService } from '../group-data.service';
// importing font-awesome emoji
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
// import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZonedDateTime, DateTimeFormatter } from '@js-joda/core';
//import 'codemirror/theme/abbott.css'
// importing ajv to validate JSON Schema
import Ajv from "ajv";


const defaults = {
  // markdown: `{}`

};

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
export class CreateRequestComponent implements OnInit {

  readOnly = false;
  //mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: true,
    mode: "text/JSON-LD mode",
    theme: "abbott",
    smartIndent: true,
  };
  defaults = defaults


  form: FormGroup;
  public myForm: FormGroup;
  private group: any;
  ids: any;
  faPlusSquare = faPlusSquare;
  faSquareMinus = faSquareMinus;
  mappedHeader: any;
  headerFormatted: any;
  paramsFormatted: any;
  
  
  //for maping header values 
  myMap: MyMap = {};
  myMap2: MyMap2 = {};



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private groupID: GroupDataService,
    private router: Router,
    private formBuilder: FormBuilder) {

    const reg = '(https?://)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*/?';

    const a = /^[a-z]+$/i;
    
    

    // const schema = {
    //   type: "object",
    //   properties:{
    //     requestName: {type: "string"},
    //     requestMethod: {type: "string"},
    //     url: {type: "string"},
    //     requestHeade: {type: },
    //     requestParam: {type: },
    //     authenticationType: {type: "string"},
    //     requestBearerToken: {type: ""},
    //     requestBodyType: {type: "string"},
    //     requestBodyRaw: {type: ""},
    //     createdAt: {type: ""},
    //     updatedAt: {type: ""},
    //     groups:{
    //       type: "object",
    //       properties:{
    //         groupId: {type: "number"},
    //         groupName: {type: "string"}
    //       },
    //       required:[groupID],
    //     }
    //   },
    //   required: [],
    // };



    // if (demoJson.test(myString)) {
    //   console.log('The string matches the regex.');
    // } else {
    //   console.log('The string does not match the regex.');
    // }

    this.myForm = formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    })

    this.form = new FormGroup({
      name: new FormControl(),
      method: new FormControl(''),
      url: new FormControl(),
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
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
      authenticationType: new FormControl(''),
      requestBodyType: new FormControl(''),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
    });
  }


  get userFormParams() {
    return this.form.get('params') as FormArray
  }

  get userFormGroups() {
    return this.form.get('header') as FormArray
  }

  get f() {
    return this.form.controls;
  }

  get m() {
    return this.myForm.controls;
  }



  addHeader() {
    const control = <FormArray>this.form.controls['header'];
    control.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }



  removeHeader(index: number) {
    if (index > 0) {
      const control = <FormArray>this.form.controls['header'];
      control.removeAt(index);
    } else {
      Swal.fire({
        title: 'Stop',
        text: 'Must have atleast one Header',
        confirmButtonColor: '#9DC08B',
        icon: 'warning',

      })
    }
  }


  addParams() {
    const control = <FormArray>this.form.controls['params'];
    control.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  removeParams(index: number) {
    const control = <FormArray>this.form.controls['params'];
    control.removeAt(index);
  }




  onSubmit() {
    const formData = this.form.value;
    const now = ZonedDateTime.now();
    const formatter = DateTimeFormatter.ofPattern('yyyy-MM-dd\'T\'HH:mm:ssXXX');
    const formattedDateTime = now.format(formatter);



    let groupEntity = {
      groupId: +(this.selectedTeam)
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
      requestName: formData.name,
      requestHeader: JSON.stringify(this.myMap),
      requestParam: JSON.stringify(this.myMap2),
      requestMethod: formData.method,
      url: formData.url,
      authenticationType: formData.authenticationType,
      createdAt: formattedDateTime.toString(),
      updatedAt: formattedDateTime.toString(),
      requestBodyType: formData.requestBodyType,
      requestBodyRaw: formData.reqBody,
      //resBody: formData.resBody,
      id: formData.id,
      groups: groupEntity
    };

    console.log(this.group);
    let url = 'http://localhost:8080/requests';


    //url validation part 

    const myString = formData.url;
    console.log(myString);
    const myRegex = /^(ftp|http|https):\/\/[^ "]+$/; // a regular expression that matches only letters

    // validate a JSON object 
    const ajv = new Ajv();
    // defining JSON Schema
    // const headerSchema = {
    //   type: "object",
    //   properties: {

    //   },
    //   required: [],
    // };
    const formHeader = formData.requestHeader;
    const jsonString = JSON.stringify(formHeader);
    // const isValid = ajv.validate(headerSchema, formHeader);
    // console.log(formHeader);
    const headerRegex = /^\\s*(\\{[\\s\\S]*\\}|\\[[\\s\\S]*\\])\\s*$/;
    // const isValid = headerRegex.test(jsonString);

    if (myRegex.test(myString)) {
      this.http.post(url, request).subscribe(
        () => {
          console.log('Form data posted successfully!');
          this.form.reset();
          Swal.fire({
            title: 'Success',
            text: 'New Request has been created',
            confirmButtonColor: '#9DC08B',
            icon: 'success',
  
          }).then(() => {
            this.router.navigateByUrl('/requests');
          });
        },
        error => {
          console.error('Error posting form data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            confirmButtonColor: '#9DC08B',
            icon: 'error',
  
          })
        }
      );
    }else (!myRegex.test(myString))
    {
      Swal.fire({
        title: 'Error',
        text: 'Please Enter a Valid URL',
        confirmButtonColor: '#9DC08B',
        icon: 'error',

      })
    }
    // else if((!myRegex.test(myString)) && (!isValid)){
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Please Enter a Valid URL and a JSON Object',
    //     confirmButtonColor: '#9DC08B',
    //     icon: 'error',

    //   })
    // } 
    // else if(!isValid){
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Please Enter a Valid JSON Object',
    //     confirmButtonColor: '#9DC08B',
    //     icon: 'error',

    //   })
    // }


    //
     //
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
  onSelected(value: string): void {
    this.selectedTeam = value;
    console.log(this.selectedTeam)
  }


}
