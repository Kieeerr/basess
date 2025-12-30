import { Component } from '@angular/core';
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
postMetodoDePago: any;
postVehiculos: any;


constructor(private httpService: HttpService) { }



async getPostFactura() { 
  this.postFacturas = await this.httpService.GetFacturas();
  console.log(this.postFacturas);
};

async getPostCliente() {
  this.postClientes = await this.httpService.GetCliente();
  console.log(this.postClientes);
}

async getPostDetalleFactura() {
  this.postsDetalleFactura = await this.httpService.GetDetalleFactura();
  console.log(this.postsDetalleFactura);
}
async getpostMetodoDePago() {
  this.postMetodoDePago = await this.httpService.GetMetodoDePago()
}

async GetPostVehiculos(){
  this.postVehiculos = await this.httpService.GetVehiculos()
}
}