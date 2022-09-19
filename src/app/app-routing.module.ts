import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { DroidShowcaseComponent } from './components/droid-showcase/droid-showcase.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'showcase', component: DroidShowcaseComponent },
  { path: 'order', component: OrderPageComponent },
  { path: '',   redirectTo: '/showcase', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
