import { Component, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Teacher {
  id: number;
  fullName: string;
  position: string;
  career: string;
  photoUrl?: string;
  bio?: string;
}

interface Leader {
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

interface Achievement {
  title: string;
  description: string;
  year: string;
  icon: string;
}

interface InstitutionStats {
  students: number;
  careers: number;
  teachers: number;
  years: number;
}

@Component({
  selector: 'app-institucion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChild('gallerySlide', { static: false }) gallerySlideRef!: ElementRef<HTMLElement>;

  // Estadísticas de la institución
  institutionStats: InstitutionStats = {
    students: 500,
    careers: 8,
    teachers: 45,
    years: 3
  };

  // Datos de la institución
  institutionData = {
    history: 'Inaugurado en 2025, el Centro Universitario de Dolores surge con el objetivo de acercar la educación superior a la comunidad y evitar el desarraigo de los jóvenes que debían trasladarse a otras ciudades para continuar sus estudios. Gracias a la recuperación del histórico edificio del Hogar Madrecitas y a la inversión del programa provincial Puentes, el centro se consolidó como un espacio académico inclusivo, con infraestructura moderna y carreras dictadas por universidades nacionales.',
    mission: 'Brindar acceso a la educación universitaria de calidad en Dolores y la región, formando profesionales competentes y comprometidos con el desarrollo local y regional. Promover la igualdad de oportunidades, la innovación y el arraigo a través de propuestas académicas relevantes y vinculadas a las necesidades de la comunidad.',
    vision: 'Convertirse en un referente educativo del sudeste bonaerense, reconocido por su excelencia académica, su impacto en el desarrollo territorial y su capacidad de generar conocimiento y profesionales que contribuyan al progreso social, cultural y económico de la región.'
  };

  // Valores institucionales actualizados
  values = [
    { 
      title: 'Excelencia Académica', 
      description: 'Buscamos la perfección en todo lo que hacemos, desde la enseñanza hasta la investigación, garantizando la más alta calidad educativa.',
      iconClass: 'fas fa-award'
    },
    { 
      title: 'Integridad', 
      description: 'Actuamos con honestidad, transparencia y responsabilidad en todas nuestras acciones, construyendo confianza en nuestra comunidad.',
      iconClass: 'fas fa-handshake'
    },
    { 
      title: 'Innovación', 
      description: 'Fomentamos la creatividad y el pensamiento crítico para resolver los desafíos del futuro y adaptarnos a los cambios tecnológicos.',
      iconClass: 'fas fa-lightbulb'
    },
    { 
      title: 'Compromiso Social', 
      description: 'Nos dedicamos a formar profesionales que contribuyan al bienestar de la sociedad y al desarrollo sostenible de la región.',
      iconClass: 'fas fa-heart'
    },
    { 
      title: 'Inclusión', 
      description: 'Promovemos la igualdad de oportunidades y el acceso democrático a la educación superior para todos los sectores sociales.',
      iconClass: 'fas fa-users'
    },
    { 
      title: 'Trabajo en Equipo', 
      description: 'Valoramos la colaboración, el respeto mutuo y el trabajo conjunto para alcanzar objetivos comunes y superiores.',
      iconClass: 'fas fa-user-friends'
    }
  ];

  // Equipo directivo
  leadership: Leader[] = [
    {
      name: 'Dir. Ramiro Blasi',
      position: 'Director de Educación en Dolores',
      bio: 'Ramiro Blasi es un docente de Economía y Gestión de Dolores, que también se desempeña como Director de Educación municipal.',
      photo: 'assets/images/Blasi.jpg',
      linkedin: 'https://www.linkedin.com/in/ramiro-blasi-176b79b3/?originalSubdomain=ar',
    },
    {
      name: 'Municipalidad de Dolores',
      position: 'Responsable',
      bio: 'La Municipalidad de Dolores es el organismo público encargado de la administración, planificación y gestión de los servicios y políticas locales del distrito, promoviendo el desarrollo social, educativo y cultural de la comunidad.',
      photo: 'assets/images/municipalidad.jpeg',
      website: 'https://dolores.gob.ar/',
      email: 'secretariaprivada@dolores.gov.ar',
      facebook: 'https://www.facebook.com/doloresmunicipalidad'
    },
    {
      name: 'Programa Puentes',
      position: 'Programa',
      bio: 'El Programa Puentes es un programa de inversión pública que busca mejorar la calidad de vida de la comunidad a través de la inversión en infraestructura y servicios.',
      photo: 'assets/images/programa-puentes.jpeg',
      website: 'https://puentes.gba.gob.ar/',
      instagram: 'https://www.instagram.com/provinciaba/'
    }
  ];

  // Logros y reconocimientos
  achievements: Achievement[] = [
    {
      title: 'Acreditación Nacional',
      description: 'Reconocimiento oficial del Ministerio de Educación por la calidad de nuestros programas académicos.',
      year: '2025',
      icon: 'fas fa-certificate'
    },
    {
      title: 'Premio a la Innovación Educativa',
      description: 'Distinción por la implementación de metodologías innovadoras en la enseñanza universitaria.',
      year: '2024',
      icon: 'fas fa-trophy'
    },
    {
      title: 'Certificación ISO 9001',
      description: 'Certificación internacional de calidad en gestión educativa y procesos administrativos.',
      year: '2024',
      icon: 'fas fa-medal'
    },
    {
      title: 'Reconocimiento Provincial',
      description: 'Distinción del Gobierno de la Provincia de Buenos Aires por el impacto social del proyecto.',
      year: '2023',
      icon: 'fas fa-star'
    },
    {
      title: 'Alianza Estratégica',
      description: 'Acuerdo de colaboración con universidades nacionales para el intercambio académico.',
      year: '2023',
      icon: 'fas fa-handshake'
    },
    {
      title: 'Inversión en Infraestructura',
      description: 'Aprobación del programa Puentes para la modernización de instalaciones y equipamiento.',
      year: '2022',
      icon: 'fas fa-building'
    }
  ];

  // Slider de imágenes (mantenido para compatibilidad)
  sliderImages = [
    { id: 1, title: 'Campus Principal', description: 'Nuestras instalaciones modernas', imageUrl: 'assets/images/centro-universitario3.jpeg' },
    { id: 2, title: 'Formadores', description: 'Centro de recursos académicos', imageUrl: 'assets/images/formadores.jpeg' },
    { id: 3, title: 'Aula de Computo', description: 'Espacios de práctica y experimentación', imageUrl: 'assets/images/Analista.webp' },
    { id: 4, title: 'Aulas', description: 'Ambientes de aprendizaje colaborativo', imageUrl: 'assets/images/aulas.webp' }
  ];

  currentIndex = 0;
  isDragging = false;
  startX = 0;

  // Slider: avanzar y retroceder (mantenido para compatibilidad)
  nextSlide() { 
    this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length; 
  }
  
  prevSlide() { 
    this.currentIndex = (this.currentIndex - 1 + this.sliderImages.length) % this.sliderImages.length; 
  }

  // Drag con mouse (mantenido para compatibilidad)
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) { 
    this.isDragging = true; 
    this.startX = event.clientX; 
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const delta = event.clientX - this.startX;
    if (delta > 50) { 
      this.prevSlide(); 
      this.isDragging = false; 
    }
    else if (delta < -50) { 
      this.nextSlide(); 
      this.isDragging = false; 
    }
  }

  @HostListener('mouseup') onMouseUp() { this.isDragging = false; }
  @HostListener('mouseleave') onMouseLeave() { this.isDragging = false; }

  // Drag táctil (mantenido para compatibilidad)
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) { 
    this.isDragging = true; 
    this.startX = event.touches[0].clientX; 
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const delta = event.touches[0].clientX - this.startX;
    if (delta > 30) { 
      this.prevSlide(); 
      this.isDragging = false; 
    }
    else if (delta < -30) { 
      this.nextSlide(); 
      this.isDragging = false; 
    }
  }

  @HostListener('touchend') onTouchEnd() { this.isDragging = false; }

  // Nuevo slider por ítems (tipo DOM append/prepend)
  nextGallery(): void {
    if (!isPlatformBrowser(this.platformId) || !this.gallerySlideRef?.nativeElement) return;
    const slide = this.gallerySlideRef.nativeElement;
    const items = slide.querySelectorAll('.item');
    if (items.length === 0) return;
    slide.appendChild(items[0]);
  }

  prevGallery(): void {
    if (!isPlatformBrowser(this.platformId) || !this.gallerySlideRef?.nativeElement) return;
    const slide = this.gallerySlideRef.nativeElement;
    const items = slide.querySelectorAll('.item');
    if (items.length === 0) return;
    const last = items[items.length - 1] as Element;
    if ((slide as any).prepend) {
      (slide as any).prepend(last);
    } else {
      slide.insertBefore(last, slide.firstChild);
    }
  }

  // Método para ir a una slide específica (para preview en responsive)
  goToSlide(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const slide = this.gallerySlideRef.nativeElement;
    const items = slide.querySelectorAll('.item');
    if (items.length === 0) return;
    
    // Calcular cuántas veces necesitamos mover hacia adelante
    const currentIndex = 1; // El item activo siempre está en la posición 1 (segundo)
    const targetIndex = index;
    const moves = targetIndex - currentIndex;
    
    if (moves > 0) {
      // Mover hacia adelante
      for (let i = 0; i < moves; i++) {
        this.nextGallery();
      }
    } else if (moves < 0) {
      // Mover hacia atrás
      for (let i = 0; i < Math.abs(moves); i++) {
        this.prevGallery();
      }
    }
  }

  // Profesores (mantenido para compatibilidad)
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