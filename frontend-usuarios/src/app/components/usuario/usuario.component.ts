import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

import { Cargo } from '../../models/cargo.model';
import { CargoService } from '../../services/cargo.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';

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
    ToastModule,
    DropdownModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('staggerList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})


export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  cargos: Cargo[] = [];
  usuarioDialog: boolean = false;
  usuario: any = {
  nombre: '',
  correo: '',
  contrasena: '',
  cargoId: null // usamos esto para el dropdown
};
  submitted: boolean = false;
  editando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private cargoService: CargoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
    this.getCargos(); // carga los cargos para el dropdown
  }


  getCargos() {
    this.cargoService.getCargos().subscribe(data => {
      this.cargos = data;
    });
  }
listarUsuarios() {
  this.usuarioService.getUsuarios().subscribe(data => {
    console.log('Usuarios recibidos:', data);
    this.usuarios = data;
  });
}

  abrirNuevo() {
    this.usuario = { nombre: '', correo: '', contrasena: '',  cargoId: null };

    this.submitted = false;
    this.usuarioDialog = true;
    this.editando = false;
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

  if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.cargoId) return;

  // Convertir cargoId a objeto antes de enviar
  const usuarioParaGuardar = {
    ...this.usuario,
    cargo: { id: this.usuario.cargoId }
  };

  if (this.editando && this.usuario.id) {
    this.usuarioService.actualizarUsuario(usuarioParaGuardar).subscribe(() => {
      this.listarUsuarios();
      this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario actualizado', life: 3000 });
      this.usuarioDialog = false;
    });
  } else {
    this.usuarioService.crearUsuario(usuarioParaGuardar).subscribe(() => {
      this.listarUsuarios();
      this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Usuario creado', life: 3000 });
      this.usuarioDialog = false;
    });
  }
}


  editarUsuario(usuario: Usuario) {
  this.usuario = {
    ...usuario,
    cargoId: usuario.cargo?.id ?? null
  };
  this.usuarioDialog = true;
  this.editando = true;
}



  ocultarDialogo() {
    this.usuarioDialog = false;
    this.submitted = false;
  }
}
