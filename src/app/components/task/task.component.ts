import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task | null = null;
  @Input() list: string = '';

  @Output() edit = new EventEmitter<Task>();  // adicionei o edit
  @Output() delete = new EventEmitter<{ list: string, task: Task }>();

  constructor() { }

  ngOnInit(): void {}

  deleteTask() {
    if (this.task) {
      this.delete.emit({
        list: this.list,
        task: this.task
      });
    }
  }

  editTask() {
    if (this.task) {
      this.edit.emit(this.task);
    }
  }
}