import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  constructor(private service : BackendService) { }
  

  tramitesList : Tramites[] = []
  
  ngOnInit(): void {
    this.getTramites();
  }

  getTramites(){
    this.service.getTramites().subscribe(data =>{
      this.tramitesList = data
      
    })
  }
}
