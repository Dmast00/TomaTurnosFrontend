import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  form : FormGroup;
  userInfo : Usuario[] = []
  isShownProfile = false;
  isShownEmail = false;
  isShownConfirmEmail = false;
  isShownPassword = false;

  
  
  constructor(private service : BackendService,public fb : FormBuilder,private toastr : ToastrService) {
    this.form = new FormGroup({
      currentEmail : new FormControl('',[]),
      newEmail : new FormControl('',[]),
      idUser : new FormControl('',[]),
      currentPassword : new FormControl('',[
        
      ]),
      newPassword : new FormControl('',[
        Validators.pattern("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")
      ])
    })
   }


  userName : any
  ngOnInit(): void {
    this.getPersonalInfo();
  }

  toggleisShown(show : string){
    this.hideisShown();
    if(show == 'profile'){
      this.isShownProfile = true;
    }
    else if(show == 'email'){
      this.isShownEmail = true;
    }
    else if(show == 'confirmEmail'){
      this.isShownConfirmEmail = true;
    }
    else if(show == 'password'){
      this.isShownPassword = true;
    }
    
  }

  hideisShown(){
    this.isShownEmail = false;
    this.isShownConfirmEmail = false;
    this.isShownProfile = false;
    this.isShownPassword = false;
    
  }
  

  getPersonalInfo(){
    this.userName = localStorage.getItem('userName');
    this.service.getUserinfo(this.userName).subscribe(data =>{
      this.userInfo.push(data)
      console.log(this.userInfo)
    })
  }

  changeEmail(){
    this.service.cambiarCorreo(this.form.value['currentEmail'],this.form.value['newEmail']).subscribe(data =>{
      
    })
  }

  async changePassword(){
    console.log(this.form.value['idUser'],this.form.value['currentPassword'],this.form.value['newPassword'])
    
    await this.service.cambiarContrasena(this.form.value['idUser'],this.form.value['currentPassword'],this.form.value['newPassword']).subscribe(data =>{
      
    },(err : HttpErrorResponse)=>{
      console.log('HTTP Error Response')
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
