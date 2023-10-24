import { Component, Input, OnInit } from '@angular/core';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-cmd-frs',
  templateUrl: './details-cmd-frs.component.html',
  styleUrls: ['./details-cmd-frs.component.scss']
})
export class DetailsCmdFrsComponent implements OnInit{
  @Input()
  commandeItem:any = {}
  @Input()
  origine: string ='';
  cltFrs:any | undefined = {};
  constructor(private cltfrsService:CltfrsService) {}
    ngOnInit(): void {
    this.reloadClientOrFournisseur();
    }

  reloadClientOrFournisseur() : void {
      switch (this.origine){
        case 'client':
          this.cltFrs = this.commandeItem.client;
          break;
        case 'fournisseur':
          this.cltFrs = this.commandeItem.fournisseur;
          break;
      }
  }
}
