import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionButton, Column, ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode, Row} from './list.intefaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private rows: Row[];
  private selectedRows: Row[] = [];
  private actionButtons: ActionButton[] = [];

  @Input()
  headerText: string;

  @Input()
  headerIcon: string | undefined = undefined;

  @Input()
  headerColumns: ListHeaderColumn[];

  @Input()
  selectionMode: ListSelectionMode = ListSelectionMode.Single;

  @Input('actions')
  set actions(buttons: ListAction[]) {
    buttons.forEach((button: ListAction) => {
      this.actionButtons.push({
        name: button.name,
        button: button,
        isVisible: !button.isBound // if action is unbound then it has to be shown regardless of the selection
      });
    });
  }

  @Input('rows')
  set data(records: any[]) {
    this.rows = [];
    records.forEach((record: any) => {
      const rowColumns: Column[] = [];
      for (const column of this.headerColumns) {
        let isBadge: boolean = false;
        let value: string;
        let badgeStyle: string | undefined;
        if (record[column.name]) {
          value = record[column.name];
        } else {
          value = '';
        }

        if (column.badge) {
          for (const badge of column.badge) {
            isBadge = badge.expression(record);
            if (isBadge) {
              badgeStyle = badge.color;
              break;
            }
          }
        }

        rowColumns.push({
          value: value,
          isBadge: isBadge,
          badgeStyle: badgeStyle
        });
      }
      this.rows.push({
        rowId: record['entityId'],
        columns: rowColumns,
        isSelected: false,
        data: record
      });
    });

  }

  @Output('actionExecute')
  execute: EventEmitter<ListActionExecute> = new EventEmitter<ListActionExecute>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onRowSelect(row: Row) {
    const isSelected = !row.isSelected;
    if (this.selectionMode === ListSelectionMode.Multi) {
      row.isSelected = isSelected;
      if (isSelected) {
        this.selectedRows.push(row);
      } else {
        const i = this.selectedRows.findIndex((rowInSelection: Row) => rowInSelection.rowId === row.rowId);
        this.selectedRows.splice(i, 1);
      }
    } else if (this.selectionMode === ListSelectionMode.Single) {
      this.clearRowSelection();
      if (isSelected) {
        this.selectedRows.push(row);
        row.isSelected = isSelected;
      }
    }
    this.refreshActionButtons();
  }

  private clearRowSelection(): void {
    this.selectedRows = [];
    this.rows.forEach((row: Row) => row.isSelected = false);
    this.refreshActionButtons();
  }

  private refreshActionButtons(): void {
    this.actionButtons.forEach((actionButton: ActionButton) => {
      const button: ListAction = actionButton.button;
      if (button.isBound) {
        actionButton.isVisible = false;
        if (button.selectMode === ListSelectionMode.Single && this.selectedRows.length === 1) {
          const selectedRow: Row = this.selectedRows[0]; // if the selection mode is single then always there could be one row in selection.
          actionButton.isVisible = button.enable ? button.enable(selectedRow.data) : true;
        } else if (this.selectedRows.length >= 1) {
          let isVisible: boolean = false;
          for (const row of this.selectedRows) {
            isVisible = button.enable(row.data);
          }
          actionButton.isVisible = isVisible;
        }
      } else {
        actionButton.isVisible = true;
      }
    });
  }

  public actionClick(button: ListAction): void {
    this.execute.emit({name: button.name, selection: this.selectedRows.map((row: Row) => row.data), selectionMode: this.selectionMode});
  }
}
