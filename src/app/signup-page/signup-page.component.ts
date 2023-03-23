import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {

    this.appComponent.showHeader = false;
    this.signUpForm = this.formBuilder.group({
      email: [""],
      password: [""],
      firstName: [""],
      middleName: [""],
      lastName: [""],
      mobile: [""],
      address: [""],
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:8080/api/v2/register",this.signUpForm.value)
    .subscribe(res=>{
      console.log(res)
      alert('SIGNIN SUCCESFUL');
      this.signUpForm.reset()
      this.router.navigate(["login"])
    },err=>{
      console.log(err)
      alert("Something went wrong")
    })
  }

}
