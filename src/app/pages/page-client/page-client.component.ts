import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-client',
  templateUrl: './page-client.component.html',
  styleUrls: ['./page-client.component.scss']
})
export class PageClientComponent implements OnInit{
  listClients:Array<ClientDto> = [];
constructor(private router : Router,private cltfrsService:CltfrsService) {
}

  ngOnInit(): void {
  this.realoadClients();
  }

  newCutomer() : void {
    this.router.navigate(['nouveauclient'])
  }
  realoadClients(): void {
  this.cltfrsService.findAllClients().subscribe(clients => {
    this.listClients = clients;
    this.listClients.reverse();
  })
  }

  handleSuppressionClient($event: any) {
  if($event && $event === 'success'){
    this.realoadClients();
  }

  }
}
