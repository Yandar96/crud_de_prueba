import { Cargo } from "./cargo.model";

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contrasena: string;
  cargoId?: number;
  cargo?: Cargo; // Opcional, si se necesita el nombre del cargo
}
