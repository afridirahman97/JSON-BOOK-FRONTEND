import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  //s: string[] = []

  pairs = [{left: 0, right: '', rightOptions: ['']}];
  leftOptions = ['Accept', 'AcceptEncoding', 'AcceptLanguage', 'Connection'];
  rightOptionMap: { [key: string]: string[] } = {
    Accept: ['application/json', 'application/xml', 'text/plain', 'text/html', 'image/jpeg', 'image/png', 'application/pdf', 'application/vnd.ms-excel'],
    AcceptEncoding: ['deflate'],
    AcceptLanguage: ['en', 'fr', 'es', 'de', 'zh'],
    Connection:['keep-alive', 'close']
  };

  addPair() {
    this.pairs.push({left: 0, right: '', rightOptions: []});
  }

  removePair(index: number) {
    this.pairs.splice(index, 1);
  }

  updateRightOptions(index: number) {
    const leftValue = this.pairs[index].left;
    console.log(this.rightOptionMap[leftValue])
    //this.pairs[index].rightOptions = this.rightOptionMap[leftValue];
   this.pairs[index].rightOptions = this.rightOptionMap[leftValue];
  }
}
