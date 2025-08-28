import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Person {
  id: number;
  fullName: string;
  position: string;
  career?: string;
  photoUrl?: string;
  bio?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Pestaña activa
  activeTab: 'teachers' | 'directors' | 'staff' = 'teachers';

  // Profesores
  teachers: Person[] = [
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
      id: 2,
      fullName: 'Lic. Carlos Méndez',
      position: 'Profesor Asociado',
      career: 'Licenciatura en Administración',
      photoUrl: 'assets/images/profesores/carlos-mendez.jpg',
      bio: 'Experto en finanzas corporativas y gestión estratégica.'
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
      id: 2,
      fullName: 'Lic. Carlos Méndez',
      position: 'Profesor Asociado',
      career: 'Licenciatura en Administración',
      photoUrl: 'assets/images/profesores/carlos-mendez.jpg',
      bio: 'Experto en finanzas corporativas y gestión estratégica.'
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
      id: 2,
      fullName: 'Lic. Carlos Méndez',
      position: 'Profesor Asociado',
      career: 'Licenciatura en Administración',
      photoUrl: 'assets/images/profesores/carlos-mendez.jpg',
      bio: 'Experto en finanzas corporativas y gestión estratégica.'
    },
    {
      id: 2,
      fullName: 'Lic. Carlos Méndez',
      position: 'Profesor Asociado',
      career: 'Licenciatura en Administración',
      photoUrl: 'assets/images/profesores/carlos-mendez.jpg',
      bio: 'Experto en finanzas corporativas y gestión estratégica.'
    }
  ];

  // Directivos
  directors: Person[] = [
    {
      id: 1,
      fullName: 'Mg. Laura Fernández',
      position: 'Directora Académica',
      photoUrl: 'assets/images/directivos/laura-fernandez.jpg',
      bio: 'Responsable de la planificación y supervisión académica.'
    },
    {
      id: 1,
      fullName: 'Mg. Laura Fernández',
      position: 'Directora Académica',
      photoUrl: 'assets/images/directivos/laura-fernandez.jpg',
      bio: 'Responsable de la planificación y supervisión académica.'
    },   
    {
      id: 1,
      fullName: 'Mg. Laura Fernández',
      position: 'Directora Académica',
      photoUrl: 'assets/images/directivos/laura-fernandez.jpg',
      bio: 'Responsable de la planificación y supervisión académica.'
    }
  ];

  // Personal administrativo
  staff: Person[] = [
    {
      id: 1,
      fullName: 'Sr. Juan Pérez',
      position: 'Secretario Administrativo',
      photoUrl: 'assets/images/personal/juan-perez.jpg',
      bio: 'Encargado de trámites y atención al alumnado.'
    },
    {
      id: 1,
      fullName: 'Sr. Juan Pérez',
      position: 'Secretario Administrativo',
      photoUrl: 'assets/images/personal/juan-perez.jpg',
      bio: 'Encargado de trámites y atención al alumnado.'
    },
    {
      id: 1,
      fullName: 'Sr. Juan Pérez',
      position: 'Secretario Administrativo',
      photoUrl: 'assets/images/personal/juan-perez.jpg',
      bio: 'Encargado de trámites y atención al alumnado.'
    },
    {
      id: 1,
      fullName: 'Sr. Juan Pérez',
      position: 'Secretario Administrativo',
      photoUrl: 'assets/images/personal/juan-perez.jpg',
      bio: 'Encargado de trámites y atención al alumnado.'
    },

  ];

  setTab(tab: 'teachers' | 'directors' | 'staff') {
    this.activeTab = tab;
  }
}
