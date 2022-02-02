import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

import { SearchPipe } from "./shared/lib/search.pipe";

import { TodoFormComponent } from "./todo/components/todo-form/todo-form.component";
import { TodoListComponent } from "./todo/components/todo-list/todo-list.component";
import { TodoComponent } from "./todo/components/todo/todo.component";
import { TodoEditDialogComponent } from "./todo/components/todo-edit-dialog/todo-edit-dialog.component";
import { CommonDialogComponent } from "./shared/components/common-dialog/common-dialog.component";

const applicationComponents = [
  AppComponent,
  TodoFormComponent,
  TodoListComponent,
  TodoComponent,
  TodoEditDialogComponent,
  CommonDialogComponent,
];

const materialModules = [
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatListModule,
  MatDialogModule,
  MatSelectModule,
];

@NgModule({
  declarations: [...applicationComponents, SearchPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ...materialModules,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TodoEditDialogComponent, CommonDialogComponent],
})
export class AppModule {}
