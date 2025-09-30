import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../inicio/inicio.component';
import { CursoComponent } from '../curso/curso.component';
import { RecursosComponent } from '../recursos/recursos.component';
import { JuegosComponent } from '../juegos/juegos.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { filter } from 'rxjs/operators';

interface Module {
  id: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, InicioComponent, CursoComponent, RecursosComponent, JuegosComponent, ContactoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed = false;
  selectedNivel: string = '';
  selectedCourse: string = '';
  cursoDropdownOpen = false;
  isMobile = false;
  
  currentModule: Module = {
    id: 'inicio',
    title: 'Inicio',
    subtitle: 'Ubuntu Education'
  };

  modules: Module[] = [
    { id: 'inicio', title: 'Inicio', subtitle: 'Bienvenido a Ubuntu Education' },
    { id: 'curso', title: 'Cursos', subtitle: 'Primaria y Secundaria' },
    { id: 'recursos', title: 'Recursos', subtitle: 'Materiales educativos' },
    { id: 'juegos', title: 'Juegos', subtitle: 'Aprende jugando' },
    { id: 'contacto', title: 'Contacto', subtitle: '¿Necesitas ayuda?' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Detectar si es móvil
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
    
    // Escuchar cambios en la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateModuleFromRoute();
      });
    
    // Cargar módulo inicial desde la ruta
    this.updateModuleFromRoute();
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarCollapsed = false;
    }
  }

  private updateModuleFromRoute(): void {
    const moduleId = this.route.snapshot.paramMap.get('module') || 'inicio';
    const submodule = this.route.snapshot.paramMap.get('submodule') || '';
    const course = this.route.snapshot.paramMap.get('course') || '';

    // Actualizar estado desde la URL sin navegar de nuevo
    this.selectedNivel = submodule;
    this.selectedCourse = course;

    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      this.currentModule = module;
      this.updateActiveMenuItem(moduleId);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeSidebar(): void {
    if (this.isMobile) {
      this.sidebarCollapsed = false;
    }
  }

  selectModule(moduleId: string): void {
    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      this.currentModule = module;
      
      // Cerrar sidebar en móvil después de seleccionar
      if (this.isMobile) {
        this.sidebarCollapsed = false;
      }
      
      // Navegar a la ruta correspondiente
      if (moduleId === 'curso' && this.selectedNivel) {
        this.router.navigate(['/dashboard', moduleId, this.selectedNivel]);
      } else {
        this.router.navigate(['/dashboard', moduleId]);
      }
      
      // Actualizar clase activa en el menú
      this.updateActiveMenuItem(moduleId);
    }
  }

  private updateActiveMenuItem(moduleId: string): void {
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

  selectNivel(nivel: string): void {
    this.selectedNivel = nivel;
    console.log(`Nivel ${nivel} seleccionado`);
  }

  toggleCursoDropdown(): void {
    this.cursoDropdownOpen = !this.cursoDropdownOpen;
    console.log('Curso dropdown open:', this.cursoDropdownOpen);
  }

  selectCursoSubmodule(submodule: string): void {
    this.selectedNivel = submodule;
    this.cursoDropdownOpen = false;
  }
}
