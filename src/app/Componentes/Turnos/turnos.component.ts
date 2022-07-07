import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { async, interval, Observable,Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from './turnos.model';
import * as signalr from "@microsoft/signalr";
import Speech from "speak-tts";






@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  
})
export class TurnosComponent implements OnInit{
  //Turnos Array es para mostrar los turnos con idStatus 1 al lado izquierdo de la pantalla
  Turnos : Turnos[] = [];
  
  //Arrays para facilitar el movimiento de los turnos 
  Proceso : Turnos[] = [];
  turnoAbajo : Turnos[] = [];
  turnoActivo : Turnos[] = [];
  turnoLlamado : Turnos[] = [];
  temp : Turnos[] = [];

  tempList : any[] =[]
  calling : boolean = true;
  callturn : any
  turnosporLlamar : any [] = [] 
  
  baseURL = 'https://localhost:44352/'
  // baseURL = 'https://192.168.4.207:80/TomaTurnosBack/'
  private updateSubscription : Subscription;
  
  speech :any
  flag : boolean = true

  
 
  
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
      this.getTurnosByStatus();
      this.getTurnos();
    })
    connection.on("BroadcastCajero",()=>{
      this.getTurnos();
      this.UpdateturnoLlamado();
    })
    connection.on("LlamarTurno",(data)=>{
      // this.callTurn(data);
    })
    connection.on("TurnoLlamado",()=>{
      console.log('Signal R Turno Llamado')
      this.TTSCallTurn();
    })
    if(this.speech.hasBrowserSupport()){
      console.log('Browser supported')
      this.speech.init({
        'lang': 'es-MX',
        'rate': 1,
		    'pitch': 1,
        'splitSentences': true,
        'volume': 1,
        'listeners': {
          'onvoicechanged': (voices) =>{
            console.log('EventChanged',voices)
          }
        }
      }).then((data)=>{
        console.log('Available voices ',data)
      }).catch((err) =>{
        console.error('An error occured ',err)
      })
    }else{
      console.log('Browser not supported.')
    }
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
      this.turnoLlamado = data.filter(x => x.idStatus == 5)
      var popped = this.Proceso.pop();
      this.turnoActivo.push(popped!)
      
      if(popped == undefined){
        console.log('Vacio')
      }
      else{

      }
    })
  }


  UpdateturnoLlamado(){
    this.service.getTurnos().subscribe(data =>{
      this.turnoLlamado = data.filter(x => x.idStatus == 5)
    })
  }

  async TTSCallTurn (){
    await this.service.getLlamados().subscribe(data =>{
      this.turnosporLlamar = data.filter(x => x.llamado == 0)
      console.log('Turnos por llamar ',this.turnosporLlamar)
      this.CallingTTS();
    })
  }

  async CallingTTS(){
    if(this.flag){
      this.flag = false
      for(let i = 0; i < this.turnosporLlamar.length; i++){
          if(this.turnosporLlamar[i].llamado == 1){
            break;
          }
          else{
            var turno = this.turnosporLlamar[i]
            this.playAudio();
            await this.speech.speak({
              text : 'Turno: '+ turno.turno + ' Caja: ' + turno.caja,
              queue : true,
              listeners: {
                onstart:() =>{
                  console.log('Start Utterance')
                },
                onend: () =>{
                  console.log('End Utterance')
                },
                onresume: () =>{
                  console.log('Resume Utterance')
                },
                onBoundary: (event) =>{
                  console.log(event.name +'boundary reached after ' +event.elapsedTime + 'milliseconds.')
                }
              }
            }).then(
            await this.service.UpdateLlamado(turno.idLlamado).subscribe(data =>{
              
            }),
            console.log('Success'),
            ).catch(e =>{
              console.error('An error occurred: ',e)
            })
          }
        }
        this.flag = true
      }
      else{
        this.delay(2000)
        this.TTSCallTurn();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/turn.wav";
    audio.load();
    audio.play();
  }
}
