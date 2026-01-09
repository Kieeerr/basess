import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http_service';

@Component({
  selector: 'app-test1-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Test1-page.component.html',

})
export class Test1PageComponent { 


postFacturas: any ;
postClientes: any ;
postsDetalleFactura: any ;

constructor(private httpService: HttpService, private router: Router) { }

goToCliente(id: any) {
  if (!id) return;
  this.router.navigate(['/cliente/Cdetalle', id]);
}





async getPostCliente() {
  this.postClientes = await this.httpService.ObtenerClientes();
  console.log(this.postClientes);
}

async getPostDetalleFactura() {
  this.postsDetalleFactura = await this.httpService.ObtenerDetalleFactura();
  console.log(this.postsDetalleFactura);
}
// Eliminadas llamadas a GetMetodoDePago y GetVehiculos (funcionalidades no esenciales)
}