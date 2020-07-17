import {EntityRecord} from '../../models/record.model';

export interface ListHeaderColumn {
  name: string;
  label: string;
  badge?: { expression: (EntityRecord: any) => boolean, color: string }[];
}

export interface Row {
  rowId: string;
  columns: Column[];
  isSelected: boolean;
  data: EntityRecord;
}

export interface Column {
  isBadge: boolean;
  value: string;
  badgeStyle?: string;
}

export enum ListSelectionMode {
  Multi,
  Single
}

export interface ListAction {
  name: string;
  label: string;
  enable?: (data: EntityRecord) => boolean;
  color?: string;
  icon?: string;
  selectMode: ListSelectionMode;
  isBound: boolean;
}

export interface ListActionExecute {
  name: string;
  selection: EntityRecord[];
  selectionMode: ListSelectionMode;
}

export interface ActionExecute {
  name: string;
  record: EntityRecord;
}

export interface ActionButton {
  name: string;
  isVisible: boolean;
  button: ListAction;
}
