import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoServiceService', () => {
  let todoService: TodoService;
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});
