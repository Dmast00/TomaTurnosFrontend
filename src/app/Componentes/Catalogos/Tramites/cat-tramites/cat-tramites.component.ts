import { AfterViewInit, Component, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Tramites } from '../tramites.model';

@Component({
  selector: 'app-cat-tramites',
  templateUrl: './cat-tramites.component.html',
  styleUrls: ['./cat-tramites.component.css']
})
export class CatTramitesComponent implements OnInit,AfterViewInit{
  display = false
  displayedColumns = ['idTramite', 'nombreTramite', 'descripcionTramite', 'serieTramite'];
  @ViewChild(MatPaginator) paginator : MatPaginator
  @ViewChild(MatSort) sort : MatSort;
  tramitesList : Tramites[] = []
  dataSource = new MatTableDataSource<Tramites>(this.tramitesList)
  constructor(private service : BackendService) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  

  ngOnInit(): void {
    this.getTramites();
  }

  getTramites(){
    this.service.getTramites().subscribe(data =>{
      this.tramitesList = data
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
    })
  }
}
