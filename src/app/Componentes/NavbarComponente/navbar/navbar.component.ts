import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import { Login } from '../../Login/login.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isShown:boolean = false;
  id : string
  userName : string
  userData : Login[];
  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token') as string;
    this.userName = localStorage.getItem('userName') as string;
    console.log('es este '+ this.id)
    
  }

  logOut(){
    console.log('logout')
    this.authService.logout()
    this.router.navigate(['/Home']);
  }
}
