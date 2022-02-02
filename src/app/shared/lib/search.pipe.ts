import { Pipe, PipeTransform } from '@angular/core';

import { ITodo } from '../../todo/models/todo.interface';

@Pipe({
  name: 'originSearch',
})
export class SearchPipe implements PipeTransform {
  transform(values: ITodo[], args: string): any {
    if (!args.length) {
      return values;
    }

    return values.filter((todo: ITodo) => {
      return todo.label.toLocaleLowerCase().includes(args.toLowerCase());
    });
  }
}
