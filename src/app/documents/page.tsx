'use client';

import { useState } from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import { Search, Upload, Grid, List } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { documents } from '@/data/documents';
import Editor from '@/components/editor/Editor';
import { format } from 'date-fns';
import { formatPreviewText } from '@/lib/formatText';

export default function Documents() {
  const { t } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);

  const handleSave = (content: string) => {
    // В реальном приложении здесь был бы API-запрос для сохранения
    console.log('Saving document:', content);
    setSelectedDoc(null);
  };

  const getPreviewText = (content: string) => {
    const formatted = formatPreviewText(content);
    const lines = formatted.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join('\n');
  };

  return (
    <StandardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Grid className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800"
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{doc.emoji}</span>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground line-clamp-3">
                  {getPreviewText(doc.content)}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t dark:border-gray-700">
                  <span>
                    Создано: {format(new Date(doc.createdAt), 'dd.MM.yyyy HH:mm')}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                    Нажмите для редактирования →
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          {selectedDoc && (
            <DialogContent className="max-w-4xl bg-white dark:bg-gray-800">
              <DialogHeader className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedDoc.emoji}</span>
                  <DialogTitle className="text-2xl font-semibold">
                    {selectedDoc.title}
                  </DialogTitle>
                </div>
                <div className="text-sm text-muted-foreground">
                  Последнее обновление: {format(new Date(selectedDoc.updatedAt), 'dd.MM.yyyy HH:mm')}
                </div>
              </DialogHeader>
              <div className="mt-6">
                <Editor content={selectedDoc.content} onSave={handleSave} />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </StandardLayout>
  );
}
