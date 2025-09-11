import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  contactInfo = {
    address: 'Buenos Aires 565, Dolores, Buenos Aires, Argentina',
    phone: '2245 445999',
    // CAMBIA ESTE EMAIL POR EL TUYO:
    email: 'coesdolores@gmail.com',
    // O si quieres agregar más emails:
    additionalEmails: [
      'coesdolores@gmail.com'
    ],
    hours: 'Lunes a Viernes: 7:00 a 13:00 hs\nMartes a Viernes: 7:00 a 18:00 hs'
  };
}
