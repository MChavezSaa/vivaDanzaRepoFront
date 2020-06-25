import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-funcionario-table',
  templateUrl: './funcionario-table.component.html',
  styleUrls: ['./funcionario-table.component.css']
})
export class FuncionarioTableComponent implements OnInit {

  funcionariosList :Funcionario[] = [];

  constructor(private service: BackServiceService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.getFuncionarios().subscribe(fun =>{
      this.funcionariosList = fun;      
    })
  }

}
