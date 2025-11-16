import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa o RouterOutlet para carregar as rotas
 templateUrl: './app.html', // <-- CORRIGIDO
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'kanban-tasks';
}