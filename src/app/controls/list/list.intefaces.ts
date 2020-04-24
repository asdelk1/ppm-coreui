export interface ListHeaderColumn {
  name: string;
  label: string;
  badge?: { expression: (data: any) => boolean, color: string }[];
}

export interface Row {
  rowId: string;
  columns: Column[];
  isSelected: boolean;
  data: any;
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
  enable?: (data: any) => boolean;
  color?: string;
  icon?: string;
  selectMode: ListSelectionMode;
  isBound: boolean;
}

export interface ListActionExecute {
  name: string;
  selection: any[];
  selectionMode: ListSelectionMode;
}

export interface ActionButton {
  name: string;
  isVisible: boolean;
  button: ListAction;
}
