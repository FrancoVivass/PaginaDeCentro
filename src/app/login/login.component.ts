import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-section">
            <img src="assets/images/logoN.png" alt="Logo Centro Universitario" class="login-logo">
            <h1>Panel de Administración</h1>
          </div>
          <p class="login-subtitle">Acceso exclusivo para administradores</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="login-form" #loginForm="ngForm">
          <!-- Mensaje de error -->
          <div *ngIf="errorMessage" class="error-message">
            <span class="error-icon">⚠️</span>
            {{ errorMessage }}
          </div>

          <!-- Usuario -->
          <div class="form-group">
            <label for="username" class="form-label">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="loginData.username"
              class="form-input"
              placeholder="Ingresa tu usuario"
              required
              [class.error]="showUsernameError"
            >
            <span *ngIf="showUsernameError" class="field-error">El usuario es requerido</span>
          </div>

          <!-- Contraseña -->
          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <div class="password-input-container">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                class="form-input"
                placeholder="Ingresa tu contraseña"
                required
                [class.error]="showPasswordError"
              >
              <button
                type="button"
                class="password-toggle"
                (click)="togglePassword()"
                [attr.aria-label]="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span *ngIf="showPasswordError" class="field-error">La contraseña es requerida</span>
          </div>

          <!-- Botón de envío -->
          <button
            type="submit"
            class="login-button"
            [disabled]="isLoading"
          >
            <span *ngIf="isLoading" class="loading-spinner"></span>
            <span *ngIf="!isLoading">Iniciar Sesión</span>
          </button>
        </form>

        <div class="login-footer">
          <p class="help-text">
            <strong>Credenciales por defecto:</strong><br>
            Usuario: <code>admin</code><br>
            Contraseña: <code>admin2024</code>
          </p>
          <p class="security-note">
            ⚠️ Recuerda cambiar estas credenciales en producción
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showUsernameError = false;
  showPasswordError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.resetErrors();
    
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(
        this.loginData.username,
        this.loginData.password
      );

      if (success) {
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.loginData.username.trim()) {
      this.showUsernameError = true;
      isValid = false;
    }

    if (!this.loginData.password.trim()) {
      this.showPasswordError = true;
      isValid = false;
    }

    return isValid;
  }

  private resetErrors(): void {
    this.errorMessage = '';
    this.showUsernameError = false;
    this.showPasswordError = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
