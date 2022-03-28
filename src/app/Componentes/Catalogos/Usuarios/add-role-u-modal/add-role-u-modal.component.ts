import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-add-role-u-modal',
  templateUrl: './add-role-u-modal.component.html',
  styleUrls: ['./add-role-u-modal.component.css']
})
export class AddRoleUModalComponent implements OnInit {
  form : FormGroup
  @Input() IdUsuario : any

  rolesList : any[] = []
  constructor(private modalService : NgbModal, private service : BackendService) { }

  ngOnInit(): void {
  }

  getRoles(){
    this.service.getRoles().subscribe(data =>{
      this.rolesList = data;
    })
  }

  editarRole(){

  }



  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
    }
}
