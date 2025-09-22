export interface FormModalInputI<T> {
  field: keyof T;
  type: string;
  placeholder?: string;
  label?: string;
  selectOptions?: Array<string>;
}
