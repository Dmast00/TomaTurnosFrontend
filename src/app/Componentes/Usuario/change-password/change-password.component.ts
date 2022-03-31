import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() user : Usuario[]
  userList : Usuario[] = []
  constructor() { }

  ngOnInit(): void {
    this.userList = this.user
  }

}
