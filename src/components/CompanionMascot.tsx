import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCw, Smile, MessageCircle } from 'lucide-react';
import { speechEngine } from '../utils/speechEngine';
import { soundEffects } from '../utils/soundEffects';

interface CompanionMascotProps {
  mode?: 'hero' | 'floating';
  customSpeech?: string;
  autoGreet?: boolean;
  onSpinEnd?: () => void;
}

export const CompanionMascot: React.FC<CompanionMascotProps> = ({
  mode = 'hero',
  customSpeech,
  autoGreet = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  // The official welcome text requested by user
  const welcomeText = customSpeech || "أهلاً بكم يا أصدقائي في منصة لغتي الخالدة للصف الثاني الإعدادي! هيا بنا نتعلم ونمرح ونكتشف أسرار لغتنا الجميلة!";

  const mascotImagePath = "/src/assets/images/companion_faseeh_mascot_1793038658895.jpg";

  // Trigger spinning entrance and welcome voice
  const triggerEntrance = (speak: boolean = true) => {
    setIsSpinning(true);
    soundEffects.playSpinWhoosh();

    setTimeout(() => {
      setIsSpinning(false);
      if (speak) {
        handleSpeak();
      }
    }, 900);
  };

  useEffect(() => {
    if (mode === 'hero' && !hasGreeted) {
      setHasGreeted(true);
      // Run the spinning entrance on load
      triggerEntrance(autoGreet);
    }
  }, [mode, autoGreet, hasGreeted]);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speechEngine.speakQuickPhrase(welcomeText, () => {
      setIsSpeaking(false);
    });
  };

  const handleStopSpeech = () => {
    speechEngine.stop();
    setIsSpeaking(false);
  };

  // FLOATING COMPANION MODE (Used in lesson views)
  if (mode === 'floating') {
    return (
      <aside aria-label="المرشد التفاعلي فصيح" className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 select-none">
        {isExpanded && (
          <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-emerald-100 max-w-xs transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>المرشد "فصيح"</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-slate-600 text-xs px-1 rounded-md"
                title="إخفاء مؤقت"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {welcomeText}
            </p>
            <div className="mt-2.5 flex items-center justify-between gap-2 pt-1.5">
              <button
                onClick={isSpeaking ? handleStopSpeech : handleSpeak}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>إيقاف الصوت</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استمع إلى فصيح</span>
                  </>
                )}
              </button>
              <button
                onClick={() => triggerEntrance(false)}
                className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                title="حركة بهلوانية"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Mascot Avatar Orb */}
        <div className="relative group">
          <button
            onClick={() => {
              if (!isExpanded) setIsExpanded(true);
              else handleSpeak();
            }}
            className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/20 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
              isSpinning ? 'animate-[spin_0.8s_cubic-bezier(0.34,1.56,0.64,1)]' : 'animate-[bounce_3s_infinite]'
            }`}
            title="المرشد الذكي فصيح - اضغط للتحدث"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white relative flex items-center justify-center">
              {imageLoaded ? (
                <img
                  src={mascotImagePath}
                  alt="المرشد الكرتوني فصيح"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Smile className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Speaking Wave Glow */}
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-white items-center justify-center">
                  ♪
                </span>
              </span>
            )}
          </button>
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute -top-2 -left-2 bg-slate-900 text-white rounded-full p-1 shadow-md hover:bg-slate-800"
              title="إظهار الرسالة"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>
    );
  }

  // HERO CENTER MODE (Home Screen Main Attraction)
  return (
    <div className="relative flex flex-col items-center justify-center py-4 my-2 select-none">
      {/* Background Magic Flashes & Sunburst Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Ambient radial glow */}
        <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-amber-200/40 via-emerald-200/30 to-teal-200/40 blur-3xl" />

        {/* Rotating Flashes & Sunburst Rays */}
        <div
          className={`absolute w-80 sm:w-[480px] h-80 sm:h-[480px] opacity-40 transition-opacity duration-700 ${
            isSpinning ? 'opacity-90 scale-125' : 'opacity-35'
          } animate-[spin_25s_linear_infinite]`}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400/40">
            <path
              fill="currentColor"
              d="M100 0 L108 85 L190 50 L115 100 L190 150 L108 115 L100 200 L92 115 L10 150 L85 100 L10 50 L92 85 Z"
            />
          </svg>
        </div>

        {/* Dynamic Light Flash Bursts */}
        {isSpinning && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] animate-pulse rounded-full pointer-events-none" />
        )}
      </div>

      {/* Mascot Card & Character Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Diacritics & Sparkles Orbit */}
        <div className="absolute -top-6 -right-6 text-amber-500 animate-bounce delay-100 pointer-events-none">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute top-12 -left-8 text-emerald-500 animate-pulse pointer-events-none text-xl font-bold font-serif">
          ضَ
        </div>
        <div className="absolute bottom-16 -right-10 text-teal-600 animate-pulse pointer-events-none text-xl font-bold font-serif">
          فَصِيحْ
        </div>

        {/* The 3D Spinning Character Orb */}
        <div className="relative group cursor-pointer" onClick={() => triggerEntrance(true)}>
          {/* Glowing Aura Ring */}
          <div
            className={`absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500 ${
              isSpinning ? 'animate-spin scale-110 opacity-100' : 'animate-pulse'
            }`}
          />

          {/* Main Mascot Viewport */}
          <div
            className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-b from-white via-slate-50 to-emerald-50 shadow-2xl border-4 border-white transition-all duration-700 ${
              isSpinning
                ? 'scale-105 rotate-[720deg] brightness-125 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
                : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-amber-50 to-emerald-50 shadow-inner flex items-center justify-center relative">
              {imageLoaded ? (
                <img
                  src={mascotImagePath}
                  alt="فصيح - مرشدك الذكي في لغتي الخالدة"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                  className="w-full h-full object-cover object-top filter contrast-105 hover:contrast-110 transition-all"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-4 text-center">
                  <Smile className="w-16 h-16 mb-2" />
                  <span className="text-base font-black">فَصِيحْ</span>
                  <span className="text-[10px] text-emerald-100">بطل اللغة العربية</span>
                </div>
              )}

              {/* Spin overlay flash */}
              {isSpinning && (
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 to-white/60 animate-ping rounded-full pointer-events-none" />
              )}
            </div>

            {/* Speaking audio badge */}
            {isSpeaking && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span>يتحدث الآن...</span>
              </div>
            )}
          </div>
        </div>

        {/* Character Title / Role Tag */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-black tracking-wide text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            صديقك ومرشدك: فصيح
          </span>
          <button
            onClick={() => triggerEntrance(true)}
            className="text-xs text-slate-500 hover:text-amber-600 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
            title="إعادة التدوير والترحيب"
          >
            <RotateCw className="w-3 h-3" />
            <span>لف فصيح</span>
          </button>
        </div>

        {/* Speech Bubble with Welcome Message */}
        <div className="relative mt-4 max-w-lg w-full px-4">
          <div className="relative bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/80 text-center">
            {/* Top Bubble Arrow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t border-l border-slate-200/80 rotate-45 transform" />

            {/* Welcome Dialogue */}
            <p className="relative z-10 text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
              "{welcomeText}"
            </p>

            {/* Audio Interaction Bar */}
            <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={isSpeaking ? handleStopSpeech : handleSpeak}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>إيقاف صوت فصيح</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>استمع إلى ترحيب فصيح 🔊</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccessChime();
                  speechEngine.speakPraise(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>تشجيع فصيح ("أحسنت!")</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
