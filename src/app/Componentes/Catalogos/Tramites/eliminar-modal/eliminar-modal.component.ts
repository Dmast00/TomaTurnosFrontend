import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private service : BackendService, public fb : FormBuilder, private modalService : NgbModal, private tram : CatTramitesComponent,private toastr : ToastrService) { 
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
      if(data.status == 200){
        this.toastr.success('Tramite eliminado')
      }
      else if(data.status == 400){
        this.toastr.error('Ocurrio un error, intentelo mas tarde')
      }
      else if(data.status == 500 ){
        this.toastr.info('Ocurrio un error, intentelo mas tarde.')
      }
      this.tram.getTramites();
    })
  }

   // //Metodo para abrir el modal que se encuentra en el HTML
   open(content:any) {
    this.modalService.open(content);
  }

}
