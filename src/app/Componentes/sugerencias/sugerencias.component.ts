import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {
  form : FormGroup
  constructor(private toastr : ToastrService) {
    this.form = new FormGroup({

      subjectEmail : new FormControl(),
      PlainTextContent : new FormControl(),

    })
   }

  ngOnInit(): void {
  }

  SendEmail(){
    this.toastr.success('Email Sent')
    console.log('sending email')
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
