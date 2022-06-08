import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let time = new Date(1970, 0, 1);
    time.setSeconds(value);
    return time.toString().substring(0, 25);
  }
}
