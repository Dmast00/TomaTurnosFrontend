import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  submmited = false
  @Input() IdTramite : any
  
  constructor(private service : BackendService, public fb : FormBuilder,private modalService : NgbModal,private tram : CatTramitesComponent,private toastr : ToastrService) {
    this.form = new FormGroup({
      idTramite : new FormControl('',[
        
      ]),
      nombreTramite : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z_ ]*$")
      ]),
      descripcionTramite : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z_ ]*$")
      ]),
      serieTramite : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z_ ]*$")
      ])
    })
   }

  ngOnInit(): void {
    
  }
  get f(){
    return this.form.controls;
  }
  getTramite(){
    this.service.getTramites().subscribe(data => {
      this.tramiteList = data.filter(x => x.idTramite == this.IdTramite)
    })
  }

  editarTramite(id : number){
    this.submmited = true
    if(this.form.invalid){
      this.toastr.error('Valide los datos ingresados')
      return;
    }

    this.service.editarTramite(id, this.form.value).subscribe(data =>{
      if(data.status == 200){
        this.toastr.success('Tramite Modificado')
        this.tram.getTramites();
      }
      else if(data.status == 400){
        this.toastr.error('Ocurrio un error, intentelo mas tarde')
        this.form.reset();
      }
      else if(data.status == 500 ){
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
