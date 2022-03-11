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

  turnosList : Turnos[] = [];
  Turnos : Turnos[] = [];
  Proceso : Turnos[] = [];
  private updateSubscription : Subscription;
  
  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService,private turnoService : TurnosService) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }



  ngOnInit(): void {
    this.getTurnos()
    this.updateSubscription = interval(3000).subscribe(
      (val) => {this.getTurnos()}
    );
  }

  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      var temp = data.filter(x => x.idStatus == 1)
      this.Turnos = temp
    })
    this.getTurnosStatus()
  }

  getTurnosStatus(){
    this.service.getTurnos().subscribe(data =>{
      this.Proceso = []
      var temp = this.turnosList = data.filter(x => x.idStatus == 4).slice(0,2)
      this.Proceso = temp
    })
    
    console.log(this.Proceso)
  }
}
