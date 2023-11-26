import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProduitService } from './services/produits/produit.service';
import { UserService } from './services/users/user.service';
import { MessagesService } from './services/messages/messages.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule,FormsModule],
  providers: [ProduitService, UserService, MessagesService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'produit-ng-loopBack'
}
