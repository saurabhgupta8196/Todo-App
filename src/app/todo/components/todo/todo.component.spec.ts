import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { SearchPipe } from '../../../shared/lib/search.pipe';

import { of } from 'rxjs';

import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoEditDialogComponent } from '../todo-edit-dialog/todo-edit-dialog.component';
import { CommonDialogComponent } from '../../../shared/components/common-dialog/common-dialog.component';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { TodoService } from '../../services/todo.service';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let testMockTodoService;
  let testMockNotificationService;

  beforeEach(async(() => {
    testMockTodoService = jasmine.createSpyObj(['getAllTodos', 'createTodo', 'deleteTodo']);
    testMockNotificationService = jasmine.createSpyObj(['message']);

    TestBed.configureTestingModule({
      declarations: [SearchPipe, TodoComponent, TodoFormComponent, TodoListComponent, TodoEditDialogComponent, CommonDialogComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
