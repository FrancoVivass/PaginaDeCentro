import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import {  InstitucionComponent } from './institucion/institucion.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'reservar', component: CalendarComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'institucion', component: InstitucionComponent},
  { path: '**', redirectTo: '' }
];
