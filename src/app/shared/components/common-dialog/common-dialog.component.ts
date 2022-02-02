import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-common-dialog",
  templateUrl: "./common-dialog.component.html",
  styleUrls: ["./common-dialog.component.scss"],
})
export class CommonDialogComponent {
  public readonly imageUrl = "assets/well-done.gif";

  constructor(private _dialogRef: MatDialogRef<CommonDialogComponent>) {}

  public closeDialog(): void {
    this._dialogRef.close("close");
  }
}
