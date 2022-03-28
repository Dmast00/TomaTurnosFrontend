import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/Servicios/backend.service';
import { CatTramitesComponent } from '../cat-tramites/cat-tramites.component';
import { Tramites } from '../tramites.model';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {
  @Input() IdTramite : any
  form : FormGroup
  eliminarList : Tramites[] = []

  constructor(private service : BackendService, public fb : FormBuilder, private modalService : NgbModal, private tram : CatTramitesComponent) { 
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
      this.eliminarList = data.filter(x => x.idTramite == this.IdTramite)
    })
  }

  eliminarTramite(id : number){
    this.service.eliminarTramite(id).subscribe(data =>{
      console.log(data)
      this.tram.getTramites();
    })
  }

   // //Metodo para abrir el modal que se encuentra en el HTML
   open(content:any) {
    this.modalService.open(content);
  }

}
