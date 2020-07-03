import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from 'src/app/Entidades/Email';
import { BackServiceService } from 'src/app/services/back-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  
  mail : Email;

  editorForm: FormGroup;
  editorContent: string
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
 
  constructor(public service: BackServiceService) { }

  ngOnInit() {
    this.service.getContacto().subscribe(fun=>{
      this.editorContent = fun.texto;
    })
    this.mail = new Email();
    this.editorForm = new FormGroup({
      editor : new FormControl()
    })
  }
  sendMail(){
     this.service.sendEmail(this.mail).subscribe(fun=>{
      Swal.fire(
        'Contacto Enviado!',
        'Pronto te contactaremos!',
        'success'
      )
      this.ngOnInit();
    })
  }
  

}
