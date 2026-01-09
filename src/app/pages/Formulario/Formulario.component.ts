import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http_service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './Formulario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioComponent {
  @Output() created = new EventEmitter<any>();
  ClientesForm: FormGroup;
  Nombre: FormControl;
  Apellido: FormControl;
  Correo: FormControl;
  Telefono: FormControl;
  FechaNacimiento: FormControl;

  constructor(private httpService: HttpService){
    this.Nombre = new FormControl('');
    this.Apellido = new FormControl('');
    this.Correo = new FormControl('');
    this.Telefono = new FormControl('');
    this.FechaNacimiento = new FormControl('');
    this.ClientesForm = new FormGroup({
      Nombre: this.Nombre,
      Apellido: this.Apellido,
      Correo: this.Correo,
      Telefono: this.Telefono,
      FechaNacimiento: this.FechaNacimiento
    })
  }

  handleSubmit(): void {
    if (this.ClientesForm.invalid) return;
    this.httpService.CrearCliente(this.ClientesForm.value).then(res => {
      console.log(res);
      this.created.emit(res);
      this.ClientesForm.reset();
    });
  }
}