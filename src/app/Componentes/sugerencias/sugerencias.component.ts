import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/Servicios/backend.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {
  form : FormGroup
  constructor(private toastr : ToastrService, private service : BackendService) {
    this.form = new FormGroup({

      subjectEmail : new FormControl(),
      PlainTextContent : new FormControl(),

    })
   }

  ngOnInit(): void {
  }

   async SendEmail(){
    await this.service.SendEmail(this.form.value).subscribe(data =>{

    })
    this.toastr.success('Email Sent')
    
  }
  get f(){
    return this.form.controls
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
