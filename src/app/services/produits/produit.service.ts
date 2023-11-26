import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'
import { Produit } from '../../models/produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
   api ="http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getProduits(id: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.api}/produits?filter={"where":{"userId":"${id}"}}`);
  }

  getProduitById(id: number):Observable<Produit> {
    return this.http.get<Produit>(`${this.api}/produits/${id}`);
  }

  addProduit(data: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.api}produits`, data);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.api}produits/${produit.id}`, produit);
  }

  deleteProduit(id: number): Observable<Produit>{
    return this.http.delete<Produit>(`${this.api}produits/${id}`);
  }

}
