import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http_service';

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './factura-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class FacturaFormComponent {
  @Output() created = new EventEmitter<any>();
  FacturaForm: FormGroup;
  IDcliente: FormControl;
  IDmdp: FormControl;
  Total: FormControl;
  Fecha: FormControl;

  constructor(private httpService: HttpService){
    this.IDcliente = new FormControl('');
    this.IDmdp = new FormControl('');
    this.Total = new FormControl('');
    this.Fecha = new FormControl('');
    this.FacturaForm = new FormGroup({
      IDcliente: this.IDcliente,
      IDmdp: this.IDmdp,
      Total: this.Total,
      Fecha: this.Fecha
    })
  }

  handleSubmit(): void {
    if (this.FacturaForm.invalid) return;
    this.httpService.CrearFactura(this.FacturaForm.value).then(res => {
      console.log(res);
      this.created.emit(res);
      this.FacturaForm.reset();
    });
  }
}
