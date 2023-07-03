import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveItem, UpdateItem } from 'src/app/store/item/item.actions';
import { Item } from 'src/app/store/item/item.model';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input('item') item!: Item;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  public removeTask(id: number): void {
    console.log('click remove task');

    this.store.dispatch(new RemoveItem(id));
  }
  public toggle(number: number): void {
    this.store.dispatch(new UpdateItem(number));
  }
}
