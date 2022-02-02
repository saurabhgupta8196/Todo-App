import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { mockTodoItems } from '../../shared/data/mock-data';

import { TodoService } from './todo.service';
import { ITodo } from '../models/todo.interface';

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    const testbed = getTestBed();
    service = testbed.get(TodoService);
    httpController = testbed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should call getAllTodos and return an array of Todo items', () => {
    service.getAllTodos().subscribe((res) => {
      expect(res).toEqual(mockTodoItems);
    });

    const req = httpController.expectOne(service._baseURL);
    req.flush(mockTodoItems);
  });

  it('should call getTodoById and return the appropriate todo item', () => {
    const id = 1;
    service.getTodoById(id).subscribe((data) => {
      expect(data).toEqual(mockTodoItems[1]);
    });
    const req = httpController.expectOne(service._baseURL + '/' + `${id}`);
    req.flush(mockTodoItems[1]);
  });

  xit('should call updateTodo', () => {
    const updatedItem: ITodo = {
      label: 'Kitchen Cleanup updated',
      description: 'I have to clean the kitchen',
      category: 'Mind Care',
      done: false,
      created: new Date(),
      id: 1,
    };
    service.updateTodo(mockTodoItems[1]).subscribe((data) => {
      expect(data).toEqual(updatedItem);
    });
    const req = httpController.expectOne(service._baseURL + '/' + `${updatedItem.id}`);
    req.flush(updatedItem);
  });
});
