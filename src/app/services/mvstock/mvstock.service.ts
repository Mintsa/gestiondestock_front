import { Injectable, OnInit } from '@angular/core';
import { MvtstkService } from 'src/gs-api/src/services';
import { ArticleService } from '../article/article.service';
import { ArticleDto, MvtStkDto } from 'src/gs-api/src/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MvstockService{

  constructor(private mvtstkService:MvtstkService) { }

  findMvtStockByIdArticle(idArticle:number) :Observable<Array<MvtStkDto>> {
    return idArticle ? this.mvtstkService.mvtStkArticle(idArticle) :of();
  }
  
}

