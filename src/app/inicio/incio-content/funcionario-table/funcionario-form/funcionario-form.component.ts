import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  fun: Funcionario;

  constructor(private service: BackServiceService) {
    this.fun = new Funcionario();
  }

  ngOnInit() {
  }

  print() {
    console.log(this.fun)
  }
  public save(): void {
    this.service.saveFuncionario(this.fun).subscribe(
      funcionario => {        
        this.fun = null;
      },
      err => {
        console.log(err)
      }
    );
  }

}
