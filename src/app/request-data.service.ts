import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

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
    
    let url = "http://localhost:8080/requests/"
    return this.http.get(url, httpOptions);
  }
  getRequestById(groupId: number) {
    let url = "http://localhost:8080/requests/group/" + groupId.toString();

    return this.http.get(url);

  }
}
