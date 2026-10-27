import React from 'react';
import { 
  BookOpen, 
  Feather, 
  Layers, 
  Trophy, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Headphones, 
  PenTool, 
  FileCheck 
} from 'lucide-react';
import { CompanionMascot } from './CompanionMascot';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import { soundEffects } from '../utils/soundEffects';

interface HomeScreenProps {
  onNavigate: (category: string, lessonId?: string) => void;
  completedLessonIds: string[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  completedLessonIds,
}) => {
  // Lesson counts
  const readingCount = readingLessons.length; // 6
  const literatureCount = literaryTexts.length; // 3
  const grammarCount = grammarLessons.length; // 6
  const totalLessons = readingCount + literatureCount + grammarCount; // 15

  // Completed counts per module
  const completedReading = readingLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const completedLiterature = literaryTexts.filter((t) => completedLessonIds.includes(t.id)).length;
  const completedGrammar = grammarLessons.filter((g) => completedLessonIds.includes(g.id)).length;
  const totalCompleted = completedLessonIds.length;

  // Gamification: XP & Level Calculation
  const xp = totalCompleted * 150 + 200; // Base XP
  const level = Math.floor(xp / 400) + 1;
  const levelTitle =
    level === 1
      ? 'مستكشف الحروف'
      : level === 2
      ? 'فارس المعاني'
      : level === 3
      ? 'أمير البيان'
      : 'علامة اللغة العربية';

  const handleCardClick = (category: string, defaultId?: string) => {
    soundEffects.playClick();
    onNavigate(category, defaultId);
  };

  return (
    <div className="space-y-10 pb-12 select-none">
      {/* 1. HERO MASCOT SECTION WITH SPINNING FLASHES & WELCOME */}
      <section className="text-center">
        {/* The Animated Cartoon Character */}
        <CompanionMascot
          mode="hero"
          autoGreet={false} // Will play when clicked or with whoosh on mount
        />
      </section>

      {/* 2. PLAYER XP & PROGRESS BAR */}
      <section className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-300 font-bold">المستوى {level}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium">{levelTitle}</span>
              </div>
              <h3 className="text-lg font-black tracking-tight">
                رصيد خبرتك: <span className="text-amber-400 tabular-nums">{xp}</span> نقطة تفوق
              </h3>
            </div>
          </div>

          <div className="w-full sm:w-64 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span>إنجاز المنهج المعتمد</span>
              <span className="font-bold text-amber-400 tabular-nums">
                {Math.round((totalCompleted / totalLessons) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(8, Math.round((totalCompleted / totalLessons) * 100))}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 text-left">
              {totalCompleted} من أصل {totalLessons} درساً مكتملاً
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 4 MAIN REQUESTED BUTTONS / MODULE CARDS */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            أقسام المنهج الرئيسية الأربعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            اختر البوابة التعليمية وابدأ التعلم والمرح
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            جميع الدروس والنصوص والقواعد مستخرجة بدقة كاملة من كتاب وزارة التربية والتعليم للصف الثاني الإعدادي.
          </p>
        </div>

        {/* 4 Primary Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BUTTON 1: القراءة */}
          <div
            onClick={() => handleCardClick('reading', readingLessons[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/50 rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 hover:border-emerald-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Accent Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{completedReading} / {readingCount} مكتمل</span>
                </span>
                <div className="text-[11px] text-slate-400 mt-1 font-bold">الوحدات 1، 2، 3</div>
              </div>
            </div>

            {/* Card Content */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-emerald-600">البوابة الأولى</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                ١. القراءة والفهم القرائي
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                6 دروس قراءة مشوقة متكاملة: كبرياء طفل، لو أنني ضابط شرطة، نصر أكتوبر العظيم، عالم من ذهب، لغة خالدة، وثمرات العمل.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600 font-semibold">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">معاني المفردات</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">تلاوة صوتية طبيعية</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">أنشطة الوزارة</span>
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-black text-emerald-700 group-hover:underline">
                ادخل إلى عالم القراءة
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* BUTTON 2: النصوص */}
          <div
            onClick={() => handleCardClick('literature', literaryTexts[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50/50 rounded-3xl p-6 sm:p-7 border-2 border-amber-100 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Accent Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30 group-hover:scale-110 transition-transform duration-300">
                <Feather className="w-8 h-8" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>{completedLiterature} / {literatureCount} مكتمل</span>
                </span>
                <div className="text-[11px] text-slate-400 mt-1 font-bold">شعر وتذوق أدبي</div>
              </div>
            </div>

            {/* Card Content */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-amber-600">البوابة الثانية</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                ٢. النصوص الأدبية والبلاغة
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                3 روائع شعرية وبلاغية: قصيدة "مصر التي في خاطري"، قصيدة "ريفنا المصري"، وقصيدة "الكد سبيل المعالي" مع الشرح ومظاهر الجمال.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600 font-semibold">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">الأبيات الشعرية كاملة</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">مظاهر الجمال البلاغية</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">تراجم الشعراء</span>
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-black text-amber-700 group-hover:underline">
                استكشف كنوز النصوص
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* BUTTON 3: النحو */}
          <div
            onClick={() => handleCardClick('grammar', grammarLessons[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 rounded-3xl p-6 sm:p-7 border-2 border-indigo-100 hover:border-indigo-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Accent Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-8 h-8" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-black text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{completedGrammar} / {grammarCount} مكتمل</span>
                </span>
                <div className="text-[11px] text-slate-400 mt-1 font-bold">قواعد وإعراب كامل</div>
              </div>
            </div>

            {/* Card Content */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-indigo-600">البوابة الثالثة</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-800 transition-colors">
                ٣. قواعد النحو والإعراب
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                6 وحدات نحوية عميقة: المعرب والمبني من الأسماء والأفعال والضمائر، أدوات الشرط الجازمة وغير الجازمة، وجداول إعراب نموذجية.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600 font-semibold">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">نماذج إعراب تفصيلية</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">قواعد ملخصة</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">تدريبات تطبيقية</span>
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-black text-indigo-700 group-hover:underline">
                تحدَّ قواعد النحو
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* BUTTON 4: امتحان شامل */}
          <div
            onClick={() => handleCardClick('final_review', 'review')}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-rose-50/50 rounded-3xl p-6 sm:p-7 border-2 border-rose-100 hover:border-rose-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Accent Icon & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-black text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>تحدي التميز والدرجة النهائية</span>
                </span>
                <div className="text-[11px] text-slate-400 mt-1 font-bold">تقييم فوري ونقاط XP</div>
              </div>
            </div>

            {/* Card Content */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-rose-600">البوابة الرابعة</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-800 transition-colors">
                ٤. امتحان شامل وبنك الأسئلة
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                اختبار تفاعلي شامل يغطي جميع فروع المنهج: قراءة، نصوص، ونحو، مع تصحيح ذكي فوري وتشجيع مباشر من صديقنا "فصيح".
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600 font-semibold">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">أسئلة اختيار من متعدد</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">إعراب عملي فوري</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">مكافآت احتفالية</span>
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-black text-rose-700 group-hover:underline">
                ابدأ الامتحان الشامل الآن
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPLEMENTARY WORKSHOPS (Listening, Spelling & Audit) */}
      <section className="max-w-5xl mx-auto pt-4">
        <div className="bg-slate-100/80 rounded-3xl p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-800">ورش العمل والمهارات الإضافية بالكتاب المدرسي</h4>
              <p className="text-xs text-slate-500">نصوص الاستماع وقواعد الإملاء المعتمدة وفحص دقة المنهج 162 صفحة</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleCardClick('listening', 'listening-amna')}
              className="p-3.5 bg-white hover:bg-sky-50 rounded-2xl border border-slate-200 hover:border-sky-300 text-right transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-sky-800">نصوص الاستماع (3)</div>
                <div className="text-[11px] text-slate-500">آمنة دهشان وأقدم وديعة</div>
              </div>
            </button>

            <button
              onClick={() => handleCardClick('spelling', 'spelling-hamza')}
              className="p-3.5 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 text-right transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">قواعد الإملاء (2)</div>
                <div className="text-[11px] text-slate-500">الهمزة المتوسطة والمتطرفة</div>
              </div>
            </button>

            <button
              onClick={() => handleCardClick('audit', 'audit')}
              className="p-3.5 bg-white hover:bg-indigo-50 rounded-2xl border border-slate-200 hover:border-indigo-300 text-right transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-800">فحص الجودة 100%</div>
                <div className="text-[11px] text-slate-500">مطابقة 162 صفحة كاملة</div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
