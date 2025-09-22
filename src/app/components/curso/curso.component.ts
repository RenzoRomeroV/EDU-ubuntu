import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  selectedNivel: string = '';

  selectNivel(nivel: string) {
    this.selectedNivel = nivel;
    console.log(`Nivel ${nivel} seleccionado`);
  }
}