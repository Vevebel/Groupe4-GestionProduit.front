import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produits/produit.service';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../models/produit';
import Swal from 'sweetalert2';
import { MessagesService } from '../../services/messages/messages.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {

  //attribut lié au formulaire de ajout
  nomProduitToAdd = "";
  descriptionProduitToAdd = "";
  prixToAdd = 0;
  imageToAdd = "";

  //attribut lié au formulaire de modification
  nomProduitToUpdate = "";
  descriptionProduitToUpdate = "";
  prixToUpdate = 0;
  imageToUpdate = "";

  //attribut lié au recuperation de pluisieur produit et d'un produit
  produits?: Observable<Produit[]> | null;
  produit = new Produit;
  currentProduit = new Produit;

  //variable pour recuperer les info l'utilisateur courant
  user: User[] = [];

  constructor(private produitService: ProduitService, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userOnline") || '')
    console.log(this.user)
    this.loadAllProduit();
  }

  //recuperation de tout les produit
  loadAllProduit() {
    this.produits = this.produitService.getProduits(this.user[0].userId ?? 0);
  }

  //recuperation d'un seul produit pour la modification et voir detail
  getProduit(id: number) {
    this.produitService.getProduitById(id).subscribe(
      (data) => {
        // console.log(data);
        this.currentProduit = data;

        //remplir les input⭕?? '': c'est pour dire que par si currentProduit.nom est undefined de mettre chaine vide⭕
        this.nomProduitToUpdate = this.currentProduit.nom ?? '';
        this.descriptionProduitToUpdate = this.currentProduit.description ?? '';
        this.prixToUpdate = this.currentProduit.prix ?? 0;
        this.imageToUpdate = this.currentProduit.image ?? '';
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error);
      }
    );
  }

  //ajouter produit
  addProduit() {
    //attribution des valeur du produit à ajouter dans notre base de donnée
      this.produit.nom = this.nomProduitToAdd,
      this.produit.description = this.descriptionProduitToAdd,
      this.produit.prix = this.prixToAdd,
      this.produit.image = this.imageToAdd,
      this.produit.userId = this.user[0].userId

    //verifiaction des champs non remplie
    if (this.nomProduitToAdd == "" || this.descriptionProduitToAdd == "" || this.prixToAdd == undefined || this.imageToAdd == "") {
      this.messageService.showMessage('error', 'Veuillez remplir tout les champs');
    } else {
      this.produitService.addProduit(this.produit)
        .subscribe(
          (response) => {
            // console.log(response);
            this.messageService.showMessage('success', 'produit ajouter avec succées')
            this.loadAllProduit()

            //vider les champs
            this.nomProduitToAdd = "";
            this.descriptionProduitToAdd = "";
            this.prixToAdd = 0;
            this.imageToAdd = "";
          },
          (error) => {
            // Gestion des erreurs
            console.error('Erreur lors de la mise à jour du produit', error);
          }
        );
    }
  }

  //Mise a jours du produit selectionnée
  updateProduit() {
    //l' id de l'objet à modfier
    const id = this.currentProduit.id;

    //attribution des nouvelles les valeur de l'objet a modifier
    this.currentProduit.nom = this.nomProduitToUpdate,
    this.currentProduit.description = this.descriptionProduitToUpdate,
    this.currentProduit.prix = this.prixToUpdate,
    this.currentProduit.image = this.imageToUpdate,
    this.currentProduit.userId = this.currentProduit.userId

    //verifiaction des champs non remplie
    if (this.nomProduitToUpdate == "" || this.descriptionProduitToUpdate == "" || this.prixToUpdate == undefined || this.imageToUpdate == "") {
      this.messageService.showMessage('error', 'Veuillez remplir tout les champs');
    } else {
      this.produitService.updateProduit(this.currentProduit)
        .subscribe(
          (response) => {
            // console.log(response);
            this.messageService.showMessage('success', 'produit modifier avec succées')
            this.loadAllProduit()
          },
          (error) => {
            // Gestion des erreurs
            console.error('Erreur lors de la mise à jour du produit', error);
          }
        );
    }
  }

  //suppression de produit
  deleteProduit(id: number) {
    Swal.fire({
      title: "Etes vous sure de vouloir supprimer?",
      text: "La suppression du produit sera définitive",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, Je veus supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Suppression!",
          text: "Produit supprimer avec succées.",
          icon: "success"
        });

        //appele notre service qui nous permet de supprimer un produit
        this.produitService.deleteProduit(id)
          .subscribe(
            (response) => {
              // console.log(response);
              this.messageService.showMessage('success', 'produit supprimer avec succées')
              this.loadAllProduit()
            },
            (error) => {
              // Gestion des erreurs
              console.error('Erreur lors de la mise à jour du produit', error);
            }
          );
      }
    });
  }

}
