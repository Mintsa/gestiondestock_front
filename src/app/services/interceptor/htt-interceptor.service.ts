import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import { LoaderService } from 'src/app/components/loader/service/loader.service';
import { AuthenticationResponse } from 'src/gs-api/src/models';

@Injectable({
  providedIn: 'root'
})
export class HttInterceptorService implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
       let authenticationResponse: AuthenticationResponse = {};
       if(localStorage.getItem('accessToken')){
         authenticationResponse = JSON.parse(localStorage.getItem('accessToken') as string );
         console.log("mon accessToken vaut : ",authenticationResponse);
         const authenReq = req.clone({
           headers : new HttpHeaders( {
             Authorization: 'Bearer ' + authenticationResponse.accessToken
           })
         });
         return this.handleRequest(authenReq,next);
       }
       return this.handleRequest(req,next);
    }

    handleRequest(rep:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {
    return next.handle(rep).pipe(tap((event:HttpEvent<any>) =>{
      if(event instanceof HttpResponse){
        this.loaderService.hide();
      }
    },error => {
      this.loaderService.hide();
    }));
    }
}
