import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Career } from '../models/career.model';
import { Teacher } from '../models/teacher.model';
import { Router } from '@angular/router';
import { CareersService } from '../services/careers.service';
import { TeachersService } from '../services/teachers.service';
import { ContactInfoComponent } from '../components/contact-info.component';


@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactInfoComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  careers: Career[] = [];
  filteredCareers: Career[] = [];
  teachers: Teacher[] = [];
  searchTerm = '';
  isLoading = false;
  error = '';
  selectedCareer: Career | null = null;
  showShareModal = false;
  careerToShare: Career | null = null;
  
  // Nuevas propiedades para filtros
  availableDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  selectedDays: string[] = [];

  constructor(
    private careersService: CareersService,
    private teachersService: TeachersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCareers();
    this.loadTeachers();
  }

  loadCareers() {
    this.isLoading = true;
    this.error = '';

    this.careersService.getCareers().subscribe({
      next: (careers) => {
        this.careers = careers;
        this.filteredCareers = careers;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las carreras. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
        console.error('Error loading careers:', err);
      }
    });
  }

  loadTeachers() {
    this.teachersService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (err) => {
        console.error('Error loading teachers:', err);
      }
    });
  }

  getTeachersForCareer(career: Career): Teacher[] {
    if (!career.teachers || !this.teachers.length) {
      return [];
    }
    return this.teachers.filter(teacher => career.teachers!.includes(teacher.id));
  }

  filterCareers() {
    let filtered = this.careers;
    
    // Filtro por texto de búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(career =>
        career.name.toLowerCase().includes(term) ||
        career.description.toLowerCase().includes(term) ||
        career.days.some(day => day.toLowerCase().includes(term)) ||
        this.getTeachersForCareer(career).some(teacher => 
          teacher.fullName.toLowerCase().includes(term)
        )
      );
    }
    
    // Filtro por días seleccionados
    if (this.selectedDays.length > 0) {
      filtered = filtered.filter(career =>
        this.selectedDays.some(selectedDay =>
          career.days.some(day => day.toLowerCase().includes(selectedDay.toLowerCase()))
        )
      );
    }
    
    this.filteredCareers = filtered;
  }
  
  toggleDayFilter(day: string) {
    const index = this.selectedDays.indexOf(day);
    if (index > -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
    this.filterCareers();
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedDays = [];
    this.filteredCareers = this.careers;
  }

  selectCareer(career: Career) {
    this.selectedCareer = career;
    this.router.navigate(['/careers', career.id]);
  }

  // Métodos de compartir para carreras individuales
  openShareModal(career: Career, event: Event) {
    event.stopPropagation(); // Evita que se active la navegación de la tarjeta
    this.careerToShare = career;
    this.showShareModal = true;
  }

  closeShareModal() {
    this.showShareModal = false;
    this.careerToShare = null;
  }

  getCurrentUrl(): string {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://centro-universitario.com'; // URL por defecto para SSR
  }

  getCareerUrl(career: Career): string {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/careers/${career.id}`;
    }
    return `https://centro-universitario.com/careers/${career.id}`; // URL por defecto para SSR
  }

  shareWhatsApp() {
    if (!this.careerToShare) return;
    
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined') return;
    
    const url = this.getCareerUrl(this.careerToShare);
    const text = `Mira esta carrera: ${this.careerToShare.name} - ${url}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  }

  shareEmail() {
    if (!this.careerToShare) return;
    
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined') return;
    
    const subject = `Te comparto la carrera: ${this.careerToShare.name}`;
    const body = `Mira esta carrera que encontré:\n\n${this.getCareerUrl(this.careerToShare)}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  }

  copyLink() {
    if (!this.careerToShare) return;
    
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    
    const url = this.getCareerUrl(this.careerToShare);
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    }).catch(() => {
      alert('Error al copiar el enlace');
    });
  }
}
