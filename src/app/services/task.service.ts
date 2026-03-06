import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  list: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  addTask(task: Task) {
    this.tasks.push(task);
    this.updateTasks();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.updateTasks();
  }

  private updateTasks() {
    this.tasksSubject.next([...this.tasks]);
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }
}