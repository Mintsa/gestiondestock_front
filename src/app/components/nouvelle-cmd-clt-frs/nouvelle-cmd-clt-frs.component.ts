import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ArticleService } from 'src/app/services/article/article.service';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  templateUrl: './nouvelle-cmd-clt-frs.component.html',
  styleUrls: ['./nouvelle-cmd-clt-frs.component.scss']
})
export class NouvelleCmdCltFrsComponent implements OnInit{
  origine:string ='';
  cltFrsForm:ClientDto = {};
  cltFrsList: any[] =[];
  // @ts-ignore
  searchCltFrs:any = {};
  searchArticleCode:string = '';
  protected readonly event = event;
  constructor(private activatedroute:ActivatedRoute
              ,private cltfrsService:CltfrsService
              ,private articleService:ArticleService) {
  }
  ngOnInit(): void {
    this.activatedroute.data.subscribe( data =>{
      this.origine = data['origine'];
    });
    this.realoadData();
  }

  realoadData() : void {
    switch (this.origine){
      case 'client':
        this.cltfrsService.findAllClients().subscribe(clients =>{
          this.cltFrsList = clients;
        });
        break;
      case 'fournisseur':
        this.cltfrsService.findAllFournissuers().subscribe(frs=>{
          this.cltFrsList = frs;
        });
        break;
    }
  }

findClientOrFournisseurByCode(code:string):void {
    if(this.origine=== 'client'){
      this.articleService.findArticleByCode(code).subscribe( client =>{
        this.searchCltFrs = client;
      });

    }else if(this.origine === 'fournisseur'){

    }
}


  // @ts-ignore
  searchCltFrs():void  {
this.findClientOrFournisseurByCode(this.searchArticleCode);
console.log("code tape =====>:",this.searchArticleCode);
console.log("retour ======>", this.searchCltFrs.id);

  }
}
