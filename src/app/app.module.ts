import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageStatistiquesComponent } from './pages/page-statistiques/page-statistiques.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { PageArticleComponent } from './pages/page-article/page-article.component';
import { DetailsArticleComponent } from './components/details-article/details-article.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BouttonActionsComponent } from './components/boutton-actions/boutton-actions.component';
import { NouvelArticleComponent } from './pages/nouvel-article/nouvel-article.component';
import { MvtskComponent } from './pages/mvtsk/mvtsk.component';
import { DetailsMvtskArticleComponent } from './components/details-mvtsk-article/details-mvtsk-article.component';
import { DetailsMvtStkComponent } from './components/details-mvt-stk/details-mvt-stk.component';
import { DetailsCltFrsComponent } from './components/details-clt-frs/details-clt-frs.component';
import { PageClientComponent } from './pages/page-client/page-client.component';
import { PageFournisseurComponent } from './pages/page-fournisseur/page-fournisseur.component';
import { NouveauCltFrsComponent } from './components/nouveau-clt-frs/nouveau-clt-frs.component';
import { DetailsCmdFrsComponent } from './components/details-cmd-frs/details-cmd-frs.component';
import { DetailCommandeComponent } from './components/detail-commande/detail-commande.component';
import { PageCmdCltFrsComponent } from './pages/page-cmd-clt-frs/page-cmd-clt-frs.component';
import { NouvelleCmdCltFrsComponent } from './components/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component';
import { PageCategoriesComponent } from './pages/page-categories/page-categories.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ChangerMotPasseComponent } from './pages/profil/changer-mot-passe/changer-mot-passe.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttInterceptorService } from './services/interceptor/htt-interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    RegistrationPageComponent,
    PageDashboardComponent,
    PageStatistiquesComponent,
    MenuComponent,
    HeaderComponent,
    PageArticleComponent,
    DetailsArticleComponent,
    PaginationComponent,
    BouttonActionsComponent,
    NouvelArticleComponent,
    MvtskComponent,
    DetailsMvtskArticleComponent,
    DetailsMvtStkComponent,
    DetailsCltFrsComponent,
    PageClientComponent,
    PageFournisseurComponent,
    NouveauCltFrsComponent,
    DetailsCmdFrsComponent,
    DetailCommandeComponent,
    PageCmdCltFrsComponent,
    NouvelleCmdCltFrsComponent,
    PageCategoriesComponent,
    NewCategoryComponent,
    PageUserComponent,
    DetailUserComponent,
    NewUserComponent,
    ChangerMotPasseComponent,
    PageProfilComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HttInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
