import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

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

  @ViewChild('modal') public modal: ModalDirective;

  constructor() {
  }

  ngOnInit(): void {
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

}
