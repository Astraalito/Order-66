import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DroidShowcaseComponent } from './components/droid-showcase/droid-showcase.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ThreeWidgetComponent } from './components/three-widget/three-widget.component';
import { BbEightSectionOneComponent } from './components/droid-showcase/showcase-bb-eight/bb-eight-section-one/bb-eight-section-one.component';
import { BbEightSectionTwoComponent } from './components/droid-showcase/showcase-bb-eight/bb-eight-section-two/bb-eight-section-two.component';
import { BbEightSectionThreeComponent } from './components/droid-showcase/showcase-bb-eight/bb-eight-section-three/bb-eight-section-three.component';

@NgModule({
  declarations: [
    AppComponent,
    DroidShowcaseComponent,
    OrderPageComponent,
    PageNotFoundComponent,
    ThreeWidgetComponent,
    BbEightSectionOneComponent,
    BbEightSectionTwoComponent,
    BbEightSectionThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
