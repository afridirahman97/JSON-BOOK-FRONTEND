import { Component } from '@angular/core';
import { ViewResponsesService } from '../view-responses.service';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent {
  rows: any;
  a: any;
  b: any;
  table_header = ["Status", "Response Body", "Requested At", "Responded At", "Time (ms)"]

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
}
