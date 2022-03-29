import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Componentes/Usuario/usuario.model';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-add-role-u-modal',
  templateUrl: './add-role-u-modal.component.html',
  styleUrls: ['./add-role-u-modal.component.css']
})
export class AddRoleUModalComponent implements OnInit {
  form : FormGroup
  @Input() IdUsuario : any

  rolSel : number
  rolesList : any[] = []
  usuarioList : Usuario[] =[]
  constructor(private modalService : NgbModal, private service : BackendService, public fb:FormBuilder,private toastr :ToastrService) {
    this.form = new FormGroup({
      id : new FormControl(),
      userName : new FormControl(),
      email : new FormControl()
    })
   }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.service.getRoles().subscribe(data =>{
      this.rolesList = data;
      
    })
  }

  getUsuario(){
    this.usuarioList = []
    this.service.getUsuario(this.IdUsuario).subscribe(data => { 
      this.usuarioList.push(data)
    })
  }

  editarRole(){
    console.log(this.IdUsuario,this.rolSel)
    this.service.editarRol(this.IdUsuario, this.rolSel).subscribe(data =>{
      if(data.status == 200){
        this.toastr.success('Se modifico el usuario exitosamente')
      }
      else if(data.status == 400){
        this.toastr.error('Ocurrio un error, intentelo mas tarde.')
      }
      else if(data.status == 500){
        this.toastr.info('Ocurrio un error, intentelo mas tarde.')
      }
    })
  }



  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
    }
}
