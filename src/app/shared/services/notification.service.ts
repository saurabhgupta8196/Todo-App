import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _horizontalPosition: MatSnackBarHorizontalPosition = "center";
  private _verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor(private _snackBar: MatSnackBar) {}

  public notify(message: string): void {
    this._snackBar.open(message, "Dismiss", {
      duration: 3000,
      verticalPosition: this._verticalPosition,
      horizontalPosition: this._horizontalPosition,
    });
  }
}
