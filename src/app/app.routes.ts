import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CareerDetailComponent } from './careers/career-detail/career-detail.component';
import { ContactComponent } from './contact/contact.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'careers', component: CareersComponent },
    { path: 'careers/:id', component: CareerDetailComponent },
  { path: 'reservar', component: CalendarComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'institucion', component: InstitucionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
