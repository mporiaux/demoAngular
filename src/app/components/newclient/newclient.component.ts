import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientsService} from '../../services/clients.service';
@Component({
  selector: 'app-newclient',
  templateUrl: './newclient.component.html',
  styleUrls: ['./newclient.component.css']
})
export class NewclientComponent implements OnInit {
  clientFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private clientService:
    ClientsService) {
  }
  ngOnInit() : void {
    this.clientFormGroup = this.fb.group({
      nom : ['', Validators.required],
    prenom : ['', Validators.required],
    cp : ['0000', [Validators.required,Validators.min(1000),Validators.max(9999)]],
    localite: ['', Validators.required],
    rue: ['', Validators.required],
    num: ['', Validators.required],
    tel: ['+32(0)', Validators.required],
  });
  }

  onSaveClient() {
    this.submitted=true;
    if(this.clientFormGroup?.invalid) return;
    this.clientService.save(this.clientFormGroup?.value).subscribe({
    next :  data=>{alert('sauvegarde ok');alert("n° du client = "+data.idclient)},
    error:  err => alert(err.headers.get("error"))
      });
  }
}
