import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AdminUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Credenciales del administrador (en producción esto debería estar en el backend)
  private readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin2024', // Cambia esta contraseña por una más segura
    user: {
      id: 1,
      username: 'admin',
      name: 'Administrador del Centro',
      email: 'admin@centrouniversitario.edu',
      role: 'admin' as const
    }
  };

  constructor(private router: Router) {
    // Verificar si hay una sesión activa al iniciar
    this.checkStoredSession();
  }

  /**
   * Inicia sesión del administrador
   */
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simular delay de red
      setTimeout(() => {
        if (username === this.ADMIN_CREDENTIALS.username && 
            password === this.ADMIN_CREDENTIALS.password) {
          
          // Guardar sesión
          this.setSession(this.ADMIN_CREDENTIALS.user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  /**
   * Cierra la sesión del administrador
   */
  logout(): void {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica si el usuario tiene permisos de administrador
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  /**
   * Guarda la sesión en localStorage
   */
  private setSession(user: AdminUser): void {
    const token = this.generateToken();
    const sessionData = {
      user,
      token,
      timestamp: new Date().getTime()
    };

    localStorage.setItem('admin_session', JSON.stringify(sessionData));
    localStorage.setItem('admin_token', token);
    this.currentUserSubject.next(user);
  }

  /**
   * Verifica la sesión almacenada
   */
  private checkStoredSession(): void {
    const sessionData = localStorage.getItem('admin_session');
    const token = localStorage.getItem('admin_token');

    if (sessionData && token) {
      try {
        const session = JSON.parse(sessionData);
        const now = new Date().getTime();
        const sessionAge = now - session.timestamp;
        
        // La sesión expira después de 24 horas
        if (sessionAge < 24 * 60 * 60 * 1000) {
          this.currentUserSubject.next(session.user);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  /**
   * Genera un token simple (en producción usar JWT)
   */
  private generateToken(): string {
    return 'admin_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  /**
   * Actualiza la información del usuario
   */
  updateUserInfo(userData: Partial<AdminUser>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.currentUserSubject.next(updatedUser);
      
      // Actualizar en localStorage
      const sessionData = localStorage.getItem('admin_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        session.user = updatedUser;
        localStorage.setItem('admin_session', JSON.stringify(session));
      }
    }
  }
}
