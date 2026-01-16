import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http_service';

@Component({
  selector: 'app-detalle-factura-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-factura-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleFacturaFormComponent {
  @Output() created = new EventEmitter<any>();
  DetalleFacturaForm: FormGroup;
  IDfacturas: FormControl;
  IDvehiculo: FormControl;
  Descripcion: FormControl;
  Cantidad: FormControl;
  Total: FormControl;

  constructor(private httpService: HttpService){
    this.IDfacturas = new FormControl('');
    this.IDvehiculo = new FormControl('');
    this.Descripcion = new FormControl('');
    this.Cantidad = new FormControl('');
    this.Total = new FormControl('');
    this.DetalleFacturaForm = new FormGroup({
      IDfacturas: this.IDfacturas,
      IDvehiculo: this.IDvehiculo,
      Descripcion: this.Descripcion,
      Cantidad: this.Cantidad,
      Total: this.Total
    })
  }

  handleSubmit(): void {
    if (this.DetalleFacturaForm.invalid) return;
    this.httpService.CrearDetalleFactura(this.DetalleFacturaForm.value).then(res => {
      console.log(res);
      this.created.emit(res);
      this.DetalleFacturaForm.reset();
    });
  }
}
