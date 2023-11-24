import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  email: string = "saloumfall45@gmail.com";
  motDePasse: string = "";

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {

  }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }


  login() {
    //Affichage message d'erreur
    // Sinon on essaye de trouver le user correspondant✅
    if (this.email == "" || this.motDePasse == "") {
      this.showMessage('error', 'Veuillez remplir les champs');
    } else {
      this.userService.getUserByMail(this.email, this.motDePasse).subscribe(
        (data) => {
          if (data.length === 0) {
            this.showMessage('error', 'Login ou mot de passe incorecte');
          }else{
            console.log(data);
            this.showMessage('success', `Bienvenu ${data[0].prenom} ${data[0].nom}`);

          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des articles', error);
        }
      );

    }
  }
}


