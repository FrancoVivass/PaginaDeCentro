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
    history: 'Inaugurado en 2025, el Centro Universitario de Dolores surge con el objetivo de acercar la educación superior a la comunidad y evitar el desarraigo de los jóvenes que debían trasladarse a otras ciudades para continuar sus estudios. Gracias a la recuperación del histórico edificio del Hogar Madrecitas y a la inversión del programa provincial Puentes, el centro se consolidó como un espacio académico inclusivo, con infraestructura moderna y carreras dictadas por universidades nacionales.',
    mission: 'Brindar acceso a la educación universitaria de calidad en Dolores y la región, formando profesionales competentes y comprometidos con el desarrollo local y regional. Promover la igualdad de oportunidades, la innovación y el arraigo a través de propuestas académicas relevantes y vinculadas a las necesidades de la comunidad.',
    vision: 'Convertirse en un referente educativo del sudeste bonaerense, reconocido por su excelencia académica, su impacto en el desarrollo territorial y su capacidad de generar conocimiento y profesionales que contribuyan al progreso social, cultural y económico de la región.'
  };

  // Valores institucionales
  values = [
    { icon: '🎯', title: 'Excelencia', description: 'Buscamos la perfección en todo lo que hacemos, desde la enseñanza hasta la investigación' },
    { icon: '🤝', title: 'Integridad', description: 'Actuamos con honestidad, transparencia y responsabilidad en todas nuestras acciones' },
    { icon: '🌱', title: 'Innovación', description: 'Fomentamos la creatividad y el pensamiento crítico para resolver los desafíos del futuro' },
    { icon: '❤️', title: 'Compromiso Social', description: 'Nos dedicamos a formar profesionales que contribuyan al bienestar de la sociedad' }
  ];

  // Slider de imágenes
  sliderImages = [
    { id: 1, title: 'Campus Principal', description: 'Nuestras instalaciones modernas', imageUrl: 'assets/images/centro-universitario3.jpeg' },
    { id: 2, title: 'Formadores', description: 'Centro de recursos académicos', imageUrl: 'assets/images/formadores.jpeg' },
    { id: 3, title: 'Aula de Computo', description: 'Espacios de práctica y experimentación', imageUrl: 'assets/images/Analista.webp' },
    { id: 4, title: 'Aulas', description: 'Ambientes de aprendizaje colaborativo', imageUrl: 'assets/images/aulas.webp' }
  ];

  currentIndex = 0;
  isDragging = false;
  startX = 0;

  // Slider: avanzar y retroceder
  nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length; }
  prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.sliderImages.length) % this.sliderImages.length; }

  // Drag con mouse
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

  // Drag táctil
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

  // Profesores
  teachers: Teacher[] = [
    { id: 1, fullName: 'Dra. Ana López', position: 'Profesora Titular', career: 'Ingeniería en Sistemas', photoUrl: 'assets/images/profesores/ana-lopez.jpg', bio: 'Especialista en desarrollo de software y arquitecturas distribuidas.' },
    { id: 2, fullName: 'Lic. Carlos Méndez', position: 'Profesor Asociado', career: 'Licenciatura en Administración', photoUrl: 'assets/images/profesores/carlos-mendez.jpg', bio: 'Experto en finanzas corporativas y gestión estratégica.' },
    { id: 3, fullName: 'Dra. Marta Ruiz', position: 'Profesora Titular', career: 'Psicología', photoUrl: 'assets/images/profesores/marta-ruiz.jpg', bio: 'Investigadora en psicología clínica y desarrollo humano.' }
  ];

  // Contacto
  contactInfo = {
    phone: '+54 2245 403922',
    email: 'coesdolores@gmail.com',
    address: 'Av. Buenos Aires 545. Dolores, Buenos Aires, Argentina'
  };
}
