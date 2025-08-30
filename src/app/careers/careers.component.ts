import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Career } from '../models/career.model';
import { Router } from '@angular/router';
import { CareersService } from '../services/careers.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  careers: Career[] = [];
  filteredCareers: Career[] = [];
  searchTerm = '';
  isLoading = false;
  error = '';
  selectedCareer: Career | null = null;   // 👈 propiedad agregada

  constructor(
    private careersService: CareersService,
    private router: Router
  ) {}

  ngOnInit(): void {   // 👈 obligatorio al implementar OnInit
    this.loadCareers();
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

  filterCareers() {
    if (!this.searchTerm.trim()) {
      this.filteredCareers = this.careers;
      return;
    }
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCareers = this.careers.filter(career =>
      career.name.toLowerCase().includes(term) ||
      career.description.toLowerCase().includes(term) ||
      career.days.some(day => day.toLowerCase().includes(term))
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredCareers = this.careers;
  }

  selectCareer(career: Career) {
    this.selectedCareer = career;   // 👈 guardamos cuál está seleccionada
    this.router.navigate(['/careers', career.id]);
  }
}
