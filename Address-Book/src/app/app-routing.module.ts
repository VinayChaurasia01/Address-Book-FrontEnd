import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

const routes: Routes = [
  { path: '', component: PersonListComponent }, // Default: Shows list
  { path: 'add', component: PersonFormComponent }, // Shows form only when adding
  { path: 'edit/:id', component: PersonFormComponent } // Shows form only when editing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
