import { Routes } from '@angular/router';
import { AuthComponent } from './authentification/auth/auth.component';
import { ProduitComponent } from './produit/produit.component';


export const routes: Routes = [
  {path: 'connexion', component: AuthComponent},
  {path: 'produit', component: ProduitComponent},
  {path: '', redirectTo: 'produit', pathMatch: 'full'}
];
