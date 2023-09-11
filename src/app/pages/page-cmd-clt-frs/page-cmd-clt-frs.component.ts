import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto, FournisseurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-cmd-clt-frs',
  templateUrl: './page-cmd-clt-frs.component.html',
  styleUrls: ['./page-cmd-clt-frs.component.scss']
})
export class PageCmdCltFrsComponent implements OnInit{
  origine : string = '';
  clients:Array<ClientDto> = [];
  fournisseurs:Array<FournisseurDto> = [];
  constructor(private router : Router
              , private  activatedRoute : ActivatedRoute,private cltFrsService:CltfrsService) {
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data =>{
      this.origine = data['origine'] ? data['origine'] : '';
    });
    this.realoadData(this.origine);
  }
  nouvelleCommande() : void {
    if(this.origine! && this.origine === 'client'){
      this.router.navigate(['nouvellecommandeclient'])
    } else if(this.origine! && this.origine === 'fournisseur'){
      this.router.navigate(['nouvellecommandefournisseur'])
    }
  }

  realoadData(origine:string):void{
    if(origine! && origine ==='client'){
      this.cltFrsService.findAllClients().subscribe(data =>{
        this.clients = data;
        this.fournisseurs = [];
      });
    }else if(origine! && origine ==='client'){
      this.cltFrsService.findAllFournissuers().subscribe(data =>{
        this.clients = [];
        this.fournisseurs = data;
      });
    }
  }

}
