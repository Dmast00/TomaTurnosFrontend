import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form : FormGroup;

  
  constructor(private service : BackendService, private router : Router, public fb : FormBuilder) {
    this.form = this.fb.group({
      email : new FormControl,
      password : new FormControl
    })
   }
  
  ngOnInit(): void {
  }

  loginUsuario(){
    this.service.loginUser(this.form.value).subscribe((res) =>{
      console.log(res)
      
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
      if(err.status == 400){
        console.log("Something went wrong");
        this.router.navigate(['/Login'])
      }
      else if(err.status == 200){
        console.log('logged in succesfully')
        this.router.navigate(['/Home']);
      }
      else if (err.status == 500){
        console.log('Internal error on server')
      }
    });
  }
}
