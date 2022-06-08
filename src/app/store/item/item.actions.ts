import { Item } from "./item.model"


export class AddItem {
  static readonly type = '[Item] Add'

  constructor(public payload: Item) { }
}

export class AddItem2 {
  static readonly type = '[Item] Add'

  constructor(public payload: Item) { }
}

export class RemoveItem {
  static readonly type = '[Item ] Remove'

  constructor(public payload: number) { }
}


export class UpdateItem {
  static readonly type = '[Item] update done status'

  constructor(public payload: number) { }
}


export class OrderBy {
  static readonly type = '[Items FilterParameter] update order'

  constructor(public payload: string) { }
}

export class UpdateFilter {
  static readonly type = '[Items filterText] update filterText'

  constructor(public payload: string) { }
}

export class UpdateFilterParameter {
  static readonly type = '[Items FilterParameter] update filter Parameter'

  constructor(public payload: string) { }
}

export class FetchItemsByIdTodo {
  static readonly type = '[Items] Fetch items by id Todo'

  constructor(public payload: number) { }
}


export class SetError {
  static readonly type = '[Items Error] Fetch items by id Todo'

  constructor(public payload: string) { }
}
