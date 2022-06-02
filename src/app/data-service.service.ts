import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  SharingData = new BehaviorSubject('next2');
  newTurno = new BehaviorSubject('turno');
  addingTramite = new Subject<any>();


  constructor() {
    
   }
  
   

  changeDataSubject(data : any){
    this.SharingData.next(data);
  }

  newTurnoSubject(data : any){
    this.newTurno.next(data);
  }

  newTurnSubject(data : any){
    this.addingTramite.next(data);
  }

}
