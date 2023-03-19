import { Component } from '@angular/core';
import { RequestDataService } from '../request-data.service';


@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.css']
})
export class RequestDataComponent {
  rows: any;
  a : any;
  b : any


  constructor(private data: RequestDataService){
    this.data.getData().subscribe(data =>{
      //console.warn(data)
      this.rows = data
      //console.log(this.rows)
      console.log(this.rows[0].groupEntity)
      this.a = this.rows[0].requestEntity.id
      this.b = this.rows[0].requestEntity.name

    })

  }

}
