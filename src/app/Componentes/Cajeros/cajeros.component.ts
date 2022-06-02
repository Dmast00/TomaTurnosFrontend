import { Component, OnInit,Input, ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
import { interval, isEmpty, Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from './cajeros.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tramites } from '../TramitesComponente/tramites.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';



@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css'],
  
})
export class CajerosComponent implements OnInit {
  form : FormGroup;
  submmited = false;
  Tramite: number
  // NumCaja : number
  turnosList : Cajeros[]
  last : any[] = [];

  tramitesList : Tramites[] = []
  temp : Tramites[] = []
  selected = []
  
  data = ''
  

  //Se declara una variable privada de tipo Subscription, la cual permite suscribirse para
  //actualizar la lista de turno en intervalos de tiempo
  private updateSubscription : Subscription;
  constructor(private service : BackendService,private dataService : DataServiceService,
    private modalService : NgbModal,private toastr : ToastrService, public fb : FormBuilder ) {
      this.form = this.fb.group({
        NumCaja : new FormControl('',[
          Validators.required,
          Validators.pattern("^[0-9]{2}$")
        ])
      })
      
    }

  
  ngOnInit(): void {
    //Inicializamos la variable susbscription para actualizar la lista de turnos 
    //en intervalos de 5 segundos
    this.updateSubscription = interval(1500).subscribe(
      (val) => {this.getTurno()}
    )
    this.getTramites()
   
  }

  get f(){
    return this.form.controls
  }

  //Creamos un metodo el cual llama al servicio de backend pidiendo los turnos que se 
  //encuentran en la base de datos, estos turnos los guardamos en un array de tipo Cajeros
  getTurno(){
    this.service.getTurnos().subscribe(data =>{
      this.turnosList = data 
    })
    
  }

  //Creamos un metodo el cual tomara el ultimo turno de acuerdo al tramite del cajero y
  //el status del turno y lo guardamos en una variable temporal para despues pushearla 
  //al array last
  getLast(){
    this.submmited = true;
    if(this.form.invalid){
      return;
    }
    this.last=[]
    var temp = this.turnosList.filter(x => x.idTramite == this.Tramite && x.idStatus == 1)[0]
    if(temp != null){
      this.turnoProceso(temp) 
    }
    else{
      this.toastr.info(`No se encuentran mas turnos en fila del tramite seleccionado`)
    }
  }


  turnoProceso(turno : any){
    this.service.turnoProceso(turno.idTurno,this.form.value['NumCaja']).subscribe(data =>{
        
    },err =>console.log('HTTP Error',err))
    this.last.push(turno)
    
  }
  

  
  //Creamos una funcion la cual al presionar el boton de vencido el estatus del turno torna
  //a vencido y se asigna otro turno a ventanilla llamando a la funcion getLast()
  turnoVencido(id : number){
    this.service.turnoVencido(id).subscribe(data =>{
    })
    this.getLast();
    this.toastr.info('Se asigno como turno vencido')
    
  }


  //Creamos un metodo el cual, llama al siguiente turno en cola, y llamamos al servicio
  //de backend para asignarle el status de finalizado al turno, asi mismo se llama
  //a la funcion getLast() la cual permite recuperar el ultimo turno asignado al array
  turnoFinalizado(id :number){
    this.service.turnoFinalizado(id).subscribe(data =>{
    });
    this.getLast();
    this.toastr.success('Se finalizo el turno')
  }

  turnoDetenido(id:number){
    this.service.turnoFinalizado(id).subscribe(data =>{
      this.last = []
    });
    this.toastr.info('Se detuvo la asignacion de turnos')
  }
  
  getTramites(){
    
    this.service.getTramites().subscribe(data =>{
      this.tramitesList = data
    })
  }
  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
  }
}
