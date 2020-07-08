import {InputField} from '../controls/form/form.interfaces';
import {EntityRecord} from '../models/record.model';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public getFormGroup(fields: InputField[], record: EntityRecord): FormGroup {
    const controls: { [name: string]: AbstractControl } = {};
    for (const field of fields) {
      const validators: ValidatorFn[] = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      controls[field.name] = new FormControl(record && record[field.name] ? record[field.name] : null, validators);
    }
    return new FormGroup(controls);
  }

  public getErrorMessage(form: FormGroup, fieldName: string): string {
    const abstractControl: AbstractControl = form.get(fieldName);
    if (abstractControl.hasError('required')) {
      return 'This field is required';
    }
  }

}
