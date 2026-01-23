export interface FacturaConDetalle {
  IDfacturas: number;
  IDcliente: number;
  IDmdp: number;
  TotalFactura: number;
  Fecha: Date | string;
  EstatusFactura: number;
  IDvehiculo: number;
  Descripcion: string;
  Cantidad: number;
  TotalDetalle: number;
  EstatusDetalle: number;
}
