import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  constructor(private modalService : NgbModal, private service :BackendService,public fb : FormBuilder,private toastr : ToastrService) {
    this.form = new FormGroup({
      idUsuario : new FormControl(),

    })
   }

  ngOnInit(): void {
  }

  restablecer(){
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
