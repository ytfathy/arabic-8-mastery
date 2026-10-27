import React, { useState } from 'react';
import { LiteraryText } from '../types/curriculum';
import { AudioBar } from './AudioBar';
import { VocabularyTable } from './VocabularyTable';
import { AestheticFeaturesTable } from './AestheticFeaturesTable';
import { QuestionsSection } from './QuestionsSection';
import { Feather, BookOpen, User, CheckCircle } from 'lucide-react';

interface LiteraryTextViewProps {
  text: LiteraryText;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const LiteraryTextView: React.FC<LiteraryTextViewProps> = ({
  text,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeSentence, setActiveSentence] = useState('');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Literary Text Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-700/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold">
                {text.unit}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">
                صفحات الكتاب: {text.pageRange}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                فرع النصوص الأدبية
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2">
              {text.title}
            </h1>
            <p className="text-sm font-semibold text-purple-200">
              {text.poet}
            </p>
            <p className="text-xs sm:text-sm text-purple-100/80 max-w-2xl leading-relaxed">
              {text.generalMeaning}
            </p>
          </div>

          {/* Completion Button */}
          <button
            onClick={() => onToggleComplete(text.id)}
            className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-purple-500 hover:bg-purple-600 text-slate-950'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <CheckCircle className={`w-5 h-5 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إكمال النص بنجاح ✓' : 'تحديد النص كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* Poet Biography Card */}
      <div className="bg-purple-50/60 rounded-2xl p-5 border border-purple-100 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-purple-200/60 text-purple-900 flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-purple-950 text-sm mb-1">بطاقة التعريف بالشاعر / الأديب</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {text.authorBio}
          </p>
        </div>
      </div>

      {/* Audio Recitation Player */}
      <AudioBar
        fullText={text.originalText}
        title={text.title}
        activeSentence={activeSentence}
      />

      {/* A. Original Poetry Verses */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              أ. نص القصيدة الكامل بالتشكيل (طبق الأصل من الكتاب المدرسي)
            </h3>
            <p className="text-xs text-slate-500">
              الأبيات الشعرية كاملة دون حذف أي بيت مع التنسيق الشعري الأصيل
            </p>
          </div>
        </div>

        {/* Dual-column Verses */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {text.verses.map((v) => (
            <div
              key={v.order}
              className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-300 hover:bg-purple-50/30 transition-all font-amiri text-lg sm:text-xl font-bold text-slate-900"
            >
              <div className="poetry-verse gap-2">
                <div className="text-right sm:text-left text-purple-950">{v.firstHemistich}</div>
                <div className="text-xs text-purple-400 font-sans font-bold flex items-center justify-center">
                  ❖
                </div>
                <div className="text-left sm:text-right text-slate-900">{v.secondHemistich}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E. Verse-by-Verse Explanation */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              هـ. شرح أبيات النص الأدبي بالتفصيل
            </h3>
            <p className="text-xs text-slate-500">
              شرح مبسط ووافٍ لكل بيت بترتيب الأبيات الواردة في الكتاب
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {text.versesExplanation.map((item) => (
            <div key={item.verseOrder} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-indigo-900 font-amiri">
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 text-xs font-sans flex items-center justify-center">
                  {item.verseOrder}
                </span>
                <span>«{item.verseText}»</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pr-8">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C. Vocabulary Table */}
      <VocabularyTable vocabulary={text.vocabulary} />

      {/* D. Aesthetic Features Table */}
      <AestheticFeaturesTable features={text.aestheticFeatures} textTitle={text.title} />

      {/* F. Complete Textbook Questions and Answers */}
      <QuestionsSection questions={text.questions} lessonTitle={text.title} />
    </div>
  );
};
