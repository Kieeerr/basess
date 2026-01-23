import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http_service';

@Component({
  selector: 'app-facturas-con-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas-con-detalle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasConDetalleComponent implements OnInit {
  facturasConDetalle = signal<any[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadFacturasConDetalle();
  }

  async loadFacturasConDetalle() {
    this.loading.set(true);
    try {
      const res: any = await this.httpService.ObtenerFacturasConDetalle();
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      this.facturasConDetalle.set(Array.isArray(data) ? data : []);
    } catch (err: any) {
      this.error.set(err?.message || String(err));
    } finally {
      this.loading.set(false);
      this.cdr.markForCheck();
    }
  }
}
