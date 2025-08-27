# Centro Universitario - Aplicación Angular

Una aplicación web completa para la gestión de un centro universitario, desarrollada en Angular con un backend mock integrado.

## 🚀 Características

- **Página de inicio** con información institucional y características destacadas
- **Sobre nosotros** con historia, misión, visión y valores
- **Carreras** con búsqueda y filtrado de programas académicos
- **Calendario** para reservas de aulas con validación de conflictos
- **Contacto** con formulario funcional
- **Diseño responsivo** optimizado para móviles y escritorio
- **Backend mock** usando angular-in-memory-web-api
- **CSS puro** sin frameworks externos

## 🛠️ Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **CSS3** - Estilos y diseño responsivo
- **angular-in-memory-web-api** - Backend mock
- **RxJS** - Programación reactiva

## 📋 Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Angular CLI** (se instalará automáticamente)

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd centro-universitario
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:4200`

### 4. Construir para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/centro-universitario`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Componentes principales
│   │   ├── header/          # Navegación principal
│   │   └── footer/          # Pie de página
│   ├── home/                # Página de inicio
│   ├── about/               # Sobre nosotros
│   ├── careers/             # Gestión de carreras
│   ├── calendar/            # Calendario y reservas
│   │   └── reservation-modal/ # Modal de reservas
│   ├── contact/             # Formulario de contacto
│   ├── models/              # Interfaces de datos
│   ├── services/            # Servicios de la aplicación
│   └── app.component.*      # Componente principal
├── assets/
│   └── mock/                # Datos JSON de ejemplo
└── styles.css               # Estilos globales
```

## 🎨 Paleta de Colores

La aplicación utiliza variables CSS para mantener consistencia visual:

- `--azul-oscuro: #1A237E` - Encabezados y elementos principales
- `--blanco: #FFFFFF` - Fondos principales
- `--gris-claro: #F5F5F5` - Fondos secundarios
- `--azul-claro: #64B5F6` - Botones y elementos interactivos
- `--gris-oscuro: #424242` - Texto principal
- `--error: #f44336` - Mensajes de error
- `--success: #4caf50` - Mensajes de éxito

## 🔧 Funcionalidades Principales

### Carreras
- Lista de carreras universitarias
- Búsqueda por nombre, descripción o días de cursada
- Filtrado en tiempo real

### Calendario de Reservas
- Vista mensual del calendario
- Selección de fechas para crear reservas
- Validación de conflictos de horarios
- Modal para crear nuevas reservas
- Gestión de aulas disponibles

### Formulario de Contacto
- Validación de campos en tiempo real
- Mensajes de éxito y error
- Simulación de envío

## 📱 Diseño Responsivo

La aplicación está diseñada con un enfoque mobile-first:

- **Navegación hamburguesa** en dispositivos móviles
- **Grid adaptable** que se ajusta a diferentes tamaños de pantalla
- **Tipografía escalable** para mejor legibilidad
- **Espaciado optimizado** para cada breakpoint

## 🧪 Backend Mock

La aplicación incluye un backend simulado usando `angular-in-memory-web-api`:

### Endpoints disponibles:
- `GET /api/careers` - Lista de carreras
- `GET /api/reservations` - Lista de reservas
- `POST /api/reservations` - Crear nueva reserva

### Datos de ejemplo:
- 5 carreras universitarias con información completa
- 3 reservas de ejemplo para demostración

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm start              # Ejecutar en modo desarrollo
npm run build          # Construir para producción
npm run watch          # Construir y observar cambios

# Testing
npm test               # Ejecutar pruebas unitarias

# Utilidades
npm run lint           # Verificar código (si está configurado)
```

## 🌐 Navegación

La aplicación incluye las siguientes rutas:

- `/` - Página de inicio
- `/about` - Sobre nosotros
- `/careers` - Carreras universitarias
- `/calendar` - Calendario de reservas
- `/contact` - Formulario de contacto

## 📝 Personalización

### Agregar nuevas carreras:
Edita `src/assets/mock/careers.json` para agregar o modificar carreras.

### Modificar aulas disponibles:
Actualiza el array `availableRooms` en `src/app/calendar/calendar.component.ts`.

### Cambiar colores:
Modifica las variables CSS en `src/styles.css`.

## 🔍 Solución de Problemas

### Error de dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto ocupado:
```bash
npm start -- --port 4201
```

### Problemas de compilación:
```bash
npm run build --verbose
```

## 📄 Licencia

Este proyecto está desarrollado como ejemplo educativo y puede ser utilizado libremente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ usando Angular**
