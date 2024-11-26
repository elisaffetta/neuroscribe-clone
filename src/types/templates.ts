export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: TemplateField[];
  systemPrompt: string;
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

export interface TemplateFormData {
  [key: string]: string | number;
}
