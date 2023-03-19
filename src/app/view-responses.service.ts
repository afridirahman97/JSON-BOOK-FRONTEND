import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewResponsesService {

  constructor(private http: HttpClient, private router: Router) { }

  // get all responses
  getData() {
    
    let getURL = this.router.url
    console.log(getURL)
    const segments = getURL.split('/');
    const id = segments[segments.length - 1];
    console.log(id)

    let url = `http://localhost:8080/responses/response/${id}`;
    return this.http.get(url);
  }
  // responses by id
  getResponseById(responsesId: number) {
    let url = "http://localhost:8080/responses/" + responsesId.toString();
    return this.http.get(url);

  }
}
