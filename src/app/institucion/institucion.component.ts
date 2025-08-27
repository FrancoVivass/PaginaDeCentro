import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Teacher {
  id: number;
  fullName: string;
  position: string;
  career: string;
  photoUrl?: string;
  bio?: string;
}

@Component({
  selector: 'app-institucion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent {
  // Datos de la institución
  institutionData = {
    history: 'Fundado en 1995, nuestro Centro Universitario nació con la visión de democratizar la educación superior de calidad. Durante más de 25 años, hemos formado a miles de profesionales que hoy son líderes en sus respectivos campos.',
    mission: 'Formar profesionales competentes, éticos y comprometidos con el desarrollo social, a través de programas educativos innovadores y un acompañamiento personalizado que garantice la excelencia académica.',
    vision: 'Ser reconocidos como una institución líder en la formación de profesionales de excelencia, contribuyendo al desarrollo sostenible de la sociedad y al progreso de la humanidad.'
  };

  // Valores institucionales
  values = [
    { icon: '🎯', title: 'Excelencia', description: 'Buscamos la perfección en todo lo que hacemos, desde la enseñanza hasta la investigación' },
    { icon: '🤝', title: 'Integridad', description: 'Actuamos con honestidad, transparencia y responsabilidad en todas nuestras acciones' },
    { icon: '🌱', title: 'Innovación', description: 'Fomentamos la creatividad y el pensamiento crítico para resolver los desafíos del futuro' },
    { icon: '❤️', title: 'Compromiso Social', description: 'Nos dedicamos a formar profesionales que contribuyan al bienestar de la sociedad' }
  ];

  // Galería de imágenes
  galleryImages = [
    { id: 1, title: 'Campus Principal', description: 'Nuestras instalaciones modernas', imageUrl: 'assets/images/centro-universitario3.jpeg' },
    { id: 2, title: 'Formadores', description: 'Centro de recursos académicos', imageUrl: 'assets/images/formadores.jpeg' },
    { id: 3, title: 'Aula de Computo', description: 'Espacios de práctica y experimentación', imageUrl: 'assets/images/Analista.webp' },
    { id: 4, title: 'Aulas', description: 'Ambientes de aprendizaje colaborativo', imageUrl: 'assets/images/aulas.webp' }
  ];

  currentIndex = 0;

  isDragging = false;
  startX = 0;

  // Carrusel: avanzar y retroceder
  nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length; }
  prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length; }

  // Eventos de arrastre con mouse
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) { this.isDragging = true; this.startX = event.clientX; }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const delta = event.clientX - this.startX;
    if (delta > 50) { this.prevSlide(); this.isDragging = false; }
    else if (delta < -50) { this.nextSlide(); this.isDragging = false; }
  }

  @HostListener('mouseup') onMouseUp() { this.isDragging = false; }
  @HostListener('mouseleave') onMouseLeave() { this.isDragging = false; }

  // Eventos de arrastre táctil
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) { this.isDragging = true; this.startX = event.touches[0].clientX; }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const delta = event.touches[0].clientX - this.startX;
    if (delta > 30) { this.prevSlide(); this.isDragging = false; }
    else if (delta < -30) { this.nextSlide(); this.isDragging = false; }
  }

  @HostListener('touchend') onTouchEnd() { this.isDragging = false; }

  // Lista de profesores
  teachers: Teacher[] = [
    { id: 1, fullName: 'Dra. Ana López', position: 'Profesora Titular', career: 'Ingeniería en Sistemas', photoUrl: 'assets/images/profesores/ana-lopez.jpg', bio: 'Especialista en desarrollo de software y arquitecturas distribuidas.' },
    { id: 2, fullName: 'Lic. Carlos Méndez', position: 'Profesor Asociado', career: 'Licenciatura en Administración', photoUrl: 'assets/images/profesores/carlos-mendez.jpg', bio: 'Experto en finanzas corporativas y gestión estratégica.' },
    { id: 3, fullName: 'Dra. Marta Ruiz', position: 'Profesora Titular', career: 'Psicología', photoUrl: 'assets/images/profesores/marta-ruiz.jpg', bio: 'Investigadora en psicología clínica y desarrollo humano.' }
  ];

  // Información de contacto
  contactInfo = {
    phone: '+54 11 1234 5678',
    email: 'info@centrouniversitario.edu.ar',
    address: 'Av. Central 1234, Ciudad Autónoma'
  };
}
