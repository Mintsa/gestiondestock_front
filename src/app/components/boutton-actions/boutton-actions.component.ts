import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-boutton-actions',
  templateUrl: './boutton-actions.component.html',
  styleUrls: ['./boutton-actions.component.scss']
})
export class BouttonActionsComponent  implements OnInit{
  @Output()
  clickEvent = new EventEmitter();
  @Input()
  isNouveauButton: boolean = true;
  @Input()
  isExportedButton: boolean = true;
  @Input()
  isImportedButton: boolean = true;
  ngOnInit(): void {
  }

  bouttonNouveauClickAction () : void {
    this.clickEvent.emit();
  }
}
