import { Component, OnInit } from '@angular/core';
import {Client} from "../../entities/client.entities";
import {ClientsService} from "../../services/clients.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {
  client:Client|null=null;
  numrech:number=0;
  nom:string="";
  clistrouv?:Client[];
  constructor(private  clientservice: ClientsService) {}

  ngOnInit(): void {

  }

  recherche() {
    this.client=null;
    this.clientservice.getClient(this.numrech).subscribe({
      next:data=>this.client=data,
      error: error=> alert("erreur "+error.headers.get("Error"))
    })
  }

  rechercheNom(value:any){

      this.clientservice.getClientNom(value.nom).subscribe({
      next: data => {this.clistrouv=data},
        })
   }

  suite() {
    alert("c'est la suite")
  }

  effacer(c:Client) {
    this.clientservice.deleteClient(c).subscribe({
      next : data=> {alert("record effacé");
        const index = this.clistrouv?.indexOf(c, 0);
        alert("index = "+index);
        if (!(index === undefined) && index > -1) {
          this.clistrouv?.splice(index, 1);
        }},
      error: error => alert("erreur d'effacement"+ error.headers.get("error"))
    })
  }
}
