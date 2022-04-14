import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp:any = null;

  constructor(
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService
  ) {

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( resp => {
        // console.log(resp);
        const {nombre,email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Guardado', err.error.msg, 'error');
      });

  }

  cambiarimagen(file:any):any{
    // console.log(file)

    if(file?.target?.files[0]){

      this.imagenSubir = file?.target?.files[0];

      if (!file) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.imagenSubir);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    }

  }

  subirImagen(){

    const uid = String( this.usuario.uid );

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', uid)
      .then( img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }, (err) => {
        Swal.fire('Guardado', 'No se pudo subir la imagen', 'error');
      });

  }

}
