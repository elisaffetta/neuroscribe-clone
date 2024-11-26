export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'content' | 'marketing' | 'business' | 'social' | 'research';
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
  multiple?: boolean;
}

export interface TemplateFormData {
  [key: string]: string | number;
}
