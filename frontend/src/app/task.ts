import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  // Usamos um ID simples para este exemplo
  private lastId = 2;
  
  private tasks: Task[] = [
    { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', deadline: new Date('2025-11-20'), status: 'Backlog' },
    { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', deadline: new Date('2025-11-22'), status: 'Produção' },
  ];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(taskData: Omit<Task, 'id'>) {
    this.lastId++;
    const newTask: Task = {
      ...taskData,
      id: this.lastId
    };
    this.tasks.push(newTask);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}