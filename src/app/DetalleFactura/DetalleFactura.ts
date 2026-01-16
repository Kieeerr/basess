import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http_service';
import { DetalleFacturaFormComponent } from './detalle-factura-form/detalle-factura-form.component';

@Component({
  selector: 'app-detalle-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, DetalleFacturaFormComponent],
  templateUrl: './DetalleFactura.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleFactura implements OnInit {
  detalles = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  showForm = signal(false);
  editingId: number | null = null;
  editModel: any = {};

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadDetalles();
  }

  async loadDetalles() {
    this.loading.set(true);
    try {
      const res: any = await this.httpService.ObtenerDetalleFactura();
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      this.detalles.set(Array.isArray(data) ? data : []);
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
    this.loadDetalles();
    this.showForm.set(false);
  }

  startEdit(item: any) {
    this.editingId = item.IDfacturas;
    this.editModel = { ...item };
  }

  async saveEdit(id: any) {
    try {
      await this.httpService.ActualizarDetalleFactura(id, this.editModel);
      this.editingId = null;
      this.loadDetalles();
    } catch (err) {
      console.error(err);
    }
  }
   
  cancelEdit() {
    this.editingId = null;
    this.editModel = {};
  }

  async deleteDetalle(id: any) {
    if (!confirm('¿Seguro que deseas eliminar este detalle de factura?')) return;
    await this.httpService.EliminarDetalleFactura(id);
    this.loadDetalles();
  }
}
