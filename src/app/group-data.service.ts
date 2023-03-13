import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {


  constructor(private http:HttpClient) { }
    getData(){
      let url="http://localhost:8080/group_list"
      return this.http.get(url);

    }
  getRequest(){
    let url="http://localhost:8080/request"
    return this.http.get(url);

  }
  getRequestById(groupId:number){
    let url="http://localhost:8080/request/"+groupId.toString();
    return this.http.get(url);

  }
  

}
