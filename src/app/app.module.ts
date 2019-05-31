
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
import { SpGeneralService } from './sp-general/sp-general.service';
import { QuoteComponent } from './quote/quote.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageService } from './landing-page/landing-page.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ServiceProvidersComponent} from './service-providers/service-providers.component';
import {ServiceProvidersService} from './service-providers/service-providers.service';
import {ServiceProviderOneComponent} from './service-providers/service-provider-one/service-provider-one.component';
import {AddServiceProvidersComponent} from './service-providers/add-service-providers/add-service-providers.component';
import {UpdateServiceProviderComponent} from './service-providers/update-service-provider/update-service-provider.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomerService} from './customer/customer.service';
import {LoginComponent} from './login/login.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {GooglePlacesDirective} from './google-places.directive';
import {ApiService} from './core/api.service';
import {LogoutComponent} from './logout/logout.component';
import {CreateOfferComponent} from './create-offer/create-offer.component';
import {CreateOfferService} from './create-offer/create-offer.service';
import {NotificationComponent} from './notification/notification.component';
import {RegistrationComponent} from './registration/registration.component';
import {RegistrationService} from './registration/registration.service';
import {ListOffersComponent} from './list-offers/list-offers.component';
import {ListOfferService} from './list-offers/list-offer.service';
import {AdminApprovePageComponent} from './admin-approve-page/admin-approve-page.component';
import {MenuBarComponent} from './admin-approve-page/menu-bar/menu-bar.component';
import { VerificationComponent } from './verification/verification.component';
import {NgxCaptchaModule} from 'ngx-captcha';


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
    UpdateServiceProviderComponent,
    CustomerComponent,
    GooglePlacesDirective,
    LoginComponent,
    PasswordRecoveryComponent,
    LogoutComponent,
    RegistrationComponent,
    PasswordRecoveryComponent,
    NotificationComponent,
    CreateOfferComponent,
    NotificationComponent,

    ListOffersComponent,
    AdminApprovePageComponent,
    MenuBarComponent,
    VerificationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ],

  providers: [ServiceProvidersService, CustomerService, ApiService, SpGeneralService, LandingPageService, RegistrationService, CreateOfferService, ListOfferService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
