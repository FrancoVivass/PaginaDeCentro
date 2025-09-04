import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'api/teachers'; // URL simulada por InMemoryWebApi

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  getTeachersByCareer(careerName: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}?career=${encodeURIComponent(careerName)}`);
  }

  getTeachersByIds(ids: number[]): Observable<Teacher[]> {
    if (!ids || ids.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    
    const queryParams = ids.map(id => `id=${id}`).join('&');
    return this.http.get<Teacher[]>(`${this.apiUrl}?${queryParams}`);
  }
}
