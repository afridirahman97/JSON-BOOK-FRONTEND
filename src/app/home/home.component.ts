import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loggedInUser: any;
  userDetails: any;
  firstInitial: any;
  secondInitial: any;
  lastInitial: any;
  faSignOut = faSignOut;
  token: any;

  constructor(private http: HttpClient, private appComponent: AppComponent) { }

  ngOnInit(): void {

    this.appComponent.showHeader = true;
    this.loggedInUser = localStorage.getItem('userEmail');
    this.token = localStorage.getItem('accessToken')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    };
    this.http.get<any>("http://localhost:8080/api/v2/users", httpOptions)
      .subscribe(res => {
        const user = res.find((a: any) => {
          // return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          if (this.loggedInUser === a.email) {
            console.log(res)
            localStorage.setItem('userRole', a.roleAccess)
            return a.email, a.firstName, a.middleName, a.lastName, a.mobile, a.address, a.roleAccess[0];
          }

        });
        this.userDetails = user;
        // console.log(this.userDetails);
        localStorage.setItem('id', this.userDetails.id)
      })
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, you want to logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out.',
      cancelButtonText: 'No, I will stay',
      confirmButtonColor: '#9DC08B',
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          title: 'Logout',
          text: 'You have logged out',
          confirmButtonColor: '#9DC08B',
          icon: 'success',
        }).then(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userEmail');
          location.reload();
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'You are still with us', 'error');
      }
    });


  }

}
