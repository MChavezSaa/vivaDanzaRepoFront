import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/Entidades/Album';
import { ActivatedRoute, Router } from '@angular/router';
import { BackServiceService } from 'src/app/services/back-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-album',
  templateUrl: './editar-album.component.html',
  styleUrls: ['./editar-album.component.css']
})
export class EditarAlbumComponent implements OnInit {

  estado = 1;
  nombre: string;
  albumBuscado: Album;
  id: number;
  constructor(public service: BackServiceService,
    public route: Router, public activeRoute: ActivatedRoute) {
    this.albumBuscado = new Album();
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = null;
      this.id = +params.get('id');
      if (this.id) {
        this.service.getAlbumxID(this.id).subscribe(album => {
          this.albumBuscado = album;
          this.nombre = this.albumBuscado.nombre;
          if (this.albumBuscado.estado == true) {
            this.estado = 1;
          } else {
            this.estado = 0;
          }
        });
      }
    })
  }


  save() {
    if (this.estado == 0) {
      this.albumBuscado.nombre = this.nombre;
      this.albumBuscado.estado = false;
      this.service.updateAlbum(this.albumBuscado, this.id).subscribe(
        album => {
          this.route.navigate(['/inicio/gestionGaleria']);
          Swal.fire('Proceso realizado con exito', 'Registro exitoso!', 'success');

        },
        err => {
          Swal.fire('Proceso no realizado', 'No se pudo generar registro!', 'error');
          console.log(err)
        }
      );

    } else {
      this.albumBuscado.nombre = this.nombre;
      this.albumBuscado.estado = true;
      this.service.updateAlbum(this.albumBuscado, this.id).subscribe(
        album => {
          this.albumBuscado = null;
          this.route.navigate(['/inicio/gestionGaleria']);
          Swal.fire('Proceso realizado con exito', 'Registro exitoso!', 'success');
        },
        err => {
          Swal.fire('Proceso no realizado', 'No se pudo generar registro!', 'error');
          console.log(err)
        }
      );
    }
  }

  cancelar() {
  
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
