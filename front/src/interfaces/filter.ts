export interface SelectFilter extends FilterDefinition<string | number> {
  type: "select";
  options: { label: string; value: string | number }[];
}

export interface InputFilter extends FilterDefinition<string> {
  type: "input";
}

export interface CheckboxFilter extends FilterDefinition<boolean> {
  type: "checkbox";
}

export type FilterItem = SelectFilter | InputFilter | CheckboxFilter;

export interface FilterDefinition<T = any> {
  label: string;
  type: string;
  value: T;
  disabled?: boolean;
  onChange: (value: T) => void;
}
