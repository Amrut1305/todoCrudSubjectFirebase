import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Itodo } from '../../model/todo';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tododata : Itodo[] = []
  constructor(
    private _todo : TodoService,
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getRmoveTodos()
    this.getUpdatedTodo()
  }

  getRmoveTodos(){
    this._todo.fetchalltodo()
    .subscribe(res=>{
      this.tododata = res
      console.log(this.tododata);
    })

    this._todo.removeTodo$.subscribe(res=>{
      let index = this.tododata.findIndex(todo=>todo.id === res)
      this.tododata.splice(index,1)      
    })
  }

  onEdit(todo:Itodo) {
    this._todo.editTodo$.next(todo)
  }

  getUpdatedTodo(){
    this._todo.updatedTodo$.subscribe(res=>{
      let index = this.tododata.findIndex(todo=>todo.id ===res.id)
      this.tododata[index]=res
    })
  }

  onRemove(todo:Itodo) {
    let matRef = this._matDialog.open(MatDialogComponent)
    matRef.afterClosed().subscribe(res=>{
      if(res){
        this._todo.removeTodo(todo).subscribe(res=>{
          this._todo.removeTodo$.next(todo.id)
        })
      }
    })
  }
}
