import { Component } from '@angular/core';
import { ViewResponsesService } from '../view-responses.service';


interface Option {
  id: string;
  name: string;
  content: string;
}

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent {

  
  dataTest = {
    'simple key': 'simple value',
    'numbers': 1234567,
    'simple list': ['value1', 22222, 'value3'],
    'special value': undefined,
    'owner': null,
    'simple obect': {
      'simple key': 'simple value',
      'numbers': 1234567,
      'simple list': ['value1', 22222, 'value3'],
      'simple obect': {
        'key1': 'value1',
        'key2': 22222,
        'key3': 'value3'
      }
    }
  };

  get code () {
    return JSON.stringify(this.data, null, 2);
  }

  set code (v) {
    try{
      this.data = JSON.parse(v);
    }
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  stringifyBody(requestBody: any) {
    let body = JSON.stringify(JSON.parse(requestBody), null, 4)
    console.log(body)
    return body;
  }

  rows: any;
  a: any;
  b: any;
  table_header = ["Status", "Requested At", "Responded At", "Time (ms)", "Actions"]

  constructor(private data: ViewResponsesService){
    this.data.getData().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      //console.log(this.rows)
      console.log(this.rows[0].requestEntity)
      this.a = this.rows[0].requestEntity.id
      this.b = this.rows[0].requestEntity.name
    })

  }

  selectedOption: string = '';

  showDiv(optionId: string): void {
    this.selectedOption = optionId;
  }
}
