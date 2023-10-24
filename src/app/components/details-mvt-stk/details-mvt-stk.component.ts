import { Component, Input } from '@angular/core';
import { MvtStkDto } from 'src/gs-api/src/models';

@Component({
  selector: 'app-details-mvt-stk',
  templateUrl: './details-mvt-stk.component.html',
  styleUrls: ['./details-mvt-stk.component.scss']
})
export class DetailsMvtStkComponent {
  @Input()
  mvtStockLine:MvtStkDto = {};

}
