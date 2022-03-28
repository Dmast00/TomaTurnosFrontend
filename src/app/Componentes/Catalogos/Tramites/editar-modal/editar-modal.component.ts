import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/Servicios/backend.service';
import { CatTramitesComponent } from '../cat-tramites/cat-tramites.component';
import { Tramites } from '../tramites.model';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent implements OnInit {

  form : FormGroup
  tramiteList : Tramites[] = []
  @Input() IdTramite : any
  
  constructor(private service : BackendService, public fb : FormBuilder,private modalService : NgbModal,private tram : CatTramitesComponent) {
    this.form = new FormGroup({
      idTramite : new FormControl(),
      nombreTramite : new FormControl(),
      descripcionTramite : new FormControl(),
      serieTramite : new FormControl()
    })
   }

  ngOnInit(): void {
    
  }

  getTramite(){
    this.service.getTramites().subscribe(data => {
      this.tramiteList = data.filter(x => x.idTramite == this.IdTramite)
    })
  }
  editarTramite(id : number){
    this.service.editarTramite(id, this.form.value).subscribe(data =>{
      console.log(data)
      this.tram.getTramites();
    })
  }


  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
  }
}
