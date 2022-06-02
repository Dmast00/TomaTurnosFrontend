import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Observable,Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/data-service.service';
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

  private updateSubscription : Subscription;

  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService, private dataService : DataServiceService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
    this.dataService.addingTramite.subscribe(t =>{
      
      console.log(t)
    })
  }
  
  
  ngOnInit(): void {
    this.getTurnos()
    
    
    const connection = new signalr.HubConnectionBuilder()
    .configureLogging(signalr.LogLevel.Information)
    .withUrl(environment.baseUrl+'tt',{
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
      console.log('Turno Activo',this.turnoActivo)
    })
    
  }
  
  getTurnoActivo(){
    console.log('Turno Activo',JSON.stringify(this.Proceso))
    // var popped = this.Proceso.pop();
    // this.turnoActivo.push(popped!);
  }

  getTurnosAbajo(){
    var slice = this.turnoAbajo.length - 10
    
    this.temp = this.turnoAbajo.slice(slice)
    
    return this.turnoAbajo
  }
}
