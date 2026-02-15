import { parseMarkdown } from './parser';

// Vite 自动读取 content 目录下所有 md 文件内容
const mdModules = import.meta.glob('../content/*.md', { query: '?raw', eager: true });

export const getProductByBarcode = (barcode) => {
  const path = `../content/${barcode}.md`;
  const rawContent = mdModules[path];
  
  if (rawContent) {
    const text = typeof rawContent === 'string' ? rawContent : rawContent.default;
    return parseMarkdown(text);
  }
  return null;
};