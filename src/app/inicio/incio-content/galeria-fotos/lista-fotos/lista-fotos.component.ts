import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Foto } from '../../../../Entidades/Foto';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Album } from 'src/app/Entidades/Album';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-lista-fotos',
  templateUrl: './lista-fotos.component.html',
  styleUrls: ['./lista-fotos.component.css']
})
export class ListaFotosComponent implements OnInit {

  albumesList: Album[] = [];
  searchText: string;

  @Output() albumSeleccionado = new EventEmitter<Album>();

  constructor(public service: BackServiceService, public route: Router) { }

  ngOnInit() {
    this.service.getAlbumes().subscribe(fun => {
      this.albumesList = fun;
    });
  }

  estado(album: Album) {
    if (album.estado == true) {
      return "Activo"
    } else {
      return "Inactivo"
    }
  }
  selecc(seleccionada: Album) {
    console.log(this.albumSeleccionado);
    this.albumSeleccionado.emit(seleccionada);

  }

  albumForm() {
    this.route.navigate(['/inicio/albumForm'])
  }

  delete(album: Album) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro de eliminar la foto?',
      text: "Estos cambios no podran recuperarse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        album.estado = false;
        this.service.updateAlbum(album, album.id_album).subscribe(
          fun => {
            console.log('eliminado exitoso');
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Álbum eliminado correctamente.',
              'success'
            )
            this.ngOnInit();
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se realizaron cambios',
          'error'
        )
      }
    });
  }

  darAlta(albumBuscado: Album) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro de activar el album?',
      text: "Volvera al apartado de activos y se mostrara nuevamente en la galería",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        albumBuscado.estado=true;
       
          this.service.updateAlbum(albumBuscado, albumBuscado.id_album).subscribe(
          fun => {
            console.log('eliminado exitoso');
            swalWithBootstrapButtons.fire(
              'Activado!',
              'Activado correctamente.',
              'success'
            )
            this.route.navigate(['/inicio/gestionGaleria']);
            this.ngOnInit();
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se realizaron cambios',
          'error'
        )
      }
    });
  }



}
