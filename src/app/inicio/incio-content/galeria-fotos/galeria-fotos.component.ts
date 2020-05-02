import { Component, OnInit } from '@angular/core';
import { Foto } from 'src/app/Entidades/Foto';
import { Album } from 'src/app/Entidades/Album';
import { BackServiceService } from 'src/app/services/back-service.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.component.html',
  styleUrls: ['./galeria-fotos.component.css']
})
export class GaleriaFotosComponent implements OnInit {

  albumesList: Album[] = [];
  fotosList: Foto[] = [];
  fotosListAux: Foto[] = [];
  albumSeleccionado: Album;
  fotoExpandida: any;

  constructor(public service: BackServiceService, public route: Router) {
    this.albumSeleccionado = new Album();
  }


  ngOnInit() {
    this.service.getAlbumes().subscribe(fun => {
      this.albumesList = fun;
      this.service.getFotos().subscribe(fun1 => {
        this.fotosList = fun1;
      });
    });

  }

  selecionarAlbum(album: Album) {
    this.fotosListAux = [];
    this.albumSeleccionado = null;
    this.albumSeleccionado = album;
    for (let i = 0; i < this.fotosList.length; i++) {
      if (this.fotosList[i].album.id_album == album.id_album) {
        this.fotosListAux.push(this.fotosList[i]);
      }
    }
  }

  gestion(){
    this.route.navigate(['/inicio/gestionGaleria']);
  }

  expandir(file: File): void {
     this.fotoExpandida= null;
     this.fotoExpandida= file;

  }

}
