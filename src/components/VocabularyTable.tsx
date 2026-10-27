import React, { useState } from 'react';
import { VocabularyItem } from '../types/curriculum';
import { Search, Volume2, BookOpen } from 'lucide-react';
import { speechEngine } from '../utils/speechEngine';

interface VocabularyTableProps {
  vocabulary: VocabularyItem[];
}

export const VocabularyTable: React.FC<VocabularyTableProps> = ({ vocabulary }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = vocabulary.filter(
    (item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.context && item.context.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pronounceWord = (word: string) => {
    speechEngine.startReading(word);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">معاني الكلمات والمفردات اللغوية</h3>
            <p className="text-xs text-slate-500">مستخرجة طبق الأصل من صفحات الكتاب المدرسي المقرر</p>
          </div>
        </div>

        {/* Search bar inside vocabulary */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في الكلمات أو المعاني..."
            className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Responsive Vocabulary Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 rounded-r-xl">الكلمة أو التعبير</th>
              <th className="py-3 px-4">المعنى والدلالة</th>
              <th className="py-3 px-4">المضاد (المعاكس)</th>
              <th className="py-3 px-4">المفرد أو الجمع</th>
              <th className="py-3 px-4 rounded-l-xl">الاستخدام في السياق</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-3.5 px-4 font-bold text-emerald-800 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => pronounceWord(item.word)}
                      title="استمع إلى نطق الكلمة"
                      className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span>{item.word}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-medium">{item.meaning}</td>
                <td className="py-3.5 px-4 text-rose-700 font-medium">
                  {item.antonym && item.antonym !== '-' ? item.antonym : <span className="text-slate-300">-</span>}
                </td>
                <td className="py-3.5 px-4 text-indigo-700 font-medium">
                  {item.singularOrPlural && item.singularOrPlural !== '-' ? (
                    item.singularOrPlural
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-xs italic bg-slate-50/50 rounded-lg">
                  {item.context ? `«${item.context}»` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          لم يتم العثور على كلمات مطابقة لبحثك.
        </div>
      )}
    </div>
  );
};
