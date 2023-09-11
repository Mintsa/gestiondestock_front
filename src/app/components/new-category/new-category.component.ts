import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit{
  newCategoryForm : CategoryDto = {};
  errorsMsg :Array<string> = [];
  idCategory?:number
  constructor(private router : Router,private categoryService:CategoryService,private acticatedRoute:ActivatedRoute) {
  }
  cancel() : void  {
    this.router.navigate(['categories']);
  }

  ngOnInit(): void {
    this.idCategory = this.acticatedRoute.snapshot.params['idCategory'];
    if(this.idCategory){
      this.categoryService.findCategoryById(this.idCategory).subscribe( reponse => {
        this.newCategoryForm = reponse;
        console.log("ma cat:",reponse.code);
      });
    }


  }

  saveCategory():void {
    this.categoryService.registrationCategory(this.newCategoryForm).subscribe( date =>{
      this.router.navigate(['categories'])
    },error => {
      this.errorsMsg = error.error.errors;
    });
  }
}
