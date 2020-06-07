export interface InputField {
  name: string;
  label: string;
  type: string;
  size?: InputFieldSize;
  editable?: (data: any) => boolean | boolean;
  required?: boolean;
  displayFields?: string[];
  filterFields?: string[];
  referenceField?: string[];
  separator?: string;
  targetDatasource?: string;
  referenceItem?: ReferenceItem;
}

export interface ReferenceItem {
  headerField: string[];
  fields: string[];
}

export enum InputFieldType {
  Text,
  Boolean,
  Reference,
  DateTime
}

export enum InputFieldSize {
  small = 'col-sm-4',
  medium = 'col-sm-6',
  large = 'col-sm-12'
}
