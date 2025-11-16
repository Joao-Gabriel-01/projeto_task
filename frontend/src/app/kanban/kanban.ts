import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task';
import { TaskDetailComponent } from '../task-detail/task-detail';

// Importações Standalone
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './kanban.html', // <-- MUDANÇA AQUI
  styleUrls: ['./kanban.css']   // <-- MUDANÇA AQUI
})
export class KanbanComponent implements OnInit {

  sections: { name: string, tasks: Task[] }[] = [
    { name: 'Backlog', tasks: [] },
    { name: 'Produção', tasks: [] },
    { name: 'Ajuste', tasks: [] },
    { name: 'Finalizado', tasks: [] },
    { name: 'Entregue', tasks: [] }
  ];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const allTasks = this.taskService.getTasks();
    
    // Reseta as tarefas
    this.sections.forEach(section => section.tasks = []);
    
    // Distribui as tarefas nas seções corretas
    allTasks.forEach(task => {
      const section = this.sections.find(s => s.name === task.status);
      if (section) {
        section.tasks.push(task);
      }
    });
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Movendo dentro da MESMA lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Movendo para uma lista DIFERENTE
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Atualiza o status da tarefa movida
      const movedTask = event.container.data[event.currentIndex];
      movedTask.status = event.container.id; // O 'id' do container (veja o HTML)
      this.taskService.updateTask(movedTask);
    }
  }

  openTaskDetail(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '400px',
      data: { ...task } // Passa uma cópia da tarefa para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks(); // Recarrega se houver mudanças
      }
    });
  }

  openAddTaskDialog(sectionName: string) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: { sectionName: sectionName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks(); // Recarrega se uma nova tarefa foi adicionada
      }
    });
  }
}