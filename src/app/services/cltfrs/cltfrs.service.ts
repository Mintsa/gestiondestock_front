import { Injectable } from '@angular/core';
import { ClientDto, FournisseurDto } from 'src/gs-api/src/models';
import { ClientsService, FournisseurService } from 'src/gs-api/src/services';
import { UserService } from '../gard/user/udser.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CltfrsService {


  constructor(private clientsService:ClientsService
              ,private fournisseurService:FournisseurService
              ,private userService:UserService) { }

  enregistrerClient( clientDto:ClientDto):Observable<ClientDto> {
    clientDto.idEntreprise = this.userService.getCurrentUser().entreprise?.id;
    return this.clientsService.save(clientDto);
  }

  enregisterFournisseur(fournisseurDto:FournisseurDto): Observable<FournisseurDto> {
    fournisseurDto.idEntreprise = this.userService.getCurrentUser().entreprise?.id;
    return this.fournisseurService.save(fournisseurDto);
  }

  findAllClients(): Observable<Array<ClientDto>> {
    return this.clientsService.findAll();
  }
  findClientById(idClient:number):Observable<ClientDto>{
    return this.clientsService.findById(idClient);
  }

  deleteClient(idClient:number): Observable<any> {
    return idClient ? this.clientsService.delete(idClient) : of();
  }

  findAllFournissuers(): Observable<Array<FournisseurDto>> {
    return this.fournisseurService.findAll();
  }

  findFournisseurById(idFournisseur:number): Observable<FournisseurDto> {
    return this.fournisseurService.findById(idFournisseur);
  }
  deleteFournisseur(idFournisseur:number): Observable<any> {
    return idFournisseur ? this.fournisseurService.delete(idFournisseur) : of();
  }
}
