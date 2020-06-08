import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/template/template.component';
import { DatosComponent } from './pages/datos/datos.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'template', component: TemplateComponent},
  {path: 'datos', component: DatosComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }