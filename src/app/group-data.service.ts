import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  token: any;

  constructor(private http: HttpClient) { }


  getData() {
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };

    let id = localStorage.getItem('id')
    let url = `http://localhost:8080/groups/${id}`;
    return this.http.get(url, httpOptions);

  }
  getRequest() {
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };

    let id = localStorage.getItem('id')
    let url = "http://localhost:8080/groups/requests/" + id;
    return this.http.get(url, httpOptions);

  }
  getRequestById(groupId: number) {
    let url = "http://localhost:8080/requests/" + groupId.toString();
    return this.http.get(url);

  }
  createResponse(requestId: number) {
    let url = "http://localhost:8080/requests/create-response/" + requestId.toString();

    return this.http.get(url);
  }


}
