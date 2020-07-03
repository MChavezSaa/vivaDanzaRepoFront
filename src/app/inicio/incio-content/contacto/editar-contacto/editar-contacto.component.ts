import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Quill} from 'quill'


import { BackServiceService } from 'src/app/services/back-service.service';
import { Contacto } from 'src/app/Entidades/Contacto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent implements OnInit {
  textoQuill: string;
  MAX_LENGTH=1000;
  editorForm: FormGroup;
  editorContent: string
  contaco: Contacto
  
 
  
  editorStyle={
    height: '300px;',
    width: '300px'
  }

  config={
    toolbar: 
      ['bold', 'italic', 'underline', 'strike',
       { 'list': 'ordered'}, { 'list': 'bullet' }      
      ],
      
    
  }
  constructor(public service: BackServiceService, public route: Router) {}
    

  ngOnInit() {
        
    this.editorForm = new FormGroup({
      editor : new FormControl()
    })
    this.service.getContacto().subscribe(fun=>{
      this.contaco =  fun;
      this.textoQuill= this.contaco.texto
    })
  }

 

  onSubmit(){
    this.editorContent = this.editorForm.get('editor').value;
    this.contaco.texto = this.editorContent;

    this.service.saveContacto(this.contaco).subscribe(fun=>{
      Swal.fire(
        'Texto Actualizado!',
        'Acción realizada con exito!',
        'success'
      )
      this.route.navigate(['/inicio/contacto']);
    })
  }
  preview(){
    this.editorContent = this.editorForm.get('editor').value;    
    this.contaco.texto = this.editorContent;
  }
  textChanged($event){
    if ($event.editor.getLength() > this.MAX_LENGTH) {
      $event.editor.deleteText(this.MAX_LENGTH, $event.editor.getLength());
    }
  }
}
