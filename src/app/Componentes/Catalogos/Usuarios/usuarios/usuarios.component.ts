import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/Componentes/Usuario/usuario.model';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuariosList :Usuario[] = []

  displayedColumns = ['id','userName','email','Acciones']
  dataSource : any = new MatTableDataSource([])
  paginator : MatPaginator;
  sort : MatSort;

  @ViewChild(MatPaginator, { static: true }) set matPginator(mp :MatPaginator){
    this.paginator = mp
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort, { static: true }) set matSort(ms : MatSort){
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.service.getUsuarios().subscribe(data =>{
      // this.usuariosList = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }
}
