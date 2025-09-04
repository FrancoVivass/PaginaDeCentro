import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  constructor(private router: Router) {}  
  /**
   * Alterna el estado del menú móvil
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Cierra el menú móvil
   */
  closeMenu() {
    this.isMenuOpen = false;
  }

  goHome() {
    this.closeMenu();
    this.router.navigate(['/']); // te lleva al inicio
  }
}
