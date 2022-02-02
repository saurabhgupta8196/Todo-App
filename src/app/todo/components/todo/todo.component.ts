import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";

import { Observable, Subscription } from "rxjs";

import { ITodo } from "../../models/todo.interface";

import { TodoEditDialogComponent } from "../todo-edit-dialog/todo-edit-dialog.component";
import { CommonDialogComponent } from "../../../shared/components/common-dialog/common-dialog.component";

import { NotificationService } from "src/app/shared/services/notification.service";
import { TodoService } from "../../services/todo.service";

/**
 * @component This component acts as a single source of truth/action to perform major task related
 * to todo list actions.
 *
 * Used NotificationService as the snackbar bar based on different actions
 *
 * Keep in mind this app is also responsive and can be used in different screen sizes
 *
 */

@Component({
  selector: "origin-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit, OnDestroy {
  public todoItems$: Observable<ITodo[]>;
  private _subscriptions: Subscription;

  constructor(
    private _todoService: TodoService,
    private _notificationService: NotificationService,
    private _dialog: MatDialog
  ) {
    this._subscriptions = new Subscription();
  }

  public ngOnInit(): void {
    this.todoItems$ = this._todoService.getAllTodos();
  }

  public createTodoItem(form): void {
    this._subscriptions.add(
      this._todoService.createTodo(form.todoForm).subscribe(() => {
        this._notificationService.notify(
          "Successfully created an new todo item"
        );
        this.ngOnInit();
      })
    );
  }

  public editTodoItem(selectedTodoItem: ITodo): void {
    this._openDialog(selectedTodoItem, TodoEditDialogComponent);
  }

  public deleteTodoItem(selectedTodoItemId: number): void {
    this._subscriptions.add(
      this._todoService.deleteTodo(selectedTodoItemId).subscribe(() => {
        this._notificationService.notify("Successfully deleted todo");
        this.ngOnInit();
      })
    );
  }

  public taskStatusChange(selectedTodoItem: ITodo): void {
    const done = !selectedTodoItem.done ? new Date() : false;
    done ? this._openDialog(null, CommonDialogComponent) : null;
    this._subscriptions.add(
      this._todoService
        .updateTodo({ ...selectedTodoItem, done })
        .subscribe(() => {
          if (!done)
            this._notificationService.notify(
              `Todo item is ${done ? "done at " + done : "added"}`
            );
          this.ngOnInit();
        })
    );
  }

  private _openDialog(selectedTodoItem: ITodo, component): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = selectedTodoItem;
    dialogConfig.width = "400px";
    dialogConfig.panelClass = "full-width-dialog";

    this._subscriptions.add(
      this._dialog
        .open(component, dialogConfig)
        .afterClosed()
        .subscribe((result) => {
          if (result !== "close") this.ngOnInit();
        })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
