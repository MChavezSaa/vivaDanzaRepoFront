import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/Entidades/Album';
import { Foto } from 'src/app/Entidades/Foto';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Carousel } from 'src/app/Entidades/carousel';

@Component({
  selector: 'app-foto-existente',
  templateUrl: './foto-existente.component.html',
  styleUrls: ['./foto-existente.component.css']
})
export class FotoExistenteComponent implements OnInit {
  AlbumesList: Album[] =[]
  FotosList: Foto[] =[];
  fotosFiltradas : Foto[] =[];
  constructor(private service: BackServiceService) { }

  ngOnInit() {
    this.service.getAlbumes().subscribe(fun =>{
      this.AlbumesList= fun
      this.service.getFotos().subscribe(fun1 => {
        this.FotosList = fun1;
      });
    });
  }

  cambioAlbum(album: Album){
    this.fotosFiltradas =[]
    for(let i =0 ; i < this.FotosList.length; i++){
        if(this.FotosList[i].album.id_album == album.id_album){
          this.fotosFiltradas.push(this.FotosList[i])
        }
    }
  }
  activar(foto: Foto){
    let carousel: Carousel = new Carousel();
    carousel.file = foto.file;
    this.service.subirImagenExistente(carousel).subscribe(fun=>{
      console.log('subida');
    });

  }
}
