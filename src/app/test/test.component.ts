import { Component, ViewChild, ElementRef } from '@angular/core';

const defaults = {
  markdown:`{}`
   
};

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  readOnly = false;
  mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults

  

}

