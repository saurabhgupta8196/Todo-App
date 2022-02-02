import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material';

import { TodoEditDialogComponent } from './todo-edit-dialog.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

describe('TodoEditDialogComponent', () => {
  let component: TodoEditDialogComponent;
  let fixture: ComponentFixture<TodoEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [TodoEditDialogComponent, TodoFormComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
