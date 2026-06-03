import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../../core/directive/admin.directive';

interface menu {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MenubarModule, RouterLink, RouterLinkActive, HasRoleDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  items: menu[] = [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      link: '/layout/dashboard',
    },
    {
      label: 'Devises',
      icon: 'pi-star',
      link: '/layout/devices',
    },
    {
      label: 'Users',
      icon: 'pi-search',
      link: '/layout/users',
    },
    {
      label: 'Contact',
      icon: 'pi-envelope',
      link: 'home',
    },
  ];
  ngOnInit() {}
}
