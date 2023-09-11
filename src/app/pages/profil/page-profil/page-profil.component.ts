import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit{
  currentUser : UtilisateurDto = {}
  constructor(private userservice:UserService) {
  }
    ngOnInit(): void {
    this.currentUser = this.userservice.getCurrentUser();
    }

}
