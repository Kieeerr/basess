import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http_service';
import { FacturaFormComponent } from './factura-form/factura-form.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule, FacturaFormComponent],
  templateUrl: './facturas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasComponent implements OnInit {
  facturas = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  showForm = signal(false);
  editingId: number | null = null;
  editModel: any = {};

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadFacturas();
  }

  async loadFacturas() {
    this.loading.set(true);
    try {
      const res: any = await this.httpService.ObtenerFacturas();
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      this.facturas.set(Array.isArray(data) ? data : []);
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
    this.loadFacturas();
    this.showForm.set(false);
  }

  startEdit(item: any) {
    this.editingId = item.IDfacturas;
    this.editModel = { ...item };
  }

  async saveEdit(id: any) {
    try {
      await this.httpService.ActualizarFactura(id, this.editModel);
      this.editingId = null;
      this.loadFacturas();
    } catch (err) {
      console.error(err);
    }
  }
   
  cancelEdit() {
    this.editingId = null;
    this.editModel = {};
  }

  async deleteFactura(id: any) {
    if (!confirm('¿Seguro que deseas eliminar esta factura?')) return;
    await this.httpService.EliminarFactura(id);
    this.loadFacturas();
  }
}
