import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ArticleService } from 'src/app/services/article/article.service';
import { CategoryService } from 'src/app/services/category/category.service';
import {ArticleDto, CategoryDto } from 'src/gs-api/src/models';
import { PhotosService } from 'src/gs-api/src/services';

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styleUrls: ['./nouvel-article.component.scss']
})
export class NouvelArticleComponent implements OnInit{
   articleForm:ArticleDto = {};
   catogoryForm:CategoryDto = {};
   listeCategories:Array<CategoryDto> = new Array<CategoryDto>();
   errorsMsg:Array<string> = [];
   idArticle:number = -1;
   imgUrl:String | ArrayBuffer = 'assets/cam.jpg';
  fileInput: FileList | File[] | undefined;
  file:File | null = null;


  constructor(private router : Router,private articleService:ArticleService
              ,private activatedRoute:ActivatedRoute,
              private categoryService:CategoryService,
              private photosService:PhotosService) {
  }
  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(allCat => {
      this.listeCategories = allCat;
    });
    this.updateArticle();
  }

  updateArticle() :void {
    this.idArticle = this.activatedRoute.snapshot.params['idArticle'];
    if(this.idArticle > 0){
      this.articleService.findArticleById(this.idArticle).subscribe(currentArticle => {
        this.articleForm = currentArticle;
        this.catogoryForm = this.articleForm.category ? this.articleForm.category : {};
      })
    }
  }

  cancel() : void  {
    this.router.navigate(['articles']);
  }

  registrationArticle():void {
    // @ts-ignore
    this.articleForm.category = this.catogoryForm
    this.articleService.registrationArticle(this.articleForm!).subscribe(articleDtoTocreate =>{
      this.savePhoto(articleDtoTocreate.id,articleDtoTocreate.codeArticle);
      this.router.navigate(['articles']);
    },error => {
      this.errorsMsg = error.error.errors;
    });

  }

  computePriceTtc():void  {
    // @ts-ignore
    this.articleForm.prixUnitaireTtc = +this.articleForm.prixUnitaireHt + (this.articleForm.prixUnitaireHt * this.articleForm.tauxTva * 0.01);

  }

  onFileInput(files: FileList | File[] | null):void {
      if(files && files.length > 0 ){
        // @ts-ignore
        this.file = files.item(0);
        if(this.file){
          const fileReader = new FileReader();
          fileReader.readAsDataURL(this.file);
          fileReader.onload = (event) =>{
            if(fileReader.result){
              this.imgUrl = fileReader.result;
            }
          }
        }
      }
  }
  savePhoto(idArticle?:number,titre?:string) : void {
    if(idArticle && titre && this.file){
      // @ts-ignore
      const params: SavePhotoParams = {
        id:idArticle,
        file:this.file,
        titre:titre,
        context:'article'
      };
      this.photosService.savePhoto(params).subscribe( res =>{
        this.router.navigate(['articles']);
      },error => {

      });
    }else{
      this.router.navigate(['articles']);
    }

  }
}
