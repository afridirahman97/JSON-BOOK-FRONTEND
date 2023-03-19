import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewResponsesService {

  constructor(private http:HttpClient) { }

  // get all responses
  getData(){
    let url="http://localhost:8080/responses";
    return this.http.get(url);
 }
 // responses by id
 getResponseById(responsesId:number){
  let url="http://localhost:8080/responses/"+responsesId.toString();
  return this.http.get(url);

}
}
