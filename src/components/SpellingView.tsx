import React, { useState } from 'react';
import { spellingLessons } from '../data/supplementaryData';
import { QuestionsSection } from './QuestionsSection';
import { PenTool, CheckCircle, BookOpen } from 'lucide-react';

export const SpellingView: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = spellingLessons[selectedIdx];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Spelling Header */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-800/50">
        <div className="flex items-center gap-3 mb-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 font-bold">
            القواعد الإملائية المقررة بالكتاب المدرسي
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200">
            ضوابط الرسم الإملائي
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          قواعد الإملاء والتطبيقات الكتابية
        </h1>
        <p className="text-xs sm:text-sm text-orange-100/90 max-w-2xl mt-1 leading-relaxed">
          قواعد الرسم الإملائي المعتمدة بالأمثلة والتصويبات النموذجية
        </p>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 mt-6">
          {spellingLessons.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Rule Details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
            <p className="text-xs text-slate-500">
              {current.unit} • صفحات الكتاب: {current.pageRange}
            </p>
          </div>
        </div>

        {/* Rule Content */}
        <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-100 mb-6">
          <h4 className="font-bold text-amber-950 text-sm mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>ضوابط وقواعد الرسم الإملائي:</span>
          </h4>
          <p className="text-slate-800 text-sm sm:text-base leading-loose whitespace-pre-line font-medium">
            {current.rule}
          </p>
        </div>

        {/* Examples Grid */}
        <div className="mb-8">
          <h4 className="font-bold text-slate-800 text-sm mb-3">نماذج وتطبيقات من الكتاب المدرسي:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {current.examples.map((ex, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold text-indigo-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <QuestionsSection questions={current.exercises} lessonTitle={current.title} />
      </div>
    </div>
  );
};
