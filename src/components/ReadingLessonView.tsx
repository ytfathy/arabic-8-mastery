import React, { useState } from 'react';
import { ReadingLesson } from '../types/curriculum';
import { AudioBar } from './AudioBar';
import { VocabularyTable } from './VocabularyTable';
import { QuestionsSection } from './QuestionsSection';
import { BookOpen, Lightbulb, Compass, HeartHandshake, CheckCircle } from 'lucide-react';

interface ReadingLessonViewProps {
  lesson: ReadingLesson;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const ReadingLessonView: React.FC<ReadingLessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeSentence, setActiveSentence] = useState('');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Lesson Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                {lesson.unit}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">
                صفحات الكتاب: {lesson.pageRange}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                فرع القراءة
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2">
              {lesson.title}
            </h1>
            <p className="text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {lesson.mainIdea}
            </p>
          </div>

          {/* Completion Button */}
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <CheckCircle className={`w-5 h-5 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إكمال الدرس بنجاح ✓' : 'تحديد الدرس كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* Audio Reading Player */}
      <AudioBar
        fullText={lesson.originalText}
        title={lesson.title}
        activeSentence={activeSentence}
      />

      {/* A. Original Reading Passage */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              أ. نص موضوع القراءة الأصلي كاملاً (طبق الأصل من الكتاب المدرسي)
            </h3>
            <p className="text-xs text-slate-500">
              النص الكامل غير مختصر مع المحافظة على التنسيق والفقرات وعناوينها الأصلية
            </p>
          </div>
        </div>

        {/* Paragraphs */}
        <div className="space-y-6">
          {lesson.paragraphs.map((p) => (
            <div
              key={p.order}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-emerald-200 transition-colors"
            >
              {p.heading && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                    {p.order}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base">{p.heading}</h4>
                </div>
              )}
              <p className="text-slate-800 leading-loose text-base sm:text-lg font-amiri font-normal text-justify">
                {p.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C. Lesson Comprehensive Explanation */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              جـ. الشرح التعليمي الشامل لموضوع الدرس
            </h3>
            <p className="text-xs text-slate-500">
              تحليل الأفكار الرئيسة والفرعية، القيم المكتسبة، والدروس المستفادة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sub ideas */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 border border-indigo-100">
            <h4 className="font-bold text-indigo-950 text-sm mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>الأفكار الرئيسة والفرعية للدرس</span>
            </h4>
            <ul className="space-y-2.5">
              {lesson.subIdeas.map((idea, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/60 text-indigo-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons & Values */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-100">
            <h4 className="font-bold text-emerald-950 text-sm mb-3 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>القيم والدروس المستفادة في حياتنا</span>
            </h4>
            <ul className="space-y-2.5">
              {lesson.lessonsLearned.map((val, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* D. Vocabulary Table */}
      <VocabularyTable vocabulary={lesson.vocabulary} />

      {/* E. Complete Textbook Questions and Answers */}
      <QuestionsSection questions={lesson.questions} lessonTitle={lesson.title} />
    </div>
  );
};
