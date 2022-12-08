import { Component, OnInit } from '@angular/core';
import {ComfactService} from "../../services/comfact.service";
import {Comfact} from "../../entities/comfact.entities";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  comfact: Comfact|null = null;
  numcommande:number=0;
  constructor(private comfactservice : ComfactService) { }

  ngOnInit(): void {
  }

 onSearch(){
    this.comfact=null;
    this.comfactservice.search(this.numcommande).subscribe(
      {
        next :data => this.comfact=data,
        error:err => alert("commande introuvable")
      }

    )
 }

}
