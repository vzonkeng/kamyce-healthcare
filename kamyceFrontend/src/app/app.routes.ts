import { Routes } from '@angular/router';
import { Hero } from './component/hero/hero';
import { Contact } from './component/contact/contact';

export const routes: Routes = [
  { path: '', component: Hero }, // ta page d’accueil
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
