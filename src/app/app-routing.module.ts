import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciComponent } from './components/inici/inici.component';
import { MenuComponent } from './components/menu/menu.component';
import { EstacionsComponent } from './components/estacions/estacions.component';
import { PrediccioComponent } from './components/prediccio/prediccio.component';
import { EstatAiguaComponent } from './components/estat-aigua/estat-aigua.component';
import { EstacionsDetailComponent } from './components/estacions-detail/estacions-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PremiumGuard } from './guards/premium.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeGuard } from './guards/home.guard';
import { SubscripcioComponent } from './components/subscripcio/subscripcio.component';
import { SubscriptionGuard } from './guards/subscription.guard';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'estacions/:id', component: EstacionsDetailComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'estacions', component: EstacionsComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'prediccio', component: PrediccioComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'estat-aigua', component: EstatAiguaComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'menu', component: MenuComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'inici', component: IniciComponent, canActivate: [HomeGuard, PremiumGuard], data: {expectedRoles: ['admin', 'premium']}},
  { path: 'subscripcio', component: SubscripcioComponent, canActivate: [HomeGuard, SubscriptionGuard]},
  { path: 'perfil', component: PerfilComponent, canActivate: [HomeGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
