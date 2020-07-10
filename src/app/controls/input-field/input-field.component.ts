import {Component, forwardRef, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  }]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  type: string = 'text';

  @Input()
  isEditable: boolean;

  @Input()
  isReadOnly: boolean;

  @Input()
  errorMessage: string | undefined;

  @Input()
  size: string = 'small';

  public inputField: FormControl = new FormControl();

  private onChange = (fn: any) => {
  };

  private onTouched = () => {
  };

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.inputField.setValue(obj);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isEditable = isDisabled;
  }

  public react(): void {
    if (this.type === 'datetime-local') {
      // need to format date and time and then send the value.
      const date: Date = new Date(this.inputField.value);
      const formattedDate: string = `${date.getFullYear()}-${this.getDateTimeDigits(date.getUTCMonth() + 1)}-${this.getDateTimeDigits(date.getDate())}T${this.getDateTimeDigits(date.getHours())}:${this.getDateTimeDigits(date.getMinutes())}:${this.getDateTimeDigits(date.getSeconds())}.${this.getDateTimeDigits(date.getMilliseconds(), 1)}Z`;
      this.onChange(formattedDate);
    } else if (this.type === 'number') {
      this.onChange(parseInt(this.inputField.value, 10));
    } else {
      this.onChange(this.inputField.value);
    }
  }

  private getDateTimeDigits(value: number, pad?: number): string {
    if (value < 10) {
      let padding: string = '0';
      while (pad && pad > 0) {
        padding = padding.concat('0');
        pad--;
      }
      return padding + value;
    } else {
      return value.toString();
    }
  }


}
