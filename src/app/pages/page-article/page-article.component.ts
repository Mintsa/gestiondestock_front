import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.scss']
})
export class PageArticleComponent implements OnInit{
  listArticles:Array<ArticleDto> = [];
  errorMsg = '';
  constructor(private router:Router,private articleService:ArticleService) {
  }
  ngOnInit(): void {
    this.reloadArticles();
  }

  reloadArticles():void {
     this.articleService.findAllArticles().subscribe(articles =>{
      this.listArticles = articles;
       this.listArticles.reverse();
     });
  }
  nouvelArticle(): void {
    this.router.navigate(['nouvelarticle'])
    console.log("hllo");
  }


  handleSuppression($event: any) {
    if($event === 'success'){
      this.reloadArticles();
      console.log('je suis dans la boite');
    }else {
      this.errorMsg = $event;
    }

  }
}
