import { Component, OnInit,Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from '../../Cajeros/cajeros.model';

@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css']
})
export class CajerosComponent implements OnInit {

  turnosList : Cajeros[] 
  private updateSubscription : Subscription;
  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.updateSubscription = interval(1500).subscribe(
      (val) => {this.getTurno()}
    )
    
  }


  getTurno(){
    this.service.getTurnos().subscribe(data =>{
      this.turnosList = data.filter(x => x.idTramite == 2)
    })
  console.log(this.turnosList)
  }
}
