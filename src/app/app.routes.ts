import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/Hero/hero-page.component';
import { DragonballPageComponent } from './pages/dragonball/dragonball-page.component';
import { DragonballSuperPageComponent } from './pages/dragonball-super/dragonball-super-page.component';
import { Test1PageComponent } from './pages/Test1-/Test1-page.component';
import { ClienteDetallesComponent } from './pages/Cliente-Detalles/Cliente-Detalles';


export const routes: Routes = [
    {path: '',component: CounterPageComponent},
    {path: 'hero',component: HeroPageComponent},
    {path: 'dragonball',component: DragonballPageComponent}, 
    {path: 'dragonball-super',component: DragonballSuperPageComponent},  
    {path: 'Test1',component: Test1PageComponent},
    {path: 'cliente/Cdetalle/:id', component: ClienteDetallesComponent },
    {path: '**',redirectTo: ''},


    
   
];  
