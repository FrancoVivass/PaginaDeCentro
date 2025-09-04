import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService, ContactInfo } from '../services/contact.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule],
  providers: [ContactService],
  template: `
    <div class="contact-info-card" *ngIf="contactInfo">
      <h3>Información de Contacto</h3>
      <div class="contact-details">
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <span>{{ contactInfo.phone }}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>{{ contactInfo.email }}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-clock"></i>
          <div class="office-hours">
            <p>{{ contactInfo.officeHours.weekdays }}</p>
            <p>{{ contactInfo.officeHours.tuesdayToFriday }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-info-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .contact-info-card h3 {
      color: var(--color-primary);
      margin-bottom: 1rem;
      font-size: 1.3rem;
      border-bottom: 2px solid var(--color-primary);
      padding-bottom: 0.5rem;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .contact-item i {
      color: var(--color-primary);
      font-size: 1.1rem;
      margin-top: 0.2rem;
    }

    .contact-item span {
      color: var(--color-text);
      font-size: 1rem;
    }

    .office-hours {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .office-hours p {
      color: var(--color-text);
      font-size: 0.9rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .contact-info-card {
        padding: 1rem;
      }
      
      .contact-item {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class ContactInfoComponent implements OnInit {
  contactInfo: ContactInfo | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContactInfo().subscribe((info: ContactInfo) => {
      this.contactInfo = info;
    });
  }
}
