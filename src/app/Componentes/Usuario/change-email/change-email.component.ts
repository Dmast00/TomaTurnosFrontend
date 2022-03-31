import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  @Input() user : Usuario[]
  userList : Usuario[] = []
  constructor() { }

  ngOnInit(): void {
    this.userList = this.user
  }

}
