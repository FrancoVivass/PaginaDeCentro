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

  // Profesores - Solo los de las carreras que me proporcionaste
  teachers: Person[] = [
    // Profesores de Turismo
    {
      id: 1,
      fullName: 'Prof. Sandra Peralta',
      position: 'Profesora Titular',
      career: 'Licenciatura en Turismo',
      photoUrl: 'assets/images/profesores/sandra-peralta.jpg',
      bio: 'Especialista en enseñanza de idiomas y turismo internacional. Dicta Inglés II del segundo cuatrimestre del segundo año.'
    },
    {
      id: 2,
      fullName: 'Prof. Ma. José Abella',
      position: 'Profesora Adjunta',
      career: 'Licenciatura en Turismo',
      photoUrl: 'assets/images/profesores/maria-jose-abella.jpg',
      bio: 'Adjunta de Inglés II, especializada en práctica de idiomas. Miércoles por medio de 15:30hs a 20hs.'
    },
    {
      id: 3,
      fullName: 'Prof. Alejandra Pereyra',
      position: 'Profesora Titular',
      career: 'Licenciatura en Turismo',
      photoUrl: 'assets/images/profesores/alejandra-pereyra.jpg',
      bio: 'Especialista en economía del turismo y gestión hotelera. Dicta Economía del Turismo II, todos los viernes de 11 a 16hs.'
    },
    {
      id: 4,
      fullName: 'Prof. Luciana Renzella',
      position: 'Profesora Adjunta',
      career: 'Licenciatura en Turismo',
      photoUrl: 'assets/images/profesores/luciana-renzella.jpg',
      bio: 'Adjunta de Economía del Turismo II, especializada en práctica. Una profesora da la teoría y la otra la práctica.'
    },
    {
      id: 5,
      fullName: 'Prof. Solange Montascero',
      position: 'Profesora Titular',
      career: 'Licenciatura en Turismo',
      photoUrl: 'assets/images/profesores/solange-montascero.jpg',
      bio: 'Especialista en psicología del turismo y tiempo libre. Dicta Psicosociología del Tiempo Libre, jueves por medio.'
    },
    // Profesores de Gestión de la Educación
    {
      id: 6,
      fullName: 'Prof. Pablo Benítez',
      position: 'Profesor Titular',
      career: 'Licenciatura en Gestión de la Educación',
      photoUrl: 'assets/images/profesores/pablo-benitez.jpg',
      bio: 'Especialista en administración y gestión de organizaciones educativas. Dicta Administración y Gestión de la Organización Educativa.'
    },
    {
      id: 7,
      fullName: 'Prof. Paula Lloyd',
      position: 'Profesora Titular',
      career: 'Licenciatura en Gestión de la Educación',
      photoUrl: 'assets/images/profesores/paula-lloyd.jpg',
      bio: 'Especialista en gestión del currículum y políticas educativas. Dicta Problemáticas Contemporáneas de la Gestión del Currículum.'
    },
    {
      id: 8,
      fullName: 'Prof. Mariana Gesualdi',
      position: 'Profesora Titular',
      career: 'Licenciatura en Gestión de la Educación',
      photoUrl: 'assets/images/profesores/mariana-gesualdi.jpg',
      bio: 'Especialista en transformaciones culturales y educación. Dicta Subjetividades, Transformaciones Culturales y Educación.'
    },
    {
      id: 9,
      fullName: 'Prof. Mónica Fernández',
      position: 'Profesora Titular',
      career: 'Licenciatura en Gestión de la Educación',
      photoUrl: 'assets/images/profesores/monica-fernandez.jpg',
      bio: 'Especialista en educación sexual integral y políticas públicas. Dicta Seminario de Educación Sexual Integral.'
    },
    // Profesores de Producción Agropecuaria
    {
      id: 10,
      fullName: 'Prof. María Ciancio',
      position: 'Profesora Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/maria-ciancio.jpg',
      bio: 'Especialista en enseñanza de idiomas para el sector agropecuario. Dicta Inglés I.'
    },
    {
      id: 11,
      fullName: 'Prof. Juan Ignacio Burgueño',
      position: 'Profesor Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/juan-ignacio-burgueno.jpg',
      bio: 'Especialista en informática aplicada al sector agropecuario. Dicta Informática.'
    },
    {
      id: 12,
      fullName: 'Prof. Juan Martín Argel',
      position: 'Profesor Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/juan-martin-argel.jpg',
      bio: 'Especialista en producción lechera y ganadería. Dicta Producción de Leche.'
    },
    {
      id: 13,
      fullName: 'Prof. Marcelo Morales',
      position: 'Profesor Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/marcelo-morales.jpg',
      bio: 'Especialista en cultivos de avena, cebada y trigo. Dicta Producción de Avena, Cebada y Trigo junto con Luis Etchegaray.'
    },
    {
      id: 14,
      fullName: 'Prof. Luis Etchegaray',
      position: 'Profesor Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/luis-etchegaray.jpg',
      bio: 'Especialista en cultivos de avena, cebada y trigo. Dicta Producción de Avena, Cebada y Trigo junto con Marcelo Morales.'
    },
    {
      id: 15,
      fullName: 'Prof. Karina Gira',
      position: 'Profesora Titular',
      career: 'Producción Agropecuaria',
      photoUrl: 'assets/images/profesores/karina-gira.jpg',
      bio: 'Especialista en invernada bovina y ganadería. Dicta Invernada Bovina.'
    }
  ];

  // Directivos
  directors: Person[] = [
    {
      id: 1,
      fullName: 'Sr. Ramiro Blasi',
      position: 'Director de Educación en Dolores',
      photoUrl: '../../assets/images/Blasi.jpg',
      bio: 'Responsable de la planificación y supervisión académica de la sede universitaria.'
    }
  ];

  // Personal administrativo
  staff: Person[] = [
    {
      id: 1,
      fullName: 'Sra. Maria Elena Díaz',
      position: 'Secretaria Administrativa',
      bio: 'Horario de atención: Lunes a Viernes de 7:00 a 13:00 hs, Martes a Viernes de 7:00 a 18:00 hs.'
    },
    {
      id: 2,
      fullName: 'Sra. Maria Luz Alday',
      position: 'Secretaria Administrativa',
      bio: 'Horario de atención: Lunes a Viernes de 7:00 a 13:00 hs, Martes a Viernes de 7:00 a 18:00 hs.'
    },
    {
      id: 3,
      fullName: 'Sra. Mariana Echeto',
      position: 'Secretaria Administrativa',
      bio: 'Horario de atención: Lunes a Viernes de 7:00 a 13:00 hs, Martes a Viernes de 7:00 a 18:00 hs.'
    }
  ];

  setTab(tab: 'teachers' | 'directors' | 'staff') {
    this.activeTab = tab;
  }
}
