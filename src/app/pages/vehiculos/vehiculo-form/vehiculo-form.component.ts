import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http_service';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehiculo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  
})
export class VehiculoFormComponent {
  @Output() created = new EventEmitter<any>();
  VehiculoForm: FormGroup;
  Chasis: FormControl;
  Marca: FormControl;
  Anio: FormControl;
  Modelo: FormControl;
  Color: FormControl;

  constructor(private httpService: HttpService){
    this.Chasis = new FormControl('');
    this.Marca = new FormControl('');
    this.Anio = new FormControl('');
    this.Modelo = new FormControl('');
    this.Color = new FormControl('');
    this.VehiculoForm = new FormGroup({
      Chasis: this.Chasis,
      Marca: this.Marca,
      Anio: this.Anio,
      Modelo: this.Modelo,
      Color: this.Color
    })
  }

  handleSubmit(): void {
    if (this.VehiculoForm.invalid) return;
    this.httpService.CrearVehiculo(this.VehiculoForm.value).then(res => {
      console.log(res);
      this.created.emit(res);
      this.VehiculoForm.reset();
    });
  }
}
