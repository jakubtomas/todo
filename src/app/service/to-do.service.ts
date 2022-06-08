import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../store/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private address = 'https://629e64f33dda090f3c191498.mockapi.io/todos';

  constructor(private http: HttpClient) { }

  ///todos/:id/item
  getAllItems(): Observable<any> {
    return this.http.get(this.address + '/2/item')
  }
  ///todos/:id/item/:id
  deleteItem(idItem: number): Observable<Object> {
    return this.http.delete(this.address + '/2/item/' + idItem)
  }

  ///todos/:id/item
  addItem(data: Item): Observable<Object> {
    return this.http.post(this.address + '/2/item/', data)
  }

  ///todos/:id/item/:id
  updateItem(data: Item): Observable<Object> {
    return this.http.put(this.address + '/2/item/' + data.id, data)
  }
}
