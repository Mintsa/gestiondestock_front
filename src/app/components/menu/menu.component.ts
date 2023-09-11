import { Component } from '@angular/core';
import {Menu} from "./menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private lastSelectedMenu ? : Menu | undefined ;
  public menuProperties : Array<Menu> = [
    {
    id: '1',
    titre: 'Tableau de bord',
    icon: 'bi bi-kanban-fill',
    url: '',
    sousMenu: [
      {
        id: '11',
        titre: 'Vue d\'ensemble',
        icon: 'bi bi-pie-chart-fill',
        url: ''
      },
      {
        id: '12',
        titre: 'Statistiques',
        icon: 'bi bi-bar-chart-line-fill',
        url: 'statistiques'
      }
    ]
  },

    {
      id: '2',
      titre: 'Articles',
      icon: 'bi bi-boxes',
      url: 'articles',
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'bi bi-boxes',
          url: 'articles'
        },
        {
          id: '22',
          titre: 'Mouvement du stock',
          icon: '',
          url: 'mvtsk'
        }
      ]
    },

    {
      id: '3',
      titre: 'Clients',
      icon: 'bi bi-person-circle',
      url: 'clients',
      sousMenu: [
        {
          id: '31',
          titre: 'Clients',
          icon: 'bi bi-person-circle',
          url: 'clients'
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'bi bi-border-all',
          url: 'commandeclient'
        }
      ]
    },

    {
      id: '4',
      titre: 'Fournisseurs',
      icon: 'bi bi-person-fill',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseurs',
          icon: 'bi bi-person-fill',
          url: 'fournisseurs'
        },
        {
          id: '32',
          titre: 'Commandes fournisseurs',
          icon: 'bi bi-border-all',
          url: 'commandefournisseur'
        }
      ]
    },

    {
      id: '5',
      titre: 'Paramétrages',
      icon: 'bi bi-gear',
      url: '',
      sousMenu: [
        {
          id: '51',
          titre: 'Catégories',
          icon: '',
          url: 'categories'
        },
        {
          id: '52',
          titre: 'Utilisateurs',
          icon: 'bi bi-person-fill',
          url: 'utilisateurs'
        }
      ]
    }
  ]

  constructor(private router: Router) {
  }


  navigate(menu?:Menu) {
    if(this.lastSelectedMenu){
      this.lastSelectedMenu.active = false;
    }
    // @ts-ignore
     menu.active = true;
    this.lastSelectedMenu = menu;
    this.router.navigate([menu? menu.url : undefined]);


  }
}
