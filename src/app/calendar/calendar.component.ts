import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../models/reservation.model';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ReservationModalComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'] // corregí styleUrl a styleUrls
})
export class CalendarComponent {
  

}
