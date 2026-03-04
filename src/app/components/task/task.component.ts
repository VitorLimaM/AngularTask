import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../tasks/tasks.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task : Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();


  constructor() { }

  ngOnInit(): void {
  }

}

