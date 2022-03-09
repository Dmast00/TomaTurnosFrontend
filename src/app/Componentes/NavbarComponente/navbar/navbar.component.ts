import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isShown:boolean = false;
  id : string
  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token') as string;
    console.log('es este '+ this.id)
  }


  logOut(){
    console.log('logout')
    this.authService.logout()
    this.router.navigate(['/Home']);
  }
}
