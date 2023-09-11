import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.scss']
})
export class PageCategoriesComponent implements OnInit{
  listCategories: Array<CategoryDto> = [];
  isEmptyCat: boolean | undefined;
  idCatToDelete?: number = -1;
  errorsMsg:Array<string> = [];
  constructor(private router : Router,private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  private reload() {
    this.categoryService.findAllCategories().subscribe(response => {
      this.listCategories = response;
      this.listCategories.reverse();
    });
  }

  newCategory() : void  {
    this.router.navigate(['newcategory']);
  }

  modifierCategory(id?: number) {
    this.router.navigate(['newcategory',id]);

  }

  supprimerCat(id?:number) {
    if(id){
      this.idCatToDelete = id;
    }
  }

  deleteCat() {
    if(this.idCatToDelete!==-1){
      this.categoryService.delete(this.idCatToDelete).subscribe(data => {
        console.log("suppression:",this.idCatToDelete)
        this.reload();
      }, error => {
      this.errorsMsg.push('imposible de supprimer cet item') ;
        console.log("suppression impossible:",this.idCatToDelete);
      });
    }

  }

  cancelDeleteCat() {
    this.idCatToDelete = -1;
    this.errorsMsg= [];
  }
}
