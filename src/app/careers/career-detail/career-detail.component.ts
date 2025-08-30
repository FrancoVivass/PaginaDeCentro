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
}