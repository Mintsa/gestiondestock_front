import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { CmdCltfrsService } from 'src/app/services/cmd-cltFrs/cmd-cltfrs.service';
import { ClientDto, CommandeClientDto, CommandeFournisseurDto, FournisseurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-cmd-clt-frs',
  templateUrl: './page-cmd-clt-frs.component.html',
  styleUrls: ['./page-cmd-clt-frs.component.scss']
})
export class PageCmdCltFrsComponent  implements OnInit{
  origine : string = '';
  clients:Array<ClientDto> = [];
  fournisseurs:Array<FournisseurDto> = [];
  orders:any = [];
  mapLigneCommandes : any = new Map();
  mapOrderTotalPrice:Map<number,number> = new Map<number, number>();
  constructor(private router : Router
              , private  activatedRoute : ActivatedRoute
              ,private cltFrsService:CltfrsService
              ,private cmdCltfrsService:CmdCltfrsService) {
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data =>{
      this.origine = data['origine'] ? data['origine'] : '';
    });
    this.realoadData(this.origine);
    this. reloadCommandeClientOrFournisseurByOrigine();
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
    }else if(origine! && origine ==='fournisseur'){
      this.cltFrsService.findAllFournissuers().subscribe(data =>{
        this.clients = [];
        this.fournisseurs = data;
      });
    }
  }

  reloadCommandeClientOrFournisseurByOrigine():void {
    switch (this.origine){
      case 'client':
       this.cmdCltfrsService.findAllCommandClient().subscribe(ordersClient =>{
         ordersClient.forEach(item => {
           this.cmdCltfrsService.findAllByCommandeClientId(item.id!).subscribe(entries =>{
             let command :CommandeClientDto = {
               client:item.client,
               code:item.code,
               etatCommande:item.etatCommande,
               commandeLivree:item.commandeLivree,
               dateCommande:new Date().getTime(),
               id:item.id,
               idEntreprise:item.idEntreprise,
               ligneCommandeClients:entries
             }
             if(this.orders.length === 0){
               this.orders.push(command);
               this.mapLigneCommandes.set(item.id,command.ligneCommandeClients);
               this.mapOrderTotalPrice.set(item.id!,this.calculateTotalCommande(command.ligneCommandeClients!))
             }else{
               let existingOrder: CommandeClientDto | undefined = undefined!;
               let isExistOrder:boolean = false;
               existingOrder = this.orders.find((order: { code: string | undefined; }) => order.code === command.code);
               isExistOrder = existingOrder != undefined;
               if(!isExistOrder){
                 this.orders.push(command);
                 this.mapLigneCommandes.set(item.id,command.ligneCommandeClients);
                 this.mapOrderTotalPrice.set(item.id!,this.calculateTotalCommande(command.ligneCommandeClients!))
               }
             }
           });
         });
         }
       )
        break;
      case 'fournisseur':
        this.cmdCltfrsService.findAllCommandFournisseur().subscribe(ordersFrs=>{
          ordersFrs.forEach(cmdFrs =>{
            this.cmdCltfrsService.findAllByCommandeFournisseurId(cmdFrs.id!).subscribe(lineCmdFrs => {
               let cmdOrderFrs:CommandeFournisseurDto = {
                 code:cmdFrs.code,
                 commandeLivree:cmdFrs.commandeLivree,
                 dateCommande:cmdFrs.dateCommande,
                 fournisseur:cmdFrs.fournisseur,
                 id:cmdFrs.id,
                 idEntreprise:cmdFrs.idEntreprise,
                 ligneCommandeFournisseurs:lineCmdFrs
               }
               let isExistCmdFr:boolean = false;
               let existingOrderFrs:CommandeFournisseurDto | undefined = undefined!;
              existingOrderFrs = this.orders.find((item: { code: string | undefined; }) => cmdOrderFrs.code === item.code);
              isExistCmdFr = existingOrderFrs != undefined;
              if(!isExistCmdFr){
                this.orders.push(cmdOrderFrs);
                this.mapLigneCommandes.set(cmdFrs.id,cmdOrderFrs.ligneCommandeFournisseurs);
                this.mapOrderTotalPrice.set(cmdFrs.id!,this.calculateTotalCommande(cmdOrderFrs.ligneCommandeFournisseurs!));
              }
            })
          })
        });
        break;
    }
  }
  calculateTotalCommande(list:Array<any>) : number {
   let totalPrice:number = 0;
    list.forEach(line => {
      if(line.prixUnitaire && line.quantite){
        totalPrice += +line.prixUnitaire * +line.quantite;
      }
    })
    return Math.floor(totalPrice);
  }

}

