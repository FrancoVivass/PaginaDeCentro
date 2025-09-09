import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService, ContactMessage } from '../services/email.service';
import { FaqComponent } from '../core/faq/faq.component';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, FaqComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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

  // Formulario de contacto
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  // Estados del formulario
  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';
  successMessage = '';

  // Información de contacto - PERSONALIZA AQUÍ TU EMAIL
  contactInfo = {
    address: 'Buenos Aires 565, Dolores, Buenos Aires, Argentina',
    phone: '2245 445999',
    // CAMBIA ESTE EMAIL POR EL TUYO:
    email: 'coesdolores@gmail.com',
    // O si quieres agregar más emails:
    additionalEmails: [
      'coesdolores@gmail.com'
    ],
    hours: 'Lunes a Viernes: 7:00 a 13:00 hs\nMartes a Viernes: 7:00 a 18:00 hs'
  };

  constructor(private emailService: EmailService) {}

  /**
   * Envía el formulario de contacto
   */
  submitForm() {
    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;
    this.showError = false;
    this.showSuccess = false;

    // Crear el mensaje de contacto
    const contactMessage: ContactMessage = {
      name: this.contactForm.name.trim(),
      email: this.contactForm.email.trim(),
      phone: this.contactForm.phone.trim(),
      message: this.contactForm.message.trim(),
      timestamp: new Date()
    };

    // Enviar el mensaje usando el servicio de email
    this.emailService.sendContactMessage(contactMessage).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.successMessage = `¡Mensaje enviado exitosamente! Te responderemos pronto.`;
        this.resetForm();
        
        // Mostrar información adicional sobre el envío
        console.log('Mensaje enviado a:', this.emailService.getRecipientEmail());
        console.log('Asunto:', this.emailService.generateSubject(contactMessage));
       
        
        // Ocultar mensaje de éxito después de 8 segundos
        setTimeout(() => {
          this.showSuccess = false;
        }, 8000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.showError = true;
        this.errorMessage = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
        console.error('Error sending message:', error);
      }
    });
  }

  /**
   * Valida el formulario
   */
  private isFormValid(): boolean {
    if (!this.contactForm.name.trim()) {
      this.showError = true;
      this.errorMessage = 'Por favor, ingresa tu nombre.';
      return false;
    }

    if (!this.contactForm.email.trim()) {
      this.showError = true;
      this.errorMessage = 'Por favor, ingresa tu email.';
      return false;
    }

    if (!this.isValidEmail(this.contactForm.email)) {
      this.showError = true;
      this.errorMessage = 'Por favor, ingresa un email válido.';
      return false;
    }

    if (!this.contactForm.message.trim()) {
      this.showError = true;
      this.errorMessage = 'Por favor, ingresa tu mensaje.';
      return false;
    }

    if (this.contactForm.message.trim().length < 10) {
      this.showError = true;
      this.errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
      return false;
    }

    return true;
  }

  /**
   * Valida el formato del email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Limpia el formulario
   */
  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  /**
   * Cierra el mensaje de error
   */
  closeError() {
    this.showError = false;
    this.errorMessage = '';
  }

  /**
   * Cierra el mensaje de éxito
   */
  closeSuccess() {
    this.showSuccess = false;
  }

  /**
   * Obtiene todos los emails de contacto
   */
  getAllEmails(): string[] {
    return [this.contactInfo.email, ...this.contactInfo.additionalEmails];
  }

  /**
   * Obtiene el email donde se envían las consultas
   */
  getContactEmail(): string {
    return this.emailService.getRecipientEmail();
  }
}
