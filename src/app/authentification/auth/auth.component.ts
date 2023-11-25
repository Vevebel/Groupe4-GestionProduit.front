import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  email: string = "";
  motDePasse: string = "";

  constructor(private userService: UserService, private route: Router, private messageService: MessagesService) { }

  ngOnInit(): void {

  }


  login() {
    //Affichage message d'erreur
    // Sinon on essaye de trouver le user correspondant✅
    if (this.email == "" || this.motDePasse == "") {
      this.messageService.showMessage('error', 'Veuillez remplir les champs');
    } else {
      this.userService.getUserByMail(this.email, this.motDePasse).subscribe(
        (data) => {
          if (data.length === 0) {
            this.messageService.showMessage('error', 'Login ou mot de passe incorecte');
          }else{

            this.messageService.showMessage('success', `Bienvenu ${data[0].prenom} ${data[0].nom}`);

            //redirection si tout ce passe bien
            this.route.navigate(['/', 'produit']);

            //recuperer l'objet de l'utilisateur connecter
            localStorage.setItem("userOnline", JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des articles', error);
        }
      );

    }
  }
}



