import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentUser : UtilisateurDto = {}
  constructor(private userService:UserService) {
  }
    ngOnInit(): void {
        this.currentUser = this.userService.getCurrentUser();
    }

}
