/* --------------------------
* Todo app API service
- ---------------------------- **/

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { from, Observable, throwError } from "rxjs";
import { catchError, map, switchMap, toArray } from "rxjs/operators";

import { ITodo } from "../models/todo.interface";
import { NotificationService } from "src/app/shared/services/notification.service";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private _baseURL = " http://localhost:3000/tasks";

  constructor(
    private _http: HttpClient,
    private _notificationService: NotificationService
  ) {}

  /**
   * {get} Get all todo items list
   */
  public getAllTodos() {
    return this._http.get(this._baseURL).pipe(
      switchMap((todo: ITodo[]) => from(todo)),
      map((todo) => ({ ...todo })),
      toArray(),
      catchError(this.handleError)
    );
  }

  /**
   * {post} Create a todo task
   */
  public createTodo(todoItem: ITodo) {
    todoItem.created = new Date();
    return this._http.post(this._baseURL, { ...todoItem });
  }

  /**
   * {delete} Delete a todo task
   */
  public deleteTodo(todoId: number) {
    return this._http.delete(`${this._baseURL}/${todoId}`);
  }

  /**
   * {patch} Update a todo task
   */
  public updateTodo(todoItem: ITodo) {
    todoItem.created = new Date();
    return this._http.patch(`${this._baseURL}/${todoItem.id}`, todoItem);
  }

  /**
   * {get} Get todo item by Id
   */
  public getTodoById(todoId: number): Observable<ITodo> {
    return this._http.get<ITodo>(`${this._baseURL}/${todoId}`);
  }

  /**
   * {error} handle the error while making request
   */
  private handleError(error: Response | any) {
    console.error("Todo service failed", error);
    this._notificationService.notify(`Error within todo service: ${error}`);
    return throwError(error);
  }
}
