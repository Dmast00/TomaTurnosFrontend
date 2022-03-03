import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  form : FormGroup;
  constructor( public fb : FormBuilder,private service : BackendService,private router : Router) {
    this.form = this.fb.group({
      lastName : new FormControl,
      password : new FormControl,
      userName : new FormControl,
      firstName : new FormControl,
      email : new FormControl,

    })
   }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.form.value)
    this.service.registerUsuario(this.form.value).subscribe(response =>
        console.log((response))
      );
      this.router.navigate(['/Login']);
  }
}
