import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Servicios/auth.service';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Login } from '../login.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form : FormGroup;
  login : Login
  submmited = false; 
  
  constructor(private service : BackendService, private router : Router, 
    public fb : FormBuilder, private toastr : ToastrService, private authService : AuthService) {
    this.form = this.fb.group({
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      password : new FormControl('',[
        Validators.required
      ])
    })
   }
  
  
  ngOnInit(): void {
    this.authService.logout();
  }

  get f(){
    return this.form.controls
  }

  //Se establece una funcion para iniiar sesion, se envia al servicio del backend
  //el formulario que el usuario lleno, asi mismo, se utiliza el Http Error Response,
  //para verificar la respuesta del servidor, en caso que el servidor regrese un codigo 400
  //se mostrara un mensaje acerca de las credenciales del usuario. Si retorna un mensaje de 
  //error 500  se muestra un mensaje sobre un error en el servidor. Y, si se muestra un
  //codigo de error 200, guardamos el token del usuario para poder tener una 
  //control de la sesion de usuaro, asi mismo, se muestra un mensaje de exito, y se redirecciona
  //al usuario a la pagina principal.
  loginUsuario(){
    this.submmited = true;
    if(this.form.invalid){
      return;
    }
    this.service.loginUser(this.form.value).subscribe(res =>{
      console.log(res)
    },
    (err:HttpErrorResponse)=>{
      console.log(err)

      if(err.status == 400){
        this.router.navigate(['/Login'])
        this.form.reset();
        this.toastr.error('Contraseña o Usuario incorrecto')
      }
      else if (err.status == 500){  
        this.form.reset();
        this.toastr.info('Error interno del servidor.');
      }
      else if(err.status == 200){  
        this.service.getStamp(this.form.controls['email'].value).subscribe(data =>{
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('token',data['securityStamp'])
          localStorage.setItem('userName',data['userName'])
          this.service.getUserRole(data.id).subscribe(data =>{
            localStorage.setItem('role',data[0])
          })
          this.router.navigate(['/Home']);
          this.toastr.success('Inicio de sesion correcto')
        })
      }
    });
  }
}
