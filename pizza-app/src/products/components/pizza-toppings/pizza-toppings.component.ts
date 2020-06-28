import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Topping} from '../../models/topping.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true,
};

@Component({
  selector: 'app-pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-toppings.component.scss'],
  template: `
    <div class="pizza-toppings">
      <div
        class="pizza-toppings-item"
        *ngFor="let topping of toppings;"
        (click)="selectTopping(topping)"
        [class.active]="existsInToppings(topping)">
        <img src="/assets/img/toppings/singles/{{ topping.name }}.svg">
        {{ topping.name }}
      </div>
    </div>
  `,
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  @Input() toppings: Topping[] = [];

  value: Topping[] = [];

  private onTouch: () => void;
  private onModelChange: (value: Topping[]) => void;

  registerOnChange(fn: () => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(value: Topping[]): void {
    this.value = value;
  }

  selectTopping(topping: Topping): void {
    if (this.existsInToppings(topping)) {
      this.value = this.value.filter(item => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInToppings(topping: Topping): boolean {
    return this.value.some(val => val.id === topping.id);
  }
}
