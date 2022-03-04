import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';
import { CustomValidators } from './CustomValidator';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  form : FormGroup;
  submmited = false;
  constructor( public fb : FormBuilder,private service : BackendService,private router : Router,private toastr : ToastrService) {
    this.form = new FormGroup({
      lastName : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z_ ]*$")
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")
      ]),
      userName : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-zA-Z]+")
      ]),
      firstName : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-zA-Z]+")
      ]),
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      confirmPassword : new FormControl('',[
      
      ])
    }),
    CustomValidators.mustMatch('password','confirmPassword');
   }

  ngOnInit(): void {
  }

  get f(){
    return this.form.controls;
  }

  submitForm(){
    this.submmited = true;
    console.log(this.form.value)
    if(this.form.invalid){
      return;
    }
    this.service.registerUsuario(this.form.value).subscribe(response =>
        console.log((response))
      ),(err : HttpErrorResponse) =>{
        if(err.status == 200){
          this.router.navigate(['/Home']);
          this.toastr.success("Usuario registrado");
          this.router.navigate(['/Login']);
        }
        else if(err.status == 400 ){
          this.form.reset()
          this.toastr.error('Valide los datos proporcionados.')
        }
        else if(err.status == 500){
          this.form.reset();
          this.toastr.info('error interno del servidor.')
        }
      };
      this.router.navigate(['/Home'])
      this.toastr.success("Usuario Registrado")
  }
}
