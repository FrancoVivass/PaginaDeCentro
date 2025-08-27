import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('light');
  public currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    // Cargar tema guardado en localStorage o usar el preferido del sistema
    this.loadTheme();
  }

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }

  /**
   * Cambia al modo claro
   */
  setLightTheme(): void {
    this.setTheme('light');
  }

  /**
   * Cambia al modo oscuro
   */
  setDarkTheme(): void {
    this.setTheme('dark');
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Establece un tema específico
   */
  private setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(theme: Theme): void {
    const body = document.body;
    
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  /**
   * Carga el tema guardado o detecta el preferido del sistema
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * Escucha cambios en la preferencia del sistema
   */
  watchSystemPreference(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
