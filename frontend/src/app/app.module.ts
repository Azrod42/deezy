import {NgModule, PipeTransform} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import {HomeComponentD} from "./dashboard/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SongComponent } from './dashboard/song/song.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    TopbarComponent,
    HomeComponentD,
    SongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
