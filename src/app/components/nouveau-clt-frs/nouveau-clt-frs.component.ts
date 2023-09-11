import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { AdresseDto, ClientDto, FournisseurDto } from 'src/gs-api/src/models';
import { PhotosService } from 'src/gs-api/src/services';

@Component({
  selector: 'app-nouveau-clt-frs',
  templateUrl: './nouveau-clt-frs.component.html',
  styleUrls: ['./nouveau-clt-frs.component.scss']
})
export class NouveauCltFrsComponent implements OnInit {
  origine: string = '';
  clientFournisseur: any = {};
  adresseDto: AdresseDto = {};
  errorsMsg: Array<string> = [];
  idCltFrsToUpdate:number = -1;
  imgUrl:String | ArrayBuffer = 'assets/user.png';
  fileInput: FileList | File[] | undefined;
  file:File | null = null;

  constructor(private activatedRoute: ActivatedRoute
    , private cltFrsService: CltfrsService
    , private router: Router,private photosService:PhotosService) {
  }

  ngOnInit(): void {
    this.idCltFrsToUpdate = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.data.subscribe(data => {
      this.origine = data['origine'];

      switch (this.origine){
        case 'client': {
          this.cltFrsService.findClientById( this.idCltFrsToUpdate).subscribe(data => {
            // @ts-ignore
            this.adresseDto = data['adresse'];
            this.clientFournisseur = data;
          })
          break;
        }
        case 'fournisseur':{
          this.cltFrsService.findFournisseurById(this.idCltFrsToUpdate).subscribe(data =>{
            // @ts-ignore
            this.adresseDto = data['adresse'];
            this.clientFournisseur = data;
          })
          break;
        }
      }
    });
  }

  enregistrer() {
    if (this.origine === 'client') {
      this.cltFrsService.enregistrerClient(this.mapToClient()).subscribe(client => {
        // @ts-ignore
        this.savePhoto(client.id,client.nom);
        this.router.navigate(['clients']);
      }, error => {
        this.errorsMsg = error.error.errors;
      })
    } else if (this.origine === 'fournisseur') {
      this.cltFrsService.enregisterFournisseur(this.mapToFournisseur()).subscribe(frs => {
        // @ts-ignore
        this.savePhoto(frs.id,frs.nom);
        this.router.navigate(['fournisseurs']);
      }, error => {
        this.errorsMsg = error.error.errors;
      })
    }
  }

  mapToClient(): ClientDto {
    const clientDto: ClientDto = this.clientFournisseur;
    clientDto.adresse = this.adresseDto;
    return clientDto;

  }

  mapToFournisseur(): ClientDto {
    const fournisseurDto: FournisseurDto = this.clientFournisseur;
    fournisseurDto.adresse = this.adresseDto;
    return fournisseurDto;

  }
  cancel() {
    if(this.origine === 'client'){
      this.router.navigate(['clients']);
    }else if(this.origine === 'fournisseur'){
      this.router.navigate(['fournisseurs']);
    }
  }

  onFileInput(files: FileList | File[] | null):void {
    if(files && files.length > 0 ){
      // @ts-ignore
      this.file = files.item(0);
      if(this.file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) =>{
          if(fileReader.result){
            this.imgUrl = fileReader.result;
          }
        }
      }
    }
  }
  savePhoto(idctlFrs:number,titre?:string) : void {
    if(idctlFrs && titre && this.file){
      // @ts-ignore
      const params: SavePhotoParams = {
        id:idctlFrs,
        file:this.file,
        titre:titre,
        context:this.origine
      };
      this.photosService.savePhoto(params).subscribe( res =>{
        this.router.navigate([this.goTo(this.origine)]);
      },error => {

      });
    }else{
      this.router.navigate([this.goTo(this.origine)]);
    }

  }
  goTo(origine:string):string {
    let goTo:string =''
    switch (origine){
      case 'client':
        goTo = 'clients';
        break;
      case 'fournisseur':
        goTo = 'fournisseurs'
        break;
    }
    return goTo;
  }
}
