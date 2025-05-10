import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {


  constructor(
    private _matRef : MatDialogRef<MatDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  confirm(flag: boolean) {
    this._matRef.close(flag)
  }

}
