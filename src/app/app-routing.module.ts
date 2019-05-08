import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:' ', component:LandingPageComponent},
  {path:'customers', component:CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
