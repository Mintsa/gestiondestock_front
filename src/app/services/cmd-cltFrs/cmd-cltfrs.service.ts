import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeClientDto, CommandeFournisseurDto, LigneCommandeClientDto } from 'src/gs-api/src/models';
import {CommandefournisseurService, CommandesclientsService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class CmdCltfrsService {

  constructor(private commandesclientsService:CommandesclientsService,
              private commandefournisseurService:CommandefournisseurService) { }

  saveClientOrder(commandeClientDto:CommandeClientDto): Observable<CommandeClientDto> {
    return this.commandesclientsService.save(commandeClientDto);
  }

  saveFournisseurOrder(commandeFournisseurDto:CommandeFournisseurDto):Observable<CommandeFournisseurDto>{
    return this.commandefournisseurService.save(commandeFournisseurDto);
  }

  findAllClients():Observable<Array<CommandeClientDto>> {
    return this.commandesclientsService.findAll();
  }

  findAllCommandClient(): Observable<Array<CommandeClientDto>> {
    return this.commandesclientsService.findAll();
  }

  findAllCommandFournisseur():Observable<Array<CommandeFournisseurDto>> {
    return this.commandefournisseurService.findAll();
  }

  findAllByCommandeClientId(id:number): Observable<Array<LigneCommandeClientDto>> {
    return this.commandesclientsService.findAllLignesCommandesClientByCommandeClientId(id);
  }

  findAllByCommandeFournisseurId(id:number): Observable<Array<CommandeFournisseurDto>> {
    return this.commandefournisseurService.findAllLignesCommandesFournisseurByCommandeFournisseurId(id);
  }
}
