import React from 'react';
import { GrammarLesson } from '../types/curriculum';
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight, Layers } from 'lucide-react';

interface GrammarRuleCardProps {
  lesson: GrammarLesson;
}

export const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({ lesson }) => {
  const { rule, originalDefinition } = lesson;

  return (
    <div className="space-y-6 my-6">
      {/* Original Definition Box */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-700/50">
        <div className="flex items-center gap-2.5 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>تعريف الكتاب المدرسي المعتمد (صفحة {lesson.pageRange})</span>
        </div>
        <p className="text-sm sm:text-base font-semibold leading-relaxed text-indigo-50">
          «{originalDefinition}»
        </p>
      </div>

      {/* Conditions & Application Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Conditions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>شروط وضوابط استخدام القاعدة</span>
          </h4>
          <ul className="space-y-2">
            {rule.conditions.map((c, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-indigo-600" />
            <span>خطوات التطبيق العملي للإعراب</span>
          </h4>
          <ol className="space-y-2">
            {rule.steps.map((s, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Rule Cases & Signs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          <span>حالات القاعدة وعلامات الإعراب والبناء بالتفصيل</span>
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {rule.cases.map((c, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <h5 className="font-bold text-indigo-950 text-sm mb-2">{c.title}</h5>
              <p className="text-xs text-slate-600 mb-3">{c.description}</p>
              
              <div className="space-y-1.5 mb-3">
                <span className="text-[11px] font-bold text-slate-700 block">العلامات المميزة:</span>
                {c.signs.map((sign, sIdx) => (
                  <span key={sIdx} className="inline-block text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 ml-1.5 mb-1.5">
                    {sign}
                  </span>
                ))}
              </div>

              {c.examples && c.examples.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                  <span className="font-bold text-slate-700">أمثلة: </span>
                  {c.examples.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Exceptions and Warnings */}
      {rule.exceptions && rule.exceptions.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-sm">
          <h4 className="font-bold text-amber-900 text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>تنبيهات واستثناءات الكتاب المدرسي الهامة</span>
          </h4>
          <ul className="space-y-1.5">
            {rule.exceptions.map((ex, idx) => (
              <li key={idx} className="text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary Box */}
      <div className="bg-slate-100/90 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
        <span className="font-bold text-slate-900 shrink-0">خلاصة سريعة:</span>
        <span className="leading-relaxed">{rule.summary}</span>
      </div>
    </div>
  );
};
