import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteGroupService {
  constructor(private http:HttpClient) { }
   deleteData(id:number){
    let url='http://localhost:8080/groups/delete/'+id.toString();
    ///api/items/${itemId}
     // console.log(this.http.delete(url));
    console.log(url);
    this.http.delete(url)
       .subscribe(() => console.log( 'Delete successful'));
  }
}
