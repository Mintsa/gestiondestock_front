import { Injectable } from '@angular/core';
import { LoaderState } from '../loaderModel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
private loaderSubject = new Subject<LoaderState>();
loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() : void {
    this.loaderSubject.next(<LoaderState> {show:true});
  }
  hide() : void {
    this.loaderSubject.next(<LoaderState> {show:false});
  }
}
