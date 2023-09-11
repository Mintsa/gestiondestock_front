import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrepriseDto } from 'src/gs-api/src/models';
import { EntreprisesService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private entrepriseService: EntreprisesService) { }
  
  registration(entrepriseDto : EntrepriseDto) : Observable<EntrepriseDto> {
    return this.entrepriseService.save(entrepriseDto);
  }
}
