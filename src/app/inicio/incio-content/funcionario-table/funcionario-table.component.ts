import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-funcionario-table',
  templateUrl: './funcionario-table.component.html',
  styleUrls: ['./funcionario-table.component.css']
})
export class FuncionarioTableComponent implements OnInit {

  funcionariosList: Funcionario[] = [];

  constructor(private service: BackServiceService,
    public activeRoute: ActivatedRoute
    , public route: Router) { }

  ngOnInit() {
    this.service.getFuncionarios().subscribe(fun => {
      this.funcionariosList = fun;
    })
  }

  editar(id: number) {
    localStorage.setItem('flag', 'true');
    this.route.navigate(['/inicio/fform/' + id]);
  }

  actualizarFoto(fun: Funcionario) {
    localStorage.setItem('rut', fun.rut);
    this.route.navigate(['/inicio/sbi']);
  }
  delete(fun: Funcionario) {
    let id = fun.id_funcionario;
    this.service.deleteFuncionario(id).subscribe(fun => {
      Swal.fire('Funcionario eliminadi correctamente', ' Eliminado con exito', 'success');
      this.ngOnInit()
    });
  }
  public darAlta1(funcionario: Funcionario): void {
    let id :number ;
    id = funcionario.id_funcionario;
    this.service.darAlta(id).subscribe(
      fun => {
        Swal.fire('Funcionario dado de alta', ' Dado de alta con Exito', 'success');
      },
      err => {
        console.log(err);
      });
  }
}
