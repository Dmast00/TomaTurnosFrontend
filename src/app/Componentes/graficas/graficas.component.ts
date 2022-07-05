import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  turnosList : any[] = []
  cajaLabels : any[] = []
  constructor(private service : BackendService) { }

  ngOnInit(): void {
    this.service.getTurnos().subscribe(data =>{
      this.turnosList = data
      const caja = Array.from(this.turnosList.reduce((m, t) => m.set(t.caja, t), new Map()).values());
      this.cajaLabels =  caja
      console.log(this.cajaLabels.map(function(a){return a.caja}))
    })
  }

  public lineChartData : ChartConfiguration['data'] ={
    datasets : [
      {
        data: [5,2,3,4,5,6,7,8],
        label: 'caja 01',
      },
      {
        data: [5,2,3,4,5,6,7,8],
        label: 'caja 02',


      }
    ],
    labels : this.cajaLabels.map(function(a){return a.caja})
  }

}
