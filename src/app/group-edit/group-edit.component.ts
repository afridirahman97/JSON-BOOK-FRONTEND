import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements  OnInit{
  groupId:number| null;
  form: FormGroup;
  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router) {
    this.groupId=null;
    this.form = new FormGroup({
      groupName: new FormControl('')
    });

  }
  ngOnInit(): void {
    console.log(this.groupId);
    this.groupId=Number(this.route.snapshot.paramMap.get('id'));
  }
  onSubmit() {
    const formData = this.form.value;
    let group={
      groupId:this.groupId,
      groupName:formData.groupName
    }
    console.log(group);
    console.log(formData);

    if( formData.groupName === "" ){
      Swal.fire({
        title:'Error',
        text : 'New group must have a name',
        icon : 'error',
        confirmButtonColor: '#9DC08B',
      })
    }
    else {
      let url='http://localhost:8080/groups';
      this.http.put(url, group).subscribe(
        () => {
          console.log('Form data posted successfully!');
          this.form.reset();
          Swal.fire({
            title:'Success',
            text:'Group has been updated',
            confirmButtonColor: '#9DC08B',
            icon : 'success',

          }).then(() =>{
            this.router.navigateByUrl('/groups');;

          });
        },
        error => {
          console.error('Error posting form data:', error);
        }
      );
    }

  }

}
