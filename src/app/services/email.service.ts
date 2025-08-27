import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import emailjs from '@emailjs/browser';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  phone: string;
  timestamp: Date;
  subject?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Valores reales de EmailJS proporcionados por el usuario
  private readonly SERVICE_ID = 'service_nukjt19';
  private readonly TEMPLATE_ID = 'template_ijs70xd';
  private readonly PUBLIC_KEY = 'Pv8RywJYKIJeRxgMv';

  constructor() {}

  /**
   * Envía un mensaje de contacto usando EmailJS
   */
  sendContactMessage(message: ContactMessage): Observable<{ success: boolean; messageId?: string; error?: any }> {
    const templateParams = {
      from_name: message.name,
      from_email: message.email,
      from_phone: message.phone,
      message: message.message,
      date: message.timestamp.toLocaleString('es-ES'),
      subject: message.subject || this.generateSubject(message)
    };

    return from(
      emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, {
        publicKey: this.PUBLIC_KEY
      })
      .then((result) => ({ success: true, messageId: result.text }))
      .catch((error) => ({ success: false, error }))
    );
  }

  /**
   * Genera el asunto del email
   */
  generateSubject(message: ContactMessage): string {
    return `[Centro Universitario] Nueva consulta de ${message.name}`;
  }

  /**
   * (Opcional) Devuelve el email de destino configurado en EmailJS
   */
  getRecipientEmail(): string {
    return 'Configurado en EmailJS';
  }
}
