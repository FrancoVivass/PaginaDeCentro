import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="faq-section">
      <div class="container">
        <div class="faq-header animate-fade-in-up">
          <h2>Preguntas Frecuentes</h2>
          <p>Encuentra respuestas a las preguntas más comunes sobre nuestra institución</p>
        </div>

        <div class="faq-filters animate-fade-in-up">
          <button 
            *ngFor="let category of categories" 
            class="filter-btn"
            [class.active]="selectedCategory === category"
            (click)="filterByCategory(category)"
            [attr.aria-label]="'Filtrar por ' + category">
            {{ category }}
          </button>
        </div>

        <div class="faq-list">
          <div 
            *ngFor="let item of filteredFaqs; trackBy: trackByFn" 
            class="faq-item animate-fade-in-up"
            [class.open]="item.isOpen">
            
            <button 
              class="faq-question"
              (click)="toggleFaq(item)"
              [attr.aria-expanded]="item.isOpen"
              [attr.aria-controls]="'faq-answer-' + item.question">
              
              <span class="question-text">{{ item.question }}</span>
              
              <div class="faq-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                </svg>
              </div>
            </button>
            
            <div 
              class="faq-answer"
              [id]="'faq-answer-' + item.question"
              [@slideAnimation]="item.isOpen ? 'open' : 'closed'">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-contact animate-fade-in-up">
          <p>¿No encontraste lo que buscabas?</p> <button>
          <a routerLink="" fragment="#formularios">Ir a Contacto</a>
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  selectedCategory = 'Todas';
  categories = ['Todas', 'Inscripciones', 'Carreras', 'Horarios', 'Pagos'];

  faqs: FAQItem[] = [
    {
      question: '¿Cuáles son los requisitos para inscribirse?',
      answer: 'Para inscribirte necesitas: DNI, título secundario (original y copia), 2 fotos 4x4, certificado de buena conducta y pago de matrícula.',
      category: 'Inscripciones',
      isOpen: false
    },
    {
      question: '¿Qué carreras ofrecen?',
      answer: 'Ofrecemos Ingeniería en Sistemas, Licenciatura en Administración, Contador Público, Ingeniería Industrial y Psicología.',
      category: 'Carreras',
      isOpen: false
    },
    {
      question: '¿Cuáles son los horarios de cursada?',
      answer: 'Los horarios varían según la carrera. Generalmente las clases son de lunes a viernes en turnos mañana, tarde y noche.',
      category: 'Horarios',
      isOpen: false
    },
    {
      question: '¿Cómo puedo pagar la matrícula?',
      answer: 'Aceptamos efectivo, transferencia bancaria, tarjetas de crédito y débito. También ofrecemos planes de pago en cuotas.',
      category: 'Pagos',
      isOpen: false
    },
    {
      question: '¿Tienen becas disponibles?',
      answer: 'Sí, ofrecemos becas por excelencia académica, deportiva y para estudiantes de bajos recursos. Consulta en administración.',
      category: 'Inscripciones',
      isOpen: false
    },
    {
      question: '¿Los títulos son oficiales?',
      answer: 'Sí, todos nuestros títulos son oficiales y están reconocidos por el Ministerio de Educación.',
      category: 'Carreras',
      isOpen: false
    },
    {
      question: '¿Puedo cambiar de carrera?',
      answer: 'Sí, puedes solicitar el cambio de carrera durante el primer año. Se evaluarán las materias aprobadas para la equivalencia.',
      category: 'Inscripciones',
      isOpen: false
    },
    {
      question: '¿Tienen residencia estudiantil?',
      answer: 'No contamos con residencia estudiantil, pero te podemos ayudar a encontrar alojamiento cercano al instituto.',
      category: 'Horarios',
      isOpen: false
    }
  ];

  get filteredFaqs(): FAQItem[] {
    if (this.selectedCategory === 'Todas') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    // Cerrar todas las preguntas al cambiar categoría
    this.faqs.forEach(faq => faq.isOpen = false);
  }

  toggleFaq(item: FAQItem) {
    // Cerrar otras preguntas si solo queremos una abierta a la vez
    this.faqs.forEach(faq => {
      if (faq !== item) {
        faq.isOpen = false;
      }
    });
    
    item.isOpen = !item.isOpen;
  }

  contactUs() {
    // Navegar a la página de contacto
    window.location.href = '#formularios';
  }

  trackByFn(index: number, item: FAQItem): string {
    return item.question;
  }
}
