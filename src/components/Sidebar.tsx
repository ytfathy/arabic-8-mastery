import React, { useState } from 'react';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import {
  BookOpen,
  Feather,
  Scale,
  Headphones,
  PenTool,
  CheckCircle2,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  Search,
  X,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentCategory: string;
  currentLessonId: string;
  completedLessonIds: string[];
  onSelectLesson: (category: string, id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  currentLessonId,
  completedLessonIds,
  onSelectLesson,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    reading: true,
    literature: true,
    grammar: true,
    supplementary: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLessonPick = (cat: string, id: string) => {
    onSelectLesson(cat, id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-18 right-0 h-screen lg:h-[calc(100vh-4.5rem)] w-80 bg-white border-l border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-slate-800 text-sm">فهرس دروس المنهج الكامل</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Inside Lessons */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن درس أو قاعدة..."
              className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Home Button */}
          <button
            onClick={() => handleLessonPick('home', 'home')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              currentCategory === 'home'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-emerald-50/70 text-emerald-950 hover:bg-emerald-100 border border-emerald-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4" />
              <span>الرئيسية • المرشد "فصيح"</span>
            </div>
            <span className="text-[10px] font-bold opacity-80">البداية</span>
          </button>

          {/* Section 1: دروس القراءة (6 دروس) */}
          <div>
            <button
              onClick={() => toggleSection('reading')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span>1. دروس القراءة (6 دروس)</span>
              </div>
              {openSections.reading ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.reading && (
              <div className="space-y-1 pr-2">
                {readingLessons
                  .filter((l) => l.title.includes(searchTerm) || l.unit.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'reading' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        onClick={() => handleLessonPick('reading', l.id)}
                        className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-bold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-emerald-500'
                                : isSelected
                                ? 'bg-emerald-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[10px] shrink-0 font-mono ${
                            isSelected ? 'text-emerald-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 2: دروس النصوص الأدبية (3 نصوص) */}
          <div>
            <button
              onClick={() => toggleSection('literature')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Feather className="w-3.5 h-3.5" />
                </div>
                <span>2. دروس النصوص الأدبية (3 نصوص)</span>
              </div>
              {openSections.literature ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.literature && (
              <div className="space-y-1 pr-2">
                {literaryTexts
                  .filter((l) => l.title.includes(searchTerm) || l.poet.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'literature' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        onClick={() => handleLessonPick('literature', l.id)}
                        className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white font-bold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-purple-500'
                                : isSelected
                                ? 'bg-purple-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[10px] shrink-0 font-mono ${
                            isSelected ? 'text-purple-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 3: دروس النحو وقواعد الإعراب (6 دروس) */}
          <div>
            <button
              onClick={() => toggleSection('grammar')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <span>3. دروس النحو والإعراب (6 دروس)</span>
              </div>
              {openSections.grammar ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.grammar && (
              <div className="space-y-1 pr-2">
                {grammarLessons
                  .filter((l) => l.title.includes(searchTerm) || l.unit.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'grammar' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        onClick={() => handleLessonPick('grammar', l.id)}
                        className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-blue-500'
                                : isSelected
                                ? 'bg-blue-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[10px] shrink-0 font-mono ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 4 & 5: نصوص الاستماع والإملاء والتعبير */}
          <div>
            <button
              onClick={() => toggleSection('supplementary')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <span>4. الاستماع والإملاء والتعبير</span>
              </div>
              {openSections.supplementary ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSections.supplementary && (
              <div className="space-y-1 pr-2">
                <button
                  onClick={() => handleLessonPick('listening', 'listening-all')}
                  className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                    currentCategory === 'listening'
                      ? 'bg-teal-600 text-white font-bold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Headphones className="w-3.5 h-3.5 shrink-0" />
                    <span>نصوص الاستماع (3 نصوص)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">ص 149</span>
                </button>

                <button
                  onClick={() => handleLessonPick('spelling', 'spelling-all')}
                  className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                    currentCategory === 'spelling'
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PenTool className="w-3.5 h-3.5 shrink-0" />
                    <span>قواعد الإملاء والرسم</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">ص 25-134</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 6 & 7: بنك الأسئلة وفحص الجودة */}
          <div className="pt-4 border-t border-slate-100 space-y-1.5">
            <button
              onClick={() => handleLessonPick('final_review', 'review')}
              className={`w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                currentCategory === 'final_review'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 border border-amber-200/60'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                <Award className="w-4 h-4 text-amber-600" />
                <span>بنك الأسئلة الشامل (68 سؤالاً)</span>
              </div>
              <span className="text-[10px] font-bold">امتحانات</span>
            </button>

            <button
              onClick={() => handleLessonPick('audit', 'audit')}
              className={`w-full text-right p-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                currentCategory === 'audit'
                  ? 'bg-emerald-600 text-white font-black shadow-md'
                  : 'bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 border border-emerald-200/60'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>قائمة فحص الجودة والتغطية (100%)</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
