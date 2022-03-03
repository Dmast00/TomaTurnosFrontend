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

  //Generamos un turno consultando al api y enviando como paramentro el id del tramite que se selecciono
  genTurno(id : number):Observable<any>{
    console.log(this.apiPath+'Turnos/GenTurno/'+id)
    return this.http.post(this.apiPath+'Turnos/GenTurno/'+id,id);
  }

  //solicitamos la lista de turno que se encuentran en la base de datos
  getTurnos():Observable<any[]>{
    return this.http.get<any>(this.apiPath+'Turnos');
  }

  //Registramos al usuario nuevo por medio del api, enviando el form que se lleno. 
  registerUsuario(form : any){
    return this.http.post(this.apiPath+'Account/Register',form)
  }
 
  //Peticion al API para iniciar sesion
  loginUser(form : any){
    return this.http.post(this.apiPath+'Account/Login',form);
  }

}
