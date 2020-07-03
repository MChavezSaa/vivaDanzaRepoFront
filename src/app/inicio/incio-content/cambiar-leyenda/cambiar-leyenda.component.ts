import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Entidades/Funcionario';
import { BackServiceService } from 'src/app/services/back-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Quill} from 'quill'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cambiar-leyenda',
  templateUrl: './cambiar-leyenda.component.html',
  styleUrls: ['./cambiar-leyenda.component.css']
})
export class CambiarLeyendaComponent implements OnInit {

  activadorFoto= true;
  deshabilitadorCampos: false;
  funcionariosList :Funcionario[] =[];
  fun: Funcionario;
  rut: String;

  //QUILL
  textoQuill: string;
  MAX_LENGTH=1000;
  editorForm: FormGroup;
  editorContent: string
  
  editorStyle={
    height: '300px;',
    width: '300px'
  }

  config={
    toolbar: 
      ['bold', 'italic', 'underline'      
      ],
      
    
  }

  constructor(public service: BackServiceService, public route: Router) { 
    this.fun= new Funcionario();
  }

  ngOnInit() {    
    this.rut = localStorage.getItem('rut');
    this.service.getFuncionarioByRut(this.rut).subscribe(fun1 =>{
      this.fun= fun1;
      if(this.fun.leyenda == null){
        this.textoQuill= 'no existe leyenda por favor reemplace este texto';
      }else{
        this.textoQuill = this.fun.leyenda;
      }
      
    });
    this.editorForm = new FormGroup({
      editor : new FormControl()
    })

    
   
  }
  
  private fotosSeleccionadas: File;
  seleccionarFotos(event) {
    this.fotosSeleccionadas = event.target.files[0];
  }

  save(){
    this.fun.leyenda= this.textoQuill;
    this.service.updateLeyenda(this.fun, this.fun.id_funcionario).subscribe(fun=>{
      Swal.fire(
        'Contacto Enviado!',
        'Pronto te contactaremos!',
        'success'
      )
      this.route.navigate(['/inicio/qs']);
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
        this.route.navigate(['/inicio']);
      }
    })
  }

  onSubmit(){
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorContent)
      
  }
  textChanged($event){
    if ($event.editor.getLength() > this.MAX_LENGTH) {
      $event.editor.deleteText(this.MAX_LENGTH, $event.editor.getLength());
    }
  }
}
