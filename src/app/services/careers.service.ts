import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career } from '../models/career.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
  private apiUrl = 'api/careers'; // URL simulada por InMemoryWebApi

  constructor(private http: HttpClient) {}

  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(this.apiUrl);
  }
}

