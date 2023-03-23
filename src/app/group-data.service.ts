import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  constructor(private http:HttpClient) { }
  
    getData(){
      let id =  localStorage.getItem('id')
      let url=`http://localhost:8080/groups/${id}`
      return this.http.get(url);

    }
  getRequest(){
    let url="http://localhost:8080/requests"
    return this.http.get(url);

  }
  getRequestById(groupId:number){
    let url="http://localhost:8080/requests/"+groupId.toString();
    return this.http.get(url);

  }
  

}
