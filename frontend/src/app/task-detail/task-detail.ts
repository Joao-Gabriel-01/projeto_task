import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { TaskService, Task } from '../task';


// Importações Standalone
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './task-detail.html', // <-- MUDANÇA AQUI
  styleUrls: ['./task-detail.css']   // <-- MUDANÇA AQUI
})
export class TaskDetailComponent {

  // 'task' é uma cópia dos dados injetados
  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public task: Task 
  ) {}

  saveChanges() {
    this.taskService.updateTask(this.task);
    this.dialogRef.close(true); // Sinaliza que houve mudança
  }

  cancel() {
    this.dialogRef.close();
  }
}