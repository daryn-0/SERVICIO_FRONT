import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                label: 'Opciones',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Marcas',
                        icon: 'pi pi-star',
                        routerLink: '/marca'
                    },
                    {
                        label: 'Tipos de Vehiculo',
                        icon: 'pi pi-pencil',
                        routerLink: '/tipo'
                    },
                    {
                      label: 'Vehiculos',
                      icon: 'pi pi-pencil',
                      routerLink: '/coche'
                    }                    
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }

}
