import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { EntrepriseService } from 'src/app/services/registration/entreprise.service';
import {AdresseDto, AuthenticationRequest, EntrepriseDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent  implements OnInit{
  entrepriseDto : EntrepriseDto = {};
  errorsMsg : Array<string> = [];
  adresseDto: AdresseDto = {};

  constructor( private router: Router, private entrepriseService : EntrepriseService, private userService: UserService) {
  }
    ngOnInit(): void {
    }

  registration() {
    this.entrepriseDto.adresse = this.adresseDto;
    this.entrepriseService.registration(this.entrepriseDto).subscribe(dtoToCreate => {
      const  authenticationRequest : AuthenticationRequest  ={
        login: this.entrepriseDto.email,
        password: 'som3R@nd0mP@$$word'
      }
      this.userService.login(authenticationRequest).subscribe(response => {
        this.userService.setAccessToken(response);
        this.userService.getUserByEmail(authenticationRequest.login).subscribe(currentUser => {
          this.userService.setConnectedUser(currentUser);
        });
        localStorage.setItem('origine','inscriptionAction');
        this.router.navigate(['changermotdepasse']);
      });

    }, error =>{
       this.errorsMsg = error.error.errors;
    });

  }
}
