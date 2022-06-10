import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  //Creamos una variable la cual guardara el path del API
  readonly apiPath = 'https://localhost:44352/api/';
  // readonly apiPath = 'https://192.168.4.207:80/TomaTurnosBack/api/';

  headers = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Injectamos el modulo de HTTPClient para hacer peticiones http al backend
  constructor(private http : HttpClient) { }

  //*******************************************GET METHODS************************************************ */

  // Creamos un metodo el cual observamos cualquier tipo de dato, y retornamos la peticion http de tipo get a la ruta del backend.
  getTramites():Observable<any[]>{
    return this.http.get<any>(this.apiPath+'Tramites')
  }

  //solicitamos la lista de turno que se encuentran en la base de datos
  getTurnos():Observable<any[]>{
    return this.http.get<any>(this.apiPath+'Turnos');
  }

  //Solicitamos al Web API el security Stamp del usuario para crear una variable de sesion
  //y poder mantener el inicio de sesion del usuario a lo largo de la navegacion por la pagina
  getStamp(email : any):Observable<any>{
    return this.http.post(this.apiPath+'Account/GetUser/'+email,email);
  }

  getUserinfo(username : any): Observable<any>{
    return this.http.get<any>(`${this.apiPath}Account/${username}`)
  }

  getUserRole(UserId : any):Observable<any>{
    return this.http.get<any>(this.apiPath+'Role/getUserRole/'+UserId,UserId)
  }

  getUsuarios():Observable<any>{
    return this.http.get<any>(this.apiPath+'Account/GetUsuarios');
  }

  getUsuario(id : any):Observable<any>{
    console.log(id)
    return this.http.get<any>(this.apiPath+'User/'+id);
  }
  getRoles():Observable<any>{
    return this.http.get<any>(this.apiPath+'Role');
  }

  callTurn(item : string) : Observable<any>{
    return this.http.get<any>(this.apiPath+'Turnos/llamarturno/'+item)
  }
  

  //***************************************POST METHODS***************************************************** */

  //Generamos un turno consultando al api y enviando como paramentro el id del tramite que se selecciono
  genTurno(id : number):Observable<any>{
    return this.http.post(this.apiPath+'Turnos/GenTurno/'+id,id,{observe:'response'});
  }

  //Registramos al usuario nuevo por medio del api, enviando el form que se lleno. 
  registerUsuario(form : any){
    return this.http.post(this.apiPath+'Account/Register',form)
  }
 
  //Peticion al API para iniciar sesion
  loginUser(form : any){
    return this.http.post(this.apiPath+'Account/Login',form);
  }
  createTramite(form : any){
    return this.http.post(this.apiPath +'Tramites',form,{observe:'response'});
  }

  getTramitesById(ids:any):Observable<any>{
    return this.http.post<any>(this.apiPath+'Turnos/TurnosbyTramite',ids)
  }
  //***************************************PUT METHODS********************************************************* */
  //Se llama al Web API para cambiar el estatus del turno a en proceso, debido a que se encuntra
  //en proceso de pasar a ventanilla
  turnoProceso(id : number,numCaja : number){
    return this.http.put(this.apiPath+'Turnos/TurnoProceso/'+id+'/'+numCaja,id);
  }

  //Solicitamos al Web API cambial el estatus del turno a vencido debido a que el turno no se 
  //presento en ventanilla o excedio el limite de tiempo de espera.
  turnoVencido(id : number){
    return this.http.put(this.apiPath+'Turnos/TurnoVencido/'+id,id)
  }

  //Solicitamos al Web API modificar el status del turno que fue finalizado a turno finalizado
  //para que asi no aparesca en la lista de turnos pendientes
  turnoFinalizado( id : number){
    return this.http.put(this.apiPath+'Turnos/TurnoFinalizado/'+id,id)
  }

  editarTramite(id : number,form : any){
    
    return this.http.put(this.apiPath+`Tramites/${id}`,form,{observe:'response'});
  }

  editarRol(idUser : any , idRole : any){
    const params = new HttpParams().set('role',idRole)
    let url = this.apiPath+'Role/AddRoleToUser/'+idUser+'/'+idRole
    return this.http.put(url,idUser,{observe:'response'});
  }

  restablecerContrasena(idUser:any,pswd : any){
    var pass = JSON.stringify(pswd)
    
    return this.http.put(this.apiPath+'Account/Restablecer/'+idUser,pass,this.headers)
  }
  
  cambiarCorreo(currentEmail:any,newEmail:any){
    var Nemail = JSON.stringify(newEmail);
    
    return this.http.put(this.apiPath+'Account/ChangeEmail/'+currentEmail,Nemail,this.headers);
  }

  cambiarContrasena(idUser : any,currentPassword : any, newPassword : any){
    var nPassword = JSON.stringify(newPassword)
    return this.http.put(this.apiPath+'Account/ChangePassword/'+idUser+'/'+currentPassword,nPassword,this.headers)
  }
  
  //*********************************************DELETE METHODS**************************************************** */

  eliminarTramite(id : number){
    return this.http.delete(this.apiPath+`Tramites/${id}`,{observe:'response'});
  }

  eliminarUsuario(id : any){
    return this.http.delete(this.apiPath+'User/'+id,{observe:'response'})
  }
}
