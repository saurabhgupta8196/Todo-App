import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { ITodo } from '../../models/todo.interface';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.scss'],
})
export class TodoEditDialogComponent implements OnInit {
  constructor(private _todoService: TodoService, @Inject(MAT_DIALOG_DATA) public data: ITodo) {}

  public selectedTodoItem$: Observable<ITodo>;

  /** We can make a API request to get the selected Todo item or
   * best way to get it from todo list as MAT DIALOG DATA
   * Just added this based on API call for showing the get request based on ID as mentioned in task
   */

  public ngOnInit(): void {
    const { id } = this.data;
    this.selectedTodoItem$ = this._todoService.getTodoById(id);
  }
}
