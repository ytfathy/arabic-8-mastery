/**
 * Audio Speech Engine for Arabic Learning Platform
 * Supports natural Arabic pronunciation, speed adjustment, pause/resume, replay,
 * and real-time sentence highlighting.
 */

export type SpeechStatus = 'stopped' | 'playing' | 'paused' | 'loading';

export interface SpeechCallbacks {
  onStatusChange?: (status: SpeechStatus) => void;
  onSentenceChange?: (sentenceIndex: number, text: string) => void;
  onError?: (errorMsg: string) => void;
}

class ArabicSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private sentences: string[] = [];
  private currentSentenceIdx = 0;
  private rate = 1.0;
  private status: SpeechStatus = 'stopped';
  private callbacks: SpeechCallbacks = {};
  private arabicVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural Arabic voices
    this.arabicVoice =
      voices.find(v => v.lang.startsWith('ar') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Maged') || v.name.includes('Tarik'))) ||
      voices.find(v => v.lang.startsWith('ar')) ||
      null;
  }

  public setCallbacks(callbacks: SpeechCallbacks) {
    this.callbacks = callbacks;
  }

  public setSpeed(newRate: number) {
    this.rate = newRate;
    if (this.status === 'playing') {
      // Re-trigger from current sentence with new rate
      const currentIdx = this.currentSentenceIdx;
      this.stop();
      this.playSentenceAt(currentIdx);
    }
  }

  public getSpeed(): number {
    return this.rate;
  }

  public getStatus(): SpeechStatus {
    return this.status;
  }

  public getCurrentSentenceIndex(): number {
    return this.currentSentenceIdx;
  }

  /**
   * Split text into clean educational Arabic sentences
   */
  public prepareText(fullText: string): string[] {
    if (!fullText) return [];
    // Split by punctuation marks common in Arabic: . ! ؟ ، : \n
    const raw = fullText.split(/(?<=[.!?؟\n])\s+/g);
    this.sentences = raw.map(s => s.trim()).filter(s => s.length > 0);
    return this.sentences;
  }

  public startReading(fullText: string, startIndex = 0) {
    if (!this.synth) {
      this.callbacks.onError?.('عذراً، محرك النطق الصوتي غير مدعوم في هذا المتصفح.');
      return;
    }
    this.stop();
    this.prepareText(fullText);
    if (this.sentences.length === 0) return;
    this.playSentenceAt(startIndex);
  }

  private playSentenceAt(index: number) {
    if (!this.synth || index >= this.sentences.length) {
      this.setStatus('stopped');
      this.callbacks.onSentenceChange?.(-1, '');
      return;
    }

    this.currentSentenceIdx = index;
    const sentence = this.sentences[index];
    this.callbacks.onSentenceChange?.(index, sentence);
    this.setStatus('playing');

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'ar-SA';
    utterance.rate = this.rate;
    utterance.pitch = 1.0;

    if (this.arabicVoice) {
      utterance.voice = this.arabicVoice;
    }

    utterance.onend = () => {
      if (this.status === 'playing') {
        // Proceed to next sentence
        this.playSentenceAt(index + 1);
      }
    };

    utterance.onerror = (e) => {
      // Ignore user-cancelled errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech error:', e);
        this.callbacks.onError?.('حدث خطأ أثناء تشغيل الصوت.');
        this.setStatus('stopped');
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.status === 'playing') {
      this.synth.pause();
      this.setStatus('paused');
    }
  }

  public resume() {
    if (this.synth && this.status === 'paused') {
      this.synth.resume();
      this.setStatus('playing');
    } else if (this.status === 'stopped' && this.sentences.length > 0) {
      this.playSentenceAt(this.currentSentenceIdx);
    }
  }

  public togglePlayPause() {
    if (this.status === 'playing') {
      this.pause();
    } else if (this.status === 'paused') {
      this.resume();
    } else {
      this.playSentenceAt(this.currentSentenceIdx);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.setStatus('stopped');
    this.currentUtterance = null;
    this.currentSentenceIdx = 0;
  }

  public replay() {
    this.stop();
    this.playSentenceAt(0);
  }

  /**
   * Speak arbitrary text via Arabic synthesizer (one-shot for companion)
   */
  public speakQuickPhrase(text: string, onEnd?: () => void) {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.05;
      utterance.pitch = 1.15; // slightly higher pitch for animated young cartoon character
      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }
      if (onEnd) {
        utterance.onend = () => onEnd();
      }
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Companion speech error:', e);
    }
  }

  /**
   * Home Screen welcome greeting by companion "فصيح"
   */
  public speakCompanionWelcome(onEnd?: () => void) {
    const welcome = "أهلاً بكم يا أصدقائي في منصة لغتي الخالدة للصف الثاني الإعدادي! هيا بنا نتعلم ونمرح ونكتشف أسرار لغتنا الجميلة!";
    this.speakQuickPhrase(welcome, onEnd);
  }

  /**
   * Praise on correct answer or gentle encouragement on incorrect answer
   */
  public speakPraise(isCorrect: boolean, onEnd?: () => void) {
    const correctPhrases = [
      "أحسنت يا بطل! إجابة رائعة وممتازة!",
      "ممتاز جداً! استمر في التألق والنجاح!",
      "بطل اللغة العربية! إجابة دقيقة وصحيحة!",
      "أحسنت! إجابتك متقنة وذكية!",
      "رائع! نقطة جديدة تضاف إلى رصيدك يا عبقري!",
    ];

    const encouragementPhrases = [
      "حاول مرة أخرى يا بطل، أنت قادر على ذلك!",
      "لا بأس يا صديقي، الخطوة الأولى للتعلم هي المحاولة، فكر مجدداً!",
      "اقتربت كثيراً! راجع القاعدة وجرب مرة ثانية!",
    ];

    const pool = isCorrect ? correctPhrases : encouragementPhrases;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    this.speakQuickPhrase(chosen, onEnd);
  }

  private setStatus(newStatus: SpeechStatus) {
    this.status = newStatus;
    this.callbacks.onStatusChange?.(newStatus);
  }
}

export const speechEngine = new ArabicSpeechEngine();

