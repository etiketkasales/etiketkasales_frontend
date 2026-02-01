export interface FormModalInputI<T> {
  field: keyof T;
  type: string;
  placeholder?: string;
  label?: string;
  selectOptions?: Array<IFormModalSelectOption>;
}

export interface IFormModalSelectOption {
  value: string;
  label: string;
}
