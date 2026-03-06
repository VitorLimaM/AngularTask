import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((allTasks: Task[]) => {
      this.todo = allTasks.filter(t => t.list === 'todo');
      this.inProgress = allTasks.filter(t => t.list === 'inProgress');
      this.done = allTasks.filter(t => t.list === 'done');
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const movedTask = event.container.data[event.currentIndex];
      movedTask.list = this.getListName(event.container.id);
    }
  }

  deleteIt(list: string, task: Task) {
    this.taskService.deleteTask(task);
  }

  onSubmit(): void {
    if (this.addTaskForm.invalid) return;

    const newTask: Task = {
      title: this.addTaskForm.value.title!,
      description: this.addTaskForm.value.description!,
      list: 'todo'
    };

    this.taskService.addTask(newTask);
    this.addTaskForm.reset();
  }

  private getListName(containerId: string): string {
    if (containerId.includes('todo')) return 'todo';
    if (containerId.includes('inProgress')) return 'inProgress';
    if (containerId.includes('done')) return 'done';
    return 'todo';
  }
}