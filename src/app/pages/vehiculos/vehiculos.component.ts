import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http_service';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, VehiculoFormComponent],
  templateUrl: './vehiculos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiculosComponent implements OnInit {
  vehiculos = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  showForm = signal(false);
  editingId: number | null = null;
  editModel: any = {};

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadVehiculos();
  }

  async loadVehiculos() {
    this.loading.set(true);
    try {
      const res: any = await this.httpService.ObtenerVehiculos();
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      this.vehiculos.set(Array.isArray(data) ? data : []);
    } catch (err: any) {
      this.error.set(err?.message || String(err));
    } finally {
      this.loading.set(false);
      this.cdr.markForCheck();
    }
  }

  toggleForm() {
    this.showForm.update(v => !v);
  }

  onCreated(event: any) {
    this.loadVehiculos();
    this.showForm.set(false);
  }

  startEdit(item: any) {
    this.editingId = item.IDvehiculo;
    this.editModel = { ...item };
  }

  async saveEdit(id: any) {
    try {
      await this.httpService.ActualizarVehiculo(id, this.editModel);
      this.editingId = null;
      this.loadVehiculos();
    } catch (err) {
      console.error(err);
    }
  }
   
  cancelEdit() {
    this.editingId = null;
    this.editModel = {};
  }

  async deleteVehiculo(id: any) {
    if (!confirm('¿Seguro que deseas eliminar este vehículo?')) return;
    await this.httpService.EliminarVehiculo(id);
    this.loadVehiculos();
  }
}
