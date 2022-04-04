import { Component, OnInit,Input, ComponentFactoryResolver } from '@angular/core';
import { interval, isEmpty, Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from '../../Cajeros/cajeros.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { Tramites } from '../../TramitesComponente/tramites.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css']
})
export class CajerosComponent implements OnInit {
  //Se declara la variable tramite la cual se comunica con el input de HTML el cual
  //asigna un tramite al cajero.
  Tramite: number
  
  //Se declara una variable la cual se comunica con el input de HTML el cual asigna
  //un numero de caja al cajero, esto para despues comunicarlo con la pantalla 
  //y el contribuyente sepa a cual caja acercarse
  NumCaja : number

  //Se declara una lista de tipo Cajeros Array, este modelo fue creado previamente para
  //mantener las buenas practicas del codigo
  turnosList : Cajeros[]

  //Se declara un array de tipo any, el cual funciona como array temporal para asignarle el
  //ultimo turno de acuerdo al tramite del cajero
  last : any[] = [];

  tramitesList : Tramites[] = []

  //Se declara una variable privada de tipo Subscription, la cual permite suscribirse para
  //actualizar la lista de turno en intervalos de tiempo
  private updateSubscription : Subscription;
  constructor(private service : BackendService,private turnoService : TurnosService,
    private modalService : NgbModal,private toastr : ToastrService ) { }

  ngOnInit(): void {
    //Inicializamos la variable susbscription para actualizar la lista de turnos 
    //en intervalos de 5 segundos
    this.updateSubscription = interval(1500).subscribe(
      (val) => {this.getTurno()}
    )
    this.getTramites()
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
    this.last=[]
    var temp = this.turnosList.filter(x => x.idTramite == this.Tramite && x.idStatus == 1)[0]
    if(temp != null){
      this.service.turnoProceso(temp.idTurno,this.NumCaja).subscribe(data =>{
        
      },err =>console.log('HTTP Error',err))
      this.last.push(temp)
    }
    else{
      console.log('es nullo')
      this.toastr.info(`No se encuentran mas turnos en fila del tramite seleccionado`)
    }
    
    
    
  }

  //Creamos una funcion la cual al presionar el boton de vencido el estatus del turno torna
  //a vencido y se asigna otro turno a ventanilla llamando a la funcion getLast()
  turnoVencido(id : number){
    console.log(id)
    this.service.turnoVencido(id).subscribe(data =>{
      this.getLast();
    })
    this.toastr.info('Se asigno como turno vencido')
    
  }


  //Creamos un metodo el cual, llama al siguiente turno en cola, y llamamos al servicio
  //de backend para asignarle el status de finalizado al turno, asi mismo se llama
  //a la funcion getLast() la cual permite recuperar el ultimo turno asignado al array
  turnoFinalizado(id :number){
    this.service.turnoFinalizado(id).subscribe(data =>{
      this.getLast();
    });
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
