import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
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
  printed :boolean = false
  datetime :any
  

  constructor({nativeElement}: ElementRef<HTMLImageElement>, private service : BackendService,private toastr : ToastrService) {
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
  genTurno(item : Tramites){
    this.service.genTurno(item.idTramite).subscribe(data =>{
      if(data.status == 200){
        console.log('success 200')
        this.turnosList.push(data.body)
      }
      else if(data.status == 400){
        console.log('intentelo mas tarde. 400')
      }
      else if(data.status == 500){
        console.log('intentelo mas tarde. 500')
      }
    });
    
    this.printed=true
  }

  //Se imprime la patanlla, para decorar el  ticket es necesario utilizar css,
  //para mostrar y ocultar los elementos
  printTurno(){
    
    window.print()
    this.turnosList = [];
    this.ngOnInit();
    this.printed = false
  }
}
