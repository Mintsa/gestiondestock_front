import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {PageDashboardComponent} from "./pages/page-dashboard/page-dashboard.component";
import {PageStatistiquesComponent} from "./pages/page-statistiques/page-statistiques.component";
import {PageArticleComponent} from "./pages/page-article/page-article.component";
import {NouvelArticleComponent} from "./pages/nouvel-article/nouvel-article.component";
import {MvtskComponent} from "./pages/mvtsk/mvtsk.component";
import {PageClientComponent} from "./pages/page-client/page-client.component";
import {PageFournisseurComponent} from "./pages/page-fournisseur/page-fournisseur.component";
import {NouveauCltFrsComponent} from "./components/nouveau-clt-frs/nouveau-clt-frs.component";
import {PageCmdCltFrsComponent} from "./pages/page-cmd-clt-frs/page-cmd-clt-frs.component";
import {NouvelleCmdCltFrsComponent} from "./components/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component";
import {PageCategoriesComponent} from "./pages/page-categories/page-categories.component";
import {NewCategoryComponent} from "./components/new-category/new-category.component";
import {PageUserComponent} from "./pages/page-user/page-user.component";
import {NewUserComponent} from "./pages/new-user/new-user.component";
import {ChangerMotPasseComponent} from "./pages/profil/changer-mot-passe/changer-mot-passe.component";
import {PageProfilComponent} from "./pages/profil/page-profil/page-profil.component";
import { ApplicationGardService } from './services/gard/application-gard.service';




const routes: Routes = [
  {
    path:'login', component: PageLoginComponent
  },
  {
    path:'inscription', component: RegistrationPageComponent
  },
  {
    path:'', component : PageDashboardComponent,
    canActivate:[ApplicationGardService],

    children: [
      {
        path:'statistiques', component: PageStatistiquesComponent,

      },
      {
        path:'articles', component: PageArticleComponent,

      },
      {
        path:'nouvelarticle', component: NouvelArticleComponent,
      },
      {
        path:'nouvelarticle/:idArticle', component: NouvelArticleComponent,
      },
      {
        path:'mvtsk', component: MvtskComponent,

      },
      {
        path:'clients', component: PageClientComponent,


      },
      {
        path:'nouveauclient', component: NouveauCltFrsComponent,
        data:{
          origine: 'client'
        }
      },
      {
        path:'nouveauclient/:id', component: NouveauCltFrsComponent,
        data:{
          origine: 'client'
        }
      },
      {
        path:'commandeclient', component: PageCmdCltFrsComponent,

        data: {
          origine: 'client'
        }
      },
      {
        path:'nouvellecommandeclient', component: NouvelleCmdCltFrsComponent,

        data:{
          origine: 'client'
        }
      },
      {
        path:'fournisseurs', component: PageFournisseurComponent,

      },
      {
        path:'nouveaufournisseur', component: NouveauCltFrsComponent,

        data:{
          origine: 'fournisseur'
        }
      },
      {
        path:'nouveaufournisseur/:id', component: NouveauCltFrsComponent,

        data:{
          origine: 'fournisseur'
        }
      },
      {
        path:'nouvellecommandefournisseur', component: NouvelleCmdCltFrsComponent,

        data:{
          origine: 'fournisseur'
        }
      },
      {
        path:'commandefournisseur', component: PageCmdCltFrsComponent,

        data:{
          origine: 'fournisseur'
        }
      },
      {
        path:'categories', component: PageCategoriesComponent,

      },
      {
        path:'newcategory', component: NewCategoryComponent
      },
      {
        path:'newcategory/:idCategory', component: NewCategoryComponent
      },
      {
        path:'utilisateurs', component: PageUserComponent
      },
      {
        path:'newuser', component: NewUserComponent
      },
      {
        path:'changermotdepasse', component: ChangerMotPasseComponent
      },
      {
        path:'profil', component: PageProfilComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
