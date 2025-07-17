import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cargo } from '../../models/cargo.model';
import { CargoService } from '../../services/cargo.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './cargo.component.html',
  styleUrl: './cargo.component.css'
})
export class CargoComponent {
  cargos: Cargo[] = [];
  cargoDialog: boolean = false;
  cargo: Cargo = this.initCargo();
  submitted: boolean = false;

  constructor(
    private cargoService: CargoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.listarCargos();
  }

  initCargo(): Cargo {
    return {
      nombre: '',
      dependencia: '',
      salario: 0
    };
  }

  listarCargos() {
    this.cargoService.getCargos().subscribe(data => {
      this.cargos = data;
    });
  }

  openNew() {
    this.cargo = this.initCargo();
    this.submitted = false;
    this.cargoDialog = true;
  }

  editCargo(cargo: Cargo) {
    this.cargo = { ...cargo };
    this.cargoDialog = true;
  }

  eliminarCargo(cargo: Cargo) {
    if (cargo.id !== undefined) {
      this.cargoService.eliminarCargo(cargo.id).subscribe(() => {
        this.cargos = this.cargos.filter(c => c.id !== cargo.id);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cargo eliminado' });
      });
    } else {
      console.error('No se puede eliminar: el cargo no tiene ID');
    }
  }

  hideDialog() {
    this.cargoDialog = false;
    this.submitted = false;
  }

  saveCargo() {
    this.submitted = true;

    if (!this.cargo.nombre.trim()) return;

    if (this.cargo.id) {
      this.cargoService.actualizarCargo(this.cargo.id, this.cargo).subscribe(data => {
        const index = this.cargos.findIndex(c => c.id === data.id);
        this.cargos[index] = data;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cargo actualizado' });
      });
    } else {
      this.cargoService.crearCargo(this.cargo).subscribe(data => {
        this.cargos.push(data);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cargo creado' });
      });
    }

    this.cargoDialog = false;
    this.cargo = this.initCargo();
  }
}
