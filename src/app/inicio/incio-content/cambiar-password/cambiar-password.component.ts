import { Component, OnInit } from '@angular/core';
import { cambioPass } from 'src/app/Entidades/cambioPass';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entidades/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  constructor(public service: BackServiceService, private route: Router) { }
  cambiopass: cambioPass = new cambioPass();

  ngOnInit() {
  }
  cambiarPass() {
    let user: Usuario = new Usuario();
    user.username = this.service.usuario.username;
    user.password = this.cambiopass.nueva;   
    this.service.cambioPass(user).subscribe(res => {      
      Swal.fire('Contraseña cambiada correctamente', 'Ingrese nuevamente', 'success');
      this.service.logout();
      this.route.navigate(['']);
    });


  }

}
