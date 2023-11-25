import { User } from "./user";

export interface IProduit {
  id?: number;
  nom?: string;
  description?: string;
  prix?: number;
  image?: string;
  userId?: number;
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public nom?: string,
    public description?: string,
    public prix?: number,
    public image?: string,
    public userId?: number,
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.image = image;
    this.userId = userId;
  }
}
