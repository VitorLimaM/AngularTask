import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Interface simples para definir o que é uma Task
interface Task {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular12-app';

  // Listas de dados para o Drag and Drop
  // Importante: Essas variáveis devem existir para o [cdkDropListData] do HTML
  todo: Task[] = [
    { id: '1', title: 'Aprender Angular', description: 'Estudar componentes e serviços' },
    { id: '2', title: 'Configurar Sidenav', description: 'Integrar menu lateral com o conteúdo' }
  ];

  inProgressList: Task[] = [];
  doneList: Task[] = [];

  // Método para lidar com o arraste das tarefas
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Move o item dentro da mesma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move o item de uma lista para outra
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Método para deletar tarefa (chamado pelo evento (delete) no HTML)
  deleteIt(listName: string, task: Task) {
    console.log(`Deletando tarefa da lista ${listName}:`, task);
    this.todo = this.todo.filter(t => t.id !== task.id);
    // Adicione filtros para inProgressList e doneList se necessário
  }

  // Método para editar tarefa (chamado pelo evento (edit) no HTML)
  editTask(listName: string, task: Task) {
    console.log(`Editando tarefa na lista ${listName}:`, task);
    // Aqui você abriria um modal ou formulário de edição
  }
}