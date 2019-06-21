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
import {ChatComponent} from './chat/chat.component';
import {ChatsComponent} from './chat/chats/chats';
import {FeedbackComponent} from './feedback/feedback.component';
import {VerificationComponent} from './verification/verification.component';
import {AdminApproveStartComponent} from "./admin-approve-page/admin-approve-start/admin-approve-start.component";
import {ServiceProviderViewComponent} from "./admin-approve-page/service-provider-view/service-provider-view.component";
import {CustomerViewComponent} from "./admin-approve-page/customer-view/customer-view.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {PortfolioComponent} from './portfolio/portfolio.component';
import {EditPostComponent} from './portfolio/edit-post/edit-post.component';
import {AddPostComponent} from './portfolio/add-post/add-post.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {NotFoundComponent} from './error-page/not-found/not-found.component';
import {CreateContractComponent} from './create-contract/create-contract.component';
import {ListContractsComponent} from './list-contracts/list-contracts.component';
import {InternalServerErrorComponent} from "./error-page/internal-server-error/internal-server-error.component";

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
  {path: 'create-offer', component: CreateOfferComponent},
  {path: 'list-offers', component: ListOffersComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'recovery', component: PasswordRecoveryComponent},
  {path: 'admin-approve', component: AdminApprovePageComponent, children:[
      {path: '', component: AdminApproveStartComponent},
      {path: 'service-providers', component: ServiceProviderViewComponent},
      {path: 'customers', component: CustomerViewComponent}
    ]},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:id', component: ChatComponent},
  {path: 'chat/:id/:sentBy', component: ChatComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'favourite', component: FavoriteComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'provider-portfolio/:id', component: PortfolioComponent},
  {path: 'portfolio/edit-post/:id', component: EditPostComponent},
  {path: 'portfolio/add-post/:id', component: AddPostComponent},
  {path: 'chats', component: ChatsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'create-contract/:id', component: CreateContractComponent},
  {path: 'list-contracts', component: ListContractsComponent},
  {path: 'server-error', component: InternalServerErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
