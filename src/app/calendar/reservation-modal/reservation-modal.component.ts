import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/reservation.model';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.css'
})
export class ReservationModalComponent {
  @Input() selectedDate: Date | null = null;
  @Input() timeSlots: string[] = [];
  @Input() availableRooms: string[] = [];
  @Output() modalClose = new EventEmitter<void>();

  // Formulario de reserva
  reservationForm = {
    room: '',
    startTime: '',
    endTime: '',
    reservedBy: ''
  };

  isLoading = false;
  error = '';
  success = false;

  constructor(private reservationsService: ReservationsService) {}

  /**
   * Cierra el modal
   */
  closeModal() {
    this.modalClose.emit();
  }

  /**
   * Crea una nueva reserva
   */
  createReservation() {
    if (!this.selectedDate || !this.isFormValid()) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    const newReservation: Omit<Reservation, 'id'> = {
      room: this.reservationForm.room,
      date: this.formatDate(this.selectedDate),
      startTime: this.reservationForm.startTime,
      endTime: this.reservationForm.endTime,
      reservedBy: this.reservationForm.reservedBy
    };

    // Verificar conflictos antes de crear
    this.checkConflicts(newReservation);
  }

  /**
   * Verifica si hay conflictos de horarios
   */
  private checkConflicts(newReservation: Omit<Reservation, 'id'>) {
    this.reservationsService.getByDate(newReservation.date).subscribe({
      next: (existingReservations) => {
        const hasConflict = existingReservations.some(existing => {
          if (existing.room !== newReservation.room) {
            return false;
          }

          const existingStart = this.timeToMinutes(existing.startTime);
          const existingEnd = this.timeToMinutes(existing.endTime);
          const newStart = this.timeToMinutes(newReservation.startTime);
          const newEnd = this.timeToMinutes(newReservation.endTime);

          return newStart < existingEnd && existingStart < newEnd;
        });

        if (hasConflict) {
          this.error = 'Ya existe una reserva en esta aula para el horario seleccionado. Por favor, elige otro horario o aula.';
          this.isLoading = false;
        } else {
          this.saveReservation(newReservation);
        }
      },
      error: (error) => {
        this.error = 'Error al verificar conflictos. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
        console.error('Error checking conflicts:', error);
      }
    });
  }

  /**
   * Guarda la reserva en el backend y envía el correo
   */
  private saveReservation(newReservation: Omit<Reservation, 'id'>) {
    this.reservationsService.createReservation(newReservation).subscribe({
      next: (reservation) => {
        this.success = true;
        this.isLoading = false;

        // Envía el email de notificación
        this.sendEmailNotification(newReservation);

        // Limpiar formulario
        this.resetForm();

        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          this.closeModal();
        }, 2000);
      },
      error: (error) => {
        this.error = 'Error al crear la reserva. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
        console.error('Error creating reservation:', error);
      }
    });
  }

  /**
   * Envía la notificación por correo usando EmailJS
   */
  private sendEmailNotification(newReservation: Omit<Reservation, 'id'>) {
    const templateParams = {
      room: newReservation.room,
      start_time: newReservation.startTime,
      end_time: newReservation.endTime,
      reserved_by: newReservation.reservedBy,
      date: newReservation.date
    };

    emailjs.send(
      'service_nukjt19',     // tu service_id de EmailJS
      'template_2ktrpip',    // tu template_id de EmailJS
      templateParams,
      'Pv8RywJYKIJeRxgMv' 
    )
    .then(response => {
      console.log('Email enviado con éxito:', response.status, response.text);
    })
    .catch(error => {
      console.error('Error enviando email:', error);
    });
  }

  /**
   * Verifica si el formulario es válido
   */
  isFormValid(): boolean {
    return !!(
      this.reservationForm.room &&
      this.reservationForm.startTime &&
      this.reservationForm.endTime &&
      this.reservationForm.reservedBy &&
      this.reservationForm.startTime < this.reservationForm.endTime
    );
  }

  /**
   * Convierte tiempo en formato HH:MM a minutos desde medianoche
   */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Formatea una fecha para mostrar (YYYY-MM-DD)
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Limpia el formulario
   */
  private resetForm() {
    this.reservationForm = {
      room: '',
      startTime: '',
      endTime: '',
      reservedBy: ''
    };
  }

  /**
   * Obtiene la fecha formateada para mostrar en español
   */
  getFormattedDate(): string {
    if (!this.selectedDate) return '';

    return this.selectedDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
