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
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cargo',
  standalone: true,
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
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
  providers: [ConfirmationService, MessageService]
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

  private initCargo(): Cargo {
    return {
      nombre: '',
      dependencia: '',
      salario: 0
    };
  }

  listarCargos(): void {
    this.cargoService.getCargos().subscribe(data => {
      this.cargos = data;
    });
  }

  openNew(): void {
    this.cargo = this.initCargo();
    this.submitted = false;
    this.cargoDialog = true;
  }

  editCargo(cargo: Cargo): void {
    this.cargo = { ...cargo };
    this.cargoDialog = true;
  }

  eliminarCargo(cargo: Cargo): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el cargo "${cargo.nombre}"?`,
      accept: () => {
        if (cargo.id !== undefined) {
          this.cargoService.eliminarCargo(cargo.id).subscribe(() => {
            this.cargos = this.cargos.filter(c => c.id !== cargo.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cargo eliminado'
            });
          });
        }
      }
    });
  }

  hideDialog(): void {
    this.cargoDialog = false;
    this.submitted = false;
  }

  saveCargo(): void {
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
