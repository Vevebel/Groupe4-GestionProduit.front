import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProduitService } from './services/produits/produit.service';
import { UserService } from './services/users/user.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ProduitService, UserService]
};
