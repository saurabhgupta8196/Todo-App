/* --------------------------
* Todo app API service
- ---------------------------- **/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, toArray } from 'rxjs/operators';

import { ITodo } from '../models/todo.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public _baseURL = ' http://localhost:3000/tasks';

  constructor(private _http: HttpClient, private _notificationService: NotificationService) {}

  /**
   * {get} Get all todo items list
   */
  public getAllTodos(): Observable<ITodo[]> {
    return this._http.get<ITodo[]>(this._baseURL).pipe(
      switchMap((todo: ITodo[]) => from(todo)),
      map((todo) => ({ ...todo })),
      toArray(),
      catchError(this.handleError<ITodo[]>(`getAllTodos`))
    );
  }

  /**
   * {post} Create a todo task
   */
  public createTodo(todoItem: ITodo): Observable<ITodo> {
    todoItem.created = new Date();
    return this._http.post<ITodo>(this._baseURL, { ...todoItem }).pipe(catchError(this.handleError<ITodo>(`createTodo`)));
  }

  /**
   * {delete} Delete a todo task
   */
  public deleteTodo(todoId: number): Observable<ITodo> {
    return this._http.delete<ITodo>(`${this._baseURL}/${todoId}`).pipe(catchError(this.handleError<ITodo>(`deleteTodo`)));
  }

  /**
   * {patch} Update a todo task
   */
  public updateTodo(todoItem: ITodo): Observable<ITodo> {
    todoItem.created = new Date();
    return this._http.patch(`${this._baseURL}/${todoItem.id}`, todoItem).pipe(catchError(this.handleError<any>(`updateTodo`)));
  }

  /**
   * {get} Get todo item by Id
   */
  public getTodoById(todoId: number): Observable<ITodo> {
    return this._http.get<ITodo>(`${this._baseURL}/${todoId}`).pipe(catchError(this.handleError<ITodo>(`getTodoById id=${todoId}`)));
  }

  /**
   * {error} handle the error while making request
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
