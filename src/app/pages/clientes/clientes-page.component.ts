import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http_service';
import { FormularioComponent } from '../Formulario/Formulario.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioComponent],
  templateUrl: './clientes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientesPageComponent implements OnInit {
  clientes = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  showForm = signal(false);
  editingId: number | null = null;
  editModel: any = {};

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadClientes();
  }

  async loadClientes() {
    this.loading.set(true);
    try {
      const res: any = await this.httpService.ObtenerClientes();
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      this.clientes.set(Array.isArray(data) ? data : []);
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

    this.loadClientes();
    this.showForm.set(false);
  }

  startEdit(item: any) {
    this.editingId = item.IDcliente;
    this.editModel = { ...item };
  }

  async saveEdit(id: any) {
    try {
      await this.httpService.ActualizarCliente(id, this.editModel);
      this.editingId = null;
      this.loadClientes();
    } catch (err) {
      console.error(err);
    }
  }
   
  cancelEdit() {
    this.editingId = null;
    this.editModel = {};
  }

  async deleteCliente(id: any) {
    if (!confirm('Segurito que lo quieres eliminar?')) return;
    await this.httpService.EliminarCliente(id);
    this.loadClientes();
  }
}
