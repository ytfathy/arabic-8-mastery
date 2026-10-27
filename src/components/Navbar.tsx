import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Menu, Home, Volume2, VolumeX, Download } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';


interface NavbarProps {
  completedCount: number;
  totalLessons: number;
  onToggleSidebar: () => void;
  onGoHome: () => void;
  onOpenAudit: () => void;
  onOpenReview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalLessons,
  onToggleSidebar,
  onGoHome,
  onOpenAudit,
  onOpenReview,
}) => {
  const [isMuted, setIsMuted] = useState(soundEffects.getIsMuted());
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleToggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Right Section: Mobile Toggle & App Branding (Clickable Home) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="القائمة"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group select-none"
            title="العودة إلى الصفحة الرئيسية وشخصية فصيح"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  الفصل الدراسي الأول
                </span>
                <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                  الكتاب الوزاري المعتمد (162 ص)
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                منصة لغتي الخالدة • الصف الثاني الإعدادي
              </h1>
            </div>
          </div>
        </div>

        {/* Center / Left Section: Progress, Home, Sound & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Home Button */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer"
            title="الصفحة الرئيسية"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">الرئيسية</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Progress Tracker */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              {progressPercent}%
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-700">إنجاز المنهج</div>
              <div className="text-[10px] text-slate-500">
                {completedCount} من {totalLessons} درساً
              </div>
            </div>
          </div>

          {/* Quick Review Button */}
          <button
            onClick={onOpenReview}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>امتحان شامل</span>
          </button>

          {/* Quality Audit Button */}
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">فحص الجودة</span>
            <span className="sm:hidden">100%</span>
          </button>
        </div>
      </div>
    </header>
  );
};
