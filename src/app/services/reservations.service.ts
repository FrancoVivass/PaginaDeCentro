import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Reservation } from '../models/reservation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  constructor(private apiService: ApiService) { }

  /**
   * Obtiene todas las reservas
   */
  getReservations(): Observable<Reservation[]> {
    return this.apiService.get<Reservation[]>('reservations');
  }

  /**
   * Crea una nueva reserva
   */
  createReservation(reservation: Omit<Reservation, 'id'>): Observable<Reservation> {
    return this.apiService.post<Reservation>('reservations', reservation);
  }

  /**
   * Obtiene las reservas de una fecha específica
   */
  getByDate(date: string): Observable<Reservation[]> {
    return this.apiService.get<Reservation[]>(`reservations?date=${date}`);
  }

  /**
   * Verifica si existe un conflicto de horarios para una reserva
   */
  checkConflict(newReservation: Omit<Reservation, 'id'>): Observable<boolean> {
    return this.getByDate(newReservation.date).pipe(
      map(existingReservations => {
        // Lógica para verificar conflictos
        // Dos reservas solapan si: startA < endB && startB < endA
        // y son en la misma aula y misma fecha
        return existingReservations.some(existing => {
          if (existing.room !== newReservation.room) {
            return false;
          }
          
          // Verificar solapamiento de horarios
          const existingStart = this.timeToMinutes(existing.startTime);
          const existingEnd = this.timeToMinutes(existing.endTime);
          const newStart = this.timeToMinutes(newReservation.startTime);
          const newEnd = this.timeToMinutes(newReservation.endTime);
          
          // Dos reservas solapan si: startA < endB && startB < endA
          return newStart < existingEnd && existingStart < newEnd;
        });
      })
    );
  }

  /**
   * Convierte tiempo en formato HH:MM a minutos desde medianoche
   */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
