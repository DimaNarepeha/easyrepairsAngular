import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ServiceProvidersComponent} from './service-providers/service-providers.component';
import {ServiceProviderOneComponent} from './service-providers/service-provider-one/service-provider-one.component';
import {AddServiceProvidersComponent} from './service-providers/add-service-providers/add-service-providers.component';
import {UpdateServiceProviderComponent} from './service-providers/update-service-provider/update-service-provider.component';
import {CustomerComponent} from './customer/customer.component';
import {LoginComponent} from './login/login.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {RegistrationComponent} from './registration/registration.component';
import {CreateOfferComponent} from './create-offer/create-offer.component';
import {ListOffersComponent} from './list-offers/list-offers.component';
import {LogoutComponent} from './logout/logout.component';
import {AdminApprovePageComponent} from './admin-approve-page/admin-approve-page.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {VerificationComponent} from './verification/verification.component';
import {MyProfileComponent} from "./my-profile/my-profile.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login/verify/:activationCode', component: VerificationComponent},
  {path: 'service-providers', component: ServiceProvidersComponent},
  {path: 'add-service-provider', component: AddServiceProvidersComponent},
  {path: 'service-providers/:id', component: ServiceProviderOneComponent},
  {path: 'update-service-provider/:id', component: UpdateServiceProviderComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: PasswordRecoveryComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'recovery', component: PasswordRecoveryComponent},
  {path: 'create-offer', component: CreateOfferComponent},
  {path: 'list-offers', component: ListOffersComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'recovery', component: PasswordRecoveryComponent},
  {path: 'admin-approve', component: AdminApprovePageComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'my-profile', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
