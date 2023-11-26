import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { AuthComponent } from './components/authentification/auth/auth.component';
import { produitGuard } from './guards/produit.guard';


export const routes: Routes = [
  {path: 'connexion', component: AuthComponent},
  {path: 'produit', component: ProduitComponent,canActivate:[produitGuard]},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'}
];
