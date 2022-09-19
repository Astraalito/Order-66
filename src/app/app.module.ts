import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DroidShowcaseComponent } from './components/droid-showcase/droid-showcase.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ThreeWidgetComponent } from './components/three-widget/three-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    DroidShowcaseComponent,
    OrderPageComponent,
    PageNotFoundComponent,
    ThreeWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
