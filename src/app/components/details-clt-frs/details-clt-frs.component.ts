import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto, FournisseurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-clt-frs',
  templateUrl: './details-clt-frs.component.html',
  styleUrls: ['./details-clt-frs.component.scss']
})
export class DetailsCltFrsComponent implements OnInit{
  @Input('clientsFournisseur')
  clientsFournisseur:any = {};

  idToUopdate:number = -1;
  @Input('origin')
  origin:string = '';
  @Output()
  suppresssionResult  = new EventEmitter();
  constructor(private router:Router,private cltfrsService:CltfrsService) {
  }

    ngOnInit(): void {
    }


  updateCltFrs(id: number) {
    if(this.origin === 'client'){
     this.router.navigate(['nouveauclient',id]);
    }else if(this.origin === 'fournisseur'){
      this.router.navigate(['nouveaufournisseur',id]);
    }

  }

  confirmSuppressionClient() {
    if(this.origin === 'client'){
      this.cltfrsService.deleteClient(this.clientsFournisseur.id).subscribe(res =>{
        this.suppresssionResult.emit('success');
      },error => {
        this.suppresssionResult.emit(error.error.errors);
      });
    }else if(this.origin === 'fournisseur'){
     this.cltfrsService.deleteFournisseur(this.clientsFournisseur.id).subscribe(rep => {
       this.suppresssionResult.emit('success');
     },error =>{
       this.suppresssionResult.emit(error.error.errors);
     });
    }
  }
}
