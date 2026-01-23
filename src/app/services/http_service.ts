import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'https://localhost:7094/api';
  constructor(private http: HttpClient) { }


  ObtenerFacturas() {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/Facturas', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }

  CrearFactura(formValue: any) {
    const payload = {
      IDcliente: formValue.IDcliente,
      IDmdp: formValue.IDmdp,
      Total: formValue.Total,
      Fecha: formValue.Fecha
    };
    return firstValueFrom(
      this.http.post<any>(this.apiUrl + '/Facturas', payload)
    );
  }

  ActualizarFactura(id: any, data: any) {
    const payload = {
      IDcliente: data.IDcliente,
      IDmdp: data.IDmdp,
      Total: data.Total,
      Fecha: data.Fecha
    };
    return firstValueFrom(
      this.http.put<any>(this.apiUrl + '/Facturas/' + id, payload)
    );
  }

  EliminarFactura(id: any) {
    return firstValueFrom(
      this.http.delete<any>(this.apiUrl + '/Facturas/' + id)
    );
  }


  ObtenerClientes() {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/clientes', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }
  
  ObtenerClientePorId(id: any) {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/clientes/' + id, { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }
  
  ObtenerDetalleFactura() {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/DetallesFacturas', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }

  ObtenerDetalleFacturaPorId(id: any) {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/DetallesFacturas/' + id, { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }

  CrearDetalleFactura(formValue: any) {
    const payload = {
      IDfacturas: formValue.IDfacturas,
      IDvehiculo: formValue.IDvehiculo,
      Descripcion: formValue.Descripcion,
      Cantidad: formValue.Cantidad,
      Total: formValue.Total
    };
    return firstValueFrom(
      this.http.post<any>(this.apiUrl + '/DetallesFacturas', payload)
    );
  }

  ActualizarDetalleFactura(id: any, data: any) {
    const payload = {
      IDfacturas: data.IDfacturas,
      IDvehiculo: data.IDvehiculo,
      Descripcion: data.Descripcion,
      Cantidad: data.Cantidad,
      Total: data.Total3
    };
    return firstValueFrom(
      this.http.put<any>(this.apiUrl + '/DetallesFacturas/' + id, payload)
    );
  }

  EliminarDetalleFactura(id: any) {
    return firstValueFrom(
      this.http.delete<any>(this.apiUrl + '/DetallesFacturas/' + id)
    );
  }
  
  CrearCliente(formValue: any) {
    const payload = {
      Nombre: formValue.Nombre,
      apellido: formValue.Apellido,
      Correo: formValue.Correo,
      Telefono: formValue.Telefono,
      Fecha_Nacimiento: formValue.FechaNacimiento
    };
    return firstValueFrom(
      this.http.post<any>(this.apiUrl + '/clientes', payload)
    );
  }

  ActualizarCliente(id: any, data: any) {
    const payload = {
      Nombre: data.Nombre,
      apellido: data.apellido,
      Correo: data.Correo,
      Telefono: data.Telefono,
      Fecha_Nacimiento: data.Fecha_Nacimiento
    };
    return firstValueFrom(
      this.http.put<any>(this.apiUrl + '/clientes/' + id, payload)
    );
  }

  EliminarCliente(id: any) {
    return firstValueFrom(
      this.http.delete<any>(this.apiUrl + '/clientes/' + id)
    );
  }

  
  ObtenerVehiculos() {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/test', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }

  ObtenerVehiculoPorId(id: any) {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/test/' + id, { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }

  CrearVehiculo(formValue: any) {
    const payload = {
      Chasis: formValue.Chasis,
      Marca: formValue.Marca,
      Anio: formValue.Anio,
      Modelo: formValue.Modelo,
      Color: formValue.Color
    };
    return firstValueFrom(
      this.http.post<any>(this.apiUrl + '/test', payload)
    );
  }

  ActualizarVehiculo(id: any, data: any) {
    const payload = {
      Chasis: data.Chasis,
      Marca: data.Marca,
      Anio: data.Anio,
      Modelo: data.Modelo,
      Color: data.Color
    };
    return firstValueFrom(
      this.http.put<any>(this.apiUrl + '/test/' + id, payload)
    );
  }

  EliminarVehiculo(id: any) {
    return firstValueFrom(
      this.http.delete<any>(this.apiUrl + '/test/' + id)
    );
  }


  ObtenerFacturasConDetalle() {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/FacturasConDetalle', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }
}
