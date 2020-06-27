import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Router } from '@angular/router';

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
        this.route.navigate(['/inicio/gf']);
      },
      err => {        
        console.log(err);
      }
    );
  }
}
