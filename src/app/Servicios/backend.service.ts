import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // Injectamos el modulo de HTTPClient para hacer peticiones http al backend
  constructor(private http : HttpClient) { }

  // Creamos un metodo el cual observamos cualquier tipo de dato, y retornamos la peticion http de tipo get a la ruta del backend.
  getTramites():Observable<any[]>{
    return this.http.get<any>('')
  }
}
