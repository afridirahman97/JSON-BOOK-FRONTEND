import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GroupDataService } from '../group-data.service';
// importing font-awesome emoji
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ZonedDateTime, DateTimeFormatter } from '@js-joda/core';


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

  selectedInputType: string = 'NONE';
  selectedAuthType: string = 'NO_AUTH';
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
  private group: any;
  ids: any;
  faPlusSquare = faPlusSquare;
  faSquareMinus = faSquareMinus;
  mappedHeader: any;
  headerFormatted: any;
  paramsFormatted: any;
  apikeyFormatted : any;
  private formsFormatted: any;

  //for maping header values
  myMap: MyMap = {};
  myMap2: MyMap2 = {};
  myMap3: MyMap = {};

  myMap4: MyMap = {}; //auth api key



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private groupID: GroupDataService,
    private router: Router,
    private formBuilder: FormBuilder) {


    this.form = new FormGroup({
      name: new FormControl(),
      method: new FormControl(''),
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
      forms: new FormArray([
        new FormGroup({
          key: new FormControl(''),
          value: new FormControl('')
        })
      ]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
      authenticationType: new FormControl(''),

      authenticationTypeAPIkey: new FormArray([
        new FormGroup({
          key: new FormControl(''),
          value: new FormControl('')
        })
      ]),

      authenticationTypeBasicAuth: new FormArray([
        new FormGroup({
          key: new FormControl(''),
          value: new FormControl('')
        })
      ]),

      requestBodyType: new FormControl(''),
      reqBody: new FormControl(''),
      resBody: new FormControl(''),
    });
  }


  get userFormAuthAPI() {
    return this.form.get('authenticationTypeAPIkey') as FormArray
  }

  get userFormParams() {
    return this.form.get('params') as FormArray
  }
  get userFormForms() {
    return this.form.get('forms') as FormArray
  }

  get userFormGroups() {
    return this.form.get('header') as FormArray
  }

  get f() {
    return this.form.controls;
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
    if (index > 0) {
      const control = <FormArray>this.form.controls['params'];
      control.removeAt(index);
    } else {
      // do nothing
    }
  }
  addForms() {
    const control = <FormArray>this.form.controls['forms'];
    control.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  removeForms(index: number) {
    if (index > 0) {
      const control = <FormArray>this.form.controls['forms'];
      control.removeAt(index);
    } else {
      Swal.fire({
        title: 'Stop',
        text: 'Must have atleast One Form Value',
        confirmButtonColor: '#9DC08B',
        icon: 'warning',

      })

    }
  }



  onSubmit() {
    const formData = this.form.value;
    const now = ZonedDateTime.now();
    const formatter = DateTimeFormatter.ofPattern('yyyy-MM-dd\'T\'HH:mm:ssXXX');
    const formattedDateTime = now.format(formatter);

    let groupEntity = {
      groupId: +(this.selectedId)
    }


    //formatting params
    var collectParams = this.form.get('params') as FormArray;
    this.paramsFormatted = collectParams.value;
    const paramsFormattedString: string = JSON.stringify(this.paramsFormatted);
    const forParams: { key: string, value: string }[] = JSON.parse(paramsFormattedString);
    forParams.forEach(item => {
      this.myMap2[item.key] = item.value;
    });


    //formatting forms
    var collectForms = this.form.get('forms') as FormArray;
    this.formsFormatted = collectForms.value;
    //console.log(this.headerFormatted)
    const formsFormattedString: string = JSON.stringify(this.formsFormatted);
    const forForms: { key: string, value: string }[] = JSON.parse(formsFormattedString);
    forForms.forEach(item => {
      this.myMap3[item.key] = item.value;
    });


    //formatting headers
    var collectHeader = this.form.get('header') as FormArray;
    this.headerFormatted = collectHeader.value;
    const headerFormattedString: string = JSON.stringify(this.headerFormatted);
    const forHeader: { key: string, value: string }[] = JSON.parse(headerFormattedString);
    forHeader.forEach(item => {
      this.myMap[item.key] = item.value;
    });


    //formatting api key 
    var collectAPIKEY = this.form.get('authenticationTypeAPIkey') as FormArray;
    this.apikeyFormatted = collectAPIKEY.value;
    const apikeyFormattedString: string = JSON.stringify(this.apikeyFormatted);
    const forAPIKEY: { key: string, value: string }[] = JSON.parse(apikeyFormattedString);
    forAPIKEY.forEach(item => {
      this.myMap4[item.key] = item.value;
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
      id: formData.id,
      groups: groupEntity
    };
    let requestFormDto = {
      requests: request,
      forms: JSON.stringify(this.myMap3)
    }
    let apikey = {
      apikey : JSON.stringify(this.myMap4)
    }
    console.log(requestFormDto);

    console.log(this.group);
    let url = 'http://localhost:8080/requests/dto';



    this.http.post(url, requestFormDto).subscribe(
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
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.group = params;
    });

    this.groupID.getData().subscribe(ids => {
      this.ids = ids;
    });

  }

  selectedId = '';
  onSelected(value: string): void {
    this.selectedId = value;
    console.log(this.selectedId)
  }


}
