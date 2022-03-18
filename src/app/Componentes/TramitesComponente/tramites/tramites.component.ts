import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from '../../Turnos/turnos.model';
import { Tramites } from '../tramites.model';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {
  
  //Se generar las listas de tipo array bajo los modelos de cada elemento. 
  //Se generaron respectivamnte modelos de cada clase para mejorar las buenas practicas.
  tramiteList : Tramites[] =[];
  turnosList : Turnos[] = [];

  datetime :any
  

  constructor({nativeElement}: ElementRef<HTMLImageElement>, private service : BackendService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }

  ngOnInit(): void {
    this.getTramites();
    this.getCurrentDate();
  }

  getCurrentDate(){
    this.datetime = new Date()
  }
  //Creamos un metodo para realizar una peticion al servicio para listar los tramites.
  getTramites(){
    this.service.getTramites().subscribe(data =>{
      this.tramiteList = JSON.parse(JSON.stringify(data))
    });
  }

  //Se envia al API el id del tramite seleccionado, para que de este modo se genere,
  //un turno con la serie del tramite
  genTurno(id : Tramites){
    this.service.genTurno(id.idTramite).subscribe(data =>{
      console.log(this.datetime)
      this.turnosList.push(data)
    });
    console.log(this.turnosList)
  }

  //Se imprime la patanlla, para decorar el  ticket es necesario utilizar css,
  //para mostrar y ocultar los elementos
  printTurno(){
    window.print()
    this.turnosList = [];
    this.ngOnInit();
  }
}
