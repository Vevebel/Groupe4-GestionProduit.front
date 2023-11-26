import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { AuthComponent } from './components/authentification/auth/auth.component';


export const routes: Routes = [
  {path: 'connexion', component: AuthComponent},
  {path: 'produit', component: ProduitComponent},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'}
];
