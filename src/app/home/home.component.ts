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
      icon: '🎓',
      title: 'Excelencia Académica',
      description: 'Programas educativos de alta calidad con docentes especializados'
    },
    {
      icon: '🏢',
      title: 'Infraestructura Moderna',
      description: 'Aulas equipadas con tecnología de vanguardia para el aprendizaje'
    },
    {
      icon: '🤝',
      title: 'Acompañamiento Personal',
      description: 'Seguimiento individualizado del progreso académico de cada estudiante'
    },
    {
      icon: '🌍',
      title: 'Visión Global',
      description: 'Preparación para un mundo laboral internacional y competitivo'
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
