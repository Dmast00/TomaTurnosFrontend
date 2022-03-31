import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() user : Usuario []
  userList : Usuario[] =[]
  constructor() { }

  ngOnInit(): void {
    this.userList = this.user
  }

}
