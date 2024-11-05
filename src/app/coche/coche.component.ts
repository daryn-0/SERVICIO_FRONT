import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Coche } from '../models/coche';
import { Marca } from '../models/marca';
import { Tipo } from '../models/tipo';
import { TipoService } from '../services/tipo';
import { MarcaService } from '../services/marca';
import { CocheService } from '../services/coche';

@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './coche.component.html',
  styleUrl: './coche.component.css',
  providers: [ConfirmationService, MessageService]
})
export class CocheComponent {
  coches: Coche[]=[];
  marcas: Marca[]=[];
  tipos: Tipo[]=[];
  coche: Coche = new Coche();

  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isProcessInProgress: boolean= false;

  constructor(
    private tipoService: TipoService,
    private marcaService: MarcaService,
    private cocheServie: CocheService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit():void {
    this.listarCoches();
    this.listarTipo();
    this.listarMarca();
  }

  listarCoches(){
    this.cocheServie.getCoche().subscribe((data: Coche[]) => {
      this.coches = data;
    })
  }

  listarTipo(){
    this.tipoService.getTipo().subscribe((data: Tipo[]) => {
      this.tipos = data;
    })
  }

  listarMarca(){
    this.marcaService.getMarca().subscribe((data: Marca[]) => {
      this.marcas = data;
    })
  }

  addCoches():void{
    this.cocheServie.createCoche(this.coche).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Vehiculo registrado con exito',
        });
        this.listarCoches();
        this.op= 0;
      },
      error: () => {
        this.isProcessInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se puedo registrar el Vehiculo",
        });
      },
    });
    this.visible= false;
  }

  editCoches(){
    this.coche.tipo = this.tipos.find(t => t.id === this.coche.tipo.id)!;
    this.coche.marca = this.marcas.find(m => m.id === this.coche.marca.id)!;
    this.cocheServie.updateCoche(this.coche, this.coche.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Vehiculo editado con exito',
        });
        this.listarCoches();
        console.log(this.coche.id + ' ' + this.coche.matricula + ' ' + this.coche.numPuertas + + this.coche.marca.id + + this.coche.tipo.id);
        this.op=0;
      },
      error: () => {
        this.isProcessInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el Vehiculo',
        });
      },
    });
    this.visible= false;
  }

  deleteCoche(id: number){
    this.isProcessInProgress= true;
    this.cocheServie.deleteCoche(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Vehiculo eliminado con exito',
        });
        this.isProcessInProgress= false;
        this.listarCoches();
      },
      error: () => {
        this.isProcessInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Vehiculo',
        });
      },
    });  
  }

  showDialogCreate(){
    this.titulo= "Añadir nuevo Vehiculo"
    this.opc= "Guardar";
    this.op= 0;
    this.visible= true;
  }

  showDialogEdit(id: number){
    this.titulo= "Editar Vehiculo"
    this.opc= "Actualizar";
    this.cocheServie.getCocheById(id).subscribe((data)=>{
      this.coche= data;
      this.op= 1;
    });
    this.visible= true;
  }

  showDiaologDelete(event: Event, id: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar este Vehiculo?',
      header: 'Confirmacion de Eliminacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.deleteCoche(id);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Operacion cancelada' });
      }
    });
  }

  limpiar(){
    this.titulo= '';
    this.opc= '';
    this.op= 0;
    this.coche.id= 0;
    this.coche.matricula= '';
    this.coche.numPuertas= 0;
    this.coche= new Coche();
  }

  opcion(): void{
    if (this.op==0) {
      this.addCoches();
      this.limpiar();
    } else if (this.op==1) {
      console.log("Editar");
      this.editCoches();
      this.limpiar();
    } else {
      console.log("Vacio");
      this.limpiar();
    }
  } 

}
