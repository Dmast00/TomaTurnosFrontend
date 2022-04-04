import { Component, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { interval, Observable,Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { Turnos } from '../turnos.model';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  //Turnos Array es para mostrar los turnos con idStatus 1 al lado izquierdo de la pantalla
  Turnos : Turnos[] = [];
  
  //Arrays para facilitar el movimiento de los turnos 
  Proceso : Turnos[] = [];
  turnoAbajo : Turnos[] = [];
  turnoActivo : Turnos[] = [];
  temp : Turnos[] = [];
  private updateSubscription : Subscription;
  
  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService,private turnoService : TurnosService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }


   //se crea una suscripcion a la funcion getTurnos() para que cada intervalo de 
   //1000 milisegundos se actualice el array de turnos
  ngOnInit(): void {
    this.getTurnos()
    this.updateSubscription = interval(1000).subscribe(
      (val) => {this.getTurnos()}
    );
    
  }

  //Se solicita al servidor la lista de turnos creados que contengan el IdStatus 1 que equivale 
  //a turno recien creado, asi mismo, ejecuta la funcion getTurnoStatus() el cual 
  //solicita al servidor la lista de turnos que contienen el status 1
  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      var temp = data.filter(x => x.idStatus == 1)
      this.Turnos = temp
    })
    this.getTurnosStatus()
  }

  //Se solicita al servidor la lista de turnos y la filtramos por los turnos
  //que tengan como idStatus 4 y agregamos solamente los primeros 2 elementos
  //del array y lo guardamos en el array procesos que posteriormente
  //se utiliza para iterar lo turnos.
  getTurnosStatus(){
    this.service.getTurnos().subscribe(data =>{
      this.Proceso = []
      this.Proceso =  data.filter(x => x.idStatus == 4)
    });
    if(this.Proceso.length == 0){
      this.turnoActivo = []
    }
    if(this.Proceso.length == 1){
      this.turnoActivo = this.Proceso
      this.turnoAbajo = []
      this.getTurnosAbajo()
    }
    else if(this.Proceso.length > 1){
      var popped = this.Proceso.slice(-1)[0]
      this.turnoActivo.push(popped)
      
      this.Proceso.pop();
      this.turnoAbajo = this.Proceso
      this.getTurnosAbajo();
    }
  }

  getTurnosAbajo(){
    var slice = this.turnoAbajo.length - 10
    
    this.temp = this.turnoAbajo.slice(slice)
    
    return this.turnoAbajo
  }
}
