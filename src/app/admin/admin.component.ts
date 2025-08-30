import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Career } from '../models/career.model';
import { CareersService } from '../services/careers.service';
import { AuthService, AdminUser } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard">
      <header class="admin-header">
        <div class="container">
          <div class="header-content">
            <div class="header-info">
              <h1>Panel de Administración</h1>
              <p>Gestiona el contenido de la sede universitaria</p>
            </div>
            <div class="user-info">
              <span class="welcome-text">Bienvenido, {{ currentUser?.name }}</span>
              <button class="logout-btn" (click)="logout()">
                <span class="logout-icon">🚪</span>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <div class="container">
          <div class="admin-stats animate-fade-in-up">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-info">
                <h3>{{ careers.length }}</h3>
                <p>Carreras Activas</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <h3>150+</h3>
                <p>Estudiantes</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👨‍🏫</div>
              <div class="stat-info">
                <h3>25+</h3>
                <p>Profesores</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-info">
                <h3>5</h3>
                <p>Eventos Próximos</p>
              </div>
            </div>
          </div>

          <div class="admin-sections">
            <section class="admin-section animate-fade-in-up">
              <div class="section-header">
                <h2>Gestión de Carreras</h2>
                <button class="btn btn-primary" (click)="showAddCareerForm = true">
                  + Agregar Carrera
                </button>
              </div>

              <div class="careers-list">
                <div *ngFor="let career of careers" class="career-item">
                  <div class="career-info">
                    <h3>{{ career.name }}</h3>
                    <p>{{ career.description }}</p>
                    <div class="career-meta">
                      <span class="meta-item">ID: {{ career.id }}</span>
                      <span class="meta-item">Días: {{ career.days.join(', ') }}</span>
                    </div>
                  </div>
                  <div class="career-actions">
                    <button class="btn btn-secondary" (click)="editCareer(career)">
                      Editar
                    </button>
                    <button class="btn btn-danger" (click)="deleteCareer(career.id)">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section class="admin-section animate-fade-in-up">
              <div class="section-header">
                <h2>Configuración General</h2>
              </div>
              
              <div class="config-grid">
                <div class="config-card">
                  <h3>Información de Contacto</h3>
                  <div class="form-group">
                    <label>Email Principal</label>
                    <input type="email" class="form-input" value="info@sedeuniversitaria.com">
                  </div>
                  <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" class="form-input" value="+54 11 1234-5678">
                  </div>
                  <div class="form-group">
                    <label>Dirección</label>
                    <textarea class="form-textarea">Av. Principal 123, Ciudad</textarea>
                  </div>
                  <button class="btn btn-primary">Guardar Cambios</button>
                </div>

                <div class="config-card">
                  <h3>Redes Sociales</h3>
                  <div class="form-group">
                    <label>Facebook</label>
                    <input type="url" class="form-input" value="https://facebook.com/sedeuniversitaria">
                  </div>
                  <div class="form-group">
                    <label>Instagram</label>
                    <input type="url" class="form-input" value="https://instagram.com/sedeuniversitaria">
                  </div>
                  <div class="form-group">
                    <label>LinkedIn</label>
                    <input type="url" class="form-input" value="https://linkedin.com/company/sedeuniversitaria">
                  </div>
                  <button class="btn btn-primary">Guardar Cambios</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal para agregar/editar carrera -->
    <div *ngIf="showAddCareerForm" class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ editingCareer ? 'Editar' : 'Agregar' }} Carrera</h3>
          <button class="modal-close" (click)="closeModal()">×</button>
        </div>
        
        <form (ngSubmit)="saveCareer()" class="modal-form">
          <div class="form-group">
            <label>Nombre de la Carrera</label>
            <input type="text" class="form-input" [(ngModel)]="careerForm.name" name="name" required>
          </div>
          
          <div class="form-group">
            <label>Descripción</label>
            <textarea class="form-textarea" [(ngModel)]="careerForm.description" name="description" required></textarea>
          </div>
          
          <div class="form-group">
            <label>Días de Cursada</label>
            <div class="days-checkboxes">
              <label class="checkbox-item">
                <input type="checkbox" [(ngModel)]="careerForm.days" name="days" value="Lunes">
                Lunes
              </label>
              <label class="checkbox-item">
                <input type="checkbox" [(ngModel)]="careerForm.days" name="days" value="Martes">
                Martes
              </label>
              <label class="checkbox-item">
                <input type="checkbox" [(ngModel)]="careerForm.days" name="days" value="Miércoles">
                Miércoles
              </label>
              <label class="checkbox-item">
                <input type="checkbox" [(ngModel)]="careerForm.days" name="days" value="Jueves">
                Jueves
              </label>
              <label class="checkbox-item">
                <input type="checkbox" [(ngModel)]="careerForm.days" name="days" value="Viernes">
                Viernes
              </label>
            </div>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
            <button type="submit" class="btn btn-primary">{{ editingCareer ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  careers: Career[] = [];
  showAddCareerForm = false;
  editingCareer: Career | null = null;
  currentUser: AdminUser | null = null;
  
  careerForm = {
    name: '',
    description: '',
    days: [] as string[]
  };

  constructor(
    private careersService: CareersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadCareers();
  }

  loadCareers() {
    this.careersService.getCareers().subscribe({
      next: (careers) => {
        this.careers = careers;
      },
      error: (err) => {
        console.error('Error loading careers:', err);
      }
    });
  }

  editCareer(career: Career) {
    this.editingCareer = career;
    this.careerForm = {
      name: career.name,
      description: career.description,
      days: [...career.days]
    };
    this.showAddCareerForm = true;
  }

  deleteCareer(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta carrera?')) {
      // Aquí iría la lógica para eliminar la carrera
      console.log('Eliminar carrera:', id);
    }
  }

  saveCareer() {
    if (this.editingCareer) {
      // Actualizar carrera existente
      console.log('Actualizar carrera:', this.careerForm);
    } else {
      // Agregar nueva carrera
      console.log('Agregar carrera:', this.careerForm);
    }
    this.closeModal();
  }

  closeModal() {
    this.showAddCareerForm = false;
    this.editingCareer = null;
    this.careerForm = {
      name: '',
      description: '',
      days: []
    };
  }

  logout() {
    this.authService.logout();
  }
}
