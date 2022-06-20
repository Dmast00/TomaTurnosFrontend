import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BackendService } from 'src/app/Servicios/backend.service';
import { Turnos } from '../../Turnos/turnos.model';
import * as signalr from "@microsoft/signalr";

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  baseURL = 'https://localhost:44352/'
  // baseURL = 'https://192.168.4.207:80/TomaTurnosBack/'

  constructor(private service : BackendService, @Inject(MAT_BOTTOM_SHEET_DATA) public data : any, private bottomSheetRef: MatBottomSheetRef<TurnoListComponent>) { }
  dataSource = this.data
  
  ngOnInit(): void {
    const connection = new signalr.HubConnectionBuilder()
    .configureLogging(signalr.LogLevel.Information)
    .withUrl(this.baseURL+'tt',{
      skipNegotiation: true,
      transport: signalr.HttpTransportType.WebSockets
    })
    .build();
    connection.start().then(function (){
      console.log('Signal R connected!');
      
    }).catch(function(err){
      return console.error(err.toString());
    });
    connection.on("BroadCastMessage",()=>{
      this.dataSource = this.data
    })
  }
  
  
}
