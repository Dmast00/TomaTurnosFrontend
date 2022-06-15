import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from '../../Turnos/turnos.model';


@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {
  displayedColumns = ['idTurno', 'turno', 'idStatus', 'idTramite','caja','fechaInicial','fechaFinal'];
  dataSource : any = new MatTableDataSource([])
  paginator : MatPaginator;
  sort : MatSort
  @ViewChild(MatPaginator, { static: true }) set matPginator(mp :MatPaginator){
    this.paginator = mp
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort, { static: true }) set matSort(ms : MatSort){
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  turnosList : Turnos[] = []
  startDate : any = ''
  endDate : any = ''

  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.getTurnos();
  }


  getTurnos(){
    this.service.getTurnos().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
    
  }

  test(){
   console.log(this.startDate.getFullYear())
  }
}
