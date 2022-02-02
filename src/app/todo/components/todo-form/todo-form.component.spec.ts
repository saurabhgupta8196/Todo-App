import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TodoFormComponent } from './todo-form.component';

import { TodoService } from '../../services/todo.service';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let testMockTodoService;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async(() => {
    testMockTodoService = jasmine.createSpyObj(['updateTodo']);
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: TodoService, useValue: testMockTodoService }, FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
