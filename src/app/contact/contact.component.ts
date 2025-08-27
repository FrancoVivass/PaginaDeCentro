import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService, ContactMessage } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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
    phone: '(2245) 432556',
    // CAMBIA ESTE EMAIL POR EL TUYO:
    email: 'info@centrouniversitario.edu',
    // O si quieres agregar más emails:
    additionalEmails: [
      'info@centrouniversitario.edu',
      'admision@centrouniversitario.edu'
    ],
    hours: 'Lunes a Viernes: 8:00 - 22:00\nSábados: 8:00 - 18:00'
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
