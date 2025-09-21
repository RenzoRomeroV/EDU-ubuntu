import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Module {
  id: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sidebarCollapsed = false;
  selectedNivel: string = '';
  cursoDropdownOpen = false;
  
  currentModule: Module = {
    id: 'inicio',
    title: 'Inicio',
    subtitle: 'Bienvenido a Ubuntu Education'
  };

  modules: Module[] = [
    { id: 'inicio', title: 'Inicio', subtitle: 'Bienvenido a Ubuntu Education' },
    { id: 'curso', title: 'Cursos', subtitle: 'Primaria y Secundaria' },
    { id: 'recursos', title: 'Recursos', subtitle: 'Materiales educativos' },
    { id: 'juegos', title: 'Juegos', subtitle: 'Aprende jugando' },
    { id: 'contacto', title: 'Contacto', subtitle: '¿Necesitas ayuda?' }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  selectModule(moduleId: string) {
    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      this.currentModule = module;
      
      // Actualizar clase activa en el menú
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
      });
      
      const activeItem = document.querySelector(`[onclick*="${moduleId}"]`) || 
                        document.querySelector(`li[onclick*="${moduleId}"]`) ||
                        document.querySelector(`.menu-item:nth-child(${this.modules.findIndex(m => m.id === moduleId) + 1})`);
      
      if (activeItem) {
        activeItem.classList.add('active');
      }
    }
  }

  selectNivel(nivel: string) {
    this.selectedNivel = nivel;
    console.log(`Nivel ${nivel} seleccionado`);
  }

  toggleCursoDropdown() {
    this.cursoDropdownOpen = !this.cursoDropdownOpen;
    console.log('Curso dropdown open:', this.cursoDropdownOpen);
  }

  selectCursoSubmodule(submodule: string) {
    this.selectedNivel = submodule;
    this.cursoDropdownOpen = false;
    this.selectModule('curso');
  }
}
