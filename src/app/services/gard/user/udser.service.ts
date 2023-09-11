import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest, AuthenticationResponse, UtilisateurDto } from 'src/gs-api/src/models';
import { AuthenticationService, UtilisateursService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authentificationService:AuthenticationService,
              private router: Router,private utilisateurService: UtilisateursService) { }

  login(authenticationRequest:AuthenticationRequest):Observable<AuthenticationResponse>   {
    return this.authentificationService.authenticate(authenticationRequest);
  }

  getUserByEmail(email?:string) :Observable<UtilisateurDto> {
    // @ts-ignore
    return email != null ? this.utilisateurService.findByEmail(email) : null;
  }

  setAccessToken(authenticationResponse: AuthenticationResponse) : void {
    localStorage.setItem('accessToken',JSON.stringify(authenticationResponse));
  }

  isUserLoggedAndAccessTokenValid() : boolean {
    if(localStorage.getItem('accessToken')){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  setConnectedUser(utilisateurDto: UtilisateurDto) : void {
    localStorage.setItem('connectedUser',JSON.stringify(utilisateurDto));
  }

  getCurrentUser() : UtilisateurDto {
    return localStorage.getItem('connectedUser') ? JSON.parse(localStorage.getItem('connectedUser') as string) : null;
  }
  
  findAllUsers(): Observable<Array<UtilisateurDto>> {
    return this.utilisateurService.findAll();
  }
}
