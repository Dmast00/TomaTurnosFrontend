import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  
  constructor(private service : BackendService, private router : Router, public fb : FormBuilder, private toastr : ToastrService,private authService : AuthService) {
    this.form = this.fb.group({
      email : new FormControl,
      password : new FormControl
    })
   }
  
  ngOnInit(): void {
    this.authService.logout();
  }

  loginUsuario(){
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
          console.log(data);
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('token',data['securityStamp'])
          this.router.navigate(['/Home']);
          this.toastr.success('Inicio de sesion correcto')
        })
      }
    });
  }
}
