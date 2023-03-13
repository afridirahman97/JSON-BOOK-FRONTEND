import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  constructor(private http:HttpClient) {}

    getData(){
      let url="http://localhost:8080/request/1"
      return this.http.get(url);
   }
  getRequestById(groupId:number){
    let url="http://localhost:8080/request/"+groupId.toString();
    return this.http.get(url);

  }
}
