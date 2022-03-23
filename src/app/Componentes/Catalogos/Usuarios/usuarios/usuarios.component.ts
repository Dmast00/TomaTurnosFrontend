import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Componentes/Usuario/usuario.model';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuariosList :Usuario[] = []
  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.service.getUsuarios().subscribe(data =>{
      this.usuariosList = data
      
    })
    
  }
}
