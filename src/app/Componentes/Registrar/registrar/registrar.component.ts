import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  form : FormGroup;
  constructor( public fb : FormBuilder,private service : BackendService,private router : Router,private toastr : ToastrService) {
    this.form = this.fb.group({
      lastName : new FormControl,
      password : new FormControl,
      userName : new FormControl,
      firstName : new FormControl,
      email : new FormControl('',Validators.email),

    })
   }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.form.value)
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
  }
}
