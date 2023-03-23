import { Component, ViewChild, ElementRef } from '@angular/core';

interface Option {
  id: string;
  name: string;
  content: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  options: Option[] = [
    { id: 'option1', name: 'Option 1', content: 'This is the content for option 1' },
    { id: 'option2', name: 'Option 2', content: 'This is the content for option 2' },
    { id: 'option3', name: 'Option 3', content: 'This is the content for option 3' }
  ];

  selectedOption: string = '';

  showDiv(optionId: string): void {
    this.selectedOption = optionId;
  }

  

}

