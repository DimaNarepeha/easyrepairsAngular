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
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'service-providers', component: ServiceProvidersComponent},
  {path: 'add-service-provider', component: AddServiceProvidersComponent},
  {path: 'service-providers/:id', component: ServiceProviderOneComponent},
  {path: 'update-service-provider/:id', component: UpdateServiceProviderComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'recovery', component: PasswordRecoveryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
