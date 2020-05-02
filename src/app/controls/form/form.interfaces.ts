export interface InputField {
  name: string;
  label: string;
  size?: InputFieldSize;
  editable?: (data: any) => boolean | boolean;
  required?: boolean;
}

export enum InputFieldSize {
  small = 'col-sm-4',
  medium = 'col-sm-6',
  large = 'col-sm-12'
}
