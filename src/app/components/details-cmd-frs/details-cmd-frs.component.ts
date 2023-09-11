import { Component, Input, OnInit } from '@angular/core';
import { CltfrsService } from 'src/app/services/cltfrs/cltfrs.service';
import { ClientDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-cmd-frs',
  templateUrl: './details-cmd-frs.component.html',
  styleUrls: ['./details-cmd-frs.component.scss']
})
export class DetailsCmdFrsComponent implements OnInit{
  
  constructor(private cltfrsService:CltfrsService) {}
    ngOnInit(): void {}
  

}
