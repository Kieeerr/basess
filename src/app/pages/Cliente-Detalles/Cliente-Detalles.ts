import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../../services/http_service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Cliente-Detalles.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteDetallesComponent implements OnInit {
  client: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ClienteDetalles: id=', id);
    if (!id) {
      this.loading = false;
      this.error = 'ID de cliente no es loco';
      this.cdr.markForCheck();
      return;
    }

    try {
      const result: any = this.httpService.ObtenerClientePorId(id);
      console.log('ObtenerClientePorId returned:', result);

      let data: any;
      if (result && typeof result.subscribe === 'function') {
        data = await firstValueFrom(result);
      } else {
        data = await Promise.resolve(result);
      }

      console.log( data);
      this.client = typeof data === 'string' ? JSON.parse(data) : data;
      if (this.client?.Fecha_Nacimiento) {
        this.client.Fecha_Nacimiento = new Date(this.client.Fecha_Nacimiento);
      }
 
    } finally {
      this.loading = false;
      this.cdr.markForCheck(); 
    }
  }
}
