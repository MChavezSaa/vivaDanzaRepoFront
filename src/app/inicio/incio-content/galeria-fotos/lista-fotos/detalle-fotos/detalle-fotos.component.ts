import { Component, OnInit, Input } from '@angular/core';
import { Foto } from 'src/app/Entidades/Foto';
import { Album } from 'src/app/Entidades/Album';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-detalle-fotos',
  templateUrl: './detalle-fotos.component.html',
  styleUrls: ['./detalle-fotos.component.css']
})
export class DetalleFotosComponent implements OnInit {
  nombre: string;
  album: Album;
  albumBuscado: Album;
  id: number = null;
  desactivaNombre = false;

  constructor(public service: BackServiceService,
    public route: Router, public activeRoute: ActivatedRoute) {
    this.album = new Album();
    this.albumBuscado = new Album();
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = null;
      this.id = +params.get('id');
      if (this.id) {
        this.desactivaNombre=true;
        this.service.getAlbumxID(this.id).subscribe(album => {
          this.albumBuscado = album;
        });
      }
    })
  }
  save() {
    if (this.id) {
      this.desactivaNombre = true;
      this.subirFoto(this.albumBuscado);
    } else {
      this.album.nombre = this.nombre;
      this.service.saveAlbum(this.album).subscribe(
        album => {
          let albumprueba: Album[] = [];
          this.service.getAlbumes().subscribe(
            albumes => {
              albumprueba = albumes;
              this.subirFoto(albumprueba[albumprueba.length - 1])
              this.album = null;
            }
          );

        },
        err => {
          console.log(err)
        }
      );

    }
  }
  subirFoto(album: Album) {
    for (var i = 0; i < this.fotosSeleccionadas.length; i++) {
      this.service.subirImagen(this.fotosSeleccionadas[i], album.id_album).subscribe();
    }
    this.desactivaNombre= false;
    this.route.navigate(['/inicio/gestionGaleria'])
    Swal.fire('Proceso realizado con exito', 'Registro exitoso!', 'success');
    
  };

  private fotosSeleccionadas: File[] = []
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files;
  }
  cancelar(){

    Swal.fire({
      title: '¿Estas seguro?',
      text: "No se guardara ningun progreso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, volver!',
      cancelButtonText: 'Manternerme aqui!',
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/inicio/gestionGaleria']);
      }
    })

    
  }
}
