import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {
  isMenuOpen = false;
  isMobileMenuOpen = false;

  logout() {
    alert('logout');
  }
}
