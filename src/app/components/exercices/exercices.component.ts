import { Component, OnInit } from '@angular/core';
import {Client} from "../../entities/client.entities";
import {ClientsService} from "../../services/clients.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comfact} from "../../entities/comfact.entities";
import {ComfactService} from "../../services/comfact.service";



@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {
  client: Client | null = null;
  numrech: number = 0;
  nom: string = "";
  clistrouv?: Client[];
  comTrouv ?: Comfact;

  clientFormGroup?: FormGroup;
 comfactFormGroup?: FormGroup;
  submitted = false;

  constructor(private clientservice: ClientsService, private fb: FormBuilder,private comfactService: ComfactService) {
  }

  ngOnInit(): void {

    this.clientFormGroup = this.fb.group(
      {
        nom: ["", Validators.required],
        prenom: ["", Validators.required],
        tel: ["+(32)(0)", Validators.required]
      }
    )
   this.comfactFormGroup = this.fb.group(
      {
        etat: ["", Validators.required],
        montant: ["", Validators.required],
      }
    )


  }

  onSearchById(idclient: number) {
    this.clientservice.getClient(idclient).subscribe({
      next: data => this.client = data,
      error: error => alert(error)
    })
  }

  recherche() {
    this.client = null;
    this.clientservice.getClient(this.numrech).subscribe({
      next: data => this.client = data,
      error: error => alert("erreur " + error.headers.get("error"))
    })
  }

  rechercheNom(value: any) {

    this.clientservice.getClientNom(value.nom).subscribe({
      next: data => {
        this.clistrouv = data
      },
    })
  }

  effacer(c: Client) {
    this.clientservice.deleteClient(c).subscribe({
      next: data => {
        alert("record effacé");
        // this.rechercheNom(c);
        const index = this.clistrouv?.indexOf(c, 0);
        if (!(index === undefined) && index > -1) {
          this.clistrouv?.splice(index, 1);
        }
      },
      error: error => alert("erreur d'effacement" + error.headers.get("error"))
    })
  }

  rechParForm(value: any) {
    //this.client=null;
    let numero: number = value.numero;
    this.clientservice.getClient(numero).subscribe({
      next: data => this.client = data,
      error: error => {
        alert("erreur ");
        this.client = null
      }
    })
  }

  saveClient() {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) alert("encodage invalide")
    else {
      alert(this.clientFormGroup?.value.nom + " " +
        this.clientFormGroup?.value.prenom + " " +
        this.clientFormGroup?.value.tel)
    }
  }

  rechercheParID(value: any) {
    let numero: number = value.idclient;
    this.clientservice.getClient(numero).subscribe({
      next: data => {
        this.client = data;
        this.clientFormGroup = this.fb.group(
          {
            nom: [data.nom, Validators.required],
            prenom: [data.prenom, Validators.required],
            tel: [data.tel, Validators.required]
          }
        )
      },
      error: error => {
        alert("erreur ");
        this.client = null
      }
    })
  }

  majClient() {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) {
      return
    }
    alert("maj OK");
  }

  rechercheComParID(value: any) {
    this.comfactService.search(value.idcom).subscribe({
        next: data => {
          this.comfactFormGroup = this.fb.group(
            {
              etat: [data.etat, [Validators.required,Validators.pattern("^(C|F|P)$")]],
              montant: [data.montant, Validators.required],
            }
          )
        },
        error: error => alert("commande introuvable")
      }
    )
  }
}
