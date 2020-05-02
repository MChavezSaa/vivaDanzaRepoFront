import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-qs',
  templateUrl: './qs.component.html',
  styleUrls: ['./qs.component.css']
})
export class QSComponent implements OnInit {

  constructor(private service: BackServiceService) { }

  FuncionarioList: Funcionario[] = [];
  ngOnInit() {
    this.service.getFuncionarios().subscribe(fun =>{
      this.FuncionarioList= fun;
     });
  }

}
