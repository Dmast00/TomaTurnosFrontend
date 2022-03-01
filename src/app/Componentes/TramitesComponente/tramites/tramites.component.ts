import { Component, ElementRef, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {
  //Creamos una lista de tipo array en donde guardaremos los tramites solicitados desde el service
  tramiteList : any = [];
  turnosList : any = [];
  constructor({nativeElement}: ElementRef<HTMLImageElement>, private service : BackendService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }

  ngOnInit(): void {
    this.getTramites();
  }
  //Creamos un metodo para realizar una peticion al servicio para listar los tramites.
  getTramites(){
    this.service.getTramites().subscribe(data =>{
      this.tramiteList = JSON.parse(JSON.stringify(data))
    });
  }

  genTurno(id : number){
    this.service.genTurno(id).subscribe(data =>{
      this.turnosList.push(data)
    });
  }
  
  printTurno(){
    window.print()
    this.turnosList = [];
    this.ngOnInit();
  }
}
