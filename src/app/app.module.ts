import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { NavComponent } from './nav/nav.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SpGeneralComponent } from './sp-general/sp-general.component';
import { QuoteComponent } from './quote/quote.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    NavComponent,
    FilterComponent,
    FooterComponent,
    PaginationComponent,
    SpGeneralComponent,
    QuoteComponent,
    LandingPageComponent,
    LoginComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
