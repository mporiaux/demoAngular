import {Injectable} from "@angular/core";
import {Comfact} from "../entities/comfact.entities";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn:"root"})
export class ComfactService {
  host=environment.host;
  constructor(private httpClient : HttpClient) {
  }



  search(id:number):Observable<Comfact>{
    return this.httpClient.get<Comfact>(this.host+"/comfacts/"+id);
  }
}
