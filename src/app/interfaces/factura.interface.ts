export interface Factura {
  IDfacturas: number;
  IDcliente: number;
  IDmdp: number;
  Total: number;
  Fecha: Date | string;
}
