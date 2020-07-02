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
  isEditable: boolean;

  @Input()
  isReadOnly: boolean;

  @Input()
  errorMessage: string | undefined;

  public inputField: FormControl = new FormControl();

  private onChange = (fn: any) => {
  }

  private onTouched = () => {
  }


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
    this.onChange(this.inputField.value);
  }


}
