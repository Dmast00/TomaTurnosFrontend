import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService : NgbModal,private service : BackendService,public fb : FormBuilder,private user : UsuariosComponent) {
    this.form = new FormGroup({
      id : new FormControl(),
      userName : new FormControl(),
      email : new FormControl()
    })
   }

  ngOnInit(): void {
  }

  getUsuario(){
    this.service.getUsuario(this.IdUsuario).subscribe(data => {
      this.usuarioList.push(data)
      console.log(this.usuarioList)
    })
  }

  eliminarUsuario(id : string){
    this.service.eliminarUsuario(id).subscribe(data =>{
      
      this.user.getUsuarios();
    })
  }
  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
  this.modalService.open(content);
  }
}
