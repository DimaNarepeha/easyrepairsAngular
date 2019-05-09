import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceProvidersComponent } from './service-providers/service-providers.component';
import { ServiceProvidersService } from './service-providers/service-providers.service';
import { ServiceProviderOneComponent } from './service-providers/service-provider-one/service-provider-one.component';
import { AddServiceProvidersComponent } from './service-providers/add-service-providers/add-service-providers.component';
import { UpdateServiceProviderComponent } from './service-providers/update-service-provider/update-service-provider.component';

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
    ServiceProvidersComponent,
    ServiceProviderOneComponent,
    AddServiceProvidersComponent,
    UpdateServiceProviderComponent
  ],
  imports: [
    BrowserModule,
AppRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServiceProvidersService],

  bootstrap: [AppComponent]
})
export class AppModule { }
