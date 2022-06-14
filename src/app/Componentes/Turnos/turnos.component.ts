import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Observable,Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from './turnos.model';
import * as signalr from "@microsoft/signalr";
import Speech from "speak-tts";






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
  callturn : any
  
  baseURL = 'https://localhost:44352/'
  // baseURL = 'https://192.168.4.207:80/TomaTurnosBack/'
  private updateSubscription : Subscription;
  
  speech :any
  turno : string
  
  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService) {
    
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
    this.speech = new Speech() // will throw an exception if not browser supported
    
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
    connection.on("LlamarTurno",(data)=>{
      this.callTurn(data);
    })
  }
  

  //Se solicita al servidor la lista de turnos creados que contengan el IdStatus 1 que equivale 
  //a turno recien creado, asi mismo, ejecuta la funcion getTurnoStatus() el cual 
  //solicita al servidor la lista de turnos que contienen el status 1
  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      var temp = data.filter(x => x.idStatus == 1)
      this.Turnos = temp
    })
  }
  
  //Se filtra por el idStatus para obtener los turnos en proceso
  getTurnosByStatus(){
    this.service.getTurnos().subscribe(data =>{
      this.turnoActivo = []
      this.Proceso = data.filter(x => x.idStatus == 5)
      var popped = this.Proceso.pop();
      this.turnoActivo.push(popped!)
      this.playAudio();
      this.speech.setLanguage('es-MX');
      
      if(popped == undefined){
        this.speech.speak({
          Text:'prueba'
        })
        console.log('Vacio')
      }
      else{
        this.TTSCallTurn(popped);
      }
    })
  }

  TTSCallTurn(popped : any){

    this.speech.speak({
      
      text :'Turno: '+popped?.turno+',Caja: '+popped?.caja
    }).then(()=>{
      console.log('Success')
    }).catch(e =>{
      console.error("Error",e)
    })
  }


  callTurn(turn : any){
    console.log(turn)
    this.speech.setLanguage('es-MX');
    this.speech.speak({
      text :'Turno: '+ turn
    }).then(()=>{
      console.log('Success')
    }).catch(e =>{
      console.log('error?')
      console.error("Error",e)
    })
  }

  
  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/turn.wav";
    audio.load();
    audio.play();
  }
}
