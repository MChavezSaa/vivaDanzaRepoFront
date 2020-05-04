import { Component, OnInit } from '@angular/core';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Carousel } from 'src/app/Entidades/carousel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-carousel',
  templateUrl: './editar-carousel.component.html',
  styleUrls: ['./editar-carousel.component.css']
})
export class EditarCarouselComponent implements OnInit {

  constructor( public service: BackServiceService, public route: Router) { }
  carouselList: Carousel[] = [];
  ngOnInit() {
    this.service.getCarousel().subscribe(fun =>{
     this.carouselList= fun;
    });
  }

  delete(c: Carousel){
    this.service.desactivarFotoCarousel(c.id).subscribe(fun => {
      //sweetAlert aqui
      console.log('eliminado ');
      this.ngOnInit();

    });
  }

}
