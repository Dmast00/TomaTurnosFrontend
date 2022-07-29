import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  
  
  constructor(private service : BackendService,public fb : FormBuilder) {
    this.form = new FormGroup({
      currentEmail : new FormControl('',[]),
      newEmail : new FormControl('',[])
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
    console.log(
      this.form.value['currentEmail'],this.form.value['newEmail']
    )
    this.service.cambiarCorreo(this.form.value['currentEmail'],this.form.value['newEmail']).subscribe(data =>{
      
    })
  }
}
