import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }

  //&& a.password === this.loginForm.value.password
  login() {
    this.http.post<any>("http://localhost:8080/api/v2/login",this.loginForm.value)
    .subscribe(res=>{
      console.log(res)
      alert('SIGNIN SUCCESFUL');
      localStorage.setItem('accessToken',res.accessToken);
      this.loginForm.reset()
      this.router.navigate(["home"])
    },err=>{
      console.log(err)
      alert("Something went wrong")
    })
  }

}
