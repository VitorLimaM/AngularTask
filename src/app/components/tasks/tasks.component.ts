import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Importações necessárias para o funcionamento do Drag and Drop
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Task {
  id?: string;
  title: string;
  description: string;
  list: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  showMessage = false;
  submitted = false;

  // Configuração do Formulário
  addTaskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  get title() { return this.addTaskForm.get('title')!; }
  get description() { return this.addTaskForm.get('description')!; }

  // Listas de tarefas
  todo: Task[] = [
    { title: 'Buy milk', description: 'Go to the store and buy milk', list: 'todo' },
    { title: 'Drawing on canvas', description: 'buy 3 canvas and pens!', list: 'todo' }
  ];

  inProgress: Task[] = [];
  done: Task[] = [];

  constructor() { }

  ngOnInit(): void { }

  /**
   * Lógica de Arrastar e Soltar (Imagem 1)
   */
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      // Se quiser permitir reordenar dentro da mesma lista, use:
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (!event.container.data || !event.previousContainer.data) {
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Lógica de Exclusão (Imagem 2)
   */
  deleteIt(list: string, task: Task) {
    if (list == 'todo') {
      var index = this.todo.indexOf(task);
      this.todo.splice(index, 1);
    } 
    else if (list == 'inProgress') {
      var index = this.inProgress.indexOf(task);
      this.inProgress.splice(index, 1);
    } 
    else if (list == 'done') {
      // Nota: Corrigido o erro da imagem onde buscava em 'inProgress' para a lista 'done'
      var index = this.done.indexOf(task);
      this.done.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addTaskForm.invalid) {
      return;
    }

    const newTask: Task = {
      title: this.addTaskForm.value.title,
      description: this.addTaskForm.value.description,
      list: 'todo'
    };

    this.todo.push(newTask);
    this.addTaskForm.reset();
    this.submitted = false;
  }
}