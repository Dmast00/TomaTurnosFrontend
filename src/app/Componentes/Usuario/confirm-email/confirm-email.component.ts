import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  @Input() user : Usuario[]
  userList : Usuario[] = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
    this.userList = this.user
  }

}
