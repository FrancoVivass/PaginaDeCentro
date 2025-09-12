import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // Pestaña activa por defecto
  activeTab: 'reservar' | 'guia' | 'politica' = 'reservar';

  // Cambiar pestaña activa
  setTab(tab: 'reservar' | 'guia' | 'politica') {
    this.activeTab = tab;
  }
}
