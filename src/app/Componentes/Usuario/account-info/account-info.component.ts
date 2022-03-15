import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Servicios/backend.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  userInfo : any[] = []
  constructor(private service : BackendService) { }


  userName : any
  ngOnInit(): void {
    this.getPersonalInfo();
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
