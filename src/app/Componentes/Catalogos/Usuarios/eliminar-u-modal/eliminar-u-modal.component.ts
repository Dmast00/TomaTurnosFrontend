import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Componentes/Usuario/usuario.model';
import { BackendService } from 'src/app/Servicios/backend.service';
import { CatTramitesComponent } from '../../Tramites/cat-tramites/cat-tramites.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-eliminar-u-modal',
  templateUrl: './eliminar-u-modal.component.html',
  styleUrls: ['./eliminar-u-modal.component.css']
})
export class EliminarUModalComponent implements OnInit {
  form :  FormGroup
  @Input() IdUsuario : any
  usuarioList : Usuario[] = []

  constructor(private modalService : NgbModal,private service : BackendService,public fb : FormBuilder,private user : UsuariosComponent,
    private toastr : ToastrService) {
    this.form = new FormGroup({
      id : new FormControl(),
      userName : new FormControl(),
      email : new FormControl()
    })
   }

  ngOnInit(): void {
  }

  getUsuario(){
    this.usuarioList = []
    this.service.getUsuario(this.IdUsuario).subscribe(data => {
      this.usuarioList.push(data)
      
    })
  }

  eliminarUsuario(id : string){
    this.service.eliminarUsuario(id).subscribe((data)=>{
        console.log(data);
        if(data.status == 200){
          this.toastr.success('Usuario Eliminado.')
          this.user.getUsuarios();
        }
        else if(data.status == 400){
          this.toastr.error('Ocurrio un error, intentelo mas tarde.')
          this.form.reset();
        }
        else if(data.status == 500){
          this.toastr.info('Ocurrio un error, intentelo mas tarde.')
          this.form.reset();
        }
    })
  }

  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
  this.modalService.open(content);
  }
}
