import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { DroidShowcaseComponent } from './components/droid-showcase/droid-showcase.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BbThreeWidgetComponent } from './components/droid-showcase/showcase-bb-eight/bb-three-widget/bb-three-widget.component';
import { BbOverlayComponent } from './components/droid-showcase/showcase-bb-eight/bb-overlay/bb-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    DroidShowcaseComponent,
    OrderPageComponent,
    PageNotFoundComponent,
    BbThreeWidgetComponent,
    BbOverlayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
