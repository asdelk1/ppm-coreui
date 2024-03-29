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

      let value: any = null;
      if (record && record.getProperty(field.name)) {
        if (typeof record.getProperty(field.name) === 'object') {
          value = (record.getProperty(field.name) as EntityRecord).getEntity();
        } else {
          value = record.getProperty(field.name);
        }
      }
      controls[field.name] = new FormControl(record && record.getProperty(field.name) ? record.getProperty(field.name) : null, validators);
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
