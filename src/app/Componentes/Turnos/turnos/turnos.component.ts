import { Component, ElementRef, OnInit } from '@angular/core';
import { interval, Observable,Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turnosList : any = [];
  private updateSubscription : Subscription;
  
  constructor({nativeElement}: ElementRef<HTMLElement>,private service : BackendService) {
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
      this.turnosList = data
    })
    console.log(this.turnosList)
  }
}
