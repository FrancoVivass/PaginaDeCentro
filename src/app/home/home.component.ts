import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  // Datos del hero section
  heroTitle = 'Bienvenido al Centro Universitario';
  heroSubtitle = 'Formamos profesionales de excelencia con valores humanos y competencias técnicas';
  
  // Características destacadas
  features = [
    {
      iconClass: 'fas fa-graduation-cap',
      title: 'Excelencia Académica',
      description: 'Programas educativos de alta calidad con docentes especializados y metodologías innovadoras'
    },
    {
      iconClass: 'fas fa-building',
      title: 'Infraestructura Moderna',
      description: 'Aulas equipadas con tecnología de vanguardia para el aprendizaje y laboratorios especializados'
    },
    {
      iconClass: 'fas fa-user-friends',
      title: 'Acompañamiento Personal',
      description: 'Seguimiento individualizado del progreso académico de cada estudiante con tutores dedicados'
    },
    {
      iconClass: 'fas fa-globe-americas',
      title: 'Visión Global',
      description: 'Preparación para un mundo laboral internacional y competitivo con enfoque en competencias globales'
    },
    {
      iconClass: 'fas fa-handshake',
      title: 'Vinculación Laboral',
      description: 'Convenios con empresas locales y regionales para prácticas profesionales y empleabilidad'
    },
    {
      iconClass: 'fas fa-heart',
      title: 'Compromiso Social',
      description: 'Formación de profesionales comprometidos con el desarrollo de la comunidad y valores humanos'
    }
  ];

   // Forzar autoplay del video
   
  ngAfterViewInit(): void {
    const video: HTMLVideoElement | null = document.querySelector('.hero-video');

    const playVideo = () => {
      if (video) {
        video.play().catch(err => console.log('Autoplay bloqueado, esperando interacción:', err));
      }
      // Remueve los listeners después de reproducir
      document.removeEventListener('click', playVideo);
      document.removeEventListener('touchstart', playVideo);
      document.removeEventListener('scroll', playVideo);
    };

    // Escuchar cualquier interacción del usuario
    document.addEventListener('click', playVideo);
    document.addEventListener('touchstart', playVideo);
    document.addEventListener('scroll', playVideo);
  }
}
