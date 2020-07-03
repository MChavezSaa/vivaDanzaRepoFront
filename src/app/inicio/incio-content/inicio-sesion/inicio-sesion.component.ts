import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entidades/usuario';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  
  usuario: Usuario;

  constructor(private router: Router, private service: BackServiceService,) { 
    this.usuario= new Usuario();  
  }

  ngOnInit() {
    if(this.service.isAuthenticated()){
      //Swal.fire('Inicio de sesión correctamente', `Bienvenido nuevamente ${this.service.usuario.username}`, 'info');
      this.router.navigate(['/inicio'])
    }
  }

  login(): void{
   // console.log(this.usuario);

    if(this.usuario.username == null || this.usuario.password == null){      
      //Swal.fire('Error al ingresar', 'Verifica usuario y contraseña.', 'error');
      return;
    }
      
    this.service.login(this.usuario).subscribe(response => {
     // console.log(response);      
      
      //let payload = JSON.parse(atob(response.access_token.split(".")[1]));

      this.service.guardarUsuario(response.access_token);
      this.service.guardarToken(response.access_token);
        
      this.router.navigate(['/inicio']);
      let usuario = this.service.usuario;
      //Swal.fire('Inicio de sesión correctamente', `Bienvenido ${usuario.username}`, 'success');
    }, err => {
      if(err.status == 400){
        //Swal.fire('Error credenciales incorrectas', 'Verifica usuario y contraseña.', 'error');
      }
    }
    );
  }
  volverInicio(){
    this.router.navigateByUrl('/inicio');
  }
}
