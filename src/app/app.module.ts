import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'  //necesario para implementar rutas 
import {HttpClientModule} from '@angular/common/http'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { IncioContentComponent } from './inicio/incio-content/incio-content.component';
import { InicioSesionComponent } from './inicio/incio-content/inicio-sesion/inicio-sesion.component';
import { ContactoComponent } from './inicio/incio-content/contacto/contacto.component';
import { QSComponent } from './inicio/incio-content/qs/qs.component';
import { FuncionarioTableComponent } from './inicio/incio-content/funcionario-table/funcionario-table.component';
import { FuncionarioFormComponent } from './inicio/incio-content/funcionario-table/funcionario-form/funcionario-form.component';
import { GaleriaFotosComponent } from './inicio/incio-content/galeria-fotos/galeria-fotos.component';
import { ListaFotosComponent } from './inicio/incio-content/galeria-fotos/lista-fotos/lista-fotos.component';
import { DetalleFotosComponent } from './inicio/incio-content/galeria-fotos/lista-fotos/detalle-fotos/detalle-fotos.component';
import { EditarAlbumComponent } from './inicio/incio-content/galeria-fotos/lista-fotos/editar-album/editar-album.component';
import { GestionFotosComponent } from './inicio/incio-content/galeria-fotos/gestion-fotos/gestion-fotos.component';
import { FilterGalleryPipe } from './pipes/filter-gallery.pipe';
import { EditarCarouselComponent } from './inicio/incio-content/editar-carousel/editar-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NuevaFotoCarouselComponent } from './inicio/incio-content/editar-carousel/nueva-foto-carousel/nueva-foto-carousel.component';
import { FotoExistenteComponent } from './inicio/incio-content/editar-carousel/foto-existente/foto-existente.component';







const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},   //como pagina de inicio se debe dejar la vista para los clientes
  {path:'inicio',component:InicioComponent,
    children: [
      {
        path:'',
        component:IncioContentComponent
      },
      {
        path:'contacto',
        component: ContactoComponent
      },
      {
        path:'qs',
        component: QSComponent
      }, 
      {
        path: 'gf',
        component: FuncionarioTableComponent
      },
      {
        path: 'fform',
        component: FuncionarioFormComponent
      },
      {
        path:'Galeria',
        component: GaleriaFotosComponent
      },
      {
        path:'gestionGaleria',
        component: ListaFotosComponent
      },
      {
        path:"albumForm",
        component: DetalleFotosComponent
      },
      {
        path:"albumForm/:id",
        component: DetalleFotosComponent
      },
      {
        path:'editarAlbum/:id',
        component:EditarAlbumComponent
      },
      {
        path:'gesFotos/:id',
        component:GestionFotosComponent
      },
      {
        path:'editarCarousel',
        component: EditarCarouselComponent
      },
      {
        path:'nuevaFotoCarousel',
        component: NuevaFotoCarouselComponent
      },
      {
        path:'fotoExistente',
        component: FotoExistenteComponent
      }
    ]
  },
  {
    path:'inicioSesion',
    component: InicioSesionComponent
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    InicioComponent,
    IncioContentComponent,
    ContactoComponent,
    InicioSesionComponent,
    QSComponent,
    FuncionarioTableComponent,
    FuncionarioFormComponent,
    GaleriaFotosComponent,
    ListaFotosComponent,
    DetalleFotosComponent,
    EditarAlbumComponent,
    GestionFotosComponent,
    FilterGalleryPipe,
    EditarCarouselComponent,
    NuevaFotoCarouselComponent,
    FotoExistenteComponent,
    
  ],
  imports: [
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),    //se le entrega nuestro arreglo con las rutas definidas
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
