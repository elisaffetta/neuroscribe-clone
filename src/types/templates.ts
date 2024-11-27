export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  fields: TemplateField[];
  systemPrompt: string;
  userPrompt?: string;
  emoji: string;
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'toggle' | 'radio' | 'checkbox' | 'range' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number | boolean | string[];
}

export interface TemplateFormData {
  [key: string]: string | number | boolean | string[];
}
