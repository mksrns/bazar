import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from '../app/_helpers/index';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; 

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomepageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
