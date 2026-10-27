import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Gauge } from 'lucide-react';
import { speechEngine, SpeechStatus } from '../utils/speechEngine';

interface AudioBarProps {
  fullText: string;
  title: string;
  activeSentence: string;
}

export const AudioBar: React.FC<AudioBarProps> = ({ fullText, title, activeSentence }) => {
  const [status, setStatus] = useState<SpeechStatus>('stopped');
  const [speed, setSpeed] = useState<number>(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  useEffect(() => {
    speechEngine.setCallbacks({
      onStatusChange: (newStatus) => setStatus(newStatus),
      onError: (msg) => console.warn(msg),
    });

    return () => {
      speechEngine.stop();
    };
  }, []);

  const handlePlayToggle = () => {
    if (status === 'stopped') {
      speechEngine.startReading(fullText);
    } else {
      speechEngine.togglePlayPause();
    }
  };

  const handleReplay = () => {
    speechEngine.startReading(fullText, 0);
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    speechEngine.setSpeed(newSpeed);
    setShowSpeedMenu(false);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-2xl p-4 shadow-lg border border-emerald-700/50 my-6 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Title and Voice Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 font-medium">
                تلاوة صوتية باللغة العربية الفصحى
              </span>
              {status === 'playing' && (
                <span className="flex items-center gap-1 text-xs text-emerald-300 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  جارٍ القراءة الآن...
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-100 text-sm sm:text-base mt-1 line-clamp-1">
              استمع إلى قراءة: {title}
            </h4>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          {/* Replay Button */}
          <button
            onClick={handleReplay}
            title="إعادة القراءة من البداية"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayToggle}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
              status === 'playing'
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950'
            }`}
          >
            {status === 'playing' ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>إيقاف مؤقت</span>
              </>
            ) : status === 'paused' ? (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>استئناف</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>تشغيل القراءة الصوتية</span>
              </>
            )}
          </button>

          {/* Speed Selector */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
              title="سرعة القراءة"
            >
              <Gauge className="w-4 h-4" />
              <span>{speed}x</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute left-0 sm:right-0 mt-2 w-28 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-30">
                {[0.75, 1.0, 1.25, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => changeSpeed(s)}
                    className={`w-full text-right px-3 py-1.5 text-xs font-medium transition-colors hover:bg-emerald-600 hover:text-white ${
                      speed === s ? 'text-emerald-400 font-bold bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    سرعة {s}x {s === 1.0 && '(عادية)'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Sentence Highlight Preview */}
      {status !== 'stopped' && activeSentence && (
        <div className="mt-3 pt-3 border-t border-emerald-700/40 text-xs sm:text-sm text-emerald-100 flex items-start gap-2 bg-emerald-950/40 p-2.5 rounded-xl">
          <span className="text-emerald-400 font-bold shrink-0">الجملة المقروءة:</span>
          <span className="font-semibold text-white animate-fade-in">«{activeSentence}»</span>
        </div>
      )}
    </div>
  );
};
