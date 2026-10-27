import React, { useState } from 'react';
import { QuestionItem } from '../types/curriculum';
import { CheckCircle2, XCircle, HelpCircle, Eye, EyeOff, Award, Sparkles, RotateCcw, Volume2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { speechEngine } from '../utils/speechEngine';

interface QuestionsSectionProps {
  questions: QuestionItem[];
  lessonTitle: string;
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({ questions, lessonTitle }) => {
  const [mode, setMode] = useState<'study' | 'practice'>('study');
  
  // Practice mode states
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, option: string) => {
    if (submitted[qId]) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleTextInput = (qId: string, value: string) => {
    if (submitted[qId]) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmitAnswer = (qId: string) => {
    setSubmitted((prev) => ({ ...prev, [qId]: true }));

    const question = questions.find((q) => q.id === qId);
    if (!question) return;

    const userAns = (userAnswers[qId] || '').trim();
    let isCorrect = false;
    if (question.type === 'mcq' || question.type === 'true_false') {
      isCorrect = userAns === question.correctAnswer;
    } else {
      isCorrect = userAns.length >= 3 && (question.correctAnswer.includes(userAns) || userAns.includes(question.correctAnswer.slice(0, 6)));
    }

    if (isCorrect) {
      soundEffects.playSuccessChime();
      soundEffects.fireConfetti();
      speechEngine.speakPraise(true);
    } else {
      soundEffects.playGentleEncouragement();
      speechEngine.speakPraise(false);
    }
  };

  const handleToggleReveal = (qId: string) => {
    setRevealed((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleResetPractice = () => {
    setUserAnswers({});
    setSubmitted({});
    setRevealed({});
  };




  // Calculate score in practice mode
  const answeredCount = Object.keys(submitted).length;
  const correctCount = questions.filter((q) => {
    if (!submitted[q.id]) return false;
    const userAns = (userAnswers[q.id] || '').trim();
    if (q.type === 'mcq' || q.type === 'true_false') {
      return userAns === q.correctAnswer;
    }
    // Open ended or parsing check
    if (userAns.length > 5 && q.correctAnswer.includes(userAns)) return true;
    return false;
  }).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 my-6">
      {/* Header and Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">أسئلة وتدريبات الكتاب المدرسي المعتمدة</h3>
            <p className="text-xs text-slate-500">
              جميع الأسئلة والأنشطة الواردة في كتاب الوزارة لـ: {lessonTitle}
            </p>
          </div>
        </div>

        {/* Mode Toggle Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setMode('study')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'study'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 نمط المذاكرة (مع الإجابات)
          </button>
          <button
            onClick={() => setMode('practice')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'practice'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✍️ نمط التدريب التفاعلي
          </button>
        </div>
      </div>

      {/* Practice Mode Score Card */}
      {mode === 'practice' && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xs text-slate-300">لوحة نقاط التدريب التفاعلي</div>
              <div className="text-base font-bold">
                أجبت على {answeredCount} من {questions.length} سؤالاً • النتيجة المؤكدة: {correctCount}
              </div>
            </div>
          </div>
          <button
            onClick={handleResetPractice}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التدريب من البداية</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isSubmitted = submitted[q.id];
          const isRevealed = revealed[q.id];
          const userAns = userAnswers[q.id] || '';
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id || idx}
              className={`p-5 rounded-xl border transition-all ${
                mode === 'study'
                  ? 'border-slate-200 bg-slate-50/40'
                  : isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Question Header & Prompt */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    س{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {q.question}
                    </h4>
                    {q.sourcePage && (
                      <span className="text-[11px] text-slate-400 font-medium mt-0.5 inline-block">
                        مصدر السؤال بالكتاب: {q.sourcePage}
                      </span>
                    )}
                  </div>
                </div>

                {/* Show/Hide answer toggle for Practice mode */}
                {mode === 'practice' && (
                  <button
                    onClick={() => handleToggleReveal(q.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                    title={isRevealed ? 'إخفاء الإجابة' : 'كشف الإجابة'}
                  >
                    {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isRevealed ? 'إخفاء' : 'كشف الحل'}</span>
                  </button>
                )}
              </div>

              {/* STUDY MODE: Direct Answer Display */}
              {mode === 'study' && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2">
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>الإجابة النموذجية المعتمدة:</span>
                    </div>
                    <p className="text-sm font-semibold text-emerald-950 leading-relaxed pr-6">
                      {q.correctAnswer}
                    </p>
                  </div>
                  {q.explanation && (
                    <div className="text-xs text-slate-600 pr-3 border-r-2 border-indigo-400">
                      <span className="font-bold text-slate-700">توضيح إضافي: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* PRACTICE MODE: Interactive Inputs */}
              {mode === 'practice' && (
                <div className="mt-4 space-y-3">
                  {/* Multiple Choice Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === opt;
                        let optStyle = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';

                        if (isSubmitted) {
                          if (opt === q.correctAnswer) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                          } else {
                            optStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                          }
                        } else if (isSelected) {
                          optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, opt)}
                            disabled={isSubmitted}
                            className={`p-3 rounded-xl border text-right text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && opt === q.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                            {isSubmitted && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Open-ended written answer input */}
                  {(!q.options || q.options.length === 0) && (
                    <div>
                      <textarea
                        rows={2}
                        value={userAns}
                        onChange={(e) => handleTextInput(q.id, e.target.value)}
                        disabled={isSubmitted}
                        placeholder="اكتب إجابتك هنا..."
                        className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                      />
                    </div>
                  )}

                  {/* Submit / Verification Button */}
                  {!isSubmitted && (
                    <button
                      onClick={() => handleSubmitAnswer(q.id)}
                      disabled={!userAns}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      تحقق من إجابتي
                    </button>
                  )}

                  {/* Immediate Feedback Card */}
                  {isSubmitted && (
                    <div
                      className={`p-3 rounded-xl border text-xs sm:text-sm ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-bold mb-1">
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>إجابة صحيحة وممتازة! أحسنت!</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-amber-600" />
                              <span>قارن إجابتك بالإجابة النموذجية المعتمدة أدناه:</span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => speechEngine.speakPraise(isCorrect)}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer shadow-2xs hover:bg-emerald-50 transition-colors"
                          title="استمع لتشجيع فصيح"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>صوت فصيح</span>
                        </button>
                      </div>
                      <p className="font-semibold text-slate-800 pr-5">
                        الحل المعتمد: {q.correctAnswer}
                      </p>

                      {q.explanation && (
                        <p className="text-xs text-slate-600 pr-5 mt-1">{q.explanation}</p>
                      )}
                    </div>
                  )}

                  {/* Manual Reveal Answer */}
                  {isRevealed && !isSubmitted && (
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs sm:text-sm text-indigo-950 animate-fade-in">
                      <span className="font-bold">الإجابة النموذجية: </span>
                      {q.correctAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
