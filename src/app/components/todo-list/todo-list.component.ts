import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddItem, FetchItemsByIdTodo, OrderBy, RemoveItem, UpdateFilter, UpdateFilterParameter, UpdateItem } from 'src/app/store/item/item.actions';
import { Item } from 'src/app/store/item/item.model';
import { ItemState } from 'src/app/store/item/item.state';
import { map, } from 'rxjs/operators';
import { ToDoService } from 'src/app/service/to-do.service';


export interface Subject {
  name: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  search: string = "";
  myForm: FormGroup;

  items$: Observable<Item[]> | undefined

  //@Select(ItemState.getAllItems) items$: Observable<Item[]> | undefined

  constructor(public fb: FormBuilder,
    private store: Store) {

    this.items$ = this.store.select(ItemState.getAllItems);

    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    //default 2  because todo  list with id 2
    this.store.dispatch(new FetchItemsByIdTodo(2))
  }

  get getControl(): { [key: string]: AbstractControl; } {
    return this.myForm.controls;
  }

  get name(): AbstractControl | null {
    return this.myForm.get('name');
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  public submitForm(): void {

    // create new Object
    const item: Item = {
      id: Math.random(),
      title: this.myForm.value.name,
      text: this.myForm.value.text,
      done: false,
      date: 1654706962, // not working
      todoId: 2
    }

    this.store.dispatch(new AddItem(item));
  }

  public orderBy(filterParameter: string): void {
    this.store.dispatch(new UpdateFilterParameter(filterParameter))
  }

  public submitSearch(): void {
    this.store.dispatch(new UpdateFilter(this.search))
  }


  public orderBy2(condition: string) {
    if (this.items$ === undefined) {
      return;
    }

    if (condition === 'all') {
      this.items$ = this.store.select(ItemState.getAllItems)
    }

    if (condition === 'done') {

      //this.items$ = this.items$?.

      // this.items$ = this.items$?.pipe(
      //   map(arrayItem => arrayItem.forEach(value))
      // )

      // this.items$ = this.items$?.pipe(
      //   map(arrayItem =>
      //     arrayItem.map(item => item.done === true)
      //   )


      // this.items$ = this.items$.pipe(
      //   map(value => value.filter(task => task.done === true))
      // )

      this.items$ = this.store.select(ItemState.getAllItems).pipe(
        map(value => value.filter(task => task.done === true))
      )

    }

    if (condition === 'active') {
      this.items$ = this.store.select(ItemState.getAllItems).pipe(
        map(value => value.filter(task => task.done === false))
      )
    }

    // when is empty input and click for done or active, all app should show
    // data by this condition

  }
}
