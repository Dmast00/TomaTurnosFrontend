import { Component, OnInit,Input, ComponentFactoryResolver, Inject, forwardRef, OnDestroy } from '@angular/core';
import { interval, isEmpty, Observable, Subscription, timeout } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from './cajeros.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tramites } from '../TramitesComponente/tramites.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as signalr from "@microsoft/signalr";
import { Turnos } from "../Turnos/turnos.model";
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ListaTurnosComponent } from '../Catalogos/lista-turnos/lista-turnos.component';
import { TurnoListComponent } from './turno-list/turno-list.component';




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
  status = ''
  lengthList : any = 0

  saveTurno : any = []
  saveCaja : any = ''

  baseURL = 'https://localhost:44352/'
  // baseURL = 'https://192.168.4.207:80/TomaTurnosBack/'

  constructor(private service : BackendService,
    private modalService : NgbModal,private toastr : ToastrService, public fb : FormBuilder,private _bottomSheet : MatBottomSheet ) {
      this.form = this.fb.group({
        NumCaja : new FormControl('',[
          Validators.required,
          Validators.pattern("^[0-9]{2}$")
        ])
      })
    }

  ngOnInit(): void {
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
    
    connection.on("BroadCastMessage",()=>{
      this.getTurno();
      this.countTurnos();
    })
    connection.on("CountTurnos",()=>{
      
    })
    this.saveTurno = JSON.parse(localStorage.getItem('lastTurno') || '[]')
    if(this.saveTurno.idStatus == 4 || 5){
      if(this.saveTurno.length != 0){
        this.toastr.info('Turno Guardado','Turno info',{
          progressBar:true,
          progressAnimation:'increasing',
        })
        console.log('Entro al NgOnInit',this.saveTurno)
        this.last.push(this.saveTurno)
        console.log('last',this.last)
      }
    }
  }

  openBottomSheet(){
    this.filterTurns();
    this._bottomSheet.open(TurnoListComponent,{
      data:this.turnosById
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
    this.lengthList = 0
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
     
      this.llamandoVariable();

      localStorage.setItem('lastTurno',JSON.stringify({
        'idTurno' : this.turnosById[0]['idTurno'],
        'turno' : this.turnosById[0]['turno'],
        'caja' : this.form.value['NumCaja'],
        'idstatus' : this.turnosById[0]['idStatus'],
        'idtramite' : this.turnosById[0]['idTramite'],
        'fechainicial' : this.turnosById[0]['fechaInicial'],
        'fechafinal' : this.turnosById[0]['fechaFinal'],
      }))
      localStorage.setItem('caja',this.form.value['NumCaja'])
    }
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

  countTurnos(){
    this.service.getTurnos().subscribe(data =>{
      this.turnosList = data
      var temp : any[] = []
      var temp2 : any[] = []
      var count = 0
      this.getTurno();
      for(let i =0; i < this.tramite.length; i++){
        temp = this.turnosList.filter(x => x.idTramite == this.tramite[count] && x.idStatus == 1)
        temp2 = temp2.concat(temp)
        
        count++
      }
      this.lengthList = temp2.length
    })
    
  }

  turnoProceso(turno : any){
    this.service.turnoProceso(turno,this.saveCaja).subscribe(data =>{
    },err =>console.log('HTTP Error',err))
    // this.last.push(turno)
  }
  
  turnoLlamado(turno : any){
    this.service.turnoLlamado(turno.idTurno,this.form.value['NumCaja']).subscribe(data =>{
    },err =>console.log('HTTP Error',err))
    // this.last.push(turno)
    this.service.LlamarTurno(this.turnosById[0],this.form.value['NumCaja']).subscribe(data =>{
      
    })

  }

  turnoEnAtencion(turno : any){
    this.saveCaja = localStorage.getItem('caja')
    if(this.form.value['NumCaja'] == ''){
      console.log('Caja Undefined')
      this.service.turnoAtencion(turno,this.saveCaja).subscribe(data =>{
        this.atendiendoVariable();
      })  
    }
    else{
      this.service.turnoAtencion(turno,this.form.value['NumCaja']).subscribe(data =>{
        this.atendiendoVariable();
      })
    }
  }

  //Creamos una funcion la cual al presionar el boton de vencido el estatus del turno torna
  //a vencido y se asigna otro turno a ventanilla llamando a la funcion getLast()
  turnoVencido(id : number){
    this.service.turnoVencido(id).subscribe(data =>{
      
      localStorage.removeItem('lastTurno');
      localStorage.removeItem('caja')
      this.last = []
    })
    this.getLast();
    this.toastr.info('Se asigno como turno vencido','Turno info',{
      progressBar:true,
      progressAnimation:'increasing',
    })
  }


  //Creamos un metodo el cual, llama al siguiente turno en cola, y llamamos al servicio
  //de backend para asignarle el status de finalizado al turno, asi mismo se llama
  //a la funcion getLast() la cual permite recuperar el ultimo turno asignado al array
  turnoFinalizado(id :number){
    if(this.status == 'Llamando'){
      console.log('Esta atendiendo')
      this.toastr.info('No se puede finalizar un turno que aun no se atiende.','Turno Info',{
        progressBar:true,
        progressAnimation:'increasing', 
      })
    }
    else{
      this.service.turnoFinalizado(id).subscribe(data =>{
        console.log('entro a finalizado')
        localStorage.removeItem('lastTurno');
        localStorage.removeItem('caja')
        this.last = []
      });
      this.getLast();
      this.toastr.success('Se finalizo el turno.','Turno Finalizado',{
        progressBar:true,
        progressAnimation:'increasing',
      })
    }
  }

  turnoDetenido(id:number){
    if(this.status == 'Llamando'){
      this.service.turnoVencido(id).subscribe(data =>{
        localStorage.removeItem('lastTurno');
        localStorage.removeItem('caja')
        this.last = []
      })
      this.last = []
      this.toastr.info('Se detuvo la asignacion de turnos','Asignacion de turnos',{
        progressBar:true,
        progressAnimation:'increasing',
      })
    }
    else{
      this.service.turnoFinalizado(id).subscribe(data =>{
        this.last = []
      });
      this.toastr.info('Se detuvo la asignacion de turnos','Asignacion de turnos',{
        progressBar:true,
        progressAnimation:'increasing',
      })
    }
  }

  getTramites(){

    this.service.getTramites().subscribe(data =>{
      this.tramitesList = data
    })
  }

  // callTurn(turno : any){
  //   this.service.callTurn(turno,this.form.value['NumCaja']).subscribe(data =>{
      
  //   })
  // }

  llamandoVariable(){
    this.status = 'Llamando'
  }
  atendiendoVariable(){
    this.status = 'Atendiendo'
  }

  // //Metodo para abrir el modal que se encuentra en el HTML
  open(content:any) {
    this.modalService.open(content);
  }
}
