import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Tipo } from '../models/tipo';
import { TipoService } from '../services/tipo';


@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css',
  providers: [TipoService]
})
export class TipoComponent {
  tipos: Tipo[]=[];

  constructor(private tipoService: TipoService) {}

  ngOnInit():void {
      this.listarTipos();
  }

  listarTipos() {
    this.tipoService.getTipo().subscribe((data: Tipo[]) => {
        this.tipos = data;
    });
}
}
