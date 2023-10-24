import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { MvstockService } from 'src/app/services/mvstock/mvstock.service';
import { ArticleDto, MvtStkDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-mvtsk',
  templateUrl: './mvtsk.component.html',
  styleUrls: ['./mvtsk.component.scss']
})
export class MvtskComponent implements OnInit{
  articlesList:Array<ArticleDto> = [];
  mapMvtStocks:Map<number,Array<MvtStkDto | undefined>> = new Map<number, Array<MvtStkDto | undefined>>();
  mapCurrentStock:Map<number,number> = new Map<number,number>();
  constructor(private articleService:ArticleService,private mvstockService:MvstockService) {
  }
    ngOnInit(): void {
      this.reloadAllArticle();
    }

    reloadAllArticle():void {
      this.articleService.findArticlesWithMvtStock().subscribe(articles =>{
        this.articlesList = articles;
        this.articlesList.reverse();
      });
    }

  getMvtStock(id: number|undefined):void {
    this.articlesList.forEach(article =>{
      this.mvstockService.findMvtStockByIdArticle(article.id!).subscribe(mvtStockList =>{
        this.mapMvtStocks.set(article.id!,mvtStockList);
      })
    })
  }
}
