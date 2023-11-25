export interface IUser {
  userId?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  motDePasse?: string;
}

export class User implements IUser {
  constructor(
    public userId?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public motDePasse?: string,
  ) {
    this.userId = userId;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.motDePasse = motDePasse;
  }
}

