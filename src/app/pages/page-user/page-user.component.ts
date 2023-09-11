import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/gard/user/udser.service';
import { UtilisateurDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit{
  userList = new Array<UtilisateurDto>
constructor(private  router : Router,private userService:UserService) {}
  newUtilisateur() : void  {
    this.router.navigate(['newuser'])
  }

  ngOnInit(): void {
    this.userService.findAllUsers().subscribe(users =>{
      this.userList = users;
      console.log("la taile vaut : ",users.length)
    })
  }
}
