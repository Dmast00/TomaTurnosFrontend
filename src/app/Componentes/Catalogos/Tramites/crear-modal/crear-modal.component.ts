import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';
import { CatTramitesComponent } from '../cat-tramites/cat-tramites.component';
import { Tramites } from '../tramites.model';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.css']
})
export class CrearModalComponent implements OnInit {
  form : FormGroup;
  submmited = false;
  tramite : any

  constructor(private modalService : NgbModal,public fb : FormBuilder,private service:BackendService,private router : Router,
    private toastr : ToastrService,private tram : CatTramitesComponent) {
    this.form = new FormGroup({
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

  submitForm(){
    this.submmited = true;
    if(this.form.invalid){
      return;
    }

    this.service.createTramite(this.form.value).subscribe(data =>{
      if(data.status == 200){
        this.toastr.success('Tramite Creado')
        this.tram.getTramites();
      }
      else if(data.status == 400){
        console.log('Entro?',data);
        this.toastr.error('Se produjo un error, vuelve a intentarlo mas tarde.')
        this.form.reset();
      }
      else if(data.status == 500 ){
        this.toastr.info('Se produjo un error, vuelve a intentarlo mas tarde.')
        this.form.reset();
      }
      else if(data.status == 600){
        this.toastr.info('El tramite ya existe')
        this.form.reset();
      }
    })
  }

  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
  }
}
