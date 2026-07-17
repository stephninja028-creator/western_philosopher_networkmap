import { useState, useMemo, useEffect, FormEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { philosophyData } from './data/philosophyData';
import { easternPhilosophyData } from './data/easternPhilosophyData';
import { Epoch, Philosopher, getPhilosopherPedigree } from './types';
import { LineageDiagram } from './components/LineageDiagram';
import { SymposiumPanel } from './components/SymposiumPanel';
import { GreekMeander, GreekPillar, GreekPediment } from './components/GreekBorders';
import { BookOpen, HelpCircle, Star, Users, ArrowLeft, Quote, Landmark, Milestone, Calendar, Copy, Check, Sparkles, Languages, Music, Mail, Play, Pause, Scroll, Swords, MessageSquare } from 'lucide-react';
import { schoolTranslations, schoolLabelTranslations, epochTranslations, philosopherFallbackTranslations, translateEraDisp, conceptTranslations } from './data/translationsEng';
import { PaymentModal } from './components/PaymentModal';
import { SoulChatTerminal } from './components/SoulChatTerminal';
import { MultilateralSymposium } from './components/MultilateralSymposium';

// Background MP3 Music Tracker for Ambient Study
let bgAudio: HTMLAudioElement | null = null;
let audioCtx: any = null;
let studyTrackTimer: any = null;

const startSynthFallback = () => {
  try {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const playBeats = () => {
      if (!audioCtx || audioCtx.state === 'closed') return;
      const now = audioCtx.currentTime;
      
      // Soft ambient chord/pad base root drone
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      const rootHertz = 110.0; // A2 note
      osc1.frequency.setValueAtTime(rootHertz, now);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.012, now + 1.5);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
      
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 6.0);

      // Fifth note E3 to enrich the low drone
      const oscDrone5 = audioCtx.createOscillator();
      const gainDrone5 = audioCtx.createGain();
      oscDrone5.type = 'sine';
      oscDrone5.frequency.setValueAtTime(rootHertz * 1.5, now + 0.5);
      gainDrone5.gain.setValueAtTime(0, now);
      gainDrone5.gain.linearRampToValueAtTime(0.006, now + 2.0);
      gainDrone5.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
      oscDrone5.connect(gainDrone5);
      gainDrone5.connect(audioCtx.destination);
      oscDrone5.start(now + 0.5);
      oscDrone5.stop(now + 6.0);

      // High gentle Greek Chimes / Lyre (Pentatonic A4, B4, C#5, E5, F#5, A5)
      const pentatonic = [440.0, 493.88, 554.37, 659.25, 739.99, 880.0];
      const noteFreq1 = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const noteFreq2 = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      
      const oscNote1 = audioCtx.createOscillator();
      const gainNote1 = audioCtx.createGain();
      oscNote1.type = 'sine';
      oscNote1.frequency.setValueAtTime(noteFreq1, now + 0.2);
      gainNote1.gain.setValueAtTime(0, now + 0.2);
      gainNote1.gain.linearRampToValueAtTime(0.018, now + 0.4);
      gainNote1.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
      oscNote1.connect(gainNote1);
      gainNote1.connect(audioCtx.destination);
      oscNote1.start(now + 0.2);
      oscNote1.stop(now + 3.8);

      const oscNote2 = audioCtx.createOscillator();
      const gainNote2 = audioCtx.createGain();
      oscNote2.type = 'sine';
      oscNote2.frequency.setValueAtTime(noteFreq2, now + 0.8);
      gainNote2.gain.setValueAtTime(0, now + 0.8);
      gainNote2.gain.linearRampToValueAtTime(0.012, now + 1.0);
      gainNote2.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
      oscNote2.connect(gainNote2);
      gainNote2.connect(audioCtx.destination);
      oscNote2.start(now + 0.8);
      oscNote2.stop(now + 4.2);
    };

    if (!studyTrackTimer) {
      playBeats();
      studyTrackTimer = setInterval(playBeats, 4500);
    }
  } catch (err) {
    console.warn("Soft synthesizer playback failed", err);
  }
};

const stopSynthFallback = () => {
  if (studyTrackTimer) {
    clearInterval(studyTrackTimer);
    studyTrackTimer = null;
  }
};

const startStudyMusic = () => {
  try {
    // If bgAudio already exists but its source is not the new Debussy track, stop and recreate it
    if (bgAudio && !bgAudio.src.includes('debussy.mp3')) {
      try {
        bgAudio.pause();
      } catch (e) {}
      bgAudio = null;
    }

    if (!bgAudio) {
      // Use a cache-busting version query (?v=2) to guarantee the browser pulls the fresh audio file immediately
      bgAudio = new Audio('/assets/debussy.mp3?v=2');
      bgAudio.loop = true;
      bgAudio.volume = 0.28; // Soft classical volume
      bgAudio.addEventListener('error', () => {
        console.warn("Background audio stream load failed. Activating Greek procedural ambient synthesizer fallback.");
        startSynthFallback();
      });
    }
    bgAudio.play().catch(err => {
      console.warn("Background music play stalled (interaction missing). Activating responsive procedural synthesizer fallback.");
      startSynthFallback();
    });
  } catch (err) {
    console.warn("Background audio context setup failed. Trying synthesizer fallback.", err);
    startSynthFallback();
  }
};

const stopStudyMusic = () => {
  try {
    if (bgAudio) {
      bgAudio.pause();
    }
  } catch (err) {
    console.warn("Failed to pause background stream:", err);
  }
  stopSynthFallback();
};

const isLocalFallbackComplete = (id: string): boolean => {
  const fb: any = philosopherFallbackTranslations[id];
  if (!fb) return false;
  return !!(fb.details && fb.worldviewSummary && fb.lifeAndTimes);
};

function getCleanEnglishFallback(p: Philosopher): {
  details: string;
  worldviewSummary: string;
  lifeAndTimes: string;
  quote: string;
  concepts: string[];
  comparisons: any[];
} {
  const id = p.id;
  const fallbackObj = (philosopherFallbackTranslations[id] || {}) as any;
  const schoolEn = schoolTranslations[p.school] || p.school;
  const eraEn = translateEraDisp(p.eraDisp);
  const conceptsEn = p.concepts.map(c => conceptTranslations[c] || c);

  const details = fallbackObj.details || 
    `${p.nameEng} was an influential philosopher of the ${schoolEn} school active during the ${eraEn}. ${p.details ? "They made significant contributions to classical Western philosophy." : ""}`;

  const worldviewSummary = fallbackObj.worldviewSummary || 
    `${p.nameEng}'s philosophical worldview centers on their core doctrine and tenets. Belonging to the ${schoolEn} school, they formulated a distinct system of thought that sought to address the fundamental nature of reality, knowledge, and existence, leaving a lasting legacy on the development of subsequent intellectual lineages.`;

  const lifeAndTimes = fallbackObj.lifeAndTimes || 
    `Born and active in the ${eraEn} era, ${p.nameEng} developed their doctrines amidst the shifting cultural and political landscapes of their time. As a key representative of the ${schoolEn} school, their life and teachings responded directly to the intellectual challenges of their contemporaries, shaping the academic pathways of Western thought.`;

  const quote = fallbackObj.quote || p.quote || "";
  const concepts = fallbackObj.concepts || conceptsEn;

  const comparisons = p.comparisons?.map((comp, idx) => {
    const fbComp = fallbackObj.comparisons?.[idx];
    const withNameEn = 'withName' in comp ? comp.withName : comp.withPhilosopher;
    return {
      withName: withNameEn,
      coreDifference: fbComp?.coreDifference || 
        `While ${p.nameEng} formulated their system within the framework of the ${schoolEn} school, ${withNameEn} offered a contrasting methodology, leading to a profound debate on the fundamental tenets of their respective doctrines.`,
      reflectionPrompt: fbComp?.reflectionPrompt || 
        `When evaluating the arguments of both ${p.nameEng} and ${withNameEn}, which conceptual framework provides a more coherent explanation of reality and human experience?`
    };
  }) || [];

  return {
    details,
    worldviewSummary,
    lifeAndTimes,
    quote,
    concepts,
    comparisons
  };
}

function getPhilosopherWorks(id: string, language: 'zh' | 'en' = 'zh'): string[] {
  if (language === 'en') {
    const worksMapEng: Record<string, string[]> = {
      thales: ['On the Principle', 'Guide to Astronomy'],
      pythagoras: ['Golden Verses', 'On Nature'],
      heraclitus: ['On Nature / Fragments'],
      parmenides: ['On Nature'],
      protagoras: ['On Truth', 'On the Gods'],
      socrates: ['No written books (Preached oral dialogues recorded by Plato)'],
      plato: ['Republic', 'Phaedo', 'Symposium', 'Parmenides'],
      aristotle: ['Metaphysics', 'Nicomachean Ethics', 'Politics', 'Organon'],
      epicurus: ['On Nature', 'Letter to Menoeceus'],
      marx: ['Das Kapital', 'The Communist Manifesto', 'Theses on Feuerbach'],
      nietzche: ['Thus Spoke Zarathustra', 'The Will to Power', 'The Birth of Tragedy', 'Beyond Good and Evil'],
      nietzsche: ['Thus Spoke Zarathustra', 'The Will to Power', 'The Birth of Tragedy', 'Beyond Good and Evil'],
      kant: ['Critique of Pure Reason', 'Critique of Practical Reason', 'Critique of Judgment'],
      hegel: ['Phenomenology of Spirit', 'Science of Logic', 'Elements of the Philosophy of Right'],
      descartes: ['Meditations on First Philosophy', 'Discourse on the Method', 'Principles of Philosophy'],
      spinoza: ['Ethics', 'Theologico-Political Treatise', 'On the Improvement of the Understanding'],
      locke: ['Two Treatises of Government', 'An Essay Concerning Human Understanding'],
      hume: ['A Treatise of Human Nature', 'An Enquiry Concerning Human Understanding'],
      leibniz: ['Monadology', 'New Essays on Human Understanding'],
      wittgenstein: ['Tractatus Logico-Philosophicus', 'Philosophical Investigations'],
      heidegger: ['Being and Time', 'Woodpaths (Off the Beaten Track)'],
      
      // Eastern Sages works
      laozi: ['Tao Te Ching (The Classic of the Way and Virtue)'],
      confucius: ['The Analects (Lunyu)', 'Spring and Autumn Annals'],
      mozi: ['Mozi'],
      mencius: ['Mencius'],
      zhuangzi: ['Zhuangzi (The Classic of South-Flower)'],
      xunzi: ['Xunzi'],
      han_feizi: ['Han Feizi'],
      sun_tzu: ['The Art of War'],
      dong_zhongshu: ['Luxuriant Dew of the Spring and Autumn Annals (Chunqiu Fanlu)'],
      wang_chong: ['Balanced Discourses (Lunheng)'],
      wang_bi: ['Commentary on Laozi', 'Commentary on Zhouyi'],
      gu_xiang: ['Commentary on Zhuangzi'],
      xuanzang: ['Treatise on the Establishment of Consciousness-Only (Cheng Weishi Lun)', 'Great Tang Records on the Western Regions'],
      huineng: ['The Platform Sutra of the Sixth Patriarch'],
      fazang: ['Treatise on the Golden Lion (Jin Shizi Zhang)', 'Huayan Treatise'],
      zhou_dunyi: ['Explanation of the Diagram of the Supreme Ultimate (Taijitusuo)', 'Tongshu'],
      zhang_zai: ['Correcting Ignorance (Zhengmeng)', 'West Inscription (Ximing)'],
      cheng_yi: ['Commentary on Zhouyi', 'Yishu of the Two Chengs'],
      zhu_xi: ['Collected Commentaries on the Four Books (Sishu Zhangju Jizhu)', 'Explanation of the Taijitu'],
      lu_jiuyuan: ['Complete Works of Master Xiangshan'],
      wang_yangming: ['Instructions for Practical Living (Chuanxilu)', 'Inquiry on the Great Learning'],
      li_zhi: ['A Book to Burn (Fenshu)', 'A Book to Keep (Cangshu)'],
      wang_fuzhi: ['Discourse on Reading the Comprehensive Mirror (Du Tongjian Lun)', 'Discussions on Song Dynasty'],
      huang_zongxi: ['Waiting for the Dawn (Mingyi Daifanglu)', 'Records of Ming Scholars'],
      gu_yanwu: ['Record of Daily Knowledge (Rizhilu)', 'Strategic Atlas of the Empire'],
      hu_shi: ['An Outline of the History of Chinese Philosophy', 'Collection of Trials'],
      xiong_shili: ['New Treatise on Representation-Only (Xin Weishi Lun)', 'Inquiry on Confucianism'],
      feng_youlan: ['A History of Chinese Philosophy', 'Six Books of Zhenyuan']
    };
    return worksMapEng[id] || ['Selected Philosophical Essays and Manuscripts', 'Dialectical Collection of Core Doctrines'];
  }

  const worksMap: Record<string, string[]> = {
    thales: ['《论本原》(ON THE PRINCIPLE)', '《天文学指南》'],
    pythagoras: ['《金言集》(GOLDEN VERSES)', '《自然论》'],
    heraclitus: ['《论自然》(ON NATURE)'],
    parmenides: ['《论自然》(ON NATURE)'],
    protagoras: ['《论真理》(ON TRUTH)', '《论神》'],
    socrates: ['无著作记录 (数千载言述不立，由柏拉图手稿代传)'],
    plato: ['《理想国》(REPUBLIC)', '《斐多篇》(PHAEDO)', '《会饮篇》(SYMPOSIUM)', '《巴门尼德篇》'],
    aristotle: ['《形而上学》(METAPHYSICS)', '《尼各马可伦理学》', '《政治学》', '《工具论》'],
    epicurus: ['《论自然》(ON NATURE)', '《致美诺西斯信》'],
    marx: ['《资本论》(DAS KAPITAL)', '《共产党宣言》(THE COMMUNIST MANIFESTO)', '《关于费尔巴哈的提纲》'],
    nietzche: ['《查拉图斯特拉如是说》(THUS SPOKE ZARATHUSTRA)', '《权力意志》', '《悲剧的诞生》', '《善恶的彼岸》'],
    nietzsche: ['《查拉图斯特拉如是说》(THUS SPOKE ZARATHUSTRA)', '《权力意志》', '《悲剧的诞生》', '《善恶的彼岸》'],
    kant: ['《纯粹理性批判》(CRITIQUE OF PURE REASON)', '《实践理性批判》', '《判断力批判》'],
    hegel: ['《精神现象学》(PHENOMENOLOGY OF SPIRIT)', '《逻辑学》', '《法哲学原理》'],
    descartes: ['《第一哲学沉思集》(MEDITATIONS)', '《谈谈方法》', '《哲学原理》'],
    spinoza: ['《伦理学》(ETHICS)', '《神学政治论》', '《知性改进论》'],
    locke: ['《政府论》(TWO TREATISES OF GOVERNMENT)', '《人类理解论》'],
    hume: ['《人性论》(A TREATISE OF HUMAN NATURE)', '《人类理解研究》'],
    leibniz: ['《单子论》(MONADOLOGY)', '《人类理智新论》'],
    wittgenstein: ['《逻辑哲学论》(TRACTATUS LOGICO-PHILOSOPHICUS)', '《哲学研究》'],
    heidegger: ['《存在与时间》(BEING AND TIME)', '《林中路》'],
    
    // 东方的哲学家著作
    laozi: ['《道德经》(TAO TE CHING)', '《老子注》释篇'],
    confucius: ['《论语》(THE ANALECTS)', '《春秋》(SPRING AND AUTUMN ANNALS)', '《五经》整理'],
    mozi: ['《墨子》(MOZI)', '《墨经》科学篇'],
    mencius: ['《孟子》(MENCIUS)', '《仁政与王道》'],
    zhuangzi: ['《庄子》(ZHUANGZI)', '《内篇·逍遥游》', '《齐物论》'],
    xunzi: ['《荀子》(XUNZI)', '《劝学》', '《性恶》'],
    han_feizi: ['《韩非子》(HAN FEIZI)', '《孤愤》', '《五蠹》'],
    sun_tzu: ['《孙子兵法》(THE ART OF WAR)'],
    dong_zhongshu: ['《春秋繁露》(CHUNQIU FANLU)', '《天人三策》'],
    wang_chong: ['《论衡》(LUNHENG)', '《疾虚妄》'],
    wang_bi: ['《老子注》', '《周易注》', '《论语释疑》'],
    gu_xiang: ['《庄子注》(COMMENTARY ON ZHUANGZI)'],
    xuanzang: ['《成唯识论》(CHENG WEISHI LUN)', '《大唐西域记》'],
    huineng: ['《六祖坛经》(PLATFORM SUTRA)'],
    fazang: ['《华严金狮子章》', '《华严五教章》'],
    zhou_dunyi: ['《太极图说》(TAIJITUSUO)', '《通书》'],
    zhang_zai: ['《正蒙》(ZHENGMENG)', '《西铭》(XIMING)'],
    cheng_yi: ['《周易程氏传》', '《遗书》(二程合集)'],
    zhu_xi: ['《四书章句集注》(SISHU ZHANGJU JIZHU)', '《太极图说解》'],
    lu_jiuyuan: ['《象山先生全集》(COMPLETE WORKS OF MASTER XIANGSHAN)'],
    wang_yangming: ['《传习录》(CHUANXILU)', '《大学问》(DAXUE WEN)'],
    li_zhi: ['《焚书》(FENSHU)', '《藏书》(CANGSHU)'],
    wang_fuzhi: ['《读通鉴论》(DU TONGJIAN LUN)', '《宋论》', '《船山遗书》'],
    huang_zongxi: ['《明夷待访录》(MINGYI DAIFANLU)', '《明儒学案》'],
    gu_yanwu: ['《日知录》(RIZHILU)', '《天下郡国利病书》'],
    hu_shi: ['《中国哲学史大纲》', '《尝试集》', '《实用主义》'],
    xiong_shili: ['《新唯识论》(XIN WEISHI LUN)', '《原儒》'],
    feng_youlan: ['《中国哲学史》(A HISTORY OF CHINESE PHILOSOPHY)', '《贞元六书》']
  };
  return worksMap[id] || ['《哲学论文集与手稿精选》', '《核心命题辩证集》'];
}

export default function App() {
  const [activeRegion, setActiveRegion] = useState<'west' | 'east'>('west');
  const [activeTab, setActiveTab] = useState<'chronology' | 'debate'>('chronology');
  const [activeEpochId, setActiveEpochId] = useState<number>(1);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(() => {
    return philosophyData[0].philosophers.find(p => p.id === 'socrates') || philosophyData[0].philosophers[0];
  });

  const activePhilosophyData = useMemo(() => {
    return activeRegion === 'west' ? philosophyData : easternPhilosophyData;
  }, [activeRegion]);

  // Synchronize selection when switching region
  useEffect(() => {
    if (activeRegion === 'west') {
      const defaultPhilosopher = philosophyData[0].philosophers.find(p => p.id === 'socrates') || philosophyData[0].philosophers[0];
      setSelectedPhilosopher(defaultPhilosopher);
      setActiveEpochId(1);
    } else {
      const defaultPhilosopher = easternPhilosophyData[0].philosophers.find(p => p.id === 'confucius') || easternPhilosophyData[0].philosophers[0];
      setSelectedPhilosopher(defaultPhilosopher);
      setActiveEpochId(11); // Eastern epoch starting ID
    }
  }, [activeRegion]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isSwipeLeft = distance > 70; // Swipe finger left: reveals right pane (East)
    const isSwipeRight = distance < -70; // Swipe finger right: reveals left pane (West)

    if (isSwipeLeft && activeRegion === 'west') {
      setActiveRegion('east');
    } else if (isSwipeRight && activeRegion === 'east') {
      setActiveRegion('west');
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const [hoveredPhilosopherId, setHoveredPhilosopherId] = useState<string | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([1, 2, 3, 4, 5]);

  // Premium Monetization tracker states
  const [dialogueRemaining, setDialogueRemaining] = useState<number>(() => {
    const val = localStorage.getItem('dialogue_remaining');
    return val !== null ? Number(val) : 0; // Starts at 0, since each philosopher now has 3 free chats individually!
  });
  const [debateRemaining, setDebateRemaining] = useState<number>(() => {
    const val = localStorage.getItem('debate_remaining');
    return val !== null ? Number(val) : 1; // 1 free custom debate out-of-the-box for trials
  });
  const [unlimitedActivated, setUnlimitedActivated] = useState<boolean>(() => {
    return localStorage.getItem('unlimited_activated') === 'true';
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [dialogueFreeRemaining, setDialogueFreeRemaining] = useState<number>(() => {
    const val = localStorage.getItem('dialogue_free_remaining');
    return val !== null ? Number(val) : 5; // Global 5 free chats in total across all philosophers
  });

  useEffect(() => {
    localStorage.setItem('dialogue_remaining', dialogueRemaining.toString());
  }, [dialogueRemaining]);

  useEffect(() => {
    localStorage.setItem('debate_remaining', debateRemaining.toString());
  }, [debateRemaining]);

  useEffect(() => {
    localStorage.setItem('unlimited_activated', unlimitedActivated.toString());
  }, [unlimitedActivated]);

  useEffect(() => {
    localStorage.setItem('dialogue_free_remaining', dialogueFreeRemaining.toString());
  }, [dialogueFreeRemaining]);

  const handleDeductDialogue = (philosopherId: string): boolean => {
    if (unlimitedActivated) return true;

    if (dialogueFreeRemaining > 0) {
      setDialogueFreeRemaining(prev => prev - 1);
      return true;
    }

    if (dialogueRemaining > 0) {
      setDialogueRemaining(prev => prev - 1);
      return true;
    }

    setPaymentModalOpen(true);
    return false;
  };

  const handleDeductDebate = (): boolean => {
    if (unlimitedActivated) return true;
    if (debateRemaining > 0) {
      setDebateRemaining(prev => prev - 1);
      return true;
    }
    setPaymentModalOpen(true);
    return false;
  };

  const handlePaymentSuccess = (type: 'chat' | 'debate' | 'unlimited', value: number) => {
    if (type === 'chat') {
      setDialogueRemaining(prev => prev + value);
    } else if (type === 'debate') {
      setDebateRemaining(prev => prev + value);
    } else if (type === 'unlimited') {
      setUnlimitedActivated(true);
    }
  };

  // Premium interactive states
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedWeChat, setCopiedWeChat] = useState<boolean>(false);

  // User feedback modal states and handlers
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackName, setFeedbackName] = useState<string>('');
  const [feedbackEmail, setFeedbackEmail] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<string>('Suggestion');
  const [feedbackContent, setFeedbackContent] = useState<string>('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackSuccessMessage, setFeedbackSuccessMessage] = useState<string>('');
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState<string>('');

  const handleFeedbackSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) {
      setFeedbackErrorMessage(language === 'zh' ? '反馈内容不能为空' : 'Feedback content cannot be empty');
      return;
    }
    setFeedbackSubmitting(true);
    setFeedbackErrorMessage('');
    setFeedbackSuccessMessage('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: feedbackName,
          email: feedbackEmail,
          type: feedbackType,
          content: feedbackContent
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFeedbackSuccessMessage(language === 'zh' ? '感谢反馈！作者已收到您的宝贵意见！' : 'Feedback submitted! Thank you for helping us optimize!');
        setFeedbackContent('');
        setFeedbackName('');
        setFeedbackEmail('');
        setTimeout(() => {
          setShowFeedbackModal(false);
          setFeedbackSuccessMessage('');
        }, 2500);
      } else {
        setFeedbackErrorMessage(data.message || (language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed. Please try again.'));
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
      setFeedbackErrorMessage(language === 'zh' ? '连接服务器失败，请检查网络' : 'Network error. Please try again.');
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  // Dynamic Gemini translation resolver states
  const [translatedPhilosopherValues, setTranslatedPhilosopherValues] = useState<Record<string, any>>({});
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Immersive biographical detailed page state
  const [detailedPhilosopher, setDetailedPhilosopher] = useState<Philosopher | null>(null);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  useEffect(() => {
    setCopiedQuote(false);
  }, [detailedPhilosopher]);

  // Dynamic Gemini translation resolver
  useEffect(() => {
    const targetId = detailedPhilosopher?.id || selectedPhilosopher?.id;
    if (language !== 'en' || !targetId) return;

    if (translatedPhilosopherValues[targetId]) return;

    // Fetch from pre-defined local translations first ONLY if complete to avoid missing fields
    if (philosopherFallbackTranslations[targetId] && isLocalFallbackComplete(targetId)) {
      setTranslatedPhilosopherValues(prev => ({
        ...prev,
        [targetId]: philosopherFallbackTranslations[targetId]
      }));
      return;
    }

    let active = true;
    const fetchTranslation = async () => {
      setIsTranslating(true);
      try {
        const ph = detailedPhilosopher || selectedPhilosopher;
        if (!ph) return;

        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: ph.id,
            name: ph.name,
            nameEng: ph.nameEng,
            details: ph.details,
            concepts: ph.concepts,
            worldviewSummary: ph.worldviewSummary,
            lifeAndTimes: ph.lifeAndTimes,
            school: ph.school,
            comparisons: ph.comparisons,
            quote: ph.quote
          })
        });

        if (!response.ok) throw new Error('Translation API failed');
        const data = await response.json();
        
        if (active && data && data.success) {
          setTranslatedPhilosopherValues(prev => ({
            ...prev,
            [targetId]: data.translation
          }));
        } else if (active) {
          throw new Error('API return is not success');
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic translation, using local fallback...", err);
        if (active) {
          const ph = detailedPhilosopher || selectedPhilosopher;
          if (ph) {
            const fallback = getCleanEnglishFallback(ph);
            setTranslatedPhilosopherValues(prev => ({
              ...prev,
              [targetId]: fallback
            }));
          }
        }
      } finally {
        if (active) setIsTranslating(false);
      }
    };

    fetchTranslation();
    return () => {
      active = false;
    };
  }, [language, selectedPhilosopher?.id, detailedPhilosopher?.id]);

  // Synchronize playing states
  useEffect(() => {
    if (isPlayingMusic) {
      startStudyMusic();
    } else {
      stopStudyMusic();
    }
    return () => {
      stopStudyMusic();
    };
  }, [isPlayingMusic]);

  const handleToggleLevel = (level: number) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handleSelectAllLevels = () => {
    setSelectedLevels([1, 2, 3, 4, 5]);
  };

  const handleSelectOnlyMasters = () => {
    setSelectedLevels([4, 5]);
  };

  // Settle the smooth-scrolling locator to anchor sections
  const scrollToEpoch = (id: number) => {
    const el = document.getElementById(`epoch-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToInstructions = () => {
    const el = document.getElementById('instructions-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Synchronize Scroll events to trace active Epoch progress in real-time
  useEffect(() => {
    if (detailedPhilosopher) return; // ignore scrolling triggers when deep in bio view

    const handleScroll = () => {
      const epochElements = activePhilosophyData.map(epoch => 
        document.getElementById(`epoch-section-${epoch.id}`)
      );

      let currentActiveId = activeRegion === 'west' ? 1 : 11;
      let minDistance = Infinity;

      epochElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          // Find the section closest to the focal center-top of viewport
          const distance = Math.abs(rect.top - 140);
          if (distance < minDistance && rect.top <= window.innerHeight * 0.6 && rect.bottom >= 100) {
            minDistance = distance;
            currentActiveId = activePhilosophyData[index].id;
          }
        }
      });

      // Special clamps for very top or bottom of scroll depth
      if (window.scrollY < 120) {
        currentActiveId = activeRegion === 'west' ? 1 : 11;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160) {
        currentActiveId = activeRegion === 'west' ? 6 : 16;
      }

      setActiveEpochId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detailedPhilosopher, activePhilosophyData, activeRegion]);

  const allPhilosophersFlat = useMemo(() => {
    return [
      ...philosophyData.flatMap(epoch => epoch.philosophers),
      ...easternPhilosophyData.flatMap(epoch => epoch.philosophers)
    ];
  }, []);

  // Find connections globally based on hover/selection
  const highlightedIds = useMemo(() => {
    const set = new Set<string>();
    const focusedId = hoveredPhilosopherId || selectedPhilosopher?.id;
    if (focusedId) {
      activePhilosophyData.forEach(ep => {
        ep.connections.forEach(conn => {
          if (conn.from === focusedId) {
            set.add(conn.to);
          }
          if (conn.to === focusedId) {
            set.add(conn.from);
          }
        });
      });
    }
    return set;
  }, [hoveredPhilosopherId, selectedPhilosopher, activePhilosophyData]);

  // Find linked philosophers helper for the detailed page
  const biographicalLinks = useMemo(() => {
    if (!detailedPhilosopher) return [];
    
    const linkedIds = new Set<string>();
    const allEpochsMerged = [...philosophyData, ...easternPhilosophyData];
    allEpochsMerged.forEach(ep => {
      ep.connections.forEach(conn => {
        if (conn.from === detailedPhilosopher.id) {
          linkedIds.add(conn.to);
        }
        if (conn.to === detailedPhilosopher.id) {
          linkedIds.add(conn.from);
        }
      });
    });

    // Solve for matching entities in raw DB
    const list: Philosopher[] = [];
    allEpochsMerged.forEach(ep => {
      ep.philosophers.forEach(p => {
        if (linkedIds.has(p.id) && p.id !== detailedPhilosopher.id) {
          list.push(p);
        }
      });
    });
    return list;
  }, [detailedPhilosopher]);

  // DOUBLE-CLICK: trigger detail view
  const handlePhilosopherDoubleClick = (p: Philosopher) => {
    setDetailedPhilosopher(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // IF RENDERING WORK FOR INNER DETAILED PAGE
  if (detailedPhilosopher) {
    const ped = getPhilosopherPedigree(detailedPhilosopher);
    const worksList = getPhilosopherWorks(detailedPhilosopher.id, language);
    const isEn = language === 'en';
    const activeTranslation = translatedPhilosopherValues[detailedPhilosopher.id] || {};
    const fallbackTranslation = isEn ? getCleanEnglishFallback(detailedPhilosopher) : null;

    const displayDetails = isEn 
      ? (activeTranslation.details || (isTranslating ? "Translating details via Gemini..." : (fallbackTranslation?.details || detailedPhilosopher.details))) 
      : detailedPhilosopher.details;

    const rawConcepts = isEn 
      ? (activeTranslation.concepts || (fallbackTranslation?.concepts || detailedPhilosopher.concepts)) 
      : detailedPhilosopher.concepts;
    const displayConcepts = rawConcepts.map(c => isEn ? (conceptTranslations[c] || c) : c);

    const displayWorldviewSummary = isEn 
      ? (activeTranslation.worldviewSummary || (isTranslating ? "Translating academic worldview..." : (fallbackTranslation?.worldviewSummary || detailedPhilosopher.worldviewSummary))) 
      : detailedPhilosopher.worldviewSummary;

    const displayLifeAndTimes = isEn 
      ? (activeTranslation.lifeAndTimes || (isTranslating ? "Translating chronicle timeline..." : (fallbackTranslation?.lifeAndTimes || detailedPhilosopher.lifeAndTimes))) 
      : detailedPhilosopher.lifeAndTimes;

    const displayQuote = isEn 
      ? (activeTranslation.quote || (fallbackTranslation?.quote || detailedPhilosopher.quote)) 
      : detailedPhilosopher.quote;

    const displaySchool = isEn ? (schoolTranslations[detailedPhilosopher.school] || detailedPhilosopher.school) : detailedPhilosopher.school;
    const displayEra = isEn ? translateEraDisp(detailedPhilosopher.eraDisp) : detailedPhilosopher.eraDisp;

    const displayPedLabel = isEn ? (
      ped.level === 5 ? 'Sovereign Master' :
      ped.level === 4 ? 'Pioneering Leader' :
      ped.level === 3 ? 'Key Sage' :
      ped.level === 2 ? 'Contributor' : 'Peripheral'
    ) : ped.label;

    const displayPedDesc = isEn ? (
      ped.level === 5 ? 'A major sovereign master of Western philosophical lineage system establishing broad paradigms.' :
      ped.level === 4 ? 'A pioneering leader who defined new academic subjects and led key generational schools.' :
      ped.level === 3 ? 'A critical node in the development of classical arguments.' :
      ped.level === 2 ? 'An outstanding scholar who refined, annotated, and preserved the core framework of their school.' :
      'A peripheral seeker whose lineage diverges from the mainstream or navigates the margins of the system.'
    ) : ped.desc;

    return (
      <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col relative overflow-x-clip antialiased animate-fade-in">
        <GreekMeander className="bg-[#FAF6EC]" />
        
        {/* Detail page top panel header bar matching Screen 1 */}
        <header className="sticky top-0 z-50 flex items-center justify-between bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#D4AF37]/35 py-3 px-4 md:px-8 shadow-xs">
          <button
            onClick={() => setDetailedPhilosopher(null)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF8F5] hover:bg-white text-[#0D5C75] border border-[#0D5C75]/35 hover:border-[#D4AF37] rounded-lg shadow-3xs transition-all duration-200 font-serif font-bold text-[11px] tracking-wider uppercase cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {isEn ? 'BACK TO RIVER' : '退出学术谱 / LEAVE'}
          </button>

          <div className="flex items-center gap-2 font-serif font-extrabold text-[#0B2545] tracking-widest text-xs md:text-sm">
            <span>🏛️</span> {isEn ? 'SAGE TRUTH SCROLL' : '贤达真言卷轴'}
            {isTranslating && (
              <span className="text-[10px] text-amber-700 animate-pulse font-sans font-normal ml-2">
                (Translating...)
              </span>
            )}
          </div>

          <button
            onClick={() => setDetailedPhilosopher(null)}
            className="text-[#0D5C75] hover:text-[#0B2545] hover:bg-black/5 p-1 rounded-full transition-colors cursor-pointer w-7 h-7 flex items-center justify-center font-sans font-bold"
            title={isEn ? 'Close scroll' : '关闭卷轴'}
          >
            ✕
          </button>
        </header>

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 mt-10 z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            
            {/* Left/Sidebar: The Philosopher Hero Card (Card 1), sticky on desktop! */}
            <aside className="lg:col-span-4 lg:sticky lg:top-[90px] z-20 flex flex-col gap-6 w-full lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pr-1">
              {/* Card 1: The Philosopher Hero Card (附件图片模式) */}
              <section className="bg-[#FAF8F5] border-2 border-[#0B2545]/85 rounded-2xl shadow-sm p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                {/* Soft subtle accent circle or pattern on top right as in Screen 1 */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#C2593F]/5 rounded-full pointer-events-none select-none z-0" />
                
                <div className="flex flex-col gap-4 z-10 relative mb-5">
                  {/* Top Left Era badge & Stars header row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-block px-2.5 py-0.5 bg-[#C2593F] text-white text-[10px] font-bold rounded-sm tracking-wider shadow-sm font-sans uppercase">
                      {displayEra}
                    </span>
                    
                    {/* Top Right Pedigree / Status badge */}
                    <div className="flex flex-col items-end gap-0.5 font-serif">
                      <span className="inline-block px-2 py-0.5 bg-[#EAF2F5] text-slate-700 text-[9.5px] font-semibold rounded border border-gray-200 shadow-3xs uppercase">
                        {displayPedLabel}
                      </span>
                      {/* Academic Stars */}
                      <span className="text-amber-500 font-bold text-xs tracking-widest leading-none">
                        {ped.stars}
                      </span>
                    </div>
                  </div>
                  
                  {/* Name Block */}
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-serif tracking-wider leading-tight">
                      {isEn ? (detailedPhilosopher.nameEng || detailedPhilosopher.name) : detailedPhilosopher.name}
                    </h1>
                    <p className="mt-1 text-[10.5px] font-serif font-bold tracking-widest text-[#C2593F] uppercase">
                      {isEn ? 'Classical Sage' : detailedPhilosopher.nameEng}
                    </p>
                  </div>
                </div>

                {/* Bottom blockquote container */}
                <div className="bg-[#F4F6F8] rounded-xl border-l-[5px] border-[#0B2545] p-4 font-serif text-xs leading-relaxed text-[#0B2545]/90 shadow-3xs z-10 relative mb-5">
                  <p className="text-justify leading-relaxed flex-grow">
                    {displayDetails}
                  </p>
                </div>

                {/* Elegant Integration of School & Pedigree Info */}
                <div className="pt-3.5 border-t border-gray-200 flex flex-col gap-3 text-[11px] font-sans text-slate-700 z-10 relative bg-white/45 p-2.5 rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-gray-400 font-semibold block uppercase tracking-wide">
                      {isEn ? '🏛️ ORIGINAL SCHOOL' : '🏛️ 原创学术流派'}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-serif font-bold text-[#0D5C75] text-xs">
                        {displaySchool}
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#FAF8F5] text-[9px] text-amber-800 rounded border border-gray-205 font-serif font-bold">
                        {isEn ? 'WISDOM MATRIX' : '智慧系谱'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5 border-t border-gray-200/60 pt-2">
                    <span className="text-[9px] text-gray-400 font-semibold block uppercase tracking-wide">
                      {isEn ? '⭐ Lineage Status' : '⭐ 思想梯队位置'}
                    </span>
                    <p className="text-slate-650 font-serif leading-relaxed text-[10.5px]">
                      <span className="font-bold text-[#C2593F]">{displayPedLabel}</span> • {displayPedDesc}
                    </p>
                  </div>
                </div>
              </section>
            </aside>

            {/* Right/Main Area: Rest of details + Chat Terminal, scrollable on desktop */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full">

              {/* Card 2: 人文学术生平传记 (Chronicle Dossier) */}
              <section className="bg-white border-2 border-[#0B2545]/40 rounded-2xl shadow-xs p-6 md:p-8 flex flex-col gap-6">
                <h4 className="text-xs font-bold font-sans uppercase text-[#C2593F] tracking-widest flex items-center gap-1.5 border-b border-gray-150 pb-2.5">
                  <Sparkles className="w-4 h-4 text-[#C2593F]" />
                  <span>{isEn ? 'CHRONICLE DOSSIER' : '人文学术生平传记 / CHRONICLE DOSSIER'}</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-serif">
                  <div className="bg-[#FAF8F5] border border-gray-150 rounded-xl p-4 shadow-3xs min-h-[140px] flex flex-col justify-between font-serif">
                    <div>
                      <span className="text-[10px] text-gray-400 font-sans block uppercase tracking-wide mb-1.5 font-bold text-amber-800">
                        {isEn ? 'ERA COORDINATES' : '出生日期与年代定位 / ORIGIN'}
                      </span>
                      <div className="text-[#0B2545] font-extrabold text-sm leading-relaxed font-serif">
                        {displayEra} {isEn ? 'Stream of Western Thoughts' : '西方思想长河'}
                      </div>
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-2 font-sans italic leading-relaxed">
                      {isEn ? 'Formulated within the context of scientific growth, historical shifts, and absolute rational parameters.' : '在当时社会生产力、科技、重大历史变革与理性探索的整体时空视域下创立学说。'}
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border border-gray-150 rounded-xl p-4 shadow-3xs min-h-[140px]">
                    <span className="text-[10px] text-gray-400 font-sans block uppercase tracking-wide mb-1.5 font-bold text-[#0D5C75]">
                      {isEn ? 'ACADEMIC LIFE CONTEXT' : '学识与求学成长轨迹 / EDUCATION'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-serif">
                      {displayLifeAndTimes}
                    </p>
                  </div>
                </div>
              </section>

              {/* Card 3: 思想形成背景与生平重要纪事 / CONTEXT & PATHWAYS */}
              <section className="bg-white border hover:border-gray-300 rounded-2xl shadow-xs p-6 md:p-8 flex flex-col gap-6 transition-all">
                {detailedPhilosopher.lifeAndTimes && (
                  <div>
                    <h4 className="text-xs font-bold font-sans uppercase text-slate-800 tracking-widest mb-3 border-b border-gray-100 pb-1.5">
                      {isEn ? 'HISTORICAL ARCHIVE / CONTEXT' : '思想形成背景 / CONTEXT'}
                    </h4>
                    <p className="bg-[#FAF8F5] rounded-xl p-4 border border-gray-150 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-serif">
                      {isEn 
                        ? `Cultivated deeply within the Western classical framework, ${detailedPhilosopher.nameEng} established high rational rigor. In response to epistemic tensions in the ${displaySchool} school, they proposed standard methods that transformed the landscape of modern philosophy.` 
                        : `${detailedPhilosopher.name}在青年时期与同代学者的批判碰撞，奠定了其终身治学的根基。他的理论在对以往思想体系进行颠覆与重构的过程中，逐渐显露出非凡的智慧轮廓。`}
                    </p>
                  </div>
                )}

                {/* Pathways Timeline Section */}
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase text-slate-800 tracking-widest mb-4">
                    {isEn ? 'PATHWAYS & EVOLUTION STAGES' : '生平主要成果与心智进化 / PATHWAYS'}
                  </h4>
                  <div className="relative border-l border-gray-200/80 ml-3 pl-6 space-y-5 font-serif">
                    {displayConcepts.map((concept, idx) => (
                      <div key={idx} className="relative">
                        {/* Red Bullet icon as in Screen 2 */}
                        <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full border-2 border-[#C2593F] bg-white flex items-center justify-center shrink-0 z-10 shadow-3xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C2593F]" />
                        </span>
                        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                          <span className="font-extrabold text-amber-900 block font-serif text-[11px] mb-0.5">
                            {isEn ? `EVOLUTIONARY NODE ${idx + 1}` : `思想演化节点 ${idx + 1}`}
                          </span>
                          <span>
                            {isEn 
                              ? `Advocated the foundational thesis of "${concept}" to open a pristine cognitive direction.` 
                              : `立足相应时空，提出著名的“${concept}”学术主张，开辟全新思辨维度。`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Card 4: 思想史伟业与其历史影响 */}
              <section className="bg-white border border-[#D4AF37]/25 rounded-2xl shadow-xs p-6 md:p-8 flex flex-col gap-4">
                <h4 className="text-xs font-bold font-sans uppercase text-[#C2593F] tracking-widest flex items-center gap-1.5 border-b border-gray-150 pb-2.5">
                  <Landmark className="w-4 h-4 text-[#C2593F]" />
                  <span>{isEn ? 'HISTORICAL LEGACY' : '思想史伟业与其历史影响 / HISTORICAL INFLUENCE'}</span>
                </h4>
                <div className="text-xs sm:text-sm leading-relaxed text-[#0B2545] font-serif text-justify font-semibold bg-[#FAF8F5] p-4 rounded-xl border-l-4 border-[#C2593F] shadow-3xs">
                  {isEn 
                    ? 'As a critical and irreplaceable node in the long stream of Western philosophy, their school of thought has profoundly shaped the directions of human civilization development, rational argumentation, and ethical inquiry. In today\'s rational discourse, it still remains an inexhaustible pool of wisdom and enlightenment.'
                    : '作为西方思想谱系长河中举足轻重、无可替代的伟大节点，其学说深刻地塑造了人类文明史、理性论争和生命道德的方向。在今天的时代风向和理性哲学深度反思中，依然充满着不竭的理智力量与启示之光。'}
                </div>
              </section>

              {/* Card 5: 哲学家核心立场箴言 (Standpoint Quote) */}
              {displayQuote && (
                <section className="bg-[#0B2545] border-y-4 border-[#D4AF37]/50 rounded-2xl text-[#FDFDFB] p-6 sm:p-9 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[230px]">
                  <span className="absolute -top-8 -left-4 text-9xl font-serif text-white/5 pointer-events-none select-none font-extrabold">“</span>
                  
                  <div className="relative z-10 font-serif pt-4 pb-6 border-b border-white/10">
                    <p className="text-lg sm:text-xl md:text-2xl font-extrabold italic leading-relaxed text-center text-amber-100 drop-shadow-sm font-serif">
                      “ {displayQuote} ”
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 relative z-10 font-sans">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-semibold">
                      * {isEn ? 'FOUNDATIONAL MANUSCRIPT STANDPOINT' : '哲学核心原点箴言 / STANDPOINT'}
                    </span>
                    
                    {/* Copy button! */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(isEn ? `${detailedPhilosopher.nameEng} quote: "${displayQuote}"` : `${detailedPhilosopher.name}名言：“${displayQuote}”`);
                        setCopiedQuote(true);
                        setTimeout(() => setCopiedQuote(false), 2000);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-white rounded border border-white/20 hover:border-[#D4AF37] text-xs font-serif font-bold transition-all cursor-pointer"
                    >
                      {copiedQuote ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      <span>{copiedQuote ? (isEn ? 'Copied Scroll' : '已复制名言卷') : (isEn ? 'Copy Scroll' : '复制名言卷')}</span>
                    </button>
                  </div>
                </section>
              )}

              {/* Card 6: 代表性不朽经典著作 (Works) */}
              <section className="bg-white border-2 border-[#0B2545]/40 rounded-2xl shadow-xs p-6 md:p-8">
                <h4 className="text-xs font-bold font-sans uppercase text-[#C2593F] tracking-widest flex items-center gap-1.5 border-b border-gray-150 pb-2.5 mb-5">
                  <BookOpen className="w-4 h-4 text-[#C2593F]" />
                  <span>{isEn ? 'CLASSICAL MASTERWORKS REPERTOIRE' : '代表性不朽经典著作 / WORKS'}</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-serif">
                  {worksList.map((work, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 bg-[#FAF8F5] border border-[#D4AF37]/25 rounded-xl p-3.5 shadow-3xs hover:bg-[#FDFBF7] hover:border-amber-400 transition-all cursor-pointer">
                      <span className="text-lg text-[#C2593F] bg-white border border-gray-150 rounded p-1.5 shadow-2xs leading-none">📖</span>
                      <div>
                        <div className="font-extrabold text-[#0B2545] text-xs sm:text-sm">{work}</div>
                        <div className="text-[9px] text-gray-400 font-sans tracking-widest mt-0.5">CLASSICAL ARCHIVE</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Card 7: 核心哲学概念深度剖析 (Thesis Concepts) */}
              <section className="bg-white border border-[#D4AF37]/25 rounded-2xl shadow-xs p-6 md:p-8 flex flex-col gap-4">
                <h4 className="text-xs font-bold font-sans uppercase text-[#0B2545] tracking-widest flex items-center gap-1.5 border-b border-gray-150 pb-2.5 mb-2">
                  <Sparkles className="w-4 h-4 text-[#0B2545]" />
                  <span>{isEn ? 'THESIS CONCEPTS DEEP STUDY' : '核心哲学概念深度剖析 / THESIS CONCEPTS'}</span>
                </h4>

                <div className="flex flex-col gap-4">
                  <div className="bg-[#FAF8F5] border-2 border-[#0B2545]/35 rounded-xl p-5 shadow-3xs font-serif">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-6 h-6 rounded bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">1</span>
                      <h5 className="font-extrabold text-[#0B2545] text-sm">
                        {isEn ? 'Theoretical Core Arguments System' : '核心主张辨析之论点体系'}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-serif">
                      {displayWorldviewSummary}
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-4 shadow-3xs font-serif">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-5 h-5 rounded bg-slate-400 text-white flex items-center justify-center font-bold text-xs">2</span>
                      <h5 className="font-bold text-slate-700 text-xs sm:text-sm">
                        {isEn ? 'Thesis Essential Ontological Glossary' : '思想精髓要义纲纪'}
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 mt-2">
                      {displayConcepts.map((concept, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white border border-gray-200 hover:border-amber-400 text-xs rounded text-slate-700 shadow-3xs hover:scale-102 transition-all font-semibold">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Card 8: 思想谱系传续与批判论辩 (Pantheon Lineages) */}
              <section className="bg-white border hover:border-gray-300 rounded-2xl shadow-xs p-6 md:p-8 flex flex-col gap-4 transition-all">
                <h4 className="text-xs font-bold font-sans uppercase text-slate-800 tracking-widest flex items-center gap-1.5 border-b border-gray-150 pb-2.5">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>{isEn ? 'PANTHEON LINEAGES & DIALECTICS' : '思想谱系传续与批判论辩 / PANTHEON LINEAGES'}</span>
                </h4>

                <div className="mt-2 space-y-4 font-serif">
                  {detailedPhilosopher.comparisons && detailedPhilosopher.comparisons.length > 0 ? (
                    <div className="space-y-4">
                      {detailedPhilosopher.comparisons.map((comp, idx) => {
                        const linkedPh = allPhilosophersFlat.find(p => p.id === comp.withId);
                        const dispWithName = isEn ? (linkedPh?.nameEng || comp.withName) : comp.withName;

                        return (
                          <div key={idx} className="bg-[#FAF8F5] border border-[#D4AF37]/25 rounded-xl p-4 shadow-3xs">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/60 pb-1.5 mb-2.5">
                              <span className="text-xs font-bold text-[#0D5C75]">
                                {isEn ? detailedPhilosopher.nameEng : detailedPhilosopher.name} ⇌ {dispWithName}
                              </span>
                              <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-sans font-bold leading-none ${
                                comp.relationType === 'opponent' ? 'bg-red-50 text-red-700 border border-red-200' :
                                comp.relationType === 'successor' ? 'bg-green-50 text-green-700 border border-green-200' :
                                comp.relationType === 'synthesizer' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                                {comp.relationType === 'opponent' ? (isEn ? 'Doctrine Debate & Bifurcation' : '学说论战与分野') :
                                 comp.relationType === 'successor' ? (isEn ? 'Heritage Expansion & Revolution' : '学术薪传与颠覆') :
                                 comp.relationType === 'synthesizer' ? (isEn ? 'Magnificent Synthesis' : '普遍综融与集大成') :
                                 (isEn ? 'Thought Intersect & Indirect Inspiration' : '思想撞击与间接灵感')}
                              </span>
                            </div>
                            
                            <div className="text-xs text-slate-805 space-y-2 leading-relaxed">
                              <div className="text-justify leading-relaxed">
                                <span className="font-extrabold text-amber-800">{isEn ? 'Core Difference: ' : '思想异同解析：'}</span>
                                <span>
                                  {isEn ? (activeTranslation.comparisons?.[idx]?.coreDifference || (fallbackTranslation?.comparisons?.[idx]?.coreDifference || comp.coreDifference)) : comp.coreDifference}
                                </span>
                              </div>
                              <div className="bg-white p-3.5 rounded-lg border-l-2 border-[#D4AF37]/60 italic shadow-3xs mt-1">
                                <span className="font-bold text-gray-800 block not-italic text-[10px] mb-1">
                                  💡 {isEn ? 'Reflection & Inquiry Prompt:' : '启发反思论题：'}
                                </span>
                                <span>
                                  {isEn ? (activeTranslation.comparisons?.[idx]?.reflectionPrompt || (fallbackTranslation?.comparisons?.[idx]?.reflectionPrompt || comp.reflectionPrompt)) : comp.reflectionPrompt}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 font-sans block italic text-center py-6">
                      {isEn ? 'This node has standalone epoch origin or pioneering methodology, with no direct ancestry link recorded.' : '该圣哲节点为断代起始或极具独特分野的新星思想，尚无直接承续和批判连线。'}
                    </span>
                  )}
                </div>

                {/* Legacy & Academic Links */}
                <div className="border-t border-[#D4AF37]/25 pt-4 mt-4">
                  <h4 className="text-xs font-bold font-sans uppercase text-gray-400 tracking-wider mb-3">
                    {isEn ? '⚡ DIRECT SCHOLASTIC HERITAGE NETWORK' : '⚡ 师承脉络及思想撞击 (Heritage Sphere Links)'}
                  </h4>
                  
                  {biographicalLinks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {biographicalLinks.map(linked => (
                        <button
                          key={linked.id}
                          onClick={() => {
                            setDetailedPhilosopher(linked);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-white hover:bg-[#EBF5F8] text-xs text-[#0D5C75] border border-[#0D5C75]/20 hover:border-[#D4AF37] rounded-lg p-3 text-left transition-all duration-200 cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div>
                            <div className="font-serif font-bold text-gray-900">
                              {isEn ? (linked.nameEng || linked.name) : linked.name}
                            </div>
                            <div className="text-[9.5px] text-gray-400 font-mono">
                              {isEn ? (schoolTranslations[linked.school] || linked.school) : linked.school}
                            </div>
                          </div>
                          <span className="text-[#D4AF37] text-[10px] font-bold">
                            {isEn ? 'GO TO DOSSIER →' : '查看生平 →'}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 font-sans block italic">
                      {isEn ? 'Dynamic linkages being computed.' : '该贤哲直接的历史关联正由学术体系交互推导，暂无其他直接直系师承。'}
                    </span>
                  )}
                </div>
              </section>

              {/* SOUL DIALOGUE CHAT TERMINAL (¥9.9 paid feature) */}
              <section className="bg-white rounded-xl shadow-xs border border-amber-250 p-1.5 md:p-3 mt-6">
                {(() => {
                  const translatedPhilosopher = {
                    ...detailedPhilosopher,
                    details: displayDetails || detailedPhilosopher.details,
                    quote: displayQuote || detailedPhilosopher.quote,
                    school: displaySchool || detailedPhilosopher.school,
                    eraDisp: displayEra || detailedPhilosopher.eraDisp,
                    worldviewSummary: displayWorldviewSummary || detailedPhilosopher.worldviewSummary,
                    lifeAndTimes: displayLifeAndTimes || detailedPhilosopher.lifeAndTimes,
                  };
                  return (
                    <SoulChatTerminal
                      philosopher={translatedPhilosopher}
                      language={language}
                      dialogueRemaining={dialogueRemaining}
                      unlimitedActivated={unlimitedActivated}
                      onDeductDialogue={handleDeductDialogue}
                      onTriggerPayment={() => setPaymentModalOpen(true)}
                      freeRemaining={dialogueFreeRemaining}
                    />
                  );
                })()}
              </section>

              {/* Button to leave detailed view */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setDetailedPhilosopher(null)}
                  className="px-6 py-2.5 bg-[#0B2545] hover:bg-[#0A4A5E] text-[#FAF8F5] border-2 border-[#D4AF37]/60 rounded-xl shadow-lg transition-all duration-200 font-serif text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  {isEn ? '← RETURN TO CHRONOLOGY RIVER' : '← 返回主图谱长河'}
                </button>
              </div>

            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-xs tracking-widest text-slate-400 font-sans select-none pb-12 uppercase border-t border-gray-100 pt-6">
          ALETHEIA CLASSICAL STUDIES ACADEMIC ROLL SYSTEM
        </footer>

        {/* CARD REDEMPTION & PAYMENT TRIGGER MODAL */}
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          language={language}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  // STANDARD DOWN-SCROLL CHRONOLOGY VIEW
  return (
    <div 
      className="min-h-screen bg-[#FAF8F5] text-[#0B2545] pb-24 flex flex-col relative overflow-x-clip antialiased cursor-default"
      onClick={() => setSelectedPhilosopher(null)}
    >
      
      {/* Decorative Greek Meander Wave Header Accent */}
      <GreekMeander className="bg-[#FAF8F5]/80" />

      {/* Top Banner & Title - Deep Mediterranean / Aegean Blue and Milk White */}
      <header className="relative py-12 px-4 md:px-8 bg-gradient-to-b from-[#F2EDE2] to-[#FAF8F5] text-center border-b border-[#D4AF37]/35 shadow-3xs">
        
        {/* Absolute Background Greek Pillar Accents for Large Screens */}
        <div className="hidden xl:block absolute left-10 top-6 bottom-6 opacity-30 select-none">
          <GreekPillar height="140px" />
        </div>
        <div className="hidden xl:block absolute right-10 top-6 bottom-6 opacity-30 select-none">
          <GreekPillar height="140px" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Classical Temple Pediment */}
          <GreekPediment 
            title="ΦΙΛΟΣΟΦΙΑ" 
            subtitle={language === 'zh' ? '东西方哲学发展脉络交互图谱' : 'East & West Philosophy Academic Roll'} 
            className="mb-3"
          />

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-widest text-[#0B2545] drop-shadow-xs font-serif uppercase">
            {language === 'zh' ? '东西方哲学思想沿革史卷' : 'East & West Philosophical Chronicle Roll'}
          </h1>
          
          <p className="mt-2.5 text-xs md:text-sm text-[#0D5C75] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {language === 'zh' ? (
              <>本图谱真实精确地还原了<b>东西方哲学黄金断代时期</b>的哲学主干网络。采用古雅经典美学设计，<b>通过向下流动模拟历史纪元的演进</b>，优雅地穿梭于<b>西方理性思辨 ⇄ 东方中国智慧</b>。</>
            ) : (
              <>This scroll reconstructs the core network of the <b>golden historical epochs</b> of both Western and Eastern philosophy. Framed in classical aesthetics, <b>scrolling down simulates the sequence of history</b>, flowing gracefully between <b>Western rational dialectics ⇄ Eastern Chinese wisdom</b>.</>
            )}
            <br />
            <span className="text-[#0B2545] bg-[#D4AF37]/20 px-1.5 py-0.5 rounded font-sans text-[10px] font-bold">
              💡 {language === 'zh' ? '双击任何人物卡片，可以直接进入该圣哲的精细生平行卷' : 'Double click any sage card to enter the detailed biography archive scroll'}
            </span>
          </p>
        </div>
      </header>

      {/* Hellenic Navigation Tabs */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 mt-8 z-20">
        <div className="flex border-b-2 border-[#D4AF37]/35 pb-0 justify-center sm:justify-start gap-4">
          <button
            onClick={() => {
              setActiveTab('chronology');
              setDetailedPhilosopher(null);
            }}
            className={`px-5 py-2.5 text-xs sm:text-sm font-serif font-extrabold tracking-widest uppercase transition-all flex items-center gap-2 border-t-2 border-x-2 rounded-t-xl cursor-pointer ${
              activeTab === 'chronology'
                ? 'bg-[#0B2545] border-[#D4AF37]/50 text-[#FAF8F5]'
                : 'bg-[#F2EDE2]/60 border-transparent text-[#0D5C75] hover:bg-[#F2EDE2] hover:text-[#0B2545]'
            }`}
          >
            <Scroll className="w-4 h-4 text-[#D4AF37]" />
            <span>{language === 'zh' ? '📜 思想沿革史卷' : '📜 Chronicle Roll'}</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('debate');
              setDetailedPhilosopher(null);
            }}
            className={`px-5 py-2.5 text-xs sm:text-sm font-serif font-extrabold tracking-widest uppercase transition-all flex items-center gap-2 border-t-2 border-x-2 rounded-t-xl cursor-pointer relative ${
              activeTab === 'debate'
                ? 'bg-[#0B2545] border-[#D4AF37]/50 text-[#FAF8F5]'
                : 'bg-[#F2EDE2]/60 border-transparent text-[#0D5C75] hover:bg-[#F2EDE2] hover:text-[#0B2545]'
            }`}
          >
            <Swords className="w-4 h-4 text-[#C2593F]" />
            <span>{language === 'zh' ? '⚔️ 众神多边辩论' : '⚔️ Multilateral Debate'}</span>
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-sans font-extrabold animate-pulse shadow-3xs">
              NEW
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'chronology' ? (
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 mt-6 flex flex-col gap-6 z-10">

        {/* MAIN LAYOUT: Continuous Scrollway (Left) and Sticky Details Stele (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative mt-4">
          
          {/* LEFT COLUMN: Majestic Continuous Scrollway */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0B2545]/20 pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0B2545]" />
                <h3 className="font-serif text-lg font-bold text-[#0B2545] tracking-wider uppercase">
                  {activeRegion === 'west' 
                    ? (language === 'zh' ? '西方哲人图谱流层 · 史学罗盘' : 'Western Scholastic Network Flow')
                    : (language === 'zh' ? '东方中国贤哲图谱 · 史学罗盘' : 'Eastern Scholastic Network Flow')}
                </h3>
              </div>
              
              {/* Premium Dual-Region Switcher (Stone Pillar Aesthetics) */}
              <div className="flex items-center bg-[#F2EDE2]/60 border border-[#D4AF37]/50 p-1 rounded-full shadow-3xs self-center sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveRegion('west')}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif font-extrabold tracking-widest uppercase transition-all duration-350 cursor-pointer flex items-center gap-1.5 ${
                    activeRegion === 'west'
                      ? 'bg-[#0B2545] text-[#FAF8F5] shadow-xs font-bold'
                      : 'text-[#0D5C75] hover:text-[#0B2545] font-semibold'
                  }`}
                >
                  <span>🏛️</span>
                  <span>{language === 'zh' ? '西方哲学' : 'West'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setActiveRegion('east')}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif font-extrabold tracking-widest uppercase transition-all duration-350 cursor-pointer flex items-center gap-1.5 ${
                    activeRegion === 'east'
                      ? 'bg-[#C2593F] text-[#FAF8F5] shadow-xs font-bold'
                      : 'text-[#0D5C75] hover:text-[#C2593F] font-semibold'
                  }`}
                >
                  <span>⛩️</span>
                  <span>{language === 'zh' ? '东方中国' : 'East'}</span>
                </button>
              </div>
            </div>

            {/* Gesture indicators showing mobile swipe capabilities */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#0D5C75]/85">
              <span className="font-sans font-medium">
                {language === 'zh' ? (
                  <>💡 左右滑动或点击上方选项卡，即可在<b>西方思辨 ⇄ 东方中国智慧</b>间无缝穿梭</>
                ) : (
                  <>💡 Swipe left/right or click tabs above to seamlessly switch between <b>Western & Eastern</b> heritages</>
                )}
              </span>
              <span className="hidden sm:inline font-semibold">
                {language === 'zh' ? (
                  <>双击卡片开启生平 · 滑动页面时光穿梭</>
                ) : (
                  <>Double click card for biography • Scroll page to travel in time</>
                )}
              </span>
            </div>

            {/* Render one single unified continuous lineage diagram representing all thinkers globally */}
            <div className="flex flex-col gap-4">
              {/* Academic Level Filter Panel */}
              <div 
                id="pedigree-level-selector" 
                className="bg-white/95 border border-[#D4AF37]/45 rounded-xl p-4 shadow-md text-[#0B2545] font-serif transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5 pb-1.5 border-b border-[#0B2545]/15">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏛️</span>
                    <h4 className="text-xs font-bold text-[#0B2545] tracking-wider uppercase">
                      {language === 'zh' ? '谱系学等阶筛选 (Academic Pedigree Selector)' : 'Scholastic Pedigree Selector (Academic Ladder)'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-sans">
                    <span className="text-[#0D5C75] font-semibold">{language === 'zh' ? '快速预设:' : 'Quick Presets:'}</span>
                    <button 
                      onClick={handleSelectAllLevels}
                      className="px-2 py-0.5 bg-[#0D5C75]/10 hover:bg-[#0D5C75]/25 text-[#0D5C75] border border-[#0D5C75]/35 rounded transition-colors cursor-pointer text-[10px] font-bold"
                    >
                      {language === 'zh' ? '显示全部' : 'Show All'}
                    </button>
                    <button 
                      onClick={handleSelectOnlyMasters}
                      className="px-2 py-0.5 bg-amber-50/70 hover:bg-amber-100/85 border border-[#D4AF37]/50 text-amber-805 rounded transition-colors cursor-pointer text-[10px] font-bold"
                    >
                      {language === 'zh' ? '仅看特级/一级' : 'Masters Only'}
                    </button>
                  </div>
                </div>
                
                <div className="text-[10.5px] text-[#0D5C75] mb-3 leading-relaxed font-sans font-medium">
                  {language === 'zh' ? (
                    <>此处控制全图谱的<b>学术定位层级（1-5阶）</b>。勾选的层级以<b>高饱和度实体形态</b>展现；未勾选的层级将以<b>典雅半透明形态</b>学术隐退，更清晰梳理关系。</>
                  ) : (
                    <>Select the target <b>scholastic rankings (levels 1-5)</b>. Active levels render as <b>solid entities</b>, while inactive levels gracefully fade into <b>semi-transparent guides</b> for optimal readability.</>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { level: 5, label: language === 'zh' ? '巨擘宗师' : 'Sovereign Master', stars: '★★★★★', color: 'border-amber-550 text-amber-900 bg-amber-50/60', desc: language === 'zh' ? '形而上学巅峰巨人' : 'Establishing ultimate paradigms' },
                    { level: 4, label: language === 'zh' ? '传世先驱' : 'Pioneering Leader', stars: '★★★★☆', color: 'border-yellow-600 text-yellow-800 bg-yellow-50/40', desc: language === 'zh' ? '学说关键奠基领袖' : 'Key founder of schools / centuries' },
                    { level: 3, label: language === 'zh' ? '核心贤哲' : 'Key Sage', stars: '★★★☆☆', color: 'border-indigo-400 text-indigo-900 bg-indigo-50/45', desc: language === 'zh' ? '体系主干核心学者' : 'Critical nodes of development' },
                    { level: 2, label: language === 'zh' ? '沿袭学者' : 'Contributor', stars: '★★☆☆☆', color: 'border-slate-400 text-slate-805 bg-slate-50/50', desc: language === 'zh' ? '流派主干评注沿袭者' : 'Scholars expanding existing ideas' },
                    { level: 1, label: language === 'zh' ? '界外探索者' : 'Peripheral Speculator', stars: '★☆☆☆☆', color: 'border-slate-350 text-slate-500 bg-slate-100/50 italic', desc: language === 'zh' ? '外围探索思辨交涉' : 'Valuable external or boundary dialogs' },
                  ].map((item) => {
                    const isActive = selectedLevels.includes(item.level);
                    return (
                      <button
                        key={item.level}
                        id={`filter-level-btn-${item.level}`}
                        onClick={() => handleToggleLevel(item.level)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all duration-300 cursor-pointer select-none group
                          ${isActive 
                            ? `${item.color} border-l-[4px] shadow-[0_2px_8px_rgba(212,175,55,0.12)] scale-[1.02]` 
                            : 'border-slate-200 text-slate-400 bg-slate-50/50 hover:bg-slate-100 hover:text-slate-605 scale-98'
                          }`}
                      >
                        <div className="flex items-center gap-1.5 w-full justify-center">
                          <span className={`w-2 h-2 rounded-full transition-transform duration-300 ${isActive ? 'bg-current scale-110' : 'bg-slate-300 group-hover:bg-slate-400'}`} />
                          <span className="text-[11px] font-bold tracking-tight">{item.label}</span>
                        </div>
                        <span className="text-[8px] font-mono mt-0.5 tracking-tighter block opacity-95">{item.stars}</span>
                        <span className="text-[7.5px] mt-1 leading-tighter truncate max-w-full text-slate-450 block sm:hidden md:block">
                          {item.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div 
                className="overflow-hidden touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRegion}
                    initial={{ x: activeRegion === 'west' ? -40 : 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: activeRegion === 'west' ? 40 : -40, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  >
                    <LineageDiagram
                      allEpochs={activePhilosophyData}
                      selectedPhilosopher={selectedPhilosopher}
                      hoveredPhilosopherId={hoveredPhilosopherId}
                      highlightedIds={highlightedIds}
                      onSelectPhilosopher={setSelectedPhilosopher}
                      onDoubleClickPhilosopher={handlePhilosopherDoubleClick}
                      onHoverPhilosopher={setHoveredPhilosopherId}
                      selectedLevels={selectedLevels}
                      language={language}
                      translatedPhilosopherValues={translatedPhilosopherValues}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Consolidated Sticky Exploration Column (Details Altar + Time Axis Navigator) */}
          <aside 
            className="lg:col-span-4 sticky top-6 flex flex-col gap-6 z-20 lg:max-h-[calc(100vh-60px)] lg:overflow-y-auto pr-1"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* 1. Altar: Selected Philosopher Details */}
            <div className="hidden lg:flex bg-gradient-to-b from-[#FDFDFB] to-[#F5F2EA] rounded-xl border-x-4 border-y border-double border-[#D4AF37] shadow-xl p-5 overflow-hidden relative min-h-[410px] flex-col justify-between">
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 mr-[1px]" />
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 ml-[1px]" />

              {selectedPhilosopher ? (
                <div className="flex flex-col h-full justify-between gap-4 z-10 relative">
                  
                  {/* Stele Header */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-sans uppercase tracking-widest text-[#D4AF37] bg-[#0D5C75] px-1.5 py-0.5 rounded shadow-xs">
                        {language === 'en' ? (schoolTranslations[selectedPhilosopher.school] || selectedPhilosopher.school) : selectedPhilosopher.school}
                      </span>
                      <span className="text-[9.5px] font-mono text-gray-500 font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">
                        {language === 'en' ? translateEraDisp(selectedPhilosopher.eraDisp) : selectedPhilosopher.eraDisp}
                      </span>
                    </div>

                    <h2 className="font-serif font-extrabold text-xl text-gray-900 tracking-wide mt-2 text-center border-b border-double border-[#D4AF37]/40 pb-1.5">
                      {language === 'en' ? (selectedPhilosopher.nameEng || selectedPhilosopher.name) : selectedPhilosopher.name}
                    </h2>
                    {language !== 'en' && (
                      <p className="text-[9.5px] text-gray-400 uppercase tracking-widest text-center mt-1 block font-serif font-light">
                        {selectedPhilosopher.nameEng}
                      </p>
                    )}
                  </div>

                  {/* Core concepts lists */}
                  <div>
                    <h4 className="text-[10px] font-bold font-sans uppercase text-amber-800 tracking-wider border-b border-[#D4AF37]/20 pb-0.5 mb-1.5">
                      📜 {language === 'zh' ? '核心命题与学说' : 'Core Tenets & Concepts'}
                    </h4>
                    <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1 animate-fadeIn">
                      {(language === 'en' ? (translatedPhilosopherValues[selectedPhilosopher.id]?.concepts || philosopherFallbackTranslations[selectedPhilosopher.id]?.concepts || selectedPhilosopher.concepts) : selectedPhilosopher.concepts).map((concept, index) => (
                        <div key={index} className="bg-white border-l-4 border-[#0D5C75] rounded p-2 shadow-xs text-[11px] font-serif text-gray-700 leading-relaxed">
                          {concept}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Detailed text */}
                  {selectedPhilosopher.details && (
                    <div className="bg-[#FAF8F5] border border-[#D4AF37]/20 rounded p-2.5 text-[11px] leading-relaxed font-serif text-gray-650 italic max-h-[110px] overflow-y-auto">
                      <span className="font-bold text-[#0D5C75] not-italic block mb-0.5 font-sans text-[9px] tracking-wider uppercase">
                        📖 {language === 'zh' ? '思想史综述' : 'Academic Worldview Summary'}
                      </span>
                      “ {language === 'en' ? (translatedPhilosopherValues[selectedPhilosopher.id]?.details || philosopherFallbackTranslations[selectedPhilosopher.id]?.details || selectedPhilosopher.details) : selectedPhilosopher.details} ”
                    </div>
                  )}

                  {/* Prompt for detail page */}
                  <div className="text-center pt-2">
                    <button
                      onClick={() => handlePhilosopherDoubleClick(selectedPhilosopher)}
                      className="w-full py-1.5 bg-[#FAF8F5] hover:bg-white text-[#0D5C75] text-[10px] font-serif font-bold border border-[#D4AF37] rounded shadow-xs tracking-wider uppercase transition-colors duration-250 cursor-pointer"
                    >
                      {language === 'zh' ? '双击人物卡 或【点击此处】深入主卷生平' : 'DOUBLE CLICK CARD OR 【CLICK HERE】 TO OPEN DEEP ARCHIVE'}
                    </button>
                  </div>

                  {/* Relationship Mapping inside Altar */}
                  <div className="border-t border-[#D4AF37]/20 pt-2">
                    <h4 className="text-[9.5px] font-bold font-sans uppercase text-gray-500 tracking-wide mb-1.5 font-serif">
                      ⚡ {language === 'zh' ? '历史脉络学术关联：' : 'Heritage Network Links:'}
                    </h4>
                    
                    {highlightedIds.size > 0 ? (
                      <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto pr-1">
                        {allPhilosophersFlat
                          .filter(p => highlightedIds.has(p.id) && p.id !== selectedPhilosopher.id)
                          .map(linked => (
                            <button
                              key={linked.id}
                              onClick={() => {
                                setSelectedPhilosopher(linked);
                              }}
                              className="bg-white hover:bg-[#EBF5F8] text-[9.5px] text-[#0D5C75] border border-[#0D5C75]/20 hover:border-[#D4AF37] rounded px-1.5 py-0.5 tracking-wide font-serif transition-colors duration-200 cursor-pointer"
                            >
                              {language === 'en' ? (linked.nameEng || linked.name) : linked.name}
                            </button>
                          ))}
                      </div>
                    ) : (
                      <span className="text-[9px] text-gray-400 font-sans block italic">
                        {language === 'zh' ? '可通过单击图谱上的其他先哲连接，实时关联其师承体系。' : 'Single click other philosophers on the river to inspect scholastic lineage intersections.'}
                      </span>
                    )}
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 z-10 relative">
                  <BookOpen className="w-10 h-10 text-[#D4AF37] mb-2 opacity-50" />
                  <h4 className="font-serif text-sm font-bold text-[#0B2545]/85">
                    {language === 'zh' ? '请在传承图上挑选贤哲' : 'Select a sage on the pedigree'}
                  </h4>
                  <p className="text-[11px] text-gray-400 max-w-sm mt-1">
                    {language === 'zh' ? '点击节点可快速锁定，双击则能开启功勋卓越的个人行卷。' : 'Click a node to highlight its lineage; double click to explore details.'}
                  </p>
                </div>
              )}
            </div>

            {/* 2. Compact Chronology Gnomon Card inside Sticky Sidebar */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#D4AF37]/35 p-3.5 shadow-md font-serif text-xs">
              <span className="text-[9.5px] tracking-wider text-amber-800 font-mono font-bold border-b border-[#D4AF37]/20 pb-1 mb-2 block uppercase">
                ⏱️ {language === 'zh' ? '历史时空定位 (Temporal Axis)' : 'Temporal Axis'}
              </span>
              <div className="flex flex-col gap-2 relative animate-fadeIn">
                <div className="absolute left-[5px] top-1 bottom-1 w-[1px] bg-[#D4AF37]/25" />
                {activePhilosophyData.map((epoch) => {
                  const isActive = activeEpochId === epoch.id;
                  const isEn = language === 'en';
                  const translatedEpoch = isEn ? epochTranslations[epoch.id] : null;
                  const displayTitle = translatedEpoch ? translatedEpoch.title : epoch.title;
                  const displaySubtitle = translatedEpoch ? translatedEpoch.subtitle : epoch.subtitle;

                  return (
                    <button
                      key={epoch.id}
                      onClick={() => scrollToEpoch(epoch.id)}
                      className="flex items-start gap-2 text-left group cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center mt-1">
                        <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center
                          ${isActive 
                            ? 'bg-[#D4AF37] border-white scale-120' 
                            : 'bg-white border-[#D4AF37]/35 group-hover:border-[#0D5C75]'
                          }`}
                        >
                          {isActive && <div className="w-1 h-1 bg-[#051726] rounded-full" />}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[8.5px] font-bold font-sans transition-colors duration-200
                          ${isActive ? 'text-[#0D5C75]' : 'text-gray-400 group-hover:text-amber-800'}`}>
                          0{epoch.id}·{displaySubtitle}
                        </span>
                        <span className={`text-[10px] leading-tight transition-colors duration-200 line-clamp-1
                          ${isActive ? 'text-gray-900 font-bold' : 'text-gray-500 group-hover:text-[#0D5C75]'}`}>
                          {displayTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

        </section>

        {/* MOBILE FLOATING DRAWER ALTAR: Appears fixed on viewport when selectedPhilosopher is set on screen sizes < lg */}
        <AnimatePresence>
          {selectedPhilosopher && (
            <motion.div
              initial={{ y: "150%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "150%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] bg-gradient-to-b from-[#FDFDFB] to-[#F5F2EA] rounded-2xl border-x-4 border-y border-double border-[#D4AF37] shadow-2xl p-5 overflow-hidden z-40 max-h-[75vh] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 mr-[1px]" />
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 ml-[1px]" />

              <div className="flex flex-col h-full justify-between gap-4 z-10 relative overflow-y-auto pr-1">
                {/* Stele Header */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold font-sans uppercase tracking-widest text-[#D4AF37] bg-[#0D5C75] px-1.5 py-0.5 rounded shadow-xs">
                      {language === 'en' ? (schoolTranslations[selectedPhilosopher.school] || selectedPhilosopher.school) : selectedPhilosopher.school}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] font-mono text-gray-500 font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">
                        {language === 'en' ? translateEraDisp(selectedPhilosopher.eraDisp) : selectedPhilosopher.eraDisp}
                      </span>
                      <button
                        onClick={() => setSelectedPhilosopher(null)}
                        className="text-slate-400 hover:text-slate-700 bg-white border border-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-3xs cursor-pointer"
                        title={language === 'en' ? 'Close' : '关闭'}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <h2 className="font-serif font-extrabold text-xl text-gray-900 tracking-wide mt-2 text-center border-b border-double border-[#D4AF37]/40 pb-1.5">
                    {language === 'en' ? (selectedPhilosopher.nameEng || selectedPhilosopher.name) : selectedPhilosopher.name}
                  </h2>
                  {language !== 'en' && (
                    <p className="text-[9.5px] text-gray-400 uppercase tracking-widest text-center mt-1 block font-serif font-light">
                      {selectedPhilosopher.nameEng}
                    </p>
                  )}
                </div>

                {/* Core concepts lists */}
                <div>
                  <h4 className="text-[10px] font-bold font-sans uppercase text-amber-800 tracking-wider border-b border-[#D4AF37]/20 pb-0.5 mb-1.5">
                    📜 {language === 'zh' ? '核心命题与学说' : 'Core Tenets & Concepts'}
                  </h4>
                  <div className="flex flex-col gap-1.5 max-h-[100px] overflow-y-auto pr-1">
                    {(language === 'en' ? (translatedPhilosopherValues[selectedPhilosopher.id]?.concepts || philosopherFallbackTranslations[selectedPhilosopher.id]?.concepts || selectedPhilosopher.concepts) : selectedPhilosopher.concepts).map((concept, index) => (
                      <div key={index} className="bg-white border-l-4 border-[#0D5C75] rounded p-2 shadow-xs text-[11px] font-serif text-gray-700 leading-relaxed">
                        {concept}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Detailed text */}
                {selectedPhilosopher.details && (
                  <div className="bg-[#FAF8F5] border border-[#D4AF37]/20 rounded p-2.5 text-[11px] leading-relaxed font-serif text-gray-650 italic max-h-[105px] overflow-y-auto">
                    <span className="font-bold text-[#0D5C75] not-italic block mb-0.5 font-sans text-[9px] tracking-wider uppercase">
                      📖 {language === 'zh' ? '思想史综述' : 'Academic Worldview Summary'}
                    </span>
                    “ {language === 'en' ? (translatedPhilosopherValues[selectedPhilosopher.id]?.details || philosopherFallbackTranslations[selectedPhilosopher.id]?.details || selectedPhilosopher.details) : selectedPhilosopher.details} ”
                  </div>
                )}

                {/* Prompt for detail page */}
                <div className="text-center pt-1.5">
                  <button
                    onClick={() => handlePhilosopherDoubleClick(selectedPhilosopher)}
                    className="w-full py-1.5 bg-[#FAF8F5] hover:bg-white text-[#0D5C75] text-[10px] font-serif font-bold border border-[#D4AF37] rounded shadow-xs tracking-wider uppercase transition-colors duration-250 cursor-pointer"
                  >
                    {language === 'zh' ? '双击 或【点击此处】深入主卷生平' : 'DOUBLE CLICK OR 【CLICK HERE】 FOR FULL BIO'}
                  </button>
                </div>

                {/* Relationship Mapping inside Altar */}
                <div className="border-t border-[#D4AF37]/20 pt-2">
                  <h4 className="text-[9.5px] font-bold font-sans uppercase text-gray-500 tracking-wide mb-1.5 font-serif">
                    ⚡ {language === 'zh' ? '历史脉络学术关联：' : 'Heritage Network Links:'}
                  </h4>
                  
                  {highlightedIds.size > 0 ? (
                    <div className="flex flex-wrap gap-1 max-h-[70px] overflow-y-auto pr-1">
                      {allPhilosophersFlat
                        .filter(p => highlightedIds.has(p.id) && p.id !== selectedPhilosopher.id)
                        .map(linked => (
                          <button
                            key={linked.id}
                            onClick={() => {
                              setSelectedPhilosopher(linked);
                            }}
                            className="bg-white hover:bg-[#EBF5F8] text-[9.5px] text-[#0D5C75] border border-[#0D5C75]/20 hover:border-[#D4AF37] rounded px-1.5 py-0.5 tracking-wide font-serif transition-colors duration-200 cursor-pointer"
                          >
                            {language === 'en' ? (linked.nameEng || linked.name) : linked.name}
                          </button>
                        ))}
                    </div>
                  ) : (
                    <span className="text-[9px] text-gray-400 font-sans block italic">
                      {language === 'zh' ? '可在图谱上单击其他先哲进行关联。' : 'Click other sages to link.'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 4: Interactive Symposium (Debate Arena) */}
        <section 
          className="mt-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-[#0B2545]/25 pb-2">
            <HelpCircle className="w-5 h-5 text-[#0B2545]" />
            <h2 className="font-serif text-lg font-bold text-[#0B2545] tracking-wider uppercase">
              {language === 'zh' ? '对话广场 · 思想论辩 (Symposium Arena)' : 'Universal Symposium · Dialectical Area'}
            </h2>
          </div>

          <SymposiumPanel
            epoch={activePhilosophyData.find(e => e.id === activeEpochId) || activePhilosophyData[0]}
            allEpochs={activePhilosophyData}
            onSelectPhilosopher={setSelectedPhilosopher}
            language={language}
            translatedPhilosopherValues={translatedPhilosopherValues}
            debateRemaining={debateRemaining}
            unlimitedActivated={unlimitedActivated}
            onDeductDebate={handleDeductDebate}
            onTriggerPayment={() => setPaymentModalOpen(true)}
          />
        </section>

        {/* SECTION 5: Legend / Instructions Explanation Panel */}
        <section 
          id="instructions-panel"
          className="bg-white border-2 hover:border-[#D4AF37]/80 transition-all border-[#D4AF37]/35 rounded-2xl p-6 text-slate-800 text-xs font-serif leading-relaxed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Column 1: Pedigree Levels */}
          <div>
            <h4 className="text-xs font-bold text-[#0B2545] tracking-wider mb-2.5 flex items-center gap-1 uppercase">
              <Star className="w-3.5 h-3.5 text-amber-600" />
              {language === 'zh' ? '传承连线与学术定位' : 'Lineage Connections & Pedigree'}
            </h4>
            <ul className="space-y-2 text-slate-600 text-[10.5px] font-sans">
              <li>
                <div className="flex items-center gap-1">
                  <span className="w-5 h-0.5 bg-[#0D5C75] inline-block"></span>
                  <span><b>{language === 'zh' ? '实线箭头 (➜)' : 'Solid Arrow (➜)'}</b>: {language === 'zh' ? '严密师资授受/正统流派继承。' : 'Direct teacher-student inheritance / orthodoxy.'}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-1">
                  <span className="w-5 h-0.5 border-b border-dashed border-[#0D5C75] inline-block"></span>
                  <span><b>{language === 'zh' ? '虚线箭头 (┈➜)' : 'Dashed Arrow (┈➜)'}</b>: {language === 'zh' ? '跨越时代的间接灵感与思想交锋。' : 'Cross-epoch indirect inspirations and dialogs.'}</span>
                </div>
              </li>
              <li className="pt-2.5 border-t border-gray-150">
                <b className="text-amber-800 font-semibold block mb-1">{language === 'zh' ? '五维学术继承层级' : '5-Tier Academic Pedigree Hierarchy'}</b>
                <ol className="pl-1 space-y-1 text-[10px] text-slate-550">
                  <li><span className="text-amber-700 font-bold">★★★★★ {language === 'zh' ? '巨擘宗师' : 'Sovereign Master'}</span> : {language === 'zh' ? '哲学王座基石，独享「流光」卡片与星盘刻度轴。' : 'Metaphysical titan, with customized shimmer effects.'}</li>
                  <li><span className="text-yellow-700 font-semibold">★★★★☆ {language === 'zh' ? '传世先驱' : 'Pioneering Leader'}</span> : {language === 'zh' ? '流派核心奠基人，享金砂哑光卡片与辅助定位轴。' : 'Core founder of schools, with sandy-gold border styles.'}</li>
                  <li><span className="text-indigo-900 font-medium">★★★☆☆ {language === 'zh' ? '核心贤哲' : 'Key Sage'}</span> : {language === 'zh' ? '学说谱系主力承传者，享经典金相层。' : 'Core transmitter of ideas, on standard gold axes.'}</li>
                  <li><span className="text-slate-700 font-medium">★★☆☆☆ {language === 'zh' ? '沿袭学者' : 'Contributing Scholar'}</span> : {language === 'zh' ? '学派集大成者/完善评注者。' : 'School synthesizers or commentators.'}</li>
                  <li><span className="text-slate-500 italic">★☆☆☆☆ {language === 'zh' ? '界外探索者' : 'Peripheral Explorer'}</span> : {language === 'zh' ? '旁支外围发展与思想交涉的探索者。' : 'Engaged in dialogs at boundary lines.'}</li>
                </ol>
              </li>
            </ul>
          </div>

          {/* Column 2: Specific School Colors & Legend - Matching real app colors! */}
          <div>
            <h4 className="text-xs font-bold text-[#0B2545] tracking-wider mb-2.5 flex items-center gap-1 uppercase font-serif">
              🎨 {language === 'zh' ? '学说学派与卡片色彩 (Card Colors)' : 'Schools & Visual Palette'}
            </h4>
            <div className="grid grid-cols-1 gap-1 stream-palette text-slate-600 text-[10px] font-sans">
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-teal-500 bg-[#F2FAF9] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '古自然哲学与宇宙学 (Teal)' : 'Cosmology & Nature'}</b>: {language === 'zh' ? '探讨世界的本原与自然科学。' : 'Inquire into the origin/arche of nature.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-sky-500 bg-[#F0F7FA] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '古希腊雅典流派 (Sky Blue)' : 'Classical Athens'}</b>: {language === 'zh' ? '雅典三杰、智者派与学院派。' : 'The Big Three, Sophists & Academy.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-amber-500 bg-[#FDF9F4] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '希腊化与罗马伦理 (Amber)' : 'Hellenistic & Roman'}</b>: {language === 'zh' ? '斯多葛、伊壁鸠鲁、新柏拉图。' : 'Stoicism, Epicureanism, Neoplatonism.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-emerald-500 bg-[#F5FAF5] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '中世纪神学经院 (Emerald)' : 'Scholastic & Theology'}</b>: {language === 'zh' ? '教父、阿奎那、唯名论。' : 'Patristics, Aquinas, Nominalism.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-indigo-500 bg-[#F4F6FC] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '近代唯理论 (Indigo)' : 'Modern Rationalism'}</b>: {language === 'zh' ? '笛卡尔、斯宾诺莎、莱布尼茨。' : 'Descartes, Spinoza, Leibniz.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-yellow-600 bg-[#FFFDF3] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '近代经验论 (Yellow)' : 'Modern Empiricism'}</b>: {language === 'zh' ? '培根、洛克、贝克莱、休谟。' : 'Bacon, Locke, Berkeley, Hume.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-rose-500 bg-[#FFF9FA] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '文艺复兴启蒙 (Rose)' : 'Renaissance & Enlightenment'}</b>: {language === 'zh' ? '人文主义、宗教改革与激进派。' : 'Humanism, Reformation & Radicals.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-purple-500 bg-[#FCF8FF] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '德意志古典哲学 (Purple)' : 'German Idealism'}</b>: {language === 'zh' ? '康德批判、黑格尔绝对精神。' : 'Kant criticized, Hegel Absolute Spirit.'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded border border-gray-150">
                <span className="w-3 h-3.5 rounded border-l-[3.5px] border-l-red-650 bg-[#FFFDFD] inline-block shadow-3xs" />
                <span><b>{language === 'zh' ? '实证与非理性 (Red)' : 'Positivism & Willism'}</b>: {language === 'zh' ? '意志主义、实证主义、马克思哲学。' : 'Schopenhauer, Nietzsche, Marx.'}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Directions Gnomon & Gestures */}
          <div>
            <h4 className="text-xs font-bold text-[#0B2545] tracking-wider mb-2.5 flex items-center gap-1 uppercase">
              🧭 {language === 'zh' ? '史学操作与时空轴心定位' : 'Navigation & Interactions'}
            </h4>
            <div className="text-slate-600 text-[10.5px] space-y-2.5 font-sans">
              <p>
                <b>① {language === 'zh' ? '脉络图谱纵向无限滑动' : 'Infinite Vertical Chronology Scroll'}</b>: {language === 'zh' ? '页面呈现单一、连续、长画卷轴。下划即是时光穿梭，随滚轮见证两千年哲学长河洗礼！右侧辅助面板实时展示当前高亮的活跃纪元时区（Temporal Axis）。' : 'A single, grand continuous scrollway canvas. Scroll down to travel through 2000 years of intellectual development. The right helper tracker updates dynamic active time-spaces natively.'}
              </p>
              <p>
                <b>② {language === 'zh' ? '学人操作锁定与关系高亮' : 'Selection Locking & Highlight'}</b>:
                <br />• <b>{language === 'zh' ? '单击卡片' : 'Single Click'}</b>: {language === 'zh' ? '在右侧“贤哲神龛”载入核心概念，并在图中照亮其师资、思想传承影响连线。' : 'Load core tenets in the right "Altar", lighting up lineage vectors across ages.'}
                <br />• <b>{language === 'zh' ? '双击卡片' : 'Double Click'}</b>: {language === 'zh' ? '开启解构式的贤哲生平独立行卷，展示学说、传记、不朽经典作品档案，点击“返回”一键归队。' : 'Slide into a deep biografical scroll mapping key books, quote cards, and detailed worldview. Click back to return.'}
              </p>
            </div>
          </div>

        </section>

      </main>
      ) : (
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 mt-6 flex flex-col gap-6 z-10">
          <MultilateralSymposium
            language={language}
            debateRemaining={debateRemaining}
            unlimitedActivated={unlimitedActivated}
            onDeductDebate={handleDeductDebate}
            onTriggerPayment={() => setPaymentModalOpen(true)}
            onSelectPhilosopher={(p) => {
              setDetailedPhilosopher(p);
              setActiveTab('chronology');
            }}
            setView={(v) => setActiveTab(v)}
          />
        </main>
      )}

      {/* Decorative Greek Meander Wave Footer Accent */}
      <footer className="mt-20 border-t border-[#0B2545]/20 pt-10 text-center text-xs text-[#0B2545]/85 relative bg-[#FAF8F5] pb-16">
        <GreekMeander className="absolute top-0 left-0 w-full transform -translate-y-full" />
        <p className="font-serif tracking-widest text-[#0B2545] font-bold text-[12px] uppercase">
          —— L O G O S  ·  A C A D E M Y ——
        </p>
        <p className="font-sans text-[10px] text-slate-500 mt-1.5 pb-4">
          {language === 'zh' ? '西方哲学思想库交互史迹脉络图谱' : 'Western Philosophy Chronicle Roll'} © 2026. Designed with Athens Alabaster Marble & Mediterranean Aegean Blue Palette
        </p>
      </footer>

      {/* THE PILL DOCK floating overlay bar (Screenshot 11.57.09) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(11,37,69,0.12)] px-5 py-3 rounded-full flex items-center justify-between gap-8 max-w-[92vw] select-none text-slate-700 font-sans transition-all">
        {/* Leftmost version identifier */}
        <div className="font-mono text-xs font-bold tracking-wider text-slate-400 pl-1 uppercase border-r border-[#D4AF37]/25 pr-4">
          v1.0.2
        </div>

        {/* Action jump links */}
        <div className="flex items-center gap-4 text-[12.5px] font-medium font-serif">
          <button 
            type="button"
            onClick={scrollToInstructions}
            className="hover:text-[#0D5C75] cursor-pointer transition-colors tracking-wide flex items-center gap-1 font-semibold group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 transition-transform group-hover:scale-110" />
            help
          </button>
          
          <button 
            type="button"
            onClick={() => {
              setCopiedEmail(false);
              setShowContactModal(true);
            }}
            className="hover:text-[#0D5C75] cursor-pointer transition-colors tracking-wide flex items-center gap-1 font-semibold group"
          >
            <Mail className="w-3.5 h-3.5 text-sky-600 transition-transform group-hover:scale-110" />
            contact
          </button>
          
          <button 
            type="button"
            onClick={() => {
              setFeedbackErrorMessage('');
              setFeedbackSuccessMessage('');
              setShowFeedbackModal(true);
            }}
            className="hover:text-[#0D5C75] cursor-pointer transition-colors tracking-wide flex items-center gap-1 font-semibold group text-amber-700"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-600 transition-transform group-hover:scale-110" />
            {language === 'zh' ? '反馈' : 'feedback'}
          </button>
        </div>

        {/* Right side interactive icons */}
        <div className="flex items-center gap-3.5 border-l border-[#D4AF37]/25 pl-4">
          {/* Language translation switch */}
          <div 
            className="flex items-center bg-[#FAF8F5] border border-[#D4AF37]/65 rounded-full p-0.5 shadow-3xs relative group"
            title={language === 'zh' ? "切换为英文学术注释 / Switch to English" : "切换为中文学术注释 / Switch to Chinese"}
          >
            <button
              type="button"
              onClick={() => setLanguage('zh')}
              className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                language === 'zh' 
                  ? 'bg-[#0B2545] text-[#FAF8F5] shadow-2xs' 
                  : 'text-slate-400 hover:text-[#0B2545]'
              }`}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                language === 'en' 
                  ? 'bg-[#0B2545] text-[#FAF8F5] shadow-2xs' 
                  : 'text-slate-400 hover:text-[#0B2545]'
              }`}
            >
              EN
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#0B2545] text-[#FAF8F5] text-[9px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mb-2 text-center whitespace-nowrap shadow-md font-sans border border-[#D4AF37]/30">
              {language === 'zh' ? "中英文切换 / Language Select" : "中英文切换 / Language Select"}
            </span>
          </div>

          {/* Music player toggle */}
          <button
            type="button"
            className="cursor-pointer p-1.5 rounded-full hover:bg-slate-100 transition-all relative group"
            onClick={() => setIsPlayingMusic(p => !p)}
            title="Toggle Ambient Study Labyrinth Music"
          >
            <Music className={`w-4 h-4 transition-transform group-hover:scale-110 ${isPlayingMusic ? 'text-emerald-600 animate-spin' : 'text-slate-600'}`} style={{ animationDuration: isPlayingMusic ? '8s' : '0s' }} />
            {isPlayingMusic && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 text-center whitespace-nowrap">
              {isPlayingMusic ? "Stop Music" : "Study Track"}
            </span>
          </button>
        </div>
      </div>

      {/* ATHENIAN ACADEMIC CONTACT MODAL */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#FAF8F5] border-3 double border-[#D4AF37] rounded-xl shadow-2xl p-6 flex flex-col gap-5 text-slate-800 font-serif"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D4AF37]/35 pb-2">
              <div className="flex items-center gap-1.5 text-[#0B2545] font-bold">
                <span>🏛️</span>
                <h3>{language === 'zh' ? '学人联络渠道' : 'Academic Contact'}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-slate-700 font-sans font-bold w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-650 space-y-3 font-sans leading-relaxed">
              <p>
                {language === 'zh' 
                  ? '欢迎同道中人对西方哲学思想库交互史迹谱系提出修订意见、新增贤哲主张或反馈学术错误。'
                  : 'Scholars are welcome to propose revision suggestions for the Western Philosophical Chronicle Roll, add critical philosopher tenets, or report academic bugs.'}
              </p>

              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold font-sans">
                  {language === 'zh' ? '✉️ 学术咨询邮箱' : '✉️ Inquiry Email'}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[13px] font-bold text-[#0D5C75] select-all font-semibold">
                    stephninja028@gmail.com
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('stephninja028@gmail.com');
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="px-3 py-1 text-[11px] bg-[#0B2545] text-[#FDFBF7] rounded border border-[#D4AF37]/50 hover:bg-[#0D5C75] transition-all font-serif font-bold scale-98 active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? (language === 'zh' ? '已复制' : 'Copied') : (language === 'zh' ? '复制' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-slate-450 italic text-justify leading-relaxed">
                * {language === 'zh'
                    ? '本平台遵守 Aletheia 经典人文学术联盟之开放共享公理，所有谱系连线、师资统绪、手稿箴言原卷均永久免费并支持一键引注文档。'
                    : 'This platform strictly follows the open-sharing axioms of the Aletheia Classical Studies Alliance. All network paths, teacher-student relationships, and core scripts are free forever.'}
              </div>
            </div>

            {/* Back Close button */}
            <div className="flex justify-center border-t border-slate-150 pt-3.5">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="px-6 py-2 bg-[#0B2545] hover:bg-[#0D5C75] text-[#FAF8F5] rounded border border-[#D4AF37]/50 shadow transition-all hover:scale-102 cursor-pointer text-xs font-serif font-semibold"
              >
                {language === 'zh' ? '关 闭 神 龛' : 'Close Altar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD REDEMPTION & PAYMENT TRIGGER MODAL */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        language={language}
        onSuccess={handlePaymentSuccess}
      />

      {/* ALWAYS ACTIVE FLOATING FEEDBACK SEAL ON HOMEPAGE */}
      <div className="fixed right-4 md:right-6 bottom-24 z-40 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            setFeedbackErrorMessage('');
            setFeedbackSuccessMessage('');
            setShowFeedbackModal(true);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-[#C2593F] hover:bg-[#A8452D] text-[#FAF8F5] font-serif font-extrabold text-xs tracking-wider border-2 border-[#D4AF37] rounded-full shadow-[0_4px_16px_rgba(194,89,63,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer uppercase"
        >
          <MessageSquare className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span>{language === 'zh' ? '✍️ 反馈作者' : '✍️ Feedback'}</span>
        </button>
      </div>

      {/* ATHENIAN ACADEMIC FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
          onClick={() => setShowFeedbackModal(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#FAF8F5] border-3 double border-[#D4AF37] rounded-xl shadow-2xl p-6 flex flex-col gap-5 text-slate-800 font-serif"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D4AF37]/35 pb-2">
              <div className="flex items-center gap-1.5 text-[#0B2545] font-bold">
                <span>✍️</span>
                <h3>{language === 'zh' ? '联系作者反馈' : 'Contact Author Feedback'}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-slate-700 font-sans font-bold w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 font-sans text-xs">
              <p className="font-serif italic text-slate-650 leading-relaxed text-justify">
                {language === 'zh' 
                  ? '为了更直接、高效地沟通，欢迎您通过以下方式直接联系作者提交反馈（如改进建议、学术修正或系统漏洞等），每一份反馈作者都会悉心研读！'
                  : 'To communicate more directly and efficiently, you are welcome to contact the author directly through the following channels to submit your feedback (such as feature suggestions, scholastic corrections, or system bugs).'}
              </p>

              {/* WECHAT */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold font-sans">
                  {language === 'zh' ? '💬 微信联系' : '💬 WeChat'}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[14px] font-bold text-[#0D5C75] select-all font-semibold">
                    Courageandpeace
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('Courageandpeace');
                      setCopiedWeChat(true);
                      setTimeout(() => setCopiedWeChat(false), 2000);
                    }}
                    className="px-3 py-1 text-[11px] bg-[#0B2545] text-[#FDFBF7] rounded border border-[#D4AF37]/50 hover:bg-[#0D5C75] transition-all font-serif font-bold scale-98 active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    {copiedWeChat ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWeChat ? (language === 'zh' ? '已复制' : 'Copied') : (language === 'zh' ? '复制微信' : 'Copy WeChat')}</span>
                  </button>
                </div>
              </div>

              {/* EMAIL */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold font-sans">
                  {language === 'zh' ? '✉️ 电子邮箱' : '✉️ Email Address'}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[14px] font-bold text-[#0D5C75] select-all font-semibold">
                    Stephninja028@gmail.com
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('Stephninja028@gmail.com');
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="px-3 py-1 text-[11px] bg-[#0B2545] text-[#FDFBF7] rounded border border-[#D4AF37]/50 hover:bg-[#0D5C75] transition-all font-serif font-bold scale-98 active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? (language === 'zh' ? '已复制' : 'Copied') : (language === 'zh' ? '复制邮箱' : 'Copy Email')}</span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-slate-450 italic text-justify leading-relaxed">
                * {language === 'zh'
                    ? '您的每一次反馈都是对我们最大的支持，我们将持续优化学术系统。'
                    : 'Each of your feedbacks is our greatest support, we will continue to optimize the academic system.'}
              </div>

              <div className="flex justify-center border-t border-slate-150 pt-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="w-full py-2 bg-[#0B2545] hover:bg-[#0D5C75] text-[#FAF8F5] rounded border border-[#D4AF37]/50 shadow transition-all hover:scale-102 cursor-pointer text-xs font-serif font-semibold"
                >
                  {language === 'zh' ? '关 闭' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
