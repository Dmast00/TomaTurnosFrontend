import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  form : FormGroup
  @Input() user : Usuario[]
  userList : Usuario[] = []
 
  constructor(public fb : FormBuilder,private service : BackendService) {
    this.form = new FormGroup({
      currentEmail : new FormControl(this.userList['email'],[]),
      newEmail : new FormControl('',[
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])
    })
   }

  ngOnInit(): void {
    this.userList = this.user
  }
  get f(){
    return this.form.controls;
  }
  changeEmail(){
    
    this.service.cambiarCorreo(this.form.value['currentEmail'],this.form.value['newEmail']).subscribe(data =>{
      
    })
  }
}
