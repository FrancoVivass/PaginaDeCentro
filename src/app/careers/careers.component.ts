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
    if (!this.searchTerm.trim()) {
      this.filteredCareers = this.careers;
      return;
    }
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCareers = this.careers.filter(career =>
      career.name.toLowerCase().includes(term) ||
      career.description.toLowerCase().includes(term) ||
      career.days.some(day => day.toLowerCase().includes(term)) ||
      this.getTeachersForCareer(career).some(teacher => 
        teacher.fullName.toLowerCase().includes(term)
      )
    );
  }

  clearSearch() {
    this.searchTerm = '';
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
    return window.location.href;
  }

  getCareerUrl(career: Career): string {
    return `${window.location.origin}/careers/${career.id}`;
  }

  shareWhatsApp() {
    if (!this.careerToShare) return;
    const url = encodeURIComponent(this.getCareerUrl(this.careerToShare));
    const text = encodeURIComponent(`Mira esta carrera: ${this.careerToShare.name} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareEmail() {
    if (!this.careerToShare) return;
    const subject = encodeURIComponent(`Te comparto la carrera: ${this.careerToShare.name}`);
    const body = encodeURIComponent(`Mira esta carrera que encontré:\n\n${this.getCareerUrl(this.careerToShare)}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  copyLink() {
    if (!this.careerToShare) return;
    const url = this.getCareerUrl(this.careerToShare);
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    });
  }
}
