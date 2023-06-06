import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciComponent } from './components/inici/inici.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { EstacionsComponent } from './components/estacions/estacions.component';
import { PrediccioComponent } from './components/prediccio/prediccio.component';
import { EstatAiguaComponent } from './components/estat-aigua/estat-aigua.component';
import { EstacionsDetailComponent } from './components/estacions-detail/estacions-detail.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SubscripcioComponent } from './components/subscripcio/subscripcio.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciComponent,
    NavbarComponent,
    MenuComponent,
    EstacionsComponent,
    PrediccioComponent,
    EstatAiguaComponent,
    EstacionsDetailComponent,
    LoginComponent,
    RegisterComponent,
    SubscripcioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
