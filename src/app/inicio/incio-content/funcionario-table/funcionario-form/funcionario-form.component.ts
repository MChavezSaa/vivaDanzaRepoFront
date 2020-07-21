import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  fun: Funcionario;
  activadorFoto: boolean;
  deshabilitadorCampos: boolean;
  funcionarioBuscado: Funcionario;
  FotoFuncionario: File;
  id: number;  
  editarIsOn = false;

  constructor(private service: BackServiceService,
     public activeRoute: ActivatedRoute, public route: Router) {
    this.fun = new Funcionario();
    this.fun.cargo = "";
    this.activadorFoto = false;
    this.funcionarioBuscado = new Funcionario();
    this.deshabilitadorCampos = true;
  }

  ngOnInit() {
    let local =  localStorage.getItem('flag');    
    if(local == "true"){
      this.editarIsOn = true;    
      this.activeRoute.paramMap.subscribe(params => {
        this.id = null;
        this.id = +params.get('id');
        if (this.id) {
          this.activadorFoto = false;
          this.deshabilitadorCampos = true;
          this.service.getFuncionariosPorID(this.id).subscribe(
            fun => {              
              this.funcionarioBuscado = fun;
              this.fun.nombres = this.funcionarioBuscado.nombres;
              this.fun.apellidos = this.funcionarioBuscado.apellidos;
              this.fun.cargo = this.funcionarioBuscado.cargo;
              this.fun.rut = this.funcionarioBuscado.rut;
            }
          );
        }
      })
    }
    
   
  }

  private fotosSeleccionadas: File;
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files[0];
  }

  public save(): void {
    if (this.id) {
      //subimos imagen 
      this.service.subirImagenFuncionario(this.fotosSeleccionadas, this.id).subscribe(
        fun => {          
          this.fun = null;
        },
        err => {
        }
      );

    } else {

      this.service.saveFuncionario(this.fun).subscribe(
        funcionario => {
          console.log('correcto sin id');
          localStorage.setItem('rut',this.fun.rut );
          this.route.navigate(['/inicio/sbi']) 
        },
        err => {
          console.log(err)
        }
      );
    }
  }
  public update(): void {
    console.log(this.fun);
    this.service.updateFuncionario(this.fun, this.funcionarioBuscado.id_funcionario)
      .subscribe(
        json => {
          localStorage.clear();
          this.editarIsOn= false;
          this.route.navigate(['/inicio/gf']);
          Swal.fire('Funcionario Actualizado', `Se ha actualizado el funcionario con Exito`, 'success');
          this.fun = null;
        },
        err => {
          console.log(err);
        });
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



