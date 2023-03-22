import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loggedInUser : any;
  userDetails : any;
  firstInitial : any;
  secondInitial : any;
  lastInitial : any;
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.loggedInUser = localStorage.getItem('userEmail');


    this.http.get<any>("http://localhost:8080/api/v2/users")
      .subscribe(res => {
        const user = res.find((a: any) => {
         // return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
         if (this.loggedInUser === a.email){
          console.log(res)
          return a.email, a.firstName,a.middleName, a.lastName, a.mobile, a.address;
         }

       

          
        });
        this.userDetails = user;
       
      })
  }

}
