import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
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

  constructor(public fb: FormBuilder,
    private store: Store) {

    this.items$ = this.store.select(ItemState.getAllItems)

    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    //default 2  because todo with id 2
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

}
