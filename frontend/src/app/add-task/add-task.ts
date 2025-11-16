import { Component, Inject } from '@angular/core';
import { TaskService } from '../task';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

// Importações Standalone
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,          // Para formulários
    MatDialogModule,      // Para o modal
    MatFormFieldModule,   // Para os campos
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule   // Para o calendário
  ],
  templateUrl: './add-task.html', // <-- MUDANÇA AQUI
  styleUrls: ['./add-task.css']   // <-- MUDANÇA AQUI
})
export class AddTaskComponent {
  
  // Usamos 'any' para o novo objeto, mas pode ser 'Partial<Task>'
  task: any = { 
    title: '', 
    description: '', 
    deadline: null, 
    status: '' 
  };

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { sectionName: string }
  ) {
    this.task.status = data.sectionName; // Define a seção inicial
  }

  addTask() {
    if (this.task.title && this.task.deadline) {
      this.taskService.addTask(this.task);
      this.dialogRef.close(true); // Envia 'true' para sinalizar sucesso
    }
  }

  cancel() {
    this.dialogRef.close(); // Fecha sem sinalizar
  }
}