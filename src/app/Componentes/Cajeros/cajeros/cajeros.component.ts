import { Component, OnInit,Input } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Cajeros } from '../../Cajeros/cajeros.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cajeros',
  templateUrl: './cajeros.component.html',
  styleUrls: ['./cajeros.component.css']
})
export class CajerosComponent implements OnInit {
  
  Tramite: number
  NumCaja : number
  turnosList : Cajeros[]
  tempList : Cajeros[]
  last : any[] = [];
  private updateSubscription : Subscription;
  constructor(private service : BackendService,private modalService : NgbModal) { }

  ngOnInit(): void {
    this.updateSubscription = interval(5500).subscribe(
      (val) => {this.getTurno()}
    )
  }


  getTurno(){
    this.service.getTurnos().subscribe(data =>{
      this.turnosList = data
      // this.turnosList = data.filter(x => x.idTramite == this.Tramite)[0]
      
    })
  }
  getLast(){
    this.last=[]
    var temp = this.turnosList.filter(x => x.idTramite == this.Tramite && x.idStatus == 1)[0]
    this.last.push(temp)
    console.log(this.last)  
  }

  turnoFinalizado(){
    
  }


  open(content:any) {
    this.modalService.open(content);
  }
}
