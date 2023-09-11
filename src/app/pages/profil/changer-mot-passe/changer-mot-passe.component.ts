import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { ChangePassWordService } from 'src/app/services/profil/change-pass-word.service';
import { ChangerMotDePasseUtilisateurDto, UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-changer-mot-passe',
  templateUrl: './changer-mot-passe.component.html',
  styleUrls: ['./changer-mot-passe.component.scss']
})
export class ChangerMotPasseComponent implements OnInit{
  changerMotDePassForm : ChangerMotDePasseUtilisateurDto = {};
  currentUser : UtilisateurDto = {}
  oldPassWord: string = '';
  constructor(private userService: UserService,
              private changePassWordService: ChangePassWordService,
              private router: Router) {
  }
  ngOnInit(): void {
     this.currentUser = this.userService.getCurrentUser();
     if(localStorage.getItem('origine') && localStorage.getItem('origine') ==='inscriptionAction'){
       // @ts-ignore
       this.oldPassWord = this.currentUser.moteDePasse;
     }

  }
  changePassWord(): void {
    this.changerMotDePassForm.id = this.currentUser.id;
    this.changePassWordService.changerMotDePass(this.changerMotDePassForm).subscribe(response => {
      this.router.navigate(['profil']);
    });
  }


}
