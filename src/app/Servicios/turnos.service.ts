import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Turnos } from '../Componentes/Turnos/turnos.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnoList : Turnos[] = []
  constructor() { }


  saveTurnoData(turno : Turnos):Observable<Turnos[]>{
    this.turnoList =  JSON.parse(JSON.stringify((turno)))
    return of(this.turnoList);
  }

  getTurnoData():Observable<Turnos[]>{
    return of(this.turnoList)
  }
}
