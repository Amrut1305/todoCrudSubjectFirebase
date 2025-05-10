import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar : MatSnackBar
  ) { }

  opensnackBar(msg:string){
    this._snackBar.open(msg,'close',{
      horizontalPosition : 'center',
      verticalPosition : 'top',
      duration: 2500
    })
  }

}
