import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from '../../Turnos/turnos.model';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  constructor(private service : BackendService, @Inject(MAT_BOTTOM_SHEET_DATA) public data : any, private bottomSheetRef: MatBottomSheetRef<TurnoListComponent>) { }
  dataSource = this.data
  
  ngOnInit(): void {
    
  }

}
