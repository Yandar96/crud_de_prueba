import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario, UsuarioService } from '../../services/usuario.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-usuario',
  standalone: true,
  
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    HttpClientModule,
    ToastModule
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioDialog: boolean = false;
  usuario: Usuario = { nombre: '', correo: '' };
  submitted: boolean = false;
  editando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
  }

listarUsuarios() {
  this.usuarioService.getUsuarios().subscribe(data => {
    console.log('Usuarios recibidos:', data);
    this.usuarios = data;
  });
}

  abrirNuevo() {
    this.usuario = { nombre: '', correo: '' };
    this.submitted = false;
    this.usuarioDialog = true;
    this.editando = false;
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.usuarioDialog = true;
    this.editando = true;
  }

  eliminarUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar a ${usuario.nombre}?`,
      accept: () => {
        if (usuario.id) {
          this.usuarioService.eliminarUsuario(usuario.id).subscribe(() => {
            this.listarUsuarios();
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Usuario eliminado', life: 3000 });
          });
        }
      }
    });
  }

  guardarUsuario() {
    this.submitted = true;

    if (!this.usuario.nombre || !this.usuario.correo) return;

    if (this.editando && this.usuario.id) {
      this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
        this.listarUsuarios();
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario actualizado', life: 3000 });
        this.usuarioDialog = false;
      });
    } else {
      this.usuarioService.crearUsuario(this.usuario).subscribe(() => {
        this.listarUsuarios();
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Usuario creado', life: 3000 });
        this.usuarioDialog = false;
      });
    }
  }

  ocultarDialogo() {
    this.usuarioDialog = false;
    this.submitted = false;
  }
}
