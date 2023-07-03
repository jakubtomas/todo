import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
//import { AddItem, RemoveItem } from "../actions/task.actions";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AddItem,
  FetchItemsByIdTodo,
  RemoveItem,
  SetError,
  UpdateFilter,
  UpdateFilterParameter,
  UpdateItem
} from './item.actions';
import { Item } from './item.model';
import { ToDoService } from 'src/app/service/to-do.service';
import { catchError, tap } from 'rxjs/operators';
// Section 2
export class ItemStateModel {
  items: Item[] = [];
  filterText: string = '';
  filterParameter: string = '';
  error: string = '';
}

@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
    filterText: '',
    filterParameter: '',
    error: ''
  }
})
@Injectable()
export class ItemState {
  constructor(private todoService: ToDoService, private store: Store) {}

  @Selector()
  static getAllItems(state: ItemStateModel): Item[] {
    let store = state.items;

    if (state.filterParameter === 'done') {
      store = store.filter((item: { done: boolean }) => item.done === true);
    }

    if (state.filterParameter === 'active') {
      store = store.filter((item: { done: boolean }) => item.done === false);
    }

    if (state.filterText) {
      store = store.filter((item) => item.title.includes(state.filterText));
    }
    return store;
  }

  @Selector()
  static getError(state: ItemStateModel): String {
    return state.error;
  }

  @Action(AddItem)
  addItem({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
    return this.todoService.addItem(payload).pipe(
      tap(
        () => {
          const state = getState();
          patchState({
            ...state,
            items: [...state.items, payload]
          });
        },
        catchError((error) => {
          console.log(error);

          this.store.dispatch(new SetError('new Item has not been added.'));
          return of(' Something is wrong with server');
        })
      )
    );
  }

  @Action(UpdateItem)
  updateItem(
    { getState, patchState }: StateContext<ItemStateModel>,
    { payload }: UpdateItem
  ) {
    const items = getState().items.filter((a) => a.id !== payload);
    const updateItem = getState().items.filter((a) => a.id === payload)[0];
    updateItem.done = !updateItem.done;

    return this.todoService.updateItem(updateItem).pipe(
      tap(
        () => {
          // const state = getState();

          // items.unshift(updateItem)
          // patchState({
          //   items: [...items]
          // })
          this.store.dispatch(new FetchItemsByIdTodo(2));
        },
        catchError((error) => {
          this.store.dispatch(new SetError('Item has not been updated. Something is wrong'));
          return of(' Something is wrong with server');
        })
      )
    );
  }

  @Action(RemoveItem)
  removeItem(
    { getState, patchState }: StateContext<ItemStateModel>,
    { payload }: RemoveItem
  ) {
    return this.todoService.deleteItem(payload).pipe(
      tap(
        () => {
          patchState({
            items: getState().items.filter((a) => a.id != payload)
          });
        },
        catchError((error) => {
          this.store.dispatch(new SetError('Item has not been deleted. Something is wrong'));
          return of(' Something is wrong with server');
        })
      )
    );
  }

  @Action(FetchItemsByIdTodo)
  fetchItems(
    { getState, patchState }: StateContext<ItemStateModel>,
    { payload }: FetchItemsByIdTodo
  ) {
    return this.todoService.getAllItems().pipe(
      tap(
        (data) => {
          const state = getState();
          patchState({
            ...state,
            items: [...data]
          });
        },
        catchError((error) => {
          this.store.dispatch(new SetError(' Something is wrong, Try reload page'));
          return of(' Something is wrong with server');
        })
      )
    );
  }

  @Action(UpdateFilter)
  updateTextFilter({ patchState }: StateContext<ItemStateModel>, { payload }: UpdateFilter) {
    patchState({ filterText: payload });
  }

  @Action(UpdateFilterParameter)
  updateFilterParameter(
    { patchState }: StateContext<ItemStateModel>,
    { payload }: UpdateFilterParameter
  ) {
    patchState({ filterParameter: payload });
  }

  @Action(SetError)
  setError({ patchState }: StateContext<ItemStateModel>, { payload }: SetError) {
    patchState({ filterParameter: payload });
  }
}
