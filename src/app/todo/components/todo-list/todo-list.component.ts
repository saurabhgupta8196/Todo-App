import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";

import { categories } from "../../../shared/data/mock-data";

import { ITodo } from "../../models/todo.interface";

@Component({
  selector: "origin-todo-app-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  @Input() todoList: ITodo[];
  @Output() deleteTodoItem = new EventEmitter<ITodo>();
  @Output() editTodoItem = new EventEmitter<ITodo>();
  @Output() taskStatusChange = new EventEmitter<MatCheckboxChange>();

  public searchValue = "";
  public filterCategory = "All";
  public readonly categories: string[] = categories;
  private _todoItems;

  public ngOnInit(): void {
    this._todoItems = this.todoList;
    this.rearrangingList();
  }

  /**Filtering the list based on the complete, incomplete and categories selected from dropdown and 
   * then rearranging them inorder to consitent with creation and done status of it
   */

  public onChange(selectedCategory: string): void {
    this.todoList = this._todoItems;
    switch (selectedCategory) {
      case "All":
        this.todoList = this._todoItems;
        break;
      case "Completed":
        this.todoList = this._completeTasks();
        break;
      case "Incomplete":
        this.todoList = this._incompleteTasks();
        break;
      default:
        this.todoList = this.todoList.filter(
          (item) => item.category === selectedCategory
        );
        break;
    }
    this.rearrangingList();
  }

  /** {rearrangingList()} Rearranging the lsit based on which completed
   * and incompleted task. Added individual sorting
   * based on the creation date of the task
   */

  public rearrangingList(): void {
    const [incompleteTasks, completedTasks] = [
      this._sortItems(this._incompleteTasks()),
      this._sortItems(this._completeTasks()),
    ];
    this.todoList = incompleteTasks.concat(completedTasks);
  }

  private _completeTasks(): ITodo[] {
    return this.todoList.filter((item) => item.done);
  }

  private _incompleteTasks(): ITodo[] {
    return this.todoList.filter((item) => !item.done);
  }

  private _sortItems(todoItems: ITodo[]): ITodo[] {
    return todoItems.sort(
      (a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf()
    );
  }
}
