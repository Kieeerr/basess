import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './Formulario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormularioComponent {
    ClientesForm: FormGroup;
    Nombre: FormControl;
    Apellido: FormControl;
    Correo: FormControl;
    Telefono: FormControl;
    FechaNacimiento: FormControl;

private apiUrl = 'https://localhost:7094/api/clientes';

    constructor(private http: HttpClient){

      this.Nombre = new FormControl('');
      this.Apellido = new FormControl('');
      this.Correo = new FormControl('');
      this.Telefono = new FormControl('');
      this.FechaNacimiento = new FormControl('');
      this.ClientesForm = new FormGroup({
        Nombre: this.Nombre,
        Apellido: this.Apellido,
        Correo: this.Correo,
        Telefono:  this.Telefono,
        FechaNacimiento: this.FechaNacimiento
      })
    }

    handleSubmit(): void {

      if (this.ClientesForm.invalid) return;
      const v = this.ClientesForm.value;
      const payload = {
        IDcliente: 999999999,
        Nombre: v.Nombre,
        apellido: v.Apellido,              
        Correo: v.Correo,
        Telefono: v.Telefono,
        Fecha_Nacimiento: v.FechaNacimiento
      };
      console.log(payload);
      this.http.post<any>(this.apiUrl, payload).forEach(res => {

        console.log(res);

       

      });

    }

 }