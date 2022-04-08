import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() user : Usuario[]
  userList : Usuario[] = []
  form : FormGroup
  constructor(private service : BackendService,public fb : FormBuilder,private toastr : ToastrService) {
    this.form = new FormGroup({
      idUser : new FormControl('',[]),
      currentPassword : new FormControl('',[
        
      ]),
      newPassword : new FormControl('',[
        Validators.pattern("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")
      ])
    })
   }

  ngOnInit(): void {
    this.userList = this.user
    console.log(this.userList)
  }


  changePassword(){
    console.log(this.form.value['idUser'],this.form.value['currentPassword'],this.form.value['newPassword'])
    
    this.service.cambiarContrasena(this.form.value['idUser'],this.form.value['currentPassword'],this.form.value['newPassword']).subscribe(data =>{
      
    },(err : HttpErrorResponse)=>{
      if(err.status == 200){
        this.toastr.success('Contraseña modificada')
      }
      else if(err.status == 400){
        this.toastr.error('Ocurrio un error, intentelo mas tarde.')
      }
      else if(err.status == 500){
        this.toastr.warning('Ocurrio un error, intentelo mas tarde')
      }
    })
  }

}
