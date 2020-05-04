import { Component, OnInit } from '@angular/core';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Carousel } from 'src/app/Entidades/carousel';

@Component({
  selector: 'app-incio-content',
  templateUrl: './incio-content.component.html',
  styleUrls: ['./incio-content.component.css']
})
export class IncioContentComponent implements OnInit {
  fotosCarousel: Carousel[] = [];
  constructor(public service: BackServiceService) { }

  ngOnInit() {
    this.service.getCarousel().subscribe(fun => {
     this.fotosCarousel= fun;
    });
  }

  imprimir(){
    console.log('entro')
    console.log(this.fotosCarousel)
  }
}
