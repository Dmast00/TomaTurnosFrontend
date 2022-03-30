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
  submmited = false;

  //se Crea un form group el cual funcionara como base para el formulario que se muestra del lado del cliente
  //asi mismo, creamos las validaciones para cada input del formulario
  constructor( public fb : FormBuilder,private service : BackendService,private router : Router,private toastr : ToastrService,
     ) {
    this.form = new FormGroup({
      lastName : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z_ ]*$")
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
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")
      ]),
     
    })
  }
  
  ngOnInit(): void {
  }

  //Creamos una funcion para retornar los valores del formulario, y acceder con mayor facilidad a los valores escritos por el usuario
  get f(){
    return this.form.controls;
  }

  //Creamos una funcion para que el usuario puede envir el formulario al servidor,
  //en caso que el formulario contenga errores de validaciones se retorna el formulario
  //y no permite al uuario registrarse, por otro lado si el formulario cumple con los
  //requisitos, se enviar la peticion al servidor, y retorna un codigo de error, en caso
  //de codigos 200, se muestra un mensaje de exito y redirecciona al usuario a la pagina
  //de iniciar sesion, por otro lado, si el servidor retorna un codigoe error 400 o 500
  //muestra un mensaje al usuario con el error y limpiar e formulrio
  submitForm(){
    this.submmited = true;
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
          
          this.toastr.info('error interno del servidor.')
        }
      };
      this.router.navigate(['/Login'])
      this.toastr.success("Usuario Registrado")
  }
}
