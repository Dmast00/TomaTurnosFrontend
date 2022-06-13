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
export class CatTramitesComponent implements OnInit{
  display = false
  tramitesList : Tramites[] = []
  
  displayedColumns = ['idTramite', 'nombreTramite', 'descripcionTramite', 'serieTramite','Acciones'];
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


  constructor(private service : BackendService) { }
  


  ngOnInit(): void {
    this.getTramites();
  }

  getTramites(){
    this.service.getTramites().subscribe(data =>{
      // this.tramitesList = data

      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      console.log(this.dataSource)
    })
  }
}
