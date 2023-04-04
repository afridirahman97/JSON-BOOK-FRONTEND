import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteGroupService {
  token: any;
  constructor(private http:HttpClient) { }
   deleteData(id:number){
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };

    let url='http://localhost:8080/groups/delete/'+id.toString();
    ///api/items/${itemId}
     // console.log(this.http.delete(url));
    console.log(url, httpOptions);
    this.http.delete(url, httpOptions)
       .subscribe(() => console.log( 'Delete successful'));
  }
}
