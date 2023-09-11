import { Component, Input, OnInit } from '@angular/core';
import { UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit{
  @Input()
  user:UtilisateurDto = {}
    ngOnInit(): void {

    }

}
