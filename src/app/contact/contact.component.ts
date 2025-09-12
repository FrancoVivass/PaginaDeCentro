import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService, ContactMessage } from '../services/email.service';
import { FaqComponent } from '../core/faq/faq.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FaqComponent], // Añadir ReactiveFormsModule
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup; // Usamos ! para indicar que se inicializará en ngOnInit

  // Estados del formulario
  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';
  successMessage = '';

  // Información de contacto
  contactInfo = {
    address: 'Buenos Aires 565, Dolores, Buenos Aires, Argentina',
    phone: '2245 445999',
    email: 'coesdolores@gmail.com',
    hours: 'Lunes a Viernes: 7:00 a 13:00 hs\nMartes a Viernes: 7:00 a 18:00 hs'
  };

  constructor(
    private fb: FormBuilder, 
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa el formulario reactivo con sus controles y validadores.
   */
  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // Opcional, sin validadores
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getters para un acceso más fácil a los controles en el HTML
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  /**
   * Procesa el envío del formulario.
   */
  submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Marca todos los campos para mostrar errores
      return;
    }

    this.isSubmitting = true;
    this.showError = false;
    this.showSuccess = false;

    const formValue = this.contactForm.value;

    const contactMessage: ContactMessage = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      phone: formValue.phone.trim(),
      message: formValue.message.trim(),
      timestamp: new Date()
    };

    this.emailService.sendContactMessage(contactMessage).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.successMessage = 'Tu mensaje ha sido recibido. ¡Te responderemos pronto!';
        this.contactForm.reset();
        setTimeout(() => this.showSuccess = false, 8000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.showError = true;
        this.errorMessage = 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.';
        console.error('Error sending message:', error);
      }
    });
  }

  /**
   * Cierra las alertas.
   */
  closeError(): void {
    this.showError = false;
  }

  closeSuccess(): void {
    this.showSuccess = false;
  }
}