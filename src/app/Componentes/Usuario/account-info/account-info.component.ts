import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Servicios/backend.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  userInfo : Usuario[] = []
  isShownProfile = false;
  isShownEmail = false;
  isShownConfirmEmail = false;
  isShownPassword = false;

  
  
  constructor(private service : BackendService) { }


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
    console.log(this.userName)
    this.service.getUserinfo(this.userName).subscribe(data =>{
      console.log('data',data)
      this.userInfo.push(data)
    })
    console.log('lista',this.userInfo)
  }
}
