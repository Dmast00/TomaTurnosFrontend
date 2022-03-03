import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  //Creamos una variable la cual guardara el path del API
  readonly apiPath = 'https://localhost:44352/api/';

  // Injectamos el modulo de HTTPClient para hacer peticiones http al backend
  constructor(private http : HttpClient) { }

  // Creamos un metodo el cual observamos cualquier tipo de dato, y retornamos la peticion http de tipo get a la ruta del backend.
  getTramites():Observable<any[]>{
    return this.http.get<any>(this.apiPath+'Tramites')
  }

  genTurno(id : number):Observable<any>{
    console.log(this.apiPath+'Turnos/GenTurno/'+id)
    return this.http.post(this.apiPath+'Turnos/GenTurno/'+id,id);
  }

  getTurnos():Observable<any[]>{
    return this.http.get<any>(this.apiPath+'Turnos');
  }

}
