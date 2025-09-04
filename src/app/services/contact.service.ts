import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ContactInfo {
  phone: string;
  email: string;
  officeHours: {
    weekdays: string;
    tuesdayToFriday: string;
  };
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactInfo: ContactInfo = {
    phone: '2245 445999',
    email: 'coesdolores@gmail.com',
    officeHours: {
      weekdays: 'Lunes a Viernes: 7:00 a 13:00 hs',
      tuesdayToFriday: 'Martes a Viernes: 7:00 a 18:00 hs'
    }
  };

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }
}
