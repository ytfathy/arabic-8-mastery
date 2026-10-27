import React from 'react';
import { ParsingExample } from '../types/curriculum';
import { Sparkles } from 'lucide-react';

interface GrammarExamplesTableProps {
  examples: ParsingExample[];
  lessonTitle: string;
}

export const GrammarExamplesTable: React.FC<GrammarExamplesTableProps> = ({
  examples,
  lessonTitle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 my-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">الأمثلة وجداول الإعراب النموذجي المفصل</h3>
          <p className="text-xs text-slate-500">
            أمثلة الكتاب المدرسي مع الإعراب الكامل والتعليل لقاعدة: {lessonTitle}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 rounded-r-xl">المثال / الجملة</th>
              <th className="py-3 px-4">الكلمة المستهدفة</th>
              <th className="py-3 px-4">الموقع الإعرابي</th>
              <th className="py-3 px-4">الإعراب الكامل والتفصيلي</th>
              <th className="py-3 px-4 rounded-l-xl">سبب الإعراب / القاعدة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {examples.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                  «{item.sentence}»
                </td>
                <td className="py-3.5 px-4 font-bold text-indigo-700 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200">
                    {item.targetedWord}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-800 whitespace-nowrap">
                  {item.grammaticalFunction}
                </td>
                <td className="py-3.5 px-4 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                  {item.fullParsing}
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 bg-slate-50/50 rounded-lg">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
