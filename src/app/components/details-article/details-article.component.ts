import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit{
  @Input()
  articleDto:ArticleDto = {};
  @Output()
  suppresdsionResult  = new EventEmitter();
  constructor(private articleService:ArticleService) {
  }

  ngOnInit(): void {
    }

  confirmSuppressionArticle():void {
    if(this.articleDto.id){
      this.articleService.deleteArticleById(this.articleDto.id).subscribe( rep => {
        this.suppresdsionResult.emit('success');
      }, error => {
        this.suppresdsionResult.emit(error.error.errors);
      });
    }

  }
}
