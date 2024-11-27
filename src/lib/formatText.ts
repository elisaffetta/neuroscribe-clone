import { marked } from 'marked';

export async function formatPreviewText(text: string): Promise<string> {
  // Удаляем заголовки Markdown
  let formatted = text.replace(/^#+\s+/gm, '');
  
  // Удаляем маркеры списков
  formatted = formatted.replace(/^[-*]\s+/gm, '');
  
  // Удаляем нумерованные списки
  formatted = formatted.replace(/^\d+\.\s+/gm, '');
  
  // Удаляем блоки кода
  formatted = formatted.replace(/```[\s\S]*?```/g, '');
  
  // Удаляем инлайн-код
  formatted = formatted.replace(/`[^`]*`/g, '');
  
  // Преобразуем оставшийся Markdown в HTML
  formatted = await marked(formatted);
  
  // Удаляем HTML-теги, оставляя только текст
  formatted = formatted.replace(/<[^>]*>/g, '');
  
  return formatted;
}
