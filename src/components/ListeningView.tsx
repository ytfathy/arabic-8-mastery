import React, { useState } from 'react';
import { listeningLessons } from '../data/supplementaryData';
import { AudioBar } from './AudioBar';
import { QuestionsSection } from './QuestionsSection';
import { Headphones, CheckCircle, HeartHandshake } from 'lucide-react';

export const ListeningView: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = listeningLessons[selectedIdx];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Listening Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-700/50">
        <div className="flex items-center gap-3 mb-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 font-bold">
            ملحق نصوص الاستماع (ص 149 - 155)
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200">
            3 نصوص مقررة
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          نصوص الاستماع المقررة والمهارات السمعية
        </h1>
        <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl mt-1 leading-relaxed">
          نصوص استماع كاملة مطابقة لملحق الكتاب المدرسي مع قراءة صوتية نموذجية وأسئلة استيعاب
        </p>

        {/* Tab selector for the 3 texts */}
        <div className="flex flex-wrap gap-2 mt-6">
          {listeningLessons.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-teal-400 text-teal-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player for Listening Lesson */}
      <AudioBar
        fullText={current.originalText}
        title={current.title}
        activeSentence=""
      />

      {/* Script & Details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
              <p className="text-xs text-slate-500">
                {current.unit} • صفحات ملحق الكتاب: {current.scriptPage}
              </p>
            </div>
          </div>
        </div>

        {/* The Text Passage */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 font-amiri text-lg sm:text-xl text-slate-800 leading-loose text-justify mb-6">
          {current.originalText}
        </div>

        {/* Values Learned */}
        <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 mb-6">
          <h4 className="font-bold text-teal-950 text-sm mb-3 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <span>القيم والدروس المستفادة من نص الاستماع:</span>
          </h4>
          <ul className="space-y-2">
            {current.lessonsLearned.map((val, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <QuestionsSection questions={current.questions} lessonTitle={current.title} />
      </div>
    </div>
  );
};
