import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.scss']
})
export class DetailCommandeComponent {
  @Input()
  cltFrsItem:any ={}
}
