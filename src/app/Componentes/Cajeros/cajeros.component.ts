import { Component, OnInit,Input, ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
import { interval, isEmpty, Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from './cajeros.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tramites } from '../TramitesComponente/tramites.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as signalr from "@microsoft/signalr";
import { Turnos } from "../Turnos/turnos.model";



@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css'],

})
export class CajerosComponent implements OnInit {
  form : FormGroup;
  submmited = false;
  Tramite: number
  tramite : [] = []
  // NumCaja : number
  turnosList : Cajeros[]
  turnosById : Turnos[] =[]
  TempturnosById : any[] =[]
  last : Turnos[] = [];

  tramitesList : Tramites[] = []
  temp : Tramites[] = []
  selected = []

  data = ''
  tramites = new FormControl('');

  baseURL = 'https://localhost:44352/'
  // baseURL = 'https://192.168.4.207:80/TomaTurnosBack/'

  //Se declara una variable privada de tipo Subscription, la cual permite suscribirse para
  //actualizar la lista de turno en intervalos de tiempo
  private updateSubscription : Subscription;
  constructor(private service : BackendService,
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
    // this.updateSubscription = interval(1500).subscribe(
    //   (val) => {this.getTurno()}
    // )
    this.getTurno();
    this.getTramites();
    const connection = new signalr.HubConnectionBuilder()
    .configureLogging(signalr.LogLevel.Information)
    .withUrl(this.baseURL+'tt',{
      skipNegotiation: true,
      transport: signalr.HttpTransportType.WebSockets
    })
    .build();
    connection.start().then(function (){
      console.log('Signal R connected!');

    }).catch(function(err){
      return console.error(err.toString());
    });
    connection.on("BroadcastMessage",()=>{
      this.getTurno();
      
    })
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
    this.filterTurns();
    this.sortByDate();
    if(this.TempturnosById.length == 0){
      this.toastr.info(`No se encuentran mas turnos en fila del tramite seleccionado`)
    }
    else{
      this.last.push(this.turnosById[0])
      // this.turnoProceso(this.last[0])
      this.turnoLlamado(this.turnosById[0])
    }
    // var temp = this.turnosList.filter(x => x.idTramite == this.Tramite && x.idStatus == 1)[0]
    // if(temp != null){
    //     this.turnoProceso(temp)
    //   }
    //   else{
    //       this.toastr.info(`No se encuentran mas turnos en fila del tramite seleccionado`)
    //   }
    }
    
    filterTurns(){
      this.getTurno();
      var count = 0
      var temp : any[] = []
      var temp2 : any[] = []
      for(let i = 0; i < this.tramite.length; i++){
        temp = this.turnosList.filter(x => x.idTramite == this.tramite[count] && x.idStatus == 1)
        temp2 = temp2.concat(temp)
        count ++
      }
      this.turnosById = []
      this.TempturnosById = []
      for(let j = 0; j < temp2.length; j++){
        this.TempturnosById.push(temp2[j])
      }
      
      return this.turnosById = this.TempturnosById
    }

    sortByDate(){
      this.turnosById.sort((b : Turnos, a : Turnos)=>{
        return +new Date(b.fechaInicial) - +new Date(a.fechaInicial);
      });
    }

  turnoProceso(turno : any){
    this.service.turnoProceso(turno.idTurno,this.form.value['NumCaja']).subscribe(data =>{

    },err =>console.log('HTTP Error',err))
    // this.last.push(turno)

  }
  turnoLlamado(turno : any){
    console.log(turno)
    this.service.turnoLlamado(turno.idTurno,this.form.value['NumCaja']).subscribe(data =>{

    },err =>console.log('HTTP Error',err))
    // this.last.push(turno)

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
      console.log('entro a finalizado')
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

  callTurn(turno : any){
    this.service.callTurn(turno).subscribe(data =>{
      console.log(data)
    })
  }

  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
  }
}
