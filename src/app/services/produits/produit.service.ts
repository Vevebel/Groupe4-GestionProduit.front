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

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.api}/produits`);
  }

  getProduitById(id: number):Observable<Produit> {
    return this.http.get<Produit>(`${this.api}/produits/${id}`);
  }

  addProduit(data: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.api}produits`, data);
  }

  updateProduit(id: number, data: any): Observable<Produit> {
    return this.http.put<Produit>(`${this.api}produits/${id}`, data);
  }

  deleteProduit(id: number): Observable<Produit>{
    return this.http.delete<Produit>(`${this.api}produits/${id}`);
  }

}
