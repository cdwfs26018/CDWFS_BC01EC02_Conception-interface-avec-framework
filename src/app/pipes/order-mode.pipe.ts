import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderModeLabel',
  standalone: true,
})
export class OrderModePipe implements PipeTransform {
  transform(value: 'sur_place' | 'a_emporter' | null): string {
    if (value === 'sur_place') return 'Sur place';
    if (value === 'a_emporter') return 'À emporter';
    return '';
  }
}
