import React from 'react';
import { GrammarLesson } from '../types/curriculum';
import { GrammarRuleCard } from './GrammarRuleCard';
import { GrammarExamplesTable } from './GrammarExamplesTable';
import { QuestionsSection } from './QuestionsSection';
import { BookMarked, CheckCircle } from 'lucide-react';

interface GrammarLessonViewProps {
  lesson: GrammarLesson;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const GrammarLessonView: React.FC<GrammarLessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Grammar Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                {lesson.unit}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">
                صفحات الكتاب: {lesson.pageRange}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                فرع القواعد النحوية
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2">
              {lesson.title}
            </h1>
            <p className="text-sm text-blue-100/90 max-w-2xl leading-relaxed">
              {lesson.rule.summary}
            </p>
          </div>

          {/* Completion Button */}
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-blue-500 hover:bg-blue-600 text-slate-950'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <CheckCircle className={`w-5 h-5 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إتقان القاعدة بنجاح ✓' : 'تحديد الدرس كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* A & B. Grammar Rule & Definition Component */}
      <GrammarRuleCard lesson={lesson} />

      {/* C. Examples & Full Parsing Table */}
      <GrammarExamplesTable examples={lesson.examples} lessonTitle={lesson.title} />

      {/* D. Complete Grammar Exercises & Interactive Practice */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2 text-slate-700">
          <BookMarked className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-lg">تدريبات النحو وإعراب الجمل (المحلولة والتفاعلية)</h3>
        </div>
        <QuestionsSection questions={lesson.exercises} lessonTitle={lesson.title} />
      </div>
    </div>
  );
};
