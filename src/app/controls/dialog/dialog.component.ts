import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {InputField} from '../form/form.interfaces';
import {ActionExecute} from '../list/list.intefaces';
import {EntityRecord} from '../../models/record.model';
import {FormGroup} from '@angular/forms';
import {FormService} from '../../services/form.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnChanges {

  @Input()
  isVisible: boolean;

  @Output()
  isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  title: string;

  @Input()
  fields: InputField[];

  @Input()
  okLabel: string = 'Ok';

  @Input()
  cancelLabel: string = 'Cancel';

  @Input()
  record: EntityRecord;

  @Output()
  actionExecute: EventEmitter<ActionExecute> = new EventEmitter<ActionExecute>();

  @ViewChild('modal')
  public modal: ModalDirective;

  form: FormGroup;

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.form = this.formService.getFormGroup(this.fields, this.record);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modal && changes['isVisible'] && changes['isVisible'].currentValue !== changes['isVisible'].previousValue) {
      this.toggleDialog(changes['isVisible'].currentValue);
    }
  }

  public toggleDialog(visibility: boolean) {
    if (visibility) {
      this.modal.show();
    } else {
      this.modal.hide();
      this.isVisibleChange.emit(false);
    }
  }

  public onSave(): void {
    this.actionExecute.emit({
      name: 'ok',
      record: this.form.value as EntityRecord
    });
    this.toggleDialog(false);
  }
}
