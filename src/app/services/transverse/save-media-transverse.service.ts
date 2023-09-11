import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotosService } from 'src/gs-api/src/services';


@Injectable({
  providedIn: 'root'
})
export class SaveMediaTransverseService {

  constructor(private photosService:PhotosService) { }

  downLoadMedia(files: FileList | File[] | null,imgUrl:string, file:File | null = null):void {
    if(files && files.length > 0 ){
   
      // @ts-ignore
      file = files.item(0);
      if(file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) =>{
          if(fileReader.result){
            // @ts-ignore
            imgUrl =  fileReader.result;
          }
        }
      }
    }
  }
  // @ts-ignore
  savePhoto(idArticle?:number,titre?:string,context?:string,file:File | null = null) : Observable<{}> {
    if(idArticle && titre && file){
      // @ts-ignore
      const params:SavePhotoParams = {
        id:idArticle,
        file:file,
        titre:titre,
        context:context
      };
      return this.photosService.savePhoto(params);
    }
  }

}
