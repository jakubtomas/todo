import { Component, OnInit } from '@angular/core';
import { combineLatest, of, zip } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  nums: number[] = [1, 2]

  constructor() { }

  ngOnInit(): void {
    this.filterNumbers();
  }


  filterNumbers() {
    const numbers = of([1, 2, 3, 4, 5])
    const badNumbers = of([4, 5, 6, 7])

    zip(numbers, badNumbers).pipe(
      map(([value1, value2]) => value1.filter(v => !value2.includes(v)))
    ).subscribe((data) => {
      console.log(data);
    })
  }




  /////////////////////////////////////////



}
