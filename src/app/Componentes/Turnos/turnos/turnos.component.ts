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

  
  Proceso : Turnos[] = [];
  turnoAbajo : Turnos[] = [];
  turnoActivo : Turnos[] = [];
  private updateSubscription : Subscription;
  
  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService,private turnoService : TurnosService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }


   //se crea una suscripcion a la funcion getTurnos() para que cada intervalo de 
   //3000 milisegundos se actualice el array de turnos
  ngOnInit(): void {
    this.getTurnos()
    this.updateSubscription = interval(3000).subscribe(
      (val) => {this.getTurnos()}
    );
    
  }

  //Se solicita al servidor la lista de turnos creados que contengan el IdStatus 1 que equivale 
  //a turno recien creado, asi mismo, ejecuta la funcion getTurnoStatus() el cual 
  //solicita al servidor la lista de turnos que contienen el status 4
  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      var temp = data.filter(x => x.idStatus == 1)
      this.Turnos = temp
    })
    this.getTurnosStatus()
  }

  //-------------------> Aqui hay un error <-------------------
  //-       Hay que cambiar como almacenamos los turnos       -
  //-       que tienen el IdStatus 4, debido a que            -
  //-       estamos asignando a turnosList y despues          -
  //-       Se los asignamos a una variable temporal          -
  //-       Lo correct seria asignarlo directamente           -
  //-       a la variable temporal                            -
  //---------------------------><------------------------------
  //Se solicita al servidor la lista de turnos y la filtramos por los turnos
  //que tengan como idStatus 4 y agregamos solamente los primeros 2 elementos
  //del array y lo guardamos en el array procesos que posteriormente
  //se utiliza para iterar lo turnos.
  getTurnosStatus(){
    this.service.getTurnos().subscribe(data =>{
      this.Proceso = []
      this.Proceso =  data.filter(x => x.idStatus == 4)
    })
    if(this.Proceso.length > 1){
      this.turnoActivo = []

      var popped = this.Proceso.pop()

      this.turnoAbajo = this.Proceso
      
      if(this.turnoAbajo.length > 12){
        console.log('cuenta de turnos abajo'+this.turnoAbajo.length)
       var shiffted = this.turnoAbajo.shift()
        
      }
      this.turnoActivo.push(popped!)
      
    }
    else{
      console.log('esperando turno extra')
    }
    
    
    return this.Proceso,this.turnoAbajo
  }
}
