import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor({nativeElement}: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if(supports){
      nativeElement.setAttribute('loading','lazy');
    }
   }

  ngOnInit(): void {
  }

}
//----------------------><----------------------
//-                                            -
//-                 DESAROLLADO                -
//-                     POR                    -
//-             OBED HINOJOSA ENRIQUEZ         -
//-                   03-17-2022               -
//-                                            -
//----------------------------------------------
