import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ITodo } from '../../models/todo.interface';
import { categories } from '../../../shared/data/mock-data';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'origin-todo-app-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})

/**
 * This component is acting as a common component for editing/updating the todo item
 * Reused the same form for adding and updating the todo item.
 *
 * Also unsubscribed the subscribed items in the components using Subscription from RxJS to prevent component
 * from mermory leak.
 */
export class TodoFormComponent implements OnInit {
  @Output() createTodoItem = new EventEmitter();
  @Input() data?: ITodo;

  public id: number;
  public readonly categories: string[] = categories;
  public todoForm: FormGroup;
  public isEditing: boolean = false;

  private _subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _todoService: TodoService,
    @Optional() private _dialogRef: MatDialogRef<TodoFormComponent>
  ) {}

  public ngOnInit(): void {
    this._setupForm();
  }

  private _setupForm() {
    if (this.data) {
      var { label, description, category, done, created } = this.data;
      this.isEditing = true;
    }

    this.todoForm = this._formBuilder.group({
      label: [label || '', Validators.required],
      description: [description || '', Validators.required],
      category: [category || '', Validators.required],
      done: [done || false],
      created: [created],
    });
  }

  public closeDialog(): void {
    this._dialogRef.close('close');
  }

  public onSubmit(): void {
    if (this.isEditing) {
      this.todoForm.value.id = this.data.id;
      this.todoForm.value.done = false;
      this._subscription.add(this._todoService.updateTodo(this.todoForm.value).subscribe(() => this._dialogRef.close()));
    } else {
      this.createTodoItem.emit({ todoForm: this.todoForm.value });
      this.todoForm.reset();
    }
  }

  public hasError(controlName: string, errorName: string) {
    return this.todoForm.controls[controlName].hasError(errorName);
  }
}
