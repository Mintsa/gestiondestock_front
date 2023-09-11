import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ChangerMotDePasseUtilisateurDto, UtilisateurDto } from 'src/gs-api/src/models';
import { UtilisateursService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class ChangePassWordService {

  constructor(private utilisateurService:UtilisateursService) { }
  
  changerMotDePass(changerMotDePasseUtilisateurDto:ChangerMotDePasseUtilisateurDto): Observable<UtilisateurDto> {
    return this.utilisateurService.changerMotDePasse(changerMotDePasseUtilisateurDto);
  }
}
