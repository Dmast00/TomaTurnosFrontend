import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.userList = this.user
  }


  // changePassword(){
  //   this.service.cambiarContrasena().subscribe(data =>{
      
  //   })
  // }

}
