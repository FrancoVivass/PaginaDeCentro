import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Career } from '../models/career.model';
import { Teacher } from '../models/teacher.model'
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teachers: Teacher[] = [
      // Profesores de Turismo
      {
        id: 1,
        fullName: 'Prof. Sandra Peralta',
        position: 'Profesora Titular',
        career: 'Licenciatura en Turismo',
        photoUrl: 'assets/images/profesores/sandra-peralta.jpg',
        bio: 'Especialista en enseñanza de idiomas y turismo internacional.'
      },
      {
        id: 2,
        fullName: 'Prof. Ma. José Abella',
        position: 'Profesora Adjunta',
        career: 'Licenciatura en Turismo',
        photoUrl: 'assets/images/profesores/maria-jose-abella.jpg',
        bio: 'Adjunta de Inglés II, especializada en práctica de idiomas.'
      },
      {
        id: 3,
        fullName: 'Prof. Alejandra Pereyra',
        position: 'Profesora Titular',
        career: 'Licenciatura en Turismo',
        photoUrl: 'assets/images/profesores/alejandra-pereyra.jpg',
        bio: 'Especialista en economía del turismo y gestión hotelera.'
      },
      {
        id: 4,
        fullName: 'Prof. Luciana Renzella',
        position: 'Profesora Adjunta',
        career: 'Licenciatura en Turismo',
        photoUrl: 'assets/images/profesores/luciana-renzella.jpg',
        bio: 'Adjunta de Economía del Turismo II, especializada en práctica.'
      },
      {
        id: 5,
        fullName: 'Prof. Solange Montascero',
        position: 'Profesora Titular',
        career: 'Licenciatura en Turismo',
        photoUrl: 'assets/images/profesores/solange-montascero.jpg',
        bio: 'Especialista en psicología del turismo y tiempo libre.'
      },
      // Profesores de Gestión de la Educación
      {
        id: 6,
        fullName: 'Prof. Pablo Benítez',
        position: 'Profesor Titular',
        career: 'Licenciatura en Gestión de la Educación',
        photoUrl: 'assets/images/profesores/pablo-benitez.jpg',
        bio: 'Especialista en administración y gestión de organizaciones educativas.'
      },
      {
        id: 7,
        fullName: 'Prof. Paula Lloyd',
        position: 'Profesora Titular',
        career: 'Licenciatura en Gestión de la Educación',
        photoUrl: 'assets/images/profesores/paula-lloyd.jpg',
        bio: 'Especialista en gestión del currículum y políticas educativas.'
      },
      {
        id: 8,
        fullName: 'Prof. Mariana Gesualdi',
        position: 'Profesora Titular',
        career: 'Licenciatura en Gestión de la Educación',
        photoUrl: 'assets/images/profesores/mariana-gesualdi.jpg',
        bio: 'Especialista en transformaciones culturales y educación.'
      },
      {
        id: 9,
        fullName: 'Prof. Mónica Fernández',
        position: 'Profesora Titular',
        career: 'Licenciatura en Gestión de la Educación',
        photoUrl: 'assets/images/profesores/monica-fernandez.jpg',
        bio: 'Especialista en educación sexual integral y políticas públicas.'
      },
      // Profesores de Producción Agropecuaria
      {
        id: 10,
        fullName: 'Prof. María Ciancio',
        position: 'Profesora Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/maria-ciancio.jpg',
        bio: 'Especialista en enseñanza de idiomas para el sector agropecuario.'
      },
      {
        id: 11,
        fullName: 'Prof. Juan Ignacio Burgueño',
        position: 'Profesor Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/juan-ignacio-burgueno.jpg',
        bio: 'Especialista en informática aplicada al sector agropecuario.'
      },
      {
        id: 12,
        fullName: 'Prof. Juan Martín Argel',
        position: 'Profesor Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/juan-martin-argel.jpg',
        bio: 'Especialista en producción lechera y ganadería.'
      },
      {
        id: 13,
        fullName: 'Prof. Marcelo Morales',
        position: 'Profesor Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/marcelo-morales.jpg',
        bio: 'Especialista en cultivos de avena, cebada y trigo.'
      },
      {
        id: 14,
        fullName: 'Prof. Luis Etchegaray',
        position: 'Profesor Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/luis-etchegaray.jpg',
        bio: 'Especialista en cultivos de avena, cebada y trigo.'
      },
      {
        id: 15,
        fullName: 'Prof. Karina Gira',
        position: 'Profesora Titular',
        career: 'Producción Agropecuaria',
        photoUrl: 'assets/images/profesores/karina-gira.jpg',
        bio: 'Especialista en invernada bovina y ganadería.'
      }
    ];
  
    const careers: Career[] = [
      {
        id: 1,
        name: 'Licenciatura en Turismo (UNLP)',
        description: 'Carrera orientada a la gestión turística, hotelería y servicios turísticos internacionales.',
        days: ['Miércoles', 'Jueves', 'Viernes'],
        schedule: [
          { day: 'Miércoles', startTime: '11:00', endTime: '16:00' },
          { day: 'Miércoles', startTime: '15:30', endTime: '20:00' },
          { day: 'Jueves', startTime: '11:00', endTime: '16:00' },
          { day: 'Viernes', startTime: '11:00', endTime: '16:00' }
        ],
        subjects: [
          { name: 'Inglés II', description: 'Segundo cuatrimestre del segundo año' },
          { name: 'Economía del Turismo II', description: 'Teoría y práctica de economía turística' },
          { name: 'Psicosociología del Tiempo Libre', description: 'Análisis psicológico y social del turismo' }
        ],
        teachers: [1, 2, 3, 4, 5], // Sandra Peralta, Ma. José Abella, Alejandra Pereyra, Luciana Renzella, Solange Montascero
        duration: { years: 4, semesters: 8 },
        currentSemester: 2,
        currentYear: 2024,
        enrollment: 9
      },
      {
        id: 2,
        name: 'Licenciatura en Gestión de la Educación (UNAJ)',
        description: 'Carrera abocada a docentes recibidos, especializada en gestión y administración educativa.',
        days: ['Sábados'],
        schedule: [
          { day: 'Sábado', startTime: '09:00', endTime: '16:00' }
        ],
        subjects: [
          { name: 'Administración y Gestión de la Organización Educativa', description: 'Gestión de instituciones educativas' },
          { name: 'Problemáticas Contemporáneas de la Gestión del Currículum', description: 'Análisis de políticas curriculares' },
          { name: 'Subjetividades, Transformaciones Culturales y Educación', description: 'Cambios culturales en educación' },
          { name: 'Seminario de Educación Sexual Integral', description: 'Implementación de ESI en instituciones' }
        ],
        teachers: [6, 7, 8, 9], // Pablo Benítez, Paula Lloyd, Mariana Gesualdi, Mónica Fernández
        duration: { years: 2, semesters: 4 },
        currentSemester: 1,
        currentYear: 2024,
        enrollment: 29
      },
      {
        id: 3,
        name: 'Producción Agropecuaria (UNLP)',
        description: 'Carrera técnica orientada a la producción y gestión de empresas agropecuarias.',
        days: ['Lunes', 'Miércoles', 'Viernes'],
        schedule: [
          { day: 'Lunes', startTime: '08:00', endTime: '12:00' },
          { day: 'Miércoles', startTime: '08:00', endTime: '12:00' },
          { day: 'Viernes', startTime: '08:00', endTime: '12:00' }
        ],
        subjects: [
          { name: 'Inglés I', description: 'Idioma inglés aplicado al sector agropecuario' },
          { name: 'Informática', description: 'Tecnologías de la información en agricultura' },
          { name: 'Producción de Leche', description: 'Técnicas de producción lechera' },
          { name: 'Producción de Avena, Cebada y Trigo', description: 'Cultivos de cereales' },
          { name: 'Invernada Bovina', description: 'Producción de carne bovina' },
          { name: 'Gestión de Empresas Agropecuarias', description: 'Administración de empresas del sector' },
          { name: 'Competencias Emprendedoras', description: 'Desarrollo de habilidades emprendedoras' }
        ],
        teachers: [10, 11, 12, 13, 14, 15], // María Ciancio, Juan Ignacio Burgueño, Juan Martín Argel, Marcelo Morales, Luis Etchegaray, Karina Gira
        duration: { years: 3, semesters: 6 },
        currentSemester: 2,
        currentYear: 2024,
        enrollment: 29
      }
    ];

    const reservations: Reservation[] = [
      {
        id: 1,
        room: 'Aula 101',
        date: '2025-01-15',
        startTime: '09:00',
        endTime: '11:00',
        reservedBy: 'María Pérez'
      },
      {
        id: 2,
        room: 'Aula 102',
        date: '2025-01-15',
        startTime: '14:00',
        endTime: '16:00',
        reservedBy: 'Carlos Rodríguez'
      },
      {
        id: 3,
        room: 'Aula 103',
        date: '2025-01-16',
        startTime: '10:00',
        endTime: '12:00',
        reservedBy: 'Ana López'
      }
    ];

    return { careers, teachers, reservations };
  }

  // Genera IDs únicos para nuevas entidades
  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}

