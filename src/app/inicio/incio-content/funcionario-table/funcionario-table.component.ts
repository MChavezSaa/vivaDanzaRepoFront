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

  public darAlta(fun: Funcionario): void {
    this.service.darAlta(fun, fun.id_funcionario)
      .subscribe(
        json => {
          Swal.fire('Cambio de estado',' Cambio de estado realizado con éxito', 'success');
          this.ngOnInit();
        },
        err => {
          console.log(err);
        });
  }
}
