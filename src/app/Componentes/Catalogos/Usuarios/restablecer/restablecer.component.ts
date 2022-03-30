import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {
  form : FormGroup
  pswd : any
  IdUsuario : any
  submmited = false
  constructor(private modalService : NgbModal, private service :BackendService,public fb : FormBuilder,private toastr : ToastrService) {
    this.form = new FormGroup({
      idUsuario : new FormControl(),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")
      ])
    })
   }

  ngOnInit(): void {
  }
  get f(){
    return this.form.controls;
  }

  restablecer(){
    this.submmited = true
    if(this.form.invalid){
      this.toastr.error('Ingrese una contraseña valida');
      return;
    }
    this.service.restablecerContrasena(this.IdUsuario,this.pswd).subscribe(data =>{
      // if(data.status == 200){
      //   this.toastr.success('Contrseña restablecida correctamente')
      // }
      // else if(data.status == 400){
      //   this.toastr.error('Ocurrio un error, intentelo mas tarde.')
      // }
      // else if(data.status == 500 ){
      //   this.toastr.info('Ocurrio un error, intentelo mas tarde.')
      // }
      console.log(data);
    })
  }

  open(content:any) {
    this.modalService.open(content);
  }
}
