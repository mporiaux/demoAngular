import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {Client} from "../../entities/client.entities";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {


  constructor() {
  }
  ngOnInit(): void {

  }

}
