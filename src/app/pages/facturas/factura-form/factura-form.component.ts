import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http_service';

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './factura-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    
    form {
      max-width: 500px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    fieldset {
      border: none;
      margin-bottom: 15px;
      padding: 0;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    
    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
    
    input:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
    }
    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      width: 100%;
    }
    
    button:hover {
      background-color: #45a049;
    }
    
    button:active {
      transform: scale(0.98);
    }
  `
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
