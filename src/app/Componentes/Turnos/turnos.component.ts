import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Observable,Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from './turnos.model';
import * as signalr from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  providers: []
  
})
export class TurnosComponent implements OnInit{
  //Turnos Array es para mostrar los turnos con idStatus 1 al lado izquierdo de la pantalla
  Turnos : Turnos[] = [];
  
  //Arrays para facilitar el movimiento de los turnos 
  Proceso : Turnos[] = [];
  turnoAbajo : Turnos[] = [];
  turnoActivo : Turnos[] = [];
  temp : Turnos[] = [];

  tempList : any[] =[]
  calling : boolean = true;

  // baseURL : 'https://localhost:44352/'
  baseURL : 'https://192.168.4.207:80/'
  private updateSubscription : Subscription;

  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
  }
  
  
  ngOnInit(): void {
    this.getTurnos()
    
    
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
      this.getTurnos();
      this.getTurnosByStatus();
    })
    connection.on("BroadcastCajero",()=>{
      this.getTurnos();
      
    })
    connection.on("LlamarTurno",()=>{
      this.callTurn();
    })
  }
  

  //Se solicita al servidor la lista de turnos creados que contengan el IdStatus 1 que equivale 
  //a turno recien creado, asi mismo, ejecuta la funcion getTurnoStatus() el cual 
  //solicita al servidor la lista de turnos que contienen el status 1
  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      var temp = data.filter(x => x.idStatus == 1)
      this.Turnos = temp
      console.log('Turnos',this.Turnos)
    })
  }
  
  //Se filtra por el idStatus para obtener los turnos en proceso
  getTurnosByStatus(){
    this.service.getTurnos().subscribe(data =>{
      this.turnoActivo = []
      this.Proceso = data.filter(x => x.idStatus == 4)
      var popped = this.Proceso.pop();
      this.turnoActivo.push(popped!)
      this.playAudio();
    })
    
  }


  
  callTurn(){
    this.calling = true
    if(this.calling == true){
      this.calling = false
    }
    else{
      this.calling = true
    }
    
  }

  
  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/turn.wav";
    audio.load();
    audio.play();
  }
}
