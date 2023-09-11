import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleDto } from 'src/gs-api/src/models';
import { ArticlesService } from 'src/gs-api/src/services';
import { UserService } from '../gard/user/udser.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private articlesService: ArticlesService,private userService:UserService) { }

  registrationArticle(articleToCreate:ArticleDto): Observable<ArticleDto> {
    articleToCreate.idEntreprise = this.userService.getCurrentUser().entreprise?.id;
    return this.articlesService.save(articleToCreate);
  }

  findAllArticles():Observable<Array<ArticleDto>> {
    return this.articlesService.findAll();
  }

  findArticleById(idArticle?:number):Observable<ArticleDto> {
      return idArticle ? this.articlesService.findById(idArticle): of();
  }

  deleteArticleById(idArticle?:number) : Observable<null> {
    return this.articlesService.delete(idArticle!);
  }

  findArticleByCode(code:string):Observable<ArticleDto>{
    return this.articlesService.findByCodeArticle(code);
  }
}
