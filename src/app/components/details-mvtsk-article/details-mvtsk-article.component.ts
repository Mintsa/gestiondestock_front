import { Component, Input } from '@angular/core';
import { ArticleDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-mvtsk-article',
  templateUrl: './details-mvtsk-article.component.html',
  styleUrls: ['./details-mvtsk-article.component.scss']
})
export class DetailsMvtskArticleComponent {
  @Input()
  article:ArticleDto = {}

}
