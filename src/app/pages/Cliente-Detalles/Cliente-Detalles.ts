import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from '../../components/shared/navbar/navbar.component';

@Component({
  selector: 'app-cliente-detalles',
  imports: [],
  templateUrl: './Cliente-Detalles.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteDetallesComponent { }
