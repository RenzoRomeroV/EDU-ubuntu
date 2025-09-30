import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  @Input() selectedNivel: string = '';
  @Input() selectedCourse: string = '';

  constructor(private router: Router) {}

  selectNivel(nivel: string) {
    this.selectedNivel = nivel;
    console.log(`Nivel ${nivel} seleccionado`);
  }

  openCourse(courseId: string) {
    if (!this.selectedNivel) return;
    this.selectedCourse = courseId;
    this.router.navigate(['/dashboard', 'curso', this.selectedNivel, courseId]);
  }

  backToCourseList(): void {
    if (!this.selectedNivel) return;
    this.selectedCourse = '';
    this.router.navigate(['/dashboard', 'curso', this.selectedNivel]);
  }

  // Accordion de semanas (vista detalle)
  weeks: { title: string; description: string; open: boolean }[] = [
    { title: 'Información general del curso', description: 'Sílabos, objetivos y materiales iniciales.', open: false },
    { title: 'Semana 1', description: 'Introducción y diagnóstico.', open: false },
    { title: 'Semana 2', description: 'Práctica guiada.', open: false },
    { title: 'Semana 3', description: 'Proyecto corto.', open: false },
    { title: 'Semana 4', description: 'Evaluación y retroalimentación.', open: false }
  ];

  toggleWeek(index: number): void {
    this.weeks[index].open = !this.weeks[index].open;
  }
}