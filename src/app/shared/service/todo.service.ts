import { Injectable } from '@angular/core';
import { Itodo } from '../model/todo';
import { map, Observable, of, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../component/mat-dialog/mat-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoData: Itodo[] = []
  editTodo$: Subject<Itodo> = new Subject()
  updatedTodo$ : Subject<Itodo> = new Subject()
  removeTodo$:Subject<string> = new Subject()
  BASE_URL: string = environment.base_url
  TODO_Url: string = `${this.BASE_URL}/todo.json`
  UPDATE_URL : string =`${this.BASE_URL}/todo`
  constructor(
    private _matSnack: SnackbarService,
    private _httpClient: HttpClient
  ) { }


  fetchalltodo(): Observable<Array<Itodo>> {
    return this._httpClient.get(this.TODO_Url).pipe(
      map((res: any) => {
        return Object.keys(res).map((key: string) => ({
          id: key,
          ...res[key]
        }));
      })
    );
  }

  addTodo(todo: Itodo): Observable<any> {
    return this._httpClient.post(this.TODO_Url, todo)
    
  }

  removeTodo(todo: Itodo):Observable<null> {
    let REMOVE_URl = `${this.BASE_URL}/todo/${todo.id}.json`
    return this._httpClient.delete<null>(REMOVE_URl)

    // let index = this.todoData.findIndex(obj => obj.id === todo.id)
    // this.todoData.splice(index, 1)
    // this._matSnack.opensnackBar(`${todo.title} Removed Successfully ...!!`)
  }

  updateTodo(todo: Itodo):Observable<Itodo> {
    let UPDATE_URl = `${this.UPDATE_URL}/${todo.id}.json`

    return this._httpClient.patch<Itodo>(UPDATE_URl, todo)
  }
}
