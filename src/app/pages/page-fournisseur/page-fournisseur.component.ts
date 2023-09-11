import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { FournisseurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-fournisseur',
  templateUrl: './page-fournisseur.component.html',
  styleUrls: ['./page-fournisseur.component.scss']
})
export class PageFournisseurComponent implements OnInit{
  listFournisseurs:Array<FournisseurDto> = [];
  constructor(private router : Router,private cltfrsService:CltfrsService) {
  }

  ngOnInit(): void {
    this.relaodFournisseurs();
  }

  relaodFournisseurs():void {
    this.cltfrsService.findAllFournissuers().subscribe(frsList=>{
      this.listFournisseurs = frsList;
      this.listFournisseurs.reverse();
    });
  }

  newFournisseur():void  {
    this.router.navigate(['nouveaufournisseur'])
  }

  handleSuppressionFrs($event: any) {
    if($event && $event === 'success'){
      this.relaodFournisseurs();
    }

  }
}
