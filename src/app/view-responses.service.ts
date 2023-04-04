import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewResponsesService {
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  // get all responses
  getData() {
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };
    
    let getURL = this.router.url
    console.log(getURL)
    const segments = getURL.split('/');
    const id = segments[segments.length - 1];
    console.log(id)

    let url = `http://localhost:8080/responses/response/${id}`;
    return this.http.get(url, httpOptions);
  }
  // responses by id
  getResponseById(responsesId: number) {
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };

    let url = "http://localhost:8080/responses/" + responsesId.toString();
    return this.http.get(url, httpOptions);

  }
}
