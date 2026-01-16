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
      this.http.get<any>(this.apiUrl + '/Facturas')
    )
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
      Total: data.Total
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
      IDcliente: 999999999,
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
}
