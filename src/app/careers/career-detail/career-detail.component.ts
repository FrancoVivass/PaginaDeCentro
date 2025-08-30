import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Career } from '../../models/career.model';
import { CareersService } from '../../services/careers.service';

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {
  career: Career | null = null;
  isLoading = false;
  error = '';

  // 👇 para el modal
  showShareModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private careersService: CareersService
  ) {}

  ngOnInit() {
    this.loadCareer();
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
    return window.location.href;
  }

  shareWhatsApp() {
    const url = encodeURIComponent(this.getCurrentUrl());
    const text = encodeURIComponent(`Mira esta carrera: ${this.career?.name} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareEmail() {
    const subject = encodeURIComponent(`Te comparto la carrera: ${this.career?.name}`);
    const body = encodeURIComponent(`Mira esta carrera que encontré:\n\n${this.getCurrentUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  copyLink() {
    const url = this.getCurrentUrl();
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    });
  }
}
