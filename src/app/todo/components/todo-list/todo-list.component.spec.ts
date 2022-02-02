import { SearchPipe } from "../../../shared/lib/search.pipe";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoListComponent } from "./todo-list.component";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, SearchPipe],
      imports: [FormsModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display list of todos", () => {
    fixture.detectChanges();

    const card =
      fixture.debugElement.nativeElement.querySelectorAll("mat-card");

    expect(card.length).toBe(3);
  });
});
