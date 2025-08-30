import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Career } from '../models/career.model';
import { Teacher } from '../models/teacher.model'
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {const teachers: Teacher[] = [
    {
      id: 1,
      fullName: 'Dra. Ana López',
      position: 'Profesora Titular',
      career: 'Ingeniería en Sistemas',
      photoUrl: 'assets/images/profesores/ana-lopez.jpg',
      bio: 'Especialista en desarrollo de software y arquitecturas distribuidas.'
    },
    {
      id: 2,
      fullName: 'Lic. Carlos Méndez',
      position: 'Profesor Asociado',
      career: 'Licenciatura en Administración',
      photoUrl: 'assets/images/profesores/carlos-mendez.jpg',
      bio: 'Experto en finanzas corporativas y gestión estratégica.'
    },
    {
      id: 3,
      fullName: 'Dra. Marta Ruiz',
      position: 'Profesora Titular',
      career: 'Psicología',
      photoUrl: 'assets/images/profesores/marta-ruiz.jpg',
      bio: 'Investigadora en psicología clínica y desarrollo humano.'
    },
    // Más profesores...
  ];
  
    const careers: Career[] = [
      {
        id: 1,
        name: 'Ingeniería en Sistemas',
        description: 'Carrera orientada al desarrollo de software y sistemas informáticos.',
        days: ['Lunes', 'Miércoles', 'Viernes'],
        schedule: [
          { day: 'Lunes', startTime: '08:00', endTime: '10:00' },
          { day: 'Miércoles', startTime: '08:00', endTime: '10:00' },
          { day: 'Viernes', startTime: '08:00', endTime: '10:00' }
        ],
        subjects: [
          { name: 'Programación I', description: 'Introducción a la programación' },
          { name: 'Estructuras de Datos' },
          { name: 'Bases de Datos', description: 'Sistemas de gestión de bases de datos' },

        ]

      },
      {
        id: 2,
        name: 'Licenciatura en Administración',
        description: 'Formación en gestión y administración de empresas.',
        days: ['Martes', 'Jueves'],
        schedule: [
          { day: 'Martes', startTime: '10:00', endTime: '12:00' },
          { day: 'Jueves', startTime: '10:00', endTime: '12:00' }
        ],
        subjects: [
          { name: 'Introducción a la Administración' },
          { name: 'Gestión Financiera', description: 'Análisis y control financiero' },
          { name: 'Profesores', description: 'Arquitectura de computadoras' }
        ]
      },
      {
        id: 2,
        name: 'Licenciatura en Administración',
        description: 'Formación en gestión y administración de empresas.',
        days: ['Martes', 'Jueves'],
        schedule: [
          { day: 'Martes', startTime: '10:00', endTime: '12:00' },
          { day: 'Jueves', startTime: '10:00', endTime: '12:00' }
        ],
        subjects: [
          { name: 'Introducción a la Administración' },
          { name: 'Gestión Financiera', description: 'Análisis y control financiero' }
        ]
      },
      {
        id: 2,
        name: 'Licenciatura en Carlos Menem',
        description: 'Formación en gestión y administración de empresas.',
        days: ['Martes', 'Jueves'],
        schedule: [
          { day: 'Martes', startTime: '10:00', endTime: '12:00' },
          { day: 'Jueves', startTime: '10:00', endTime: '12:00' }
        ],
        subjects: [
          { name: 'Introducción a la Administración' },
          { name: 'Gestión Financiera', description: 'Análisis y control financiero' },
          { name: 'Profesores', description: 'Arquitectura de computadoras' }
        ]
      },


      {
        id: 4,
        name: 'Ingeniería Industrial',
        description: 'Formación en optimización de procesos industriales y gestión de la producción.',
        days: ['Miércoles', 'Viernes'],
        schedule: [
          { day: 'Miércoles', startTime: '16:00', endTime: '18:00' },
          { day: 'Viernes', startTime: '16:00', endTime: '18:00' }
        ],
        subjects: [
          { name: 'Gestión de Operaciones', description: 'Optimización de procesos productivos' },
          { name: 'Control de Calidad', description: 'Sistemas de gestión de calidad' },
          { name: 'Profesores', description: 'Arquitectura de computadoras' }
        ]
      },
      {
        id: 5,
        name: 'Psicología',
        description: 'Carrera que estudia el comportamiento humano y los procesos mentales.',
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves'],
        schedule: [
          { day: 'Lunes', startTime: '18:00', endTime: '20:00' },
          { day: 'Martes', startTime: '18:00', endTime: '20:00' },
          { day: 'Miércoles', startTime: '18:00', endTime: '20:00' },
          { day: 'Jueves', startTime: '18:00', endTime: '20:00' }
        ],
        subjects: [
          { name: 'Psicología General', description: 'Fundamentos de la psicología' },
          { name: 'Psicología del Desarrollo', description: 'Desarrollo humano a lo largo del ciclo vital' },
          { name: 'Psicopatología', description: 'Estudio de los trastornos psicológicos' },
          { name: 'Profesores', description: 'Arquitectura de computadoras' }
        ]
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

    return { careers, reservations };
  }

  // Genera IDs únicos para nuevas entidades
  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}

