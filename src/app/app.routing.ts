import { HelloGreetsComponent } from './hello-greets/hello-greets.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';

const routes: Routes = [
  { path: '', component: ActionsComponent },
  { path: 'hellogreets', component: HelloGreetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

