import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, motDePasse: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users?filter={"where":{"email":"${email}","motDePasse":"${motDePasse}"}}`);
  }





}
