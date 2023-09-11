import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/gard/user/udser.service';
import { AuthenticationRequest } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit{

  authenticationRequest : AuthenticationRequest = {}
  errorMessage?: string = '';

  @Input()
  connectionResult = new EventEmitter()

  constructor(private userService : UserService,private router :Router) {
  }
    ngOnInit(): void {

    }

    login(): void {
    this.userService.login(this.authenticationRequest).subscribe( (data) => {
      this.userService.setAccessToken(data);
      console.log("dans la page login avant: ",this.authenticationRequest.login);
      this.userService.getUserByEmail(this.authenticationRequest.login).subscribe(currentUser =>{
        this.userService.setConnectedUser(currentUser);
      });
      this.router.navigate(['']);
    }, error => {
      this.errorMessage = error.error.message;
    });

    }




}
