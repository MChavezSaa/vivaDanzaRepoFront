import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  funcionariosList: Funcionario[] = [];

  constructor(private service: BackServiceService,
     public activeRoute: ActivatedRoute, public route: Router) {
    this.fun = new Funcionario();
    this.fun.cargo = "";
    this.activadorFoto = false;
    this.funcionarioBuscado = new Funcionario();
    this.deshabilitadorCampos = true;
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = null;
      this.id = +params.get('id');
      this.service.getFuncionarios().subscribe(fun => {
        this.funcionariosList= fun;
      });
      if (this.id) {
        this.activadorFoto = true;
        this.deshabilitadorCampos = false;
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

  private fotosSeleccionadas: File;
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files[0];
  }

  public save(): void {
    if (this.id) {
      //subimos imagen 
      this.service.subirImagenFuncionario(this.fotosSeleccionadas, this.id).subscribe(
        fun => {
          
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
}



