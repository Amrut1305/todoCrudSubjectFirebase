import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDashComponent } from './todo-dash.component';

describe('TodoDashComponent', () => {
  let component: TodoDashComponent;
  let fixture: ComponentFixture<TodoDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
