import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subir-imagen-fun',
  templateUrl: './subir-imagen-fun.component.html',
  styleUrls: ['./subir-imagen-fun.component.css']
})
export class SubirImagenFunComponent implements OnInit {

  activadorFoto= true;
  deshabilitadorCampos: false;
  funcionariosList :Funcionario[] =[];
  fun: Funcionario;
  rut: String;
  constructor(public service: BackServiceService, public route: Router) { 
    this.fun= new Funcionario();
  }

  ngOnInit() {
    this.rut = localStorage.getItem('rut');
    this.service.getFuncionarioByRut(this.rut).subscribe(fun1 =>{
      this.fun= fun1;
    });

    
   
  }

  private fotosSeleccionadas: File;
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files[0];
  }

  save(){
    this.service.subirImagenFuncionario(this.fotosSeleccionadas, this.fun.id_funcionario).subscribe(
      fun => {
        localStorage.clear();
        Swal.fire(
          'Imagen asignada!',
          'subida exitosa!',
          'success'
        )
        this.route.navigate(['/inicio/gf']);
      },
      err => {        
        console.log(err);
      }
    );
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
        this.route.navigate(['/inicio/gf']);
      }
    })
  }
}
