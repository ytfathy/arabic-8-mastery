import React, { useState } from 'react';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import { QuestionsSection } from './QuestionsSection';
import { Award, BookOpen, Feather, PenTool, CheckCircle, Sparkles } from 'lucide-react';

export const FinalReviewView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'literature' | 'grammar'>('all');

  const allReadingQuestions = readingLessons.flatMap((l) =>
    l.questions.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const allLiteratureQuestions = literaryTexts.flatMap((l) =>
    l.questions.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const allGrammarQuestions = grammarLessons.flatMap((l) =>
    l.exercises.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const totalQuestions =
    allReadingQuestions.length + allLiteratureQuestions.length + allGrammarQuestions.length;

  const currentQuestions =
    activeTab === 'reading'
      ? allReadingQuestions
      : activeTab === 'literature'
      ? allLiteratureQuestions
      : activeTab === 'grammar'
      ? allGrammarQuestions
      : [...allReadingQuestions, ...allLiteratureQuestions, ...allGrammarQuestions];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Final Review Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-600/40">
        <div className="flex items-center gap-3 mb-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المراجعة النهائية الشاملة للفصل الدراسي الأول</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200">
            {totalQuestions} سؤالاً وتدريباً وزارياً
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
          بنك الأسئلة الشامل والاختبارات النهائية
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
          راجع وتدرّب على جميع أسئلة الكتاب المدرسي مصنفة حسب الفروع أو مجمعة في اختبار عام متكامل
          يحاكي امتحانات نصف العام لمحافظات جمهورية مصر العربية.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            🌟 جميع فروع المنهج ({totalQuestions})
          </button>
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'reading'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            📖 بنك أسئلة القراءة ({allReadingQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('literature')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'literature'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            ✒️ بنك أسئلة النصوص والبلاغة ({allLiteratureQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-blue-500 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            ⚖️ بنك أسئلة وتدريبات النحو ({allGrammarQuestions.length})
          </button>
        </div>
      </div>

      {/* Review Questions Section */}
      <QuestionsSection
        questions={currentQuestions}
        lessonTitle={
          activeTab === 'reading'
            ? 'دروس القراءة الستة'
            : activeTab === 'literature'
            ? 'النصوص الأدبية الثلاثة'
            : activeTab === 'grammar'
            ? 'دروس وقواعد النحو والإعراب'
            : 'جميع فروع منهج الصف الثاني الإعدادي'
        }
      />
    </div>
  );
};
