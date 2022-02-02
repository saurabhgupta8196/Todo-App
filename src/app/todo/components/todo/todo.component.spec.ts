import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoFormComponent } from "../todo-form/todo-form.component";

import { NotificationService } from "src/app/shared/services/notification.service";
import { TodoService } from "../../services/todo.service";

import { TodoComponent } from "./todo.component";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let testMockTodoService;
  let testMockNotificationService;

  beforeEach(async(() => {
    testMockTodoService = jasmine.createSpyObj([
      "getAllTodos",
      "createTodo",
      "deleteTodo",
    ]);
    testMockNotificationService = jasmine.createSpyObj(["message"]);

    TestBed.configureTestingModule({
      declarations: [TodoComponent, TodoFormComponent, TodoListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: TodoService, useValue: testMockTodoService },
        { provide: NotificationService, useValue: testMockNotificationService },
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
