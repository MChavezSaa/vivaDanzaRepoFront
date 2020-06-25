import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUser: String;
  constructor(private router: Router , public service: BackServiceService) { }

  ngOnInit() {
    this.nombreUser= this.service.usuario.nombre;
  }
  login(): void {
    this.router.navigateByUrl('/inicioSesion');
  }
  logout(): void{
    this.service.logout();
    this.router.navigateByUrl('/inicio');
  }

}
