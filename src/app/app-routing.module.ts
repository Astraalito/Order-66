import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DroidShowcaseComponent } from './components/droid-showcase/droid-showcase.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';

const routes: Routes = [
  { path: 'showcase', component: DroidShowcaseComponent },
  { path: 'order', component: InProgressComponent },
  { path: '',   redirectTo: '/showcase', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
