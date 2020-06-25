import { Component, OnInit } from '@angular/core';
import { BackServiceService } from 'src/app/services/back-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nueva-foto-carousel',
  templateUrl: './nueva-foto-carousel.component.html',
  styleUrls: ['./nueva-foto-carousel.component.css']
})
export class NuevaFotoCarouselComponent implements OnInit {

  constructor(public service: BackServiceService, public route: Router) { }

  ngOnInit() {
  }

  private fotosSeleccionadas: File[] = []
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files;
  }

  save() {  
    if(this.fotosSeleccionadas.length == 1){
      this.service.subirNuevaImagenCarousel(this.fotosSeleccionadas[0]).subscribe(
        fun =>{
          console.log('1 foto');  
          Swal.fire('Proceso realizado con exito', 'Registro exitoso!', 'success');
          this.route.navigate(['/inicio']);          
        }
      );
    } else{  
    for (var i = 0; i < this.fotosSeleccionadas.length; i++) {
      this.service.subirNuevaImagenCarousel(this.fotosSeleccionadas[i]).subscribe(
        fun =>{
          console.log('mas de 1 foto');
        }
      );
    }        
    Swal.fire('Proceso realizado con exito', 'Registro exitoso!', 'success');
    this.route.navigate(['/inicio']);
         
  }
}


}
