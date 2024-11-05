import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Marca } from '../models/marca';
import { MarcaService } from '../services/marca';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css',
  providers: [MarcaService]
})
export class MarcaComponent {
  marcas: Marca[]=[];
  
  constructor(private marcaService: MarcaService) {}

  
  ngOnInit():void {
    this.listarMarca();
  }

  listarMarca() {
  this.marcaService.getMarca().subscribe((data: Marca[]) => {
      this.marcas = data;
  });
  }
}
