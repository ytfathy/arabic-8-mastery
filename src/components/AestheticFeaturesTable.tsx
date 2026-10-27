import React from 'react';
import { AestheticFeature } from '../types/curriculum';
import { Sparkles, Palette } from 'lucide-react';

interface AestheticFeaturesTableProps {
  features: AestheticFeature[];
  textTitle: string;
}

export const AestheticFeaturesTable: React.FC<AestheticFeaturesTableProps> = ({
  features,
  textTitle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 my-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">مظاهر الجمال والتعبيرات البلاغية</h3>
          <p className="text-xs text-slate-500">
            تحليل الجماليات والصور والأساليب المقررة في الكتاب المدرسي لـ: {textTitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white hover:border-purple-300 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Badge & Target Text */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  {f.deviceType}
                </span>
                {f.isTextbookExplicit && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                    مقرر نصّاً في الكتاب
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2 font-amiri text-lg">
                «{f.targetText}»
              </h4>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <span className="font-bold text-slate-700">الشرح البلاغي: </span>
                {f.explanation}
              </p>

              {f.literaryEffect && (
                <p className="text-xs text-indigo-700 mb-3 font-medium bg-indigo-50/60 p-2 rounded-lg">
                  <span className="font-bold text-indigo-900">الأثر في المعنى: </span>
                  {f.literaryEffect}
                </p>
              )}
            </div>

            {/* Exam Model Answer Box */}
            <div className="mt-3 pt-3 border-t border-slate-100 bg-purple-50/40 p-2.5 rounded-lg border border-purple-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>إجابة الامتحان النموذجية:</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                {f.examModelAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
