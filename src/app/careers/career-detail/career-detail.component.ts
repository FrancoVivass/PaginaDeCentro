import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Career } from '../../models/career.model';
import { Teacher } from '../../models/teacher.model';
import { CareersService } from '../../services/careers.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {
  career: Career | null = null;
  teachers: Teacher[] = [];
  isLoading = false;
  error = '';

  // 👇 para el modal
  showShareModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private careersService: CareersService,
    private teachersService: TeachersService
  ) {}

  ngOnInit() {
    this.loadCareer();
    this.loadTeachers();
  }

  loadCareer() {
    this.isLoading = true;
    this.error = '';

    const careerId = this.route.snapshot.paramMap.get('id');
    if (!careerId) {
      this.error = 'ID de carrera no válido';
      this.isLoading = false;
      return;
    }

    this.careersService.getCareerById(parseInt(careerId)).subscribe({
      next: (career) => {
        this.career = career;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los detalles de la carrera. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
        console.error('Error loading career details:', err);
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

  getTeachersForCareer(): Teacher[] {
    if (!this.career?.teachers || !this.teachers.length) {
      return [];
    }
    return this.teachers.filter(teacher => this.career!.teachers!.includes(teacher.id));
  }

  goBack() {
    this.router.navigate(['/careers']);
  }

  // 👇 Métodos de compartir
  openShareModal() {
    this.showShareModal = true;
  }

  closeShareModal() {
    this.showShareModal = false;
  }

  getCurrentUrl(): string {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://centro-universitario.com/careers/${this.career?.id}`; // URL por defecto para SSR
  }

  shareWhatsApp() {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined') return;
    
    const url = this.getCurrentUrl();
    const text = `Mira esta carrera: ${this.career?.name} - ${url}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  }

  shareEmail() {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined') return;
    
    const subject = `Te comparto la carrera: ${this.career?.name}`;
    const body = `Mira esta carrera que encontré:\n\n${this.getCurrentUrl()}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  }

  copyLink() {
    // Solo ejecutar si estamos en el navegador (no en SSR)
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    
    const url = this.getCurrentUrl();
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    }).catch(() => {
      alert('Error al copiar el enlace');
    });
  }
}
