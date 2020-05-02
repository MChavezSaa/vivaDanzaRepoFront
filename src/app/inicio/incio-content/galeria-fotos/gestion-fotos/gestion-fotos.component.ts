import { Component, OnInit } from '@angular/core';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Foto } from 'src/app/Entidades/Foto';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-fotos',
  templateUrl: './gestion-fotos.component.html',
  styleUrls: ['./gestion-fotos.component.css']
})
export class GestionFotosComponent implements OnInit {

  FotosList: Foto[] = [];
  id: number
  constructor(public service: BackServiceService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = null;
      this.id = +params.get('id');
      if (this.id) {
        this.service.fotosPorAlbum(this.id).subscribe(fun => {
          this.FotosList = fun;
        });
      }
    })
  }
  delete(foto: Foto){
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

        this.service.deleteFoto(foto.id).subscribe(
          response=>{
            console.log('eliminado exitoso');
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Foto eliminada correctamente.',
              'success'
            )
            this.ngOnInit();
          });
        
       
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se realizaron Cambios',
          'error'
        )
      }
    })

   

  }
 

}
