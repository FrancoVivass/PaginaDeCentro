import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Career } from '../models/career.model';
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

  selectedCareer: Career | null = null;

  constructor(private careersService: CareersService) {}

  ngOnInit() {
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
    this.selectedCareer = career;
    console.log('Carrera seleccionada:', career);
  }

  clearSelection() {
    this.selectedCareer = null;
  }
}
