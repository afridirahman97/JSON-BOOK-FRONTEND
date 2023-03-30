import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  formGroup: FormGroup | undefined;
  selectedLeftOption: string | undefined;
  leftOptions = ['Option 1', 'Option 2', 'Option 3'];
  rightOptions : any;
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      leftSelect: '',
      rightSelect: ''
    });
  }

  onLeftOptionChange(option: string) {
    // Clear the right select options
    this.rightOptions = [];

    // Load new options based on the selection in the left select input
    if (option === 'Option 1') {
      this.rightOptions = ['application/json', 'application/xml', 'text/plain', 'text/html', 'image/jpeg', 'image/png', 'application/pdf', 'application/vnd.ms-excel'];
    } else if (option === 'Option 2') {
      this.rightOptions = ['gzip', 'deflate', 'br'];
    } else if (option === 'Option 3') {
      this.rightOptions = ['en', 'fr', 'es', 'de', 'zh'];
    }
  }

  a= ['keep-alive', 'close']
 
}

