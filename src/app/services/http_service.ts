import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'https://localhost:44309/api';
  constructor( private http: HttpClient) { }

  GetFacturas() {
     return firstValueFrom( 
      this.http.get<any>(this.apiUrl + '/Facturas')
    
    )

    
  }

  GetCliente() {
    return firstValueFrom(
     this.http.get(this.apiUrl + '/clientes', { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }
  
  GetClienteById(id: any) {
    return firstValueFrom(
      this.http.get(this.apiUrl + '/clientes/' + id, { responseType: 'text' })
    ).then(res => {
      try { return JSON.parse(res as string); } catch { return res; }
    });
  }
  GetDetalleFactura() {
    return firstValueFrom( 
     this.http.get<any>(this.apiUrl + '/DetallesFacturas')

    )
  }

  GetMetodoDePago() {
    return firstValueFrom(
      this.http.get<any>(this.apiUrl + '/MetodoDePago')
    )
  }

  GetVehiculos(){ 
    return firstValueFrom(
      this.http.get<any>(this.apiUrl + '/test'
    )
  )
  }
}
