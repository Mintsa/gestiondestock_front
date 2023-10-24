import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ArticleService } from 'src/app/services/article/article.service';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { CmdCltfrsService } from 'src/app/services/cmd-cltFrs/cmd-cltfrs.service';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { ClientDto, CommandeClientDto, CommandeFournisseurDto, LigneCommandeClient } from 'src/gs-api/src/models';

@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  templateUrl: './nouvelle-cmd-clt-frs.component.html',
  styleUrls: ['./nouvelle-cmd-clt-frs.component.scss']
})
export class NouvelleCmdCltFrsComponent implements OnInit{
  origine:string ='';
  cltFrsForm:any = {};
  cltFrsList: any[] =[];
  // @ts-ignore
  searchCltFrsForm:any = {};
  searchArticleCode:string = '';
  codeCommande:string ='';
  // @ts-ignore
  dateCommande: Date = '';
  // @ts-ignore
  quantite:number = '';
  orderLineCartItem:Array<any> = [];
  protected readonly event = event;
  // @ts-ignore
  totalPrice:number ='';//Subject<number> = new BehaviorSubject<number>(0);
  // @ts-ignore
  totalQuantity:number =''; //Subject<number> = new BehaviorSubject<number>(0);
  errorsMsgs: Array<string> = [];
  constructor(private activatedroute:ActivatedRoute
              ,private cltfrsService:CltfrsService
              ,private articleService:ArticleService
              ,private cmdCltfrsService:CmdCltfrsService
              ,private router:Router,
              private userService: UserService) {
  }
  ngOnInit(): void {
    this.activatedroute.data.subscribe( data =>{
      this.origine = data['origine'];
    });
    this.realoadData();
    let data = null;
    data = JSON.parse(sessionStorage.getItem('cartOrderLine')!)
    if(data != null){
      this.orderLineCartItem = data;
      this.computeCartOrderLine();
    }
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
    if(this.origine === 'client' || this.origine === 'fournisseur'){
      this.articleService.findArticleByCode(code).subscribe( client =>{
        this.searchCltFrsForm = client;
        console.log("mon client vaut ===========>",client.designation);
        console.log("le form vaut ======>:",this.searchCltFrsForm.id);
      });
    }
}

  // @ts-ignore
  searchCltFrs():void  {
    this.findClientOrFournisseurByCode(this.searchArticleCode);
    console.log("code tape =====>:",this.searchArticleCode);
    console.log("retour ======>", this.searchCltFrsForm.id);
  }

  addOrderLine() {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: LigneCommandeClient | undefined = undefined!;
    if(this.orderLineCartItem.length > 0){
      // @ts-ignore
      existingCartItem = this.orderLineCartItem.find(item =>this.searchCltFrsForm.codeArticle === item?.article.codeArticle);
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart){
      // @ts-ignore
      existingCartItem.quantite = (existingCartItem.quantite +this.quantite);
    }else{
      let lignCmd:LigneCommandeClient ={
        article:this.searchCltFrsForm,
        prixUnitaire:this.searchCltFrsForm.prixUnitaireTtc,
        quantite:this.quantite
      }
      this.orderLineCartItem.push(lignCmd);
      this.orderLineCartItem.reverse();

    }
     this.computeCartOrderLine();
    // @ts-ignore
    this.searchCltFrsForm = {}
    // @ts-ignore
    this.quantite = '';
    this.searchArticleCode ='';

  }

  computeCartOrderLine():void {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.orderLineCartItem.forEach( item =>{
      // @ts-ignore
      totalQuantityValue += item.quantite;
      // @ts-ignore
      totalPriceValue += (item.quantite * item.prixUnitaire);
    });
    // publish new values to ALL subscribers
    this.totalPrice = totalPriceValue;
    this.totalQuantity=totalQuantityValue;
    this.persistCartItems();
  }

  persistCartItems():void {
    sessionStorage.setItem('cartOrderLine',JSON.stringify(this.orderLineCartItem));
  }

  enregistreOrder():void {
    switch (this.origine){
      case'client':
        let orderClient:CommandeClientDto = {
          client:this.cltFrsForm,
          code:this.codeCommande,
          dateCommande:new Date().getTime(),
          etatCommande:'EN_PREPARATION',
          idEntreprise:this.userService.getCurrentUser().entreprise?.id,
          ligneCommandeClients:this.orderLineCartItem
        }
        this.cmdCltfrsService.saveClientOrder(orderClient).subscribe(data =>{
          this.router.navigate(['commandeclient']);
          sessionStorage.removeItem('cartOrderLine');
        },error =>{
          this.errorsMsgs = error.error.errors;
        });
        break;
      case 'fournisseur':
        let orderFrs:CommandeFournisseurDto = {
          code:this.codeCommande,
          commandeLivree:false,
          dateCommande:new Date().getTime(),
          etatCommande:'EN_PREPARATION',
          fournisseur:this.cltFrsForm,
          idEntreprise:this.userService.getCurrentUser().entreprise?.id,
          ligneCommandeFournisseurs:this.orderLineCartItem
        }
        this.cmdCltfrsService.saveFournisseurOrder(orderFrs).subscribe( response =>{

          this.router.navigate(['commandefournisseur']);
          sessionStorage.removeItem('cartOrderLine');
        },error =>{
          this.errorsMsgs = error.error.errors;
        })
        break;
    }


  }
}
