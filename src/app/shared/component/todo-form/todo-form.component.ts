import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { UuidService } from '../../service/uuid.service';
import { Itodo } from '../../model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm !: FormGroup
  isInEditMode: boolean = false
  editObject !: Itodo
  constructor(
    private _todo: TodoService,
    private _uuid: UuidService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.editModeSetup()
  }

  editModeSetup() {
    this._todo.editTodo$.subscribe(res => {
      if (res) {
        this.isInEditMode = true
        this.editObject = res
        this.todoForm.patchValue(res)
      } else {
        this.isInEditMode = false
      }
    })
   
  }

  createForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required])
    })
  }

  onTodoSubmit() {
    if (this.todoForm.valid) {
      if (!this.isInEditMode) {
        let newTodo = this.todoForm.value
        this._todo.addTodo(newTodo)
          .subscribe(res => {
            console.log(res);
             this._todo.addTodo$.next(newTodo)
          })
      } else {
        let updatedTodo = {
          ...this.todoForm.value,
          id: this.editObject.id
        }
        this._todo.updateTodo(updatedTodo).subscribe(res =>{
          if(res){
            this._todo.updatedTodo$.next(res)
            this.isInEditMode =false
            this.todoForm.reset()
          }
        }
        )
      }

    }
  }
}
