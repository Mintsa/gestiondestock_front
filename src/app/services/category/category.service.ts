import { Injectable } from '@angular/core';
import { UserService } from '../gard/user/udser.service';
import {CategoryDto } from 'src/gs-api/src/models';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/gs-api/src/services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {





  constructor(private categoryService: CategoriesService,private userService:UserService) { }

  registrationCategory(category: CategoryDto): Observable<CategoryDto> {
    category.idEntreprise = this.userService.getCurrentUser()?.entreprise?.id;
    return this.categoryService.save(category);
  }

  findAllCategories(): Observable<Array<CategoryDto>> {
    return this.categoryService.findAll();
  }

  findCategoryById(idCategory: number): Observable<CategoryDto> {
   return this.categoryService.findById(idCategory)
  }
  delete(id: number | undefined) :Observable<null> {
    return this.categoryService.delete(id!);
  }

}


