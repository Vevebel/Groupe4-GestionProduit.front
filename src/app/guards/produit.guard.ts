import { CanActivateFn, Router } from '@angular/router';
import { MessagesService } from '../services/messages/messages.service';

export const produitGuard: CanActivateFn = (route, state) => {
  const router=new Router();
  const sweetMessage=new MessagesService();
  if(localStorage.getItem("userOnline")==null || localStorage.getItem("userOnline")==undefined){
    router.navigate(['connexion']);
    sweetMessage.showMessage('error','connectez-vous et arrêtez de faire le malin');
    return false;
  }else{

    return true;
  }
};
