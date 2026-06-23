export const schoolTranslations: Record<string, string> = {
  '米利都学派': 'Milesian School',
  '毕达哥拉斯学派': 'Pythagorean School',
  '爱利亚学派': 'Eleatic School',
  '爱奥尼亚学派': 'Ionian School',
  '多元论学派': 'Pluralist School',
  '原子论学派': 'Atomist School',
  '智者学派': 'Sophist School',
  '雅典学派': 'Athenian School',
  '麦加拉学派': 'Megarian School',
  '犬儒学派': 'Cynic School',
  '昔兰尼学派': 'Cyrenaic School',
  '怀疑主义': 'Skepticism',
  '伊壁鸠鲁学派': 'Epicureanism',
  '斯多葛学派': 'Stoicism',
  '折中主义': 'Eclecticism',
  '罗马斯多葛学派': 'Roman Stoicism',
  '犹太柏拉图主义': 'Jewish Platonism',
  '新柏拉图主义': 'Neoplatonism',
  '教父哲学': 'Patristic Philosophy',
  '中世纪过渡': 'Medieval Transition',
  '经院哲学早期': 'Early Scholasticism',
  '经院派（实在论）': 'Scholastic Realism',
  '唯名倾向': 'Nominalist Leaning',
  '早期唯名论': 'Early Nominalism',
  '概念论': 'Conceptualism',
  '阿拉伯哲学': 'Arabic Philosophy',
  '圣托马斯学派': 'Thomism',
  '经验学派（近科学）': 'Empirical School',
  '意志倾斜派': 'Voluntarism School',
  '唯名论学派': 'Nominalist School',
  '人文主义': 'Humanism',
  '美第奇学派': 'Medicean School',
  '科学/哲理过渡': 'Scientific Transition',
  '宗教改革': 'Protestant Reformation',
  '经验主义': 'Empiricism',
  '机械唯物主义': 'Mechanical Materialism',
  '理性主义': 'Rationalism',
  '独断形而上学': 'Dogmatic Metaphysics',
  '自然神论': 'Deism',
  '批判哲学': 'Critical Philosophy',
  '唯心主义': 'German Idealism',
  '同一唯心主义': 'Absolute Idealism',
  '青年黑格尔派': 'Young Hegelians',
  '唯物主义/社会学革命': 'Materialist Sociology',
  '非理性主义/超人哲学': 'Irrationalism & Übermensch',
  '意志主义': 'Voluntarism',
  '实证主义': 'Positivism',
  '功利主义': 'Utilitarianism',
  '社会达尔文主义': 'Social Darwinism',
  '数理逻辑/分析哲学先驱': 'Mathematical Logic / Analytic Philosophy Pioneer',
  '逻辑原子主义/分析哲学': 'Logical Atomism / Analytic Philosophy',
  '逻辑实证主义/日常语言学派': 'Logical Positivism / Ordinary Language School',
  '后分析哲学/科学宿命主义': 'Post-Analytic Philosophy / Scientific Naturalism',
  '现象学创始人': 'Founding Phenomenology',
  '存在论现象学/存在主义': 'Ontological Phenomenology / Existentialism',
  '存在主义': 'Existentialism',
  '美国实用主义先驱': 'American Pragmatism Pioneer',
  '实用主义': 'Pragmatism',
  '实用主义/进步教育': 'Pragmatism / Progressive Education',
  '后结构主义/权力批判': 'Post-Structuralism / Power Critique',
  '后结构主义/解构主义': 'Post-Structuralism / Deconstruction',
  '后分析哲学/新实用主义': 'Post-Analytic Philosophy / Neo-Pragmatism',
  '其它流派': 'Other Schools'
};

export const schoolLabelTranslations: Record<string, string> = {
  '宇宙科学/自然哲学': 'Cosmological Science / Natural Philosophy',
  '古希腊雅典流派': 'Classical Athens & Academies',
  '希腊化与罗马伦理学': 'Hellenistic and Roman Ethics',
  '中世纪神学与经院学派': 'Medieval Theology & Scholastics',
  '近代唯理论': 'Modern Rationalism',
  '近代经验论': 'Modern Empiricism',
  '文艺复兴与启蒙运动': 'Renaissance and Enlightenment',
  '德意志古典哲学': 'German Classical Idealism',
  '现代实证与非理性转向': 'Modern Positivism & Irrational Turn',
  '其他思想领域': 'Other Intellectual Domains'
};

export const epochTranslations: Record<number, { title: string; subtitle: string; description: string; timeGrid: string[] }> = {
  1: {
    title: 'Ancient Greek and Roman Philosophy',
    subtitle: '6th Century BC ~ 4th Century AD',
    description: 'The cradle of Western philosophy. From the inquiry of nature (Arche) to Socrates, Plato, and Aristotle investigating human virtue and intellect, eventually dividing into schools seeking tranquility during the Hellenistic & Roman eras.',
    timeGrid: ['6th Cent BC', '5th Cent BC', '4th Cent BC', '3rd-2nd Cent BC', '1st Cent BC', '1st-2nd Cent AD', '3rd-4th Cent AD']
  },
  2: {
    title: 'Medieval & Scholastic Philosophy',
    subtitle: '5th Century AD ~ 14th Century AD',
    description: 'The struggle between faith and reason. In the long era of Christian rule in Europe, scholasticism rose from Patristic theology to height with the debate between nominalism and realism, paving way for modern reasoning.',
    timeGrid: ['5th Cent AD', '9th Cent AD', '11th Cent AD', '12th Cent AD', '13th Cent AD', '14th Cent AD']
  },
  3: {
    title: 'Renaissance & Early Modern Philosophy',
    subtitle: '15th Century ~ 17th Century',
    description: 'The awakening of reason and self-identity. Breaking away from theology, thinkers established grand rationalism (Descartes, Spinoza, Leibniz) and ground-breaking empiricism (Bacon, Locke, Berkeley, Hume).',
    timeGrid: ['15th Cent', '16th Cent', 'Early 17th Cent', 'Mid 17th Cent', 'Late 17th Cent']
  },
  4: {
    title: 'French Enlightenment and Materialism',
    subtitle: '18th Century',
    description: 'The light of reason illuminating old regimes. Moving out of salons to active social change, French thinkers championed deism, separation of powers, and encyclopedic systems, forming the humanist soul of revolution.',
    timeGrid: ['Early 18th Cent', 'Mid 18th Cent', 'Late 18th Cent']
  },
  5: {
    title: 'German Classical Philosophy',
    subtitle: '1770 ~ 1844 AD',
    description: 'The grand dome of Western rationality. Spurred by Kant\'s Copernican transition in epistemology, Fichte, Schelling, and Hegel reached a peak of absolute idealism, before Feuerbach brought reasoning back to earthly humanism.',
    timeGrid: ['1780s', '1800s', '1820s', '1830s', '1840s']
  },
  6: {
    title: 'Transition Period and Late 19th Century',
    subtitle: '1844 ~ 1900 AD',
    description: 'The tumultuous eve of modern thought. Classical system collapsed as voluntarism declared life\'s tragic suffering; positivism championed empirical science Co-movement with Marx\'s historical materialism aiming to crash open the gates of the old world.',
    timeGrid: ['1850s', '1860s', '1870s', '1880s', '1890s', '1900s']
  },
  7: {
    title: 'Modernity, Analytic and Contemporary Great Divergence',
    subtitle: '20th Century ~ Present',
    description: 'Entering the 20th century, two world wars shattered the grand narratives of universal progress. Philosophy underwent a massive divergence: Anglo-American "Analytic Philosophy" focused on logical analysis, science, and clarity of language; Continental "Phenomenology and Postmodernism" confronted the absurdity of existence, body observation, and deconstruction of power systems; while American "Pragmatism" championed tangible utility and learning-by-doing.',
    timeGrid: ['1900s-1920s Foundations', '1930s-1950s Existential Choice', '1960s-1980s Post-Modernity', '1990s-Present Neo-Pragmatism']
  }
};

export const symposiumTranslations: Record<string, { title: string; question: string; dialogue: Array<{ speaker: string; text: string }> }> = {
  'ideal-real': {
    title: 'First Arche: Ultimate Pointing of the Mind',
    question: 'Is the ultimate absolute nature of the world an ideal form or the objective things themselves?',
    dialogue: [
      {
        speaker: 'Plato',
        text: 'My dear pupil, look at these marble columns. Every physical pillar will weather and decay, for they are mere shadows in the material world. Only the "Form of the Column" exists eternally in the realm of pure intellect.'
      },
      {
        speaker: 'Aristotle',
        text: 'Master, I love you, but I love truth more. If the Form exists separately from concrete columns, it is of no use and cannot explain movement. The unity of matter and form alone constitutes concrete "primary substance"!'
      },
      {
        speaker: 'Plato',
        text: 'But if the soul had not beheld that perfect absolute truth, beauty, and goodness before birth, how could we recollect and recognize even a fragment of justice and completion in this imperfect world?'
      },
      {
        speaker: 'Aristotle',
        text: 'The soul does not recollect. Rather, the human mind observes multiple concrete columns, then abstracts their common form. Knowledge must evolve from concrete "matter" toward "formal purpose".'
      }
    ]
  },
  'empiric-rational': {
    title: 'Knowledge Inquiry: Innate Ideas vs. Blank Slate',
    question: 'Is the absolute foundation of human knowledge innate ideas inscribed in soul or sensation on a blank slate?',
    dialogue: [
      {
        speaker: 'Descartes',
        text: 'Even if I doubt everything—the world, God, demons, and my own body—I still confirm "I think, therefore I am". Mathematical and logical truths are innate ideas deeply engraved in our souls by God at creation.'
      },
      {
        speaker: 'Locke',
        text: 'Mr. Descartes, if you observe a newborn infant or an uncultivated savage, has a single mathematical axiom ever flashed in their soul? No! The human mind begins as a blank slate (Tabula Rasa), totally empty.'
      },
      {
        speaker: 'Descartes',
        text: 'Indeed, the blank slate can record sensations, but sensory experiences are deceptive. Tell me, without an innate idea of "the infinite and perfect", how could our finite senses ever conceive the proof of an infinitely perfect God?'
      },
      {
        speaker: 'Locke',
        text: 'We abstract, refine, and compile simple ideas into complex towers via "reflection" based on sensations of finite things. Awareness rises brick-by-brick from ground level, requiring no divine innate concepts.'
      }
    ]
  },
  'will-power': {
    title: 'Path of Salvation: Ascetic Quieting vs. Dionysian Song',
    question: 'Since life\'s essence is blind suffering, should we seek salvation in quietism or transcend tragedy through Dionysian courage?',
    dialogue: [
      {
        speaker: 'Schopenhauer',
        text: 'Life itself is a web woven by a blind, insatiable Will to Live. Unsatisfied desire is pain; satisfaction is boredom. Life swings like a pendulum between pain and boredom. Ultimate salvation lies in silencing the Will through ascetic denial.'
      },
      {
        speaker: 'Nietzsche',
        text: 'Oh! My great predecessor! You pointed to the Will, yet turned away in cowardice. The Will is not blind suffering; it is the "Will to Power"—the tragic desire to overcome oneself, to grow stronger! Suffering is the beautiful orchestration of life!'
      },
      {
        speaker: 'Schopenhauer',
        text: 'Nietzsche, screaming your Will to Power will only burn you deeper. Only in pure aesthetic contemplation of art, or the saint\'s desireless state, can we lay down arms and find a temporary quiet sanctuary in this brutal world.'
      },
      {
        speaker: 'Nietzsche',
        text: 'Quiet is the mediocre luxury of the "last man". We should follow Dionysus, laugh at the abyss in the midst of extreme intoxication and tragic shattering, proclaim "God is dead," revalue all values, and shape ourselves into the Overman (Übermensch)!'
      }
    ]
  },
  'spirit-matter': {
    title: 'Wheels of History: Absolute Spirit vs. Productive Force',
    question: 'Is the driving force of human history the evolution of "Absolute Spirit" or the material production of classes?',
    dialogue: [
      {
        speaker: 'Hegel',
        text: 'History is a grand, destined drama. It is the "Absolute Spirit" externalizing itself through time, and in the conflicts of nations, gradually achieving self-consciousness and returning to the ultimate kingdom of Reason.'
      },
      {
        speaker: 'Marx',
        text: 'Master Hegel, your dialectic is admirable, but it was standing on its head. History is not the mystical stroll of Absolute Spirit. Its actual engine is the "material production practice" of living human beings striving for survival!'
      },
      {
        speaker: 'Hegel',
        text: 'Yet, Reason is the ultimate sovereign force. Great heroes or ordinary workers are but instruments of the "Cunning of Reason," advancing the grand edifice of world order and freedom without knowingly doing so.'
      },
      {
        speaker: 'Marx',
        text: 'Your grand edifice of law and reason is but the "superstructure" constructed by the ruling class who owns the "means of production" to maintain their power. The dialectic of productive forces and relations of production is the real motor of history!'
      }
    ]
  }
};

// High-fidelity pre-translated English data for key classical philosophers as a fast static fallback/cache
export const philosopherFallbackTranslations: Record<string, {
  details: string;
  lifeAndTimes?: string;
  worldviewSummary?: string;
  quote?: string;
  reflectionQuestion?: string;
  concepts: string[];
  comparisons?: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  socrates: {
    details: 'The father of ethical inquiry and critical dialog. He shifted philosophy from cosmology to human self-knowledge of ignorance, arguing that the unexamined life is not worth living, and died for his pursuit of truth.',
    lifeAndTimes: 'Lived in the direct Golden Age of Athenian democracy. Undergoing Peloponnesian war and political unrest, he challenged youths to question accepted dogmas in the Athenian Agora, resulting in his conviction and death by hemlock.',
    worldviewSummary: 'Argued that virtue is knowledge and evil is born of ignorance. His Socratic irony and elenchus (dialectical testing) revolutionized epistemic humility, demonstrating that recognizing ignorance is the first step of real wisdom.',
    quote: 'The unexamined life is not worth living.',
    concepts: [
      'Inquiry of Ignorance (Know Thyself)',
      'Elenchus Dialectical Method',
      'Equating Virtue with Knowledge'
    ],
    comparisons: [
      {
        withName: 'Protagoras',
        coreDifference: 'Protagoras asserted "Man is the measure of all things", advocating moral relativism; Socrates sought eternal, absolute definitions of justice and virtue transcending transient human opinion.',
        reflectionPrompt: 'Are justice and moral values subjective parameters defined by societal constructs, or are there universal moral truths that wait to be uncovered?'
      }
    ]
  },
  plato: {
    details: 'The architect of Western metaphysics. He built the dualism of the physical world and the eternal, perfect World of Forms (Ideas), establishing the Academy to cultivate philosopher kings.',
    lifeAndTimes: 'Disciple of Socrates, deeply shattered by his execution. He traveled widely before establishing the Academy in Athens, writing cinematic dialogs to immortalize Socratic thought and construct his own metaphysical blueprint.',
    worldviewSummary: 'Proposed the Theory of Forms, declaring the material world is but a shadow of the perfect, conceptual paradigm. Developed the Allegory of the Cave, showing the journey of soul from sensory delusion to intellectual light.',
    quote: 'Access to real knowledge must transcend sensory perception and touch the eternal realm of Forms.',
    concepts: [
      'Metaphysical Theory of Forms',
      'The Allegory of the Mythical Cave',
      'Philosopher-King Ideal Polity'
    ],
    comparisons: [
      {
        withName: 'Aristotle',
        coreDifference: 'Plato placed absolute reality in the separate world of transcendent Forms; Aristotle argued that forms are embedded directly inside physical objects as their internal organizing principles.',
        reflectionPrompt: 'Does the truth of our reality reside in abstract, mathematical principles beyond our senses, or in the empirical details of the concrete world?'
      }
    ]
  },
  aristotle: {
    details: 'The master of classical catalog and logic. He unified empirical investigation and logical rigor, formulating hylomorphism (matter and form), teleology, and virtue ethics as direct guides to happiness (Eudaimonia).',
    lifeAndTimes: 'Studied at Plato\'s Academy for 20 years. Later tutored Alexander the Great, and established the Lyceum (Peripatetic School) in Athens. He systematically categorized all branches of human knowledge from physics to politics.',
    worldviewSummary: 'Constructed hylomorphism, declaring all objects are composites of matter (potentiality) and form (actuality). History is driven teleologically towards its actualization, pointing to the Prime Mover as pure intellect.',
    quote: 'Amicus Plato, sed magis amica veritas (Plato is my friend, but truth is a better friend).',
    concepts: [
      'Hylomorphism (Matter and Form)',
      'The Four Causes and Teleology',
      'Golden Mean Virtue Ethics'
    ],
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'While Plato sought truth via pure deduction looking up to perfect forms, Aristotle walked the path of empirical induction, classifying natural specimens to extract universal principles.',
        reflectionPrompt: 'How can we reconcile the pursuit of transcendent ideals with the reality of living in a world of practical, sensory experiences?'
      }
    ]
  },
  eriugena: {
    details: 'Irish master in the school of early Scholasticism. He was the sole philosopher of his dark era who was fluent in Greek, enabling him to retrieve and translate the works of Pseudo-Dionysius and Plotinus to build a majestic cosmic synthesis.',
    concepts: [
      'The Division of Nature',
      'Reason Guiding Faith',
      'Pantheistic Leaning'
    ],
    lifeAndTimes: 'An isolated Irish scholar active in the early Middle Ages. Appointed as director of the Palace School by Charles the Bald, he shone as a rare brilliant star under the cover of a desolate epoch, bridging Greek and Latin traditions.',
    worldviewSummary: 'He integrated Neoplatonic concepts into Christian cosmology. His work "De Divisione Naturae" parses Nature into four divisions: Creator but uncreated (God as Origin), Created and creating (divine Ideas or Logos), Created but uncreating (the visible physical universe), and Uncreated and uncreating (God as the ultimate end of return). He boldly proposed that God and the world are ultimately one unified, shining, divine living reality (Theophany).',
    quote: 'God is the essence of all things, the absolute and shining light of life breathing through every corner of existence. The earthly landscape is but a sparkling mirror of His self-expression.',
    comparisons: [
      {
        withName: 'Plotinus',
        coreDifference: 'Plotinus viewed material creation as a degenerate domain of darkness and absolute evil at the edge of the One; Eriugena Christianized this, declaring that even the humblest element of dust is woven by divine fire with redemptive light.',
        reflectionPrompt: 'Do you view the material universe as a source of corruption and moral temptation, or as an organic canvas radiating divine structure and vital aesthetic laws?'
      }
    ]
  },
  averroes: {
    details: 'The peak of Islamic Aristotelian scholasticism, widely known as "The Commentator" of Aristotle\'s works. Living in the golden, scientific atmosphere of Al-Andalus, his translations and extensive commentaries resuscitated classical philosophy in Western Europe.',
    concepts: [
      'Double Truth Theory',
      'The Prime Mover',
      'Shared Universal Intellect'
    ],
    lifeAndTimes: 'Spanning the peak of Islamic philosophy as a judge (Qadi) and physician in Cordoba. Despite suffering late-life banishment due to conservative theologian backlash, his commentaries preserved Aristotle, triggering the Western Scholastic renaissance.',
    worldviewSummary: 'He championed the revolutionary Double Truth Theory, arguing that theology and rational philosophy are separate, equally valid domains that need not bow to each other. He asserted that religious texts use symbolic metaphors to guide the lay masses, whereas philosophical logic uses pure mathematics and physics to reveal actual cosmic causes. He also formulated Monopsychism, proposing a unified, immortal active intellect shared by all humanity.',
    quote: 'Reason and natural philosophy are under no obligation to kneel before rigid dogmatic mandates. Faith provides rich paint for the public soul, but rigorous logic is the telescope through which true lovers of wisdom observe the universe.',
    comparisons: [
      {
        withName: 'Thomas Aquinas',
        coreDifference: 'Averroes asserted that faith and philosophy are separate parallel tracks that require no synthesis; Aquinas painstakingly constructed a comprehensive synthesis, arguing that rational proofs lead directly up to theological truth.',
        reflectionPrompt: 'Is it better to maintain separate, independent spheres for different roles in life (e.g., cold business logic and warm emotional bonds) or to integrate them into a singular, harmonized worldview?'
      }
    ]
  },
  thales: {
    details: 'The first philosopher of the West. He broke with mythological origins, declaring that Water is the first principle (Arche) of all things, introducing rational natural scientific explanation.',
    concepts: [
      'Water is the Arche of All',
      'All things are full of gods',
      'Rational Cosmology of Nature'
    ]
  },
  pythagoras: {
    details: 'The mystic of mathematics. He declared that Number is the fundamental substance of the universe, blending mathematical discovery with spiritual purification of the soul.',
    concepts: [
      'Number is the Essense of All',
      'Transmigration of the Soul',
      'Cosmic Harmony of Spheres'
    ]
  },
  heraclitus: {
    details: 'The dark philosopher of absolute motion. He argued that everything is in flux, and fire is the ultimate material metaphor coordinate with the Logos governing constant structural change.',
    concepts: [
      'Panta Rhei (Everything Flows)',
      'Cosmic Fire is the Arche',
      'The Logos of Unity in Opposites'
    ]
  },
  descartes: {
    details: 'The father of modern philosophy. He sought indubitable certainty via systematic doubt, discovering the foundational truth "Cogito, ergo sum" and establishing a dualism of mind and body.',
    concepts: [
      'Methodological Radical Doubt',
      'Cogito, Ergo Sum (I think, therefore I am)',
      'Mind-Body Cartesian Dualism'
    ]
  },
  spinoza: {
    details: 'The radical monist. He declared that God and Nature are one undivided substance (Deus sive Natura), championing geometric deduction to uncover the deterministic joy of intellectual love of God.',
    concepts: [
      'Pantheism (God or Nature)',
      'Geometric Epistemic Method',
      'Substance and Infinite Attributes'
    ]
  },
  locke: {
    details: 'The pioneer of modern empiricism and liberal democracy. He asserted the mind is a Tabula Rasa on which experience writes, defending natural rights to life, liberty, and estate.',
    concepts: [
      'Tabula Rasa (The Blank Slate)',
      'Primary and Secondary Qualities',
      'Natural Rights & Social Contract'
    ]
  },
  hume: {
    details: 'The ultimate skeptic. He dismantled causal necessity and the unified self, anchoring moral judgments in sentiment and sparking Kant\'s dogmatic slumber.',
    concepts: [
      'Skeptical Analysis of Causality',
      'Perceptions: Impressions and Ideas',
      'Emotivism in Moral Sentiments'
    ]
  },
  kant: {
    details: 'The master of synthetic critique. He executed a Copernican revolution in philosophy, reconciling rationalism and empiricism by proving that the mind actively structures sensory experience.',
    concepts: [
      'Copernican Epistemic Revolution',
      'Transcendental Idealism',
      'Categorical Imperative Deontology'
    ]
  },
  hegel: {
    details: 'The giant of absolute dialectics. He charted history as the grand self-realization of the Absolute Spirit, moving dynamically through tensions of thesis, antithesis, and synthesis.',
    concepts: [
      'Absolute Idealism',
      'Dialectical Geist (Absolute Spirit)',
      'Sovereign State and Freedom'
    ]
  },
  schopenhauer: {
    details: 'The philosopher of tragic pessimism. He characterized the universe as the blind, insatiable, driving Will, seeking salvation via aesthetic contemplation, sympathy, and quietist renunciation.',
    concepts: [
      'The World as Will and Representation',
      'Existential Tragic Pessimism',
      'Ascetic Silencing of the Will'
    ],
    quote: 'Life is a business whose profits do not by any means cover its expenses. Life swings like a pendulum backward and forward between pain and boredom.',
    comparisons: [
      {
        withName: 'Hegel',
        coreDifference: 'The most famous intellectual rivalry of the 19th Century: Hegel believed that history and nature evolve rationally toward the Absolute Geist; Schopenhauer declared the world is a blind, irrational arena of insatiable Will and suffering.',
        reflectionPrompt: 'Does the universe or history progress toward a rational, harmonious finality, or is the world a blind wilderness of raw survival and existential repetition?'
      }
    ]
  },
  nietzche: {
    details: 'The iconoclast who declared the death of God. He urged the revaluation of all values, heralding the Will to Power, the Übermensch, and the eternal recurrence as ecstatic acts of life-affirmation.',
    concepts: [
      'Dionysian Metaphysical Intoxication',
      'The Will to Power & Overman',
      'Deconstruction of Master-Slave Morality'
    ],
    quote: 'God is dead! All self-overcoming must rely on the Will to Power roaring within each individual who stands tall amidst suffering. Man is a tightrope stretched over an abyss between beast and Overman. Sing Amor Fati: even if this cold life repeats its tragedies on eternal recurrence, I will laugh and shout for it to return a thousand times over!',
    comparisons: [
      {
        withName: 'Schopenhauer',
        coreDifference: 'Schopenhauer proved the world is driven by a blind Will to Live, leading to permanent suffering, and urged ascetic renuniciation; Nietzsche revolted, declaring the Will to be the Will to Power—an active self-overcoming to be embraced through tragic joy.',
        reflectionPrompt: 'When facing life’s meaningless suffering, should we seek peaceful ascetic detachment and inner desirelessness, or should we proudly unleash our active vitality as the armor-backed Overman?'
      },
      {
        withName: 'Marx',
        coreDifference: 'Marx believed history is driven by material conditions and collective labor, aiming for a classless, equal society; Nietzsche dismissed collective equality as slave morality born of resentment, arguing that humanity’s meaning resides solely in the rare, self-legislating Overmen.',
        reflectionPrompt: 'Is justice found in collective solidarity to build an equal, exploitation-free public world, or is it found in ascending to solitary individual excellence that surpasses mediocre conventions?'
      }
    ]
  },
  nietzsche: {
    details: 'The iconoclast who declared the death of God. He urged the revaluation of all values, heralding the Will to Power, the Übermensch, and the eternal recurrence as ecstatic acts of life-affirmation.',
    concepts: [
      'Dionysian Metaphysical Intoxication',
      'The Will to Power & Overman',
      'Deconstruction of Master-Slave Morality'
    ],
    quote: 'God is dead! All self-overcoming must rely on the Will to Power roaring within each individual who stands tall amidst suffering. Man is a tightrope stretched over an abyss between beast and Overman. Sing Amor Fati: even if this cold life repeats its tragedies on eternal recurrence, I will laugh and shout for it to return a thousand times over!',
    comparisons: [
      {
        withName: 'Schopenhauer',
        coreDifference: 'Schopenhauer proved the world is driven by a blind Will to Live, leading to permanent suffering, and urged ascetic renuniciation; Nietzsche revolted, declaring the Will to be the Will to Power—an active self-overcoming to be embraced through tragic joy.',
        reflectionPrompt: 'When facing life’s meaningless suffering, should we seek peaceful ascetic detachment and inner desirelessness, or should we proudly unleash our active vitality as the armor-backed Overman?'
      },
      {
        withName: 'Marx',
        coreDifference: 'Marx believed history is driven by material conditions and collective labor, aiming for a classless, equal society; Nietzsche dismissed collective equality as slave morality born of resentment, arguing that humanity’s meaning resides solely in the rare, self-legislating Overmen.',
        reflectionPrompt: 'Is justice found in collective solidarity to build an equal, exploitation-free public world, or is it found in ascending to solitary individual excellence that surpasses mediocre conventions?'
      }
    ]
  },
  montesquieu: {
    details: 'A monumental French political philosopher of the Enlightenment, and jurist who pioneered the modern theory of the separation of powers as a core foundation for free constitutional governance.',
    concepts: [
      'Separation of Powers & Checks',
      'Sovereignty & Spirit of Laws',
      'Climatic/Geographic Law Theory'
    ],
    quote: 'To prevent the abuse of power, it is necessary from the very nature of things that power should be a check to power. Constant experience shows us that every man invested with power is apt to abuse it, and to carry his authority as far as it will go.',
    comparisons: [
      {
        withName: 'Thomas Hobbes',
        coreDifference: 'Hobbes argued that human beings are naturally warring beasts requiring an absolute Sovereign (Leviathan) with unified authority; Montesquieu argued that undivided absolute power guarantees tyranny, and insisted on separating power to maintain liberty.',
        reflectionPrompt: 'To secure a society or project, is it better to trust a highly centralized, fast-acting singular authority, or to establish structural checks and columns that guard against individual hubris at the cost of immediate speed?'
      }
    ]
  },
  voltaire: {
    details: 'The guiding light of the French Enlightenment, a master of wit and satire who tirelessly attacked religious fanaticism, dogmatic intolerance, and state tyranny, defending free expression and reason.',
    concepts: [
      'Deism & Cosmic Clockmaker',
      'Inviolable Liberty of Expression',
      'Cultivation of the Local Garden'
    ],
    quote: 'Tolerance is the first law of humanity. I detest what you write, but I would give my life to make it possible for you to continue writing. Let us cultivate our own gardens.',
    comparisons: [
      {
        withName: 'Jean-Jacques Rousseau',
        coreDifference: 'Voltaire viewed luxurious European civilization, science, and fine arts as achievements of human enlightenment; Rousseau claimed civilized progress corrupts natural human goodness, urging a return to primal nature.',
        reflectionPrompt: 'In navigating our modern, tech-saturated life, do you embrace Voltairean cultivation of intellect and fine civilization, or do you long to throw off societal expectations to reconnect with raw nature?'
      },
      {
        withName: 'G. W. Leibniz',
        coreDifference: 'Leibniz maintained that our world’s suffering is pre-established for a cosmic greater harmony; Voltaire’s satirical "Candide" dismantled this, declaring we must stop dreaming of pre-established harmony and focus on practical labor.',
        reflectionPrompt: 'When experiencing tragic losses, do you find comfort in believing they are part of a divine, harmonious cosmic design, or do you accept pure contingency and focus simply on what is immediately within your hand?'
      }
    ]
  },
  rousseau: {
    details: 'The champion of romantic sentiment and popular sovereignty, whose revolutionary social contract theory, critique of civilization, and educational philosophy reshaped modern politics and literature.',
    concepts: [
      'The Sovereign General Will',
      'Natural Accusation of Civilization',
      'Social Contract of Real Freedom'
    ],
    quote: 'Man is born free, and everywhere he is in chains. Society’s luxury and competitive vanity are mere paper garlands concealing our slavery. The only contract is the full devotion of individual interests to the sacred General Will.',
    comparisons: [
      {
        withName: 'Voltaire',
        coreDifference: 'Rousseau diagnosed modern progress as the source of inequality and spiritual malaise, arguing for natural instincts; Voltaire mocked this, defending cities, arts, and elegant science as humanity’s proper heights.',
        reflectionPrompt: 'Do we become truly human by climbing the ladders of intellectual, social, and aesthetic civilization, or by stripping away societal labels to discover the pristine natural soul?'
      }
    ]
  },
  marx: {
    details: 'The revolutionary socio-economic theorist. He turned Hegel on his head, devising historical materialism to prove that the base of productive relationships drives human history towards classless emancipation.',
    concepts: [
      'Historical Dialectical Materialism',
      'Economic Base of Production',
      'Class Alienation and Communism'
    ]
  },
  frege: {
    details: 'The pioneer of mathematical logic and modern analytic philosophy. He devised first-order predicate logic, separating the "Sense" (cognitive presentation) and "Reference" (objective referent) of terms to eliminate linguistic confusion.',
    lifeAndTimes: 'Lived as a quiet and lonely mathematician at Jena University. He self-funded the publication of his masterwork "The Basic Laws of Arithmetic," which was neglected due to its complex symbolism. Right before publishing, he received Bertrand Russell\'s devastating letter exposing the logical contradiction (Russell\'s Paradox) in his set foundation. Though crushed, his pioneering work was later championed by Russell and Wittgenstein, posthumously conferring upon him the crown of analytic philosophy\'s founding father.',
    worldviewSummary: 'An advocate of logicism who sought to base arithmetic entirely on logic. He introduced the distinction between "Sense" (Sinn - the mode of presentation of a term) and "Reference" (Bedeutung - the actual object designated). For instance, "the Morning Star" and "the Evening Star" differ in sense but share the same reference (Venus). This division resolved centuries of semantic confusion in metaphysics and gave language a precise algebraic calculus comparable to Newtonian physics.',
    quote: "Logic is not psychology. Thinking is not a random neurological subjective stream; it belongs to an objective, eternal realm of truth. Just as Venus exists regardless of whether anyone looks up to see it, logical truths remain pristine and unmoved by human mental states.",
    reflectionQuestion: 'Frege teaches us to separate the mode of looking at an object (Sense) from the actual entity (Reference). Think about the grand terms over which humans argue, such as "happiness" or "success." For some, success is wealth; for others, it is quiet peace. Can we, like Frege, clarify our definitions before fighting, and appreciate that different senses may point to the exact same reference of mental well-being?',
    concepts: [
      'Foundations of Mathematical Logic',
      'Sense and Reference Division',
      'Anti-psychologism Logical Theory'
    ],
    comparisons: [
      {
        withName: 'Immanuel Kant',
        coreDifference: 'Kant argued that mathematical truths are "synthetic a priori," heavily relying on human innate spatial and temporal intuition. Frege revolted by defending logicism, asserting mathematics is analytical and independent of human sensory perception.',
        reflectionPrompt: 'Is mathematics a convenient cognitive projection constructed by human brain structures to make sense of nature, or is it an absolute, objective logical reality that would survive even if humanity vanished?'
      }
    ]
  },
  russell: {
    details: 'Renaissance scholar, Nobel Laureate, and co-founder of analytic philosophy. He discovered Russell\'s Paradox, co-authored "Principia Mathematica" to secure mathematical foundations, and advanced logical atomism.',
    lifeAndTimes: 'Born into British high aristocracy, he faced a lonely childhood. In his autobiography, he wrote that only his pursuit of mathematical beauty kept him from suicide. A fiery pacifist and social activist, he was jailed twice for anti-war protests, yet survived to receive the Nobel Prize in Literature. He was driven by three simple but overwhelming passions: the longing for love, the search for knowledge, and an unbearable pity for the suffering of mankind.',
    worldviewSummary: 'Discovered the set-theoretic paradox (e.g., "Does the barber who shaves only those who do not shave themselves shave himself?") that shook mathematics. He spent ten years with Whitehead co-writing "Principia Mathematica" to solve it via Type Theory. His "Theory of Descriptions" demonstrated that everyday grammar is deceptive and must be decoded via formal logic to resolve puzzles about non-existent objects (e.g., "The present King of France is bald"). He viewed the world as a mosaic of logical atoms.',
    quote: "Three passions, simple but overwhelmingly strong, have governed my life: the longing for love, the search for knowledge, and unbearable pity for the suffering of mankind. These passions, like great winds, have blown me hither and thither, in a wayward course, over a deep ocean of anguish, reaching the very verge of despair.",
    reflectionQuestion: 'Russell\'s Theory of Descriptions reminds us that we are often held hostage by terms with no real referents (e.g., "the perfect spouse," "the guaranteed safe job"). We torture ourselves trying to achieve these illusions. Can you, like Russell, dissect your life\'s overwhelming anxieties into solvable, concrete logical atoms?',
    concepts: [
      'Theory of Descriptions',
      'Russell\'s Barber Paradox',
      'Logical Atomism Grid'
    ],
    comparisons: [
      {
        withName: 'G. W. Leibniz',
        coreDifference: 'Leibniz envisioned a characteristica universalis where disputing scholars could simply sit down, take out their pens, and say: "Let us calculate!" Russell, centuries later, fulfilled this dream by co-creating modern symbolic logic.',
        reflectionPrompt: 'Can all human interpersonal disputes and existential sorrows eventually be calculated away by clean, objective logic, or does the deep core of life always remain outside the scale of mathematical axioms?'
      }
    ]
  },
  wittgenstein: {
    details: 'The ultimate enigma of 20th-century philosophy. He authored "Tractatus Logico-Philosophicus" in war trenches, then dismantled it in "Philosophical Investigations" to initiate ordinary language philosophy.',
    lifeAndTimes: 'Born into an ultra-wealthy steel dynasty in Vienna, where three of his brothers committed suicide. He struggled with suicidal impulses his entire life. Russell considered him "the most perfect example of a genius." He wrote his early masterpiece in trenches as an artilleryman in WWI, then gave away his immense inheritance to work as an austere village schoolteacher, gardener, and architect. Returning to Cambridge later, he lived in a bare attic, delivering quiet, revolutionary aphorisms to spellbound students. He died of cancer in Cambridge with peaceful final words: "Tell them I\'ve had a wonderful life."',
    worldviewSummary: 'Uniquely created and then dismantled two of the most significant movements in 20th-century language philosophy. In his early work (Picture Theory), he argued language is a logical map of the world, co-extensive with facts. What can be said clearly should be said clearly; on metaphysical matters, one must "keep silent." In his late work (Language Games), he realized this was an idealized, friction-free ice of logic where humans cannot walk. He returned to the rough ground of daily life, proposing that language is a toolkit of "games" where meaning is defined solely by "use." Language is not a perfect mirror, but a social tool.',
    quote: "Philosophy is a battle against the bewitchment of our intelligence by means of language. Its goal is to show the fly the way out of the fly-bottle. Whereof one cannot speak, thereof one must be silent.",
    reflectionQuestion: 'His early work advises us: "Stop talking about things you cannot logically prove." His late work advises: "Get out of the ivory tower and engage in the games of real life." Do you construct your own conceptual "fly-bottles" of despair by demanding absolute definitions of things like "perfect happiness"? Can you find relief by simply engaging in concrete, everyday activities like cooking, sweeping, or helping a neighbor?',
    concepts: [
      'Picture Theory: What Can Be Said',
      'Sublime Silence on the Inexpressible',
      'Language Games and Family Resemblance'
    ],
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'Plato built an eternal repository of perfect, absolute Concepts (the Forms); Wittgenstein argued that general terms lack a singular essence, instead sharing a web of overlapping "family resemblances" rooted in practice.',
        reflectionPrompt: 'Are justice, goodness, and beauty eternal ideals shining in heaven for us to replicate, or are they fluid, cooperative agreements negotiated in the trials of human language-games?'
      }
    ]
  },
  quine: {
    details: 'Harvard giant of analytical and post-analytical philosophy. He demolished the analytic-synthetic distinction in "Two Dogmas of Empiricism," advocating holism and naturalized epistemology.',
    lifeAndTimes: 'Spent over seven decades teaching at Harvard, known for his precision, rigor, and love of mapping and travel. His highly technical papers transformed analytic philosophy, turning it away from speculative logical construction and toward direct alliance with natural science.',
    worldviewSummary: 'Rejected the traditional logical positivism dogmas, particularly the sharp separation between analytical truths (true by definitions) and synthetic truths (true by physical facts). He advanced "Confirmation Holism," arguing our beliefs face the tribunal of experience as a unified web, not as isolated sentences. He also asserted the "Indeterminacy of Translation" (exemplified by the word "gavagai" representing a rabbit), proving no translation is uniquely correct, and advocated that philosophy should be treated as a branch of natural science.',
    quote: "Our statements about the external world face the tribunal of sensory experience not individually but only as a corporate body. Epistemology, or something like it, simply falls into place as a chapter of psychology and hence of natural science.",
    reflectionQuestion: 'Quine\'s holism points out that no belief exists in a vacuum. If you suffer from a sudden disappointment, it ripples across your entire web of meaning, threatening to tear it down. Can you look at your belief system as an evolving, resilient web that can adjust its peripheral threads to protect your core?',
    concepts: [
      'Two Dogmas of Empiricism',
      'Ontological Commitment',
      'Indeterminacy of Translation'
    ],
    comparisons: [
      {
        withName: 'Bertrand Russell',
        coreDifference: 'Russell believed that we can analyze compound sentences down to unique, foundational logical atom facts. Quine argued that such reductionism is a myth, and our beliefs are bound together in an inescapable, holistic web.',
        reflectionPrompt: 'Is knowledge built of clean, individual modular bricks that we stack up, or is it a single massive spiderweb where touching any thread vibrates the entire structure?'
      }
    ]
  },
  husserl: {
    details: 'Founding father of modern phenomenology. He demanded to "Return to things themselves!" by setting aside all conceptual assumptions via transcendental suspension (Epoché).',
    lifeAndTimes: 'Born into a Jewish family, he held a doctorate in mathematics but dedicated his life to reforming philosophy into an absolute, rigorous science of consciousness. He mentored Martin Heidegger and inspired Sartre. When the Nazi regime stripped him of his emeritus privileges and banned him from the university library due to his Jewish heritage, he continued writing thousands of pages of shorthand in dignified silence. He died before the war ended, uttering final words: "I have seen... I am seeing a blinding light!"',
    worldviewSummary: 'Designed the phenomenological method to rescue humanity from the spiritual crisis of scientism and alienation. He declared the battle cry: "To the things themselves!" (Zu den Sachen selbst). He argued our perception of the world is layered with assumptions, scientific formulas, and social filters. He devised "Phenomenological Bracketing" (Epoché), urging us to place all scientific and metaphysical assumptions in brackets, enabling us to observe the pure "intentionality" of raw consciousness stream without filters.',
    quote: "To the things themselves! We must bracket all scientific, historical, and common-sense biases to look with absolute purity at the raw stream of consciousness as it directly presents itself to the mind.",
    reflectionQuestion: 'Husserl offers a beautiful cognitive escape called "Epoché" (Bracketing). When you feel overwhelmed by labels such as "failure" or "aging," can you put these social constructs in brackets and set them aside? What happens when you focus solely on the immediate physical reality: the warmth of your tea, the rhythm of your breath, and the sunlight on the desk?',
    concepts: [
      'To the Things Themselves!',
      'Epoché: Phenomenological Bracketing',
      'Intentionality of Consciousness'
    ],
    comparisons: [
      {
        withName: 'Immanuel Kant',
        coreDifference: 'Kant asserted that we are trapped on our side of the cognitive wall, forever barred from knowing the "thing-in-itself". Husserl removed that barrier, proving that the pure phenomenon, when bracketed, is the ultimate reality.',
        reflectionPrompt: 'Is your mind a spectator looking through a tinted glass at an unreachable world, or does your consciousness merge directly with the essence of things when you clear away your assumptions?'
      }
    ]
  },
  heidegger: {
    details: 'The towering and controversial existential ontologist of the Black Forest. He revived the question of "Being," defining human existence as "Dasein" thrown into the world, facing death with向死而生 (resolute authenticity).',
    lifeAndTimes: 'Grew up in rural Germany, deeply attached to the rustic mountains and woods of the Black Forest. His unmatched charisma as a lecturer drew students from all over Europe. However, his legacy is deeply stained by his brief service as Rector under the Nazi regime in 1933. After the war, he was banned from teaching and retired to a secluded mountain cabin in Todtnauberg, spinning dense, poetic meditations on technology, home, and poetry that left an indelible mark on 20th-century thought.',
    worldviewSummary: 'Shattered two millennia of Western metaphysics, which he accused of forgetting "Being" (Sein) in favor of analyzing material "beings" (Seiende). He defined the human being as "Dasein" (Being-there) — a unique existence that is "thrown" (Geworfenheit) into a world without its consent, slipping into the inauthentic chatter of the crowd (Das Man). To achieve authenticity, Dasein must embrace "Being-towards-death" (Sein zum Tode): recognizing its radical finitude to seize its own irreplaceable projection of existence in the clearing of Being.',
    quote: "We are thrown into a world we did not choose, but death is our most authentic, non-relational, and ultimate possibility. Facing this finitude allows us to rescue ourselves from the chatter of the crowd and dwell poetically on this earth.",
    reflectionQuestion: 'Heidegger\'s "Being-towards-death" is a profound antidote to trivial modern anxieties. In the busy rush of social media, we are often lost in "inauthentic chatter." Have you ever had a moment where the stark realization of your own mortality suddenly dissolved minor worries, revealing what actually matters? How can you live more poetically today?',
    concepts: [
      'Dasein: Being-in-the-world',
      'Being-towards-death Resolution',
      'The Clearing and Poetic Dwelling'
    ],
    comparisons: [
      {
        withName: 'Friedrich Nietzsche',
        coreDifference: 'Nietzsche championed the Will to Power as the ultimate driving force of overmen conquering their destiny. Heidegger warned that the Will to Power is actually the extreme peak of modern technological nihilism, calling instead for a meditative "letting-be" (Gelassenheit).',
        reflectionPrompt: 'To survive modern alienation, must we exert our intense Will to Power to conquer our environment, or should we let go of control and assume a state of quiet listening to the mystery of Being?'
      }
    ]
  },
  sartre: {
    details: 'French existentialist titan and café revolutionary. He declared "Existence precedes essence," asserting people are born totally blank with no predetermined destiny, and must define themselves by action.',
    lifeAndTimes: 'A diminutive, cross-eyed force of nature who became the face of post-war Parisian intellectual life. He co-founded existentialism, fought in the resistance, spent time in a German cargo camp, and lived an unconventional life with his lifelong intellectual partner Simone de Beauvoir. In a legendary show of independence, he refused the Nobel Prize in Literature in 1964, declaring that a writer should not allow himself to be turned into an institution.',
    worldviewSummary: 'Brought existentialism to the streets with his maxim "Existence precedes essence" (L\'existence précède l\'essence). Unlike objects designed with a purpose (essence), humans are born without any predefined blueprint. We are "condemned to be free," entirely responsible for constructing our character and values through our choices. To blame circumstances or fate is "Bad Faith" (Mauvaise foi). He warned that "Hell is other people" (L\'enfer, c\'est les autres), as the gaze of others tries to objectify and freeze our radical freedom.',
    quote: "Man is nothing else but what he makes of himself. Existence precedes essence. We are left alone, without excuse. We are condemned to be free. Hell is other people who try to categorize and freeze your free soul.",
    reflectionQuestion: 'Sartre is the ultimate cure for victim mentalities. Have you ever blamed your upbringing, your setbacks, or your environment for holding you back from your dreams? If "existence precedes essence," you are a blank canvas at every second. What choice will you make in this very minute to write your own destiny?',
    concepts: [
      'Existence Precedes Essence',
      'Condemned to Be Free',
      'Hell is Other People'
    ],
    comparisons: [
      {
        withName: 'Søren Kierkegaard',
        coreDifference: 'Kierkegaard resolved existential dread by urging a passionate, blind "leap of faith" into the divine; Sartre insisted on atheistic existentialism, leaving human beings completely alone to craft their own meaning in an empty universe.',
        reflectionPrompt: 'When standing at the edge of life\'s abyss, do we find salvation by surrendering to an unprovable divine order, or by asserting our own solitary freedom to build meaning from nothing?'
      }
    ]
  },
  peirce: {
    details: 'American mathematician, logician, and the founder of pragmatism. He formulated the pragmatist maxim, anchoring the meaning of concepts to their practical, observable effects.',
    lifeAndTimes: 'Born into an academic family at Harvard, he was a brilliant scientist who suffered from lifelong physical pain and erratic temperament. His refusal to conform to academic decorum led to his banishment from university posts. He lived his final years in severe poverty and isolation in a drafting house, writing thousands of pages of ground-breaking manuscripts. He died unrecognized, now praised as America\'s greatest logician.',
    worldviewSummary: 'Formulated the Pragmatist Maxim: the meaning of any intellectual concept is defined entirely by the practical, observable effects its adoption would produce. If two conflicting theories yield no difference in practice, the dispute is hollow. He designed a triadic model of semiotics (Sign, Object, Interpretant) and championed "Fallibilism"—the view that human knowledge is never absolute, but is a self-correcting scientific journey.',
    quote: "Consider what effects, that might conceivably have practical bearings, we conceive the object of our conception to have. Our conception of these effects is the whole of our conception of the object. There is no absolute foundation, only self-correcting science.",
    reflectionQuestion: 'Peirce\'s pragmatist maxim is a mental leaf-blower for cleaning out useless overthinking. If you are agonizing over whether your career is "your ultimate true calling," ask yourself: what practical, observable differences in your daily actions does this question make? If none, can you let go of the abstract stress and focus on the practical work in front of you?',
    concepts: [
      'Pragmatist Maxim of Meaning',
      'Fixation of Belief',
      'Triadic Semeiotic Model'
    ],
    comparisons: [
      {
        withName: 'Baruch Spinoza',
        coreDifference: 'Spinoza built a rigid, geometric universe where everything is locked in deterministic, absolute causal chains of a single infinite substance. Peirce championed fallibilism and cosmic evolution, viewing the universe as open, changing, and full of chance.',
        reflectionPrompt: 'Is the world a completed, flawless math equation waiting to be solved, or is it an open experiment where chance and evolutionary adjustments shape the rules as we go?'
      }
    ]
  },
  james: {
    details: 'Beloved father of American psychology and pragmatism. Facing major depression, he created the "Cash Value" of truth: beliefs that inspire survival and yield tangible mental dividends are true.',
    lifeAndTimes: 'Born into a distinguished family, he struggled in his youth with severe neurasthenia and suicidal depression. He cured himself by choosing to believe that his will was free. He went on to establish America\'s first experimental psychology laboratory at Harvard and published "The Principles of Psychology," bringing a warm, humanistic tone to American philosophy.',
    worldviewSummary: 'Redefined truth not as a static, copy-like reflection of an external world, but as something dynamic that "happens to an idea" when it is put to work. True ideas are those that have "Cash Value" (practical, life-enhancing utility) in the stream of experience. Under his "Radical Empiricism," the universe is not a finished block of cement, but an open-ended pluralistic adventure where our subjective "Will to Believe" can actively bring about positive realities.',
    quote: "Truth is what works. Its cash value is the practical difference it makes in our concrete experiences. The greatest discovery of my generation is that a human being can alter his life by altering his attitude of mind.",
    reflectionQuestion: 'James asks us to evaluate our deep beliefs by their "cash value." If believing in your own capacity to overcome a challenge gives you the courage to wake up with hope and take action, then that belief is a working truth for you. What belief can you choose to adopt tonight that will pay immediate mental dividends tomorrow?',
    concepts: [
      'Cash Value of Truth Theory',
      'Radical Empiricism Stream',
      'The Will to Believe Option'
    ],
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Locke described the mind as a passive "blank slate" (tabula rasa) that merely records impact data. James revolutionized this by proving the mind is an active, passionate engine whose subjective faith can reshape the external world.',
        reflectionPrompt: 'Are you a passive recorder recording the hard facts of your environment, or does your attitude and belief act as a steering wheel that actively molds the very facts you encounter?'
      }
    ]
  },
  dewey: {
    details: 'The champion of American progressive education and pragmatism. He defined ideas as "Instruments" (Instrumentalism) for adapting to environments, advocating "learning-by-doing" and democratic community.',
    lifeAndTimes: 'Lived a long and productive life of 93 years, witnessing two world wars and traveling across the globe (including China, Russia, and Mexico) to promote education reform. He established the famous Laboratory School at the University of Chicago, transforming education from rote memorization into real-world problem-solving.',
    worldviewSummary: 'Advanced "Instrumentalism," arguing that ideas, scientific theories, and philosophies are not eternal truths to be worshipped, but intellectual "instruments" (like stone axes or computers) created by humans to solve problems and adapt to environmental challenges. He championed "learning-by-doing," casting education as life itself, and defined democracy as a collaborative way of living.',
    quote: "Ideas are not ready-made truths. They are instruments, tools of inquiry, designed to reconstruct our environment and solve problems. We only learn by doing, and education is not preparation for life; education is life itself.",
    reflectionQuestion: 'Dewey asks us to treat our theories as tools. If your self-help books and philosophical reflections don\'t help you communicate better with your family or fix actual bugs in your code, they are rusty tools. How can you step out of passive reading and start "learning by doing" in your active life today?',
    concepts: [
      'Instrumentalism of Ideas',
      'Education as Life Itself',
      'Democratic Public Inquiry'
    ],
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel viewed history as the inevitable unfolding of the Absolute Spirit toward a pre-written rational end. Dewey dismantled this teleology, transforming dialectics into a practical, open-ended laboratory of social democratic reform.',
        reflectionPrompt: 'Is society rolling along a pre-ordained track toward some inevitable final system, or does our future depend entirely on the small experimental habits of community and education we build daily?'
      }
    ]
  },
  foucault: {
    details: 'Iconic French post-structuralist and rebel. He explored clinics, prisons, and asylums to prove that "Knowledge is Power," demonstrating how modern institutions shape us via invisible systems of surveillance.',
    lifeAndTimes: 'A charismatic, bald, intellectual rock star of post-war Paris. Born into a conservative medical family, he rebelled against bourgeois life. He was a regular in student protests, climbed university roofs in 1968 to hurl bricks at police, and explored the edges of human experience to understand sanity, sexuality, and deviance. He died of AIDS at the height of his powers, leaving behind a legacy of absolute resistance to institutional control.',
    worldviewSummary: 'Used historical "Archeology" and "Genealogy" to expose the link between knowledge and social control, coining the phrase "Power/Knowledge" (pouvoir-savoir). He argued that modern institutions (prisons, hospitals, schools) do not represent progress in kindness, but rather a more refined, inescapable form of "disciplinary power". He revived Bentham’s "Panopticon" concept to show how modern systems get us to monitor and regulate our own behavior.',
    quote: "Knowledge is not pure; it is the teeth of power. Modern society is a Panopticon where we are under invisible, permanent observation, training us to watch and punish ourselves in the micro-networks of daily life.",
    reflectionQuestion: 'Foucault\'s concept of the Panopticon helps us understand modern stress. We worry about meeting performance reviews, aesthetic standards, and societal timelines. Have you ever realized that you are your own warden, constantly judging and punishing yourself even when no one is watching? How can you break out of this invisible grid and reclaim your authentic self?',
    concepts: [
      'Power/Knowledge Archeology',
      'Panopticon Invisible Prison Mod',
      'The Death of Man and Genealogy'
    ],
    comparisons: [
      {
        withName: 'Friedrich Nietzsche',
        coreDifference: 'Nietzsche formulated the genealogy of morals to show the psychological struggle between master and slave morality; Foucault broadened this into a microscopic historical analysis of institutional archives.',
        reflectionPrompt: 'Are scientific guidelines, psychological diagnoses, and social norms neutral paths of human wellness, or are they subtle net grids constructed by power networks to categorize and tame our wilder nature?'
      }
    ]
  },
  derrida: {
    details: 'French philosopher of deconstruction. He asserted "There is nothing outside the text," dismantling Western logocentrism with "Différance"—the infinite deferral of absolute presence in language.',
    lifeAndTimes: 'Born into a Jewish family in Algeria during French colonial rule, he was expelled from school in his youth due to antisemitic quotas. This outsider status shaped his life’s mission: dismantling the safe, authoritative centers of Western thought. With his striking white hair and poetic, elusive style, he became a lightning rod of controversy, transforming literary criticism and critical theory across the globe.',
    worldviewSummary: 'Created "Deconstruction" to expose the fragility of Western "Logocentrism" (the belief that language can perfectly capture an absolute origin of truth). He famously declared "There is nothing outside the text" (Il n\'y a pas de hors-texte), meaning we can never escape the web of language to touch an unmediated reality. He coined "Différance"—pointing out that meaning is always based on "difference" from other words, and always "deferred" (postponed) along an endless chain of signifiers.',
    quote: "There is nothing outside the text. Meaning is never fully present in a single word; it is always deferred, slipping away across a labyrinth of endless differences. Deconstruct the center to set free the silent margins of thought.",
    reflectionQuestion: 'Derrida\'s deconstruction frees us from dogmatic classifications. When we treat concepts like "the correct lifestyle" as absolute truths, we make ourselves miserable. Can you apply deconstruction to the rules that bind you? What happens when you realize they are just historical texts that can be rewritten to make room for your own unique story?',
    concepts: [
      'There is Nothing Outside the Text',
      'Différance (Difference and Deferral)',
      'Deconstruction of Logocentrism'
    ],
    comparisons: [
      {
        withName: 'Edmund Husserl',
        coreDifference: 'Husserl championed phenomenological intuition as a way to grasp the absolute "presence" of meaning in consciousness; Derrida argued that "presence" is an illusion, forever deferred by the traces of language (différance).',
        reflectionPrompt: 'Is truth a single crystal-clear light that you can hold in your mind, or is it an ongoing, elusive text that you write and rewrite as you live your life?'
      }
    ]
  },
  rorty: {
    details: 'American neo-pragmatist. He criticized the "Mirror of Nature" illusion, arguing language is not a mirror reflecting objective reality but a tool, and philosophy must transform into a conversational forum.',
    lifeAndTimes: 'Raised in an activist, socialist family, he was a prodigy who entered the University of Chicago at fifteen and became a top analytic philosopher at Princeton. In an academic scandal, he abandoned his career in prestigious analytical departments to study literature, releasing "Philosophy and the Mirror of Nature." He dedicated his later years to championing progressive democratic reform and the healing power of literature.',
    worldviewSummary: 'Attacked the foundationalist obsession of philosophy to serve as a "Mirror of Nature" (the idea that the mind is a mirror reflecting objective truths). He argued that language is not a device of "copying" reality, but a tool for "coping" with our environment. He proposed a "Post-Philosophical Culture" where philosophy relinquishes its claim as a scientific judge and becomes an open-ended conversation to foster solidarity and human empathy.',
    quote: "The mind is not a mirror of nature. Language is a tool for coping, not copying. We must set aside the search for absolute metaphysical foundations and focus on expanding our human empathy and democratic conversation.",
    reflectionQuestion: 'Rorty reminds us that formulas and cold logical axioms have never comforted a grieving heart or healed a wounded relationship. We do not need a grand theory of everything to live well. Can you stop seeking a "perfect logic" for your life, and instead find peace in simply talking, creating art, and sharing empathy with those around you?',
    concepts: [
      'Breaking the Mirror of Nature',
      'Post-Philosophical Culture Dialogue',
      'Liberal Ironist Empathy'
    ],
    comparisons: [
      {
        withName: 'John Dewey',
        coreDifference: 'Dewey relied heavily on scientific inquiry and laboratory-like problem-solving to drive democratic progress; Rorty pushed pragmatism further, trading scientific frameworks for literary empathy and conversational irony.',
        reflectionPrompt: 'Is social harmony achieved by refining our scientific methods and objective data rules, or by reading stories, sharing art, and engaging in open, empathetic conversation?'
      }
    ]
  }
};

export function translateEraDisp(era: string | undefined): string {
  if (!era) return '';
  let res = era;
  // Replace standard patterns
  res = res.replace(/世纪初期/g, '世纪 early').replace(/世纪中期/g, '世纪 mid').replace(/世纪晚期/g, '世纪 late');
  res = res.replace(/世纪/g, ' Century');
  res = res.replace(/初期/g, ' Early').replace(/中期/g, ' Mid').replace(/晚期/g, ' Late');
  res = res.replace(/BC/g, 'BC').replace(/AD/g, 'AD');
  
  if (res.includes('Century')) {
    let prefix = '';
    if (res.includes('BC')) {
      prefix = 'BC';
      res = res.replace('BC', '').trim();
    } else if (res.includes('AD')) {
      prefix = 'AD';
      res = res.replace('AD', '').trim();
    }
    
    let suffix = '';
    if (res.includes('early')) {
      suffix = 'Early';
      res = res.replace('early', '').trim();
    } else if (res.includes('mid')) {
      suffix = 'Mid';
      res = res.replace('mid', '').trim();
    } else if (res.includes('late')) {
      suffix = 'Late';
      res = res.replace('late', '').trim();
    }

    let numStr = res.replace('Century', '').trim();
    let ordinal = numStr;
    if (numStr === '1') ordinal = '1st';
    else if (numStr === '2') ordinal = '2nd';
    else if (numStr === '3') ordinal = '3rd';
    else if (numStr === '4') ordinal = '4th';
    else if (numStr === '5') ordinal = '5th';
    else if (numStr === '6') ordinal = '6th';
    else if (numStr === '7') ordinal = '7th';
    else if (numStr === '8') ordinal = '8th';
    else if (numStr === '9') ordinal = '9th';
    else if (numStr === '11') ordinal = '11th';
    else if (numStr === '12') ordinal = '12th';
    else if (numStr === '13') ordinal = '13th';
    else if (numStr === '14') ordinal = '14th';
    else if (numStr === '15') ordinal = '15th';
    else if (numStr === '16') ordinal = '16th';
    else if (numStr === '17') ordinal = '17th';
    else if (numStr === '18') ordinal = '18th';
    else if (numStr === '19') ordinal = '19th';
    else if (numStr === '20') ordinal = '20th';
    else if (numStr === '3~2') ordinal = '3rd~2nd';
    
    let finalStr = `${suffix ? suffix + ' ' : ''}${ordinal} Century${prefix ? ' ' + prefix : ''}`;
    return finalStr.trim();
  }

  res = res.replace(/年代/g, 's');
  res = res.replace(/公元前/g, 'BC ');
  res = res.replace(/公元/g, 'AD ');
  return res.trim();
}

export const conceptTranslations: Record<string, string> = {
  '水是万物的本原': 'Water is the Arche of All',
  '第一位哲学家': 'The First West Philosopher',
  '阿派朗（无定形）': 'Apeiron (The Unbounded)',
  '气是本原': 'Air is the Arche',
  '凝聚与稀薄': 'Condensation and Rarefaction',
  '唯一的神': 'The Only True God',
  '拟人神批判': 'Critique of Anthropomorphic Gods',
  '“一”': 'The "One"',
  '万物皆数': 'All Things are Numbers',
  '数学宇宙观': 'Mathematical Cosmology',
  '有形与无形': 'The Formed and the Unformed',
  '灵魂转世': 'Transmigration of the Soul',
  '存在者存在': 'What is, is',
  '非存在不存在': 'What is not, is not',
  '真理之路与意见之路': 'The Way of Truth & Way of Opinion',
  '万物皆流': 'Everything Flows (Panta Rhei)',
  '火是本原': 'Fire is the Arche',
  '逻各斯（万物规律）': 'The Logos',
  '人一次也不能跨入同一条河流': 'One cannot step even once in the same river',
  '不可言说': 'The Unspeakable',
  '芝诺悖论': 'Zeno Paradoxes',
  '两分法': 'The Dichotomy Paradox',
  '阿基里斯与乌龟': 'Achilles and the Tortoise',
  '飞矢不动': 'The Arrow Paradox',
  '存在是无限的': 'Being is Infinite',
  '四根说（水火土气）': 'The Four Roots (Water/Fire/Earth/Air)',
  '爱与恨（动力）': 'Love and Strife',
  '种子说': 'The Theory of Seeds',
  '心灵（Nous）': 'The Nous (Universal Mind)',
  '万物皆有万物': 'Everything in Everything',
  '原子与虚空': 'Atoms and the Void',
  '机械唯物论': 'Mechanical Materialism',
  '影像说': 'The Theory of Eidola',
  '人是万物的尺度': 'Man is the measure of all things',
  '感觉的相对性': 'Relativity of Sensation',
  '无物存在': 'Nothing exists',
  '如有物存在也不可知': 'If anything exists, it is incomprehensible',
  '如可知也无法告知他人': 'If incomprehensible, it is incommunicable',
  '认识你自己': 'Know Thyself',
  '我知道我一无所知': 'I know that I know nothing',
  '产婆术（辩证法）': 'Socratic Elenchus (Midwifery)',
  '美德即知识': 'Virtue is Knowledge',
  '善是唯一的': 'The Good is One',
  '摆脱虚荣': 'Freedom from Vanity',
  '自然生活': 'Live according to Nature',
  '自制自足': 'Self-mastery and Self-sufficiency',
  '寻找一个诚实的人': 'Looking for an honest man',
  '住在木桶里': 'Living in a tub',
  '不要挡住我的阳光': 'Do not block my sunlight',
  '肉体快乐是最高善': 'Bodily pleasure is the highest good',
  '理念论': 'Theory of Forms',
  '物质与理性的二分': 'Dualism of Matter and Reason',
  '回忆说': 'Theory of Recollection',
  '辩证法': 'Dialectics',
  '洞穴隐喻': 'Allegory of the Cave',
  '理想国': 'The Republic',
  '第一哲学（存在本身）': 'First Philosophy (Being qua Being)',
  '实体说（第一、第二实体）': 'Theory of Substance',
  '四因说（质料/形式/动力/目的）': 'The Four Causes',
  '三段论（逻辑学奠基）': 'Syllogism (Foundations of Logic)',
  '悬置判断': 'Epoché (Suspension of Judgment)',
  '不发表意见': 'Aphasia (Quietism)',
  '心神宁静': 'Ataraxia (Tranquility)',
  '原子偏斜说': 'Clinamen (Atomic Swerve)',
  '快乐并非纵欲': 'Pleasure as Absence of Pain',
  '灵魂无忧': 'Quietude of the Soul',
  '花园学校': 'The Garden School',
  '画廊学派': 'The Stoa (Gallery School)',
  '世界演化（逻各斯）': 'Cosmic Evolution via Logos',
  '顺应自然': 'Living in accordance with Nature',
  '宙斯颂': 'Hymn to Zeus',
  '命题逻辑': 'Propositional Logic',
  '系统化精修': 'Systematic Formalization',
  '自然法思想': 'Natural Law Ideals',
  '折中希腊学派': 'Eclectic Hellenic Synthesis',
  '论愤怒': 'De Ira (On Anger)',
  '论天意': 'De Providentia (On Providence)',
  '悲剧性天命': 'Tragic Destiny',
  '人是戏中的演员': 'Man is an actor in a play',
  '能随己者控制之': 'Control what is in your power',
  '奴隶的尊严': 'The Dignity of a Slave',
  '沉思录': 'Meditations',
  '哲学家皇帝': 'The Philosopher King',
  '自省与顺从天理': 'Self-reflection and Stoic Assent',
  '逻各斯作为上帝的中介': 'Logos as Divine Mediator',
  '寓意解经法': 'Allegorical Interpretation of Scripture',
  '太一（绝对美之源）': 'The One (Source of Beauty)',
  '流溢说': 'Theory of Emanation',
  '神契合一': 'Mystical Union',
  '波菲利之树': 'Porphyrian Tree',
  '《九章集》编修者': 'Editor of the Enneads',
  '上帝之城': 'The City of God',
  '时间主观心灵论': 'Subjective Theory of Time',
  '神圣恩典说': 'Doctrine of Divine Grace',
  '哲学的慰藉': 'The Consolation of Philosophy',
  '命运之轮': 'The Wheel of Fortune',
  '自然的区分': 'The Division of Nature',
  '理性主导信仰': 'Reason Guiding Faith',
  '泛神论倾向': 'Pantheistic Leaning',
  '经院哲学之父': 'Father of Scholasticism',
  '本体论证明': 'Ontological Argument',
  '信仰寻求理解': 'Faith Seeking Understanding',
  '圣餐礼的辩证理性说': 'Rational Explanation of the Eucharist',
  '唯名论先导': 'Precursor to Nominalism',
  '共相只是外在声息': 'Universals as Flatus Vocis (Mere Breath)',
  '实存唯有个体': 'Only Particulars Exist',
  '理智促成信仰': 'Intellect Facilitating Faith',
  '概念中介性': 'Conceptual Mediacy',
  '共相存在于理智': 'Universals Exist in the Mind',
  '双重真理说': 'Double Truth Theory',
  '第一推动': 'The Prime Mover',
  '人类理性共享': 'Shared Universal Intellect',
  '博学家': 'Doctor Universalis (Universal Polymath)',
  '自然科学探究': 'Empirical Study of Nature',
  '理性真理与天启真理': 'Truths of Reason and Truths of Revelation',
  '关于上帝存在的五路证明': 'The Five Ways (Quinque Viae)',
  '宇宙的目的格': 'Teleological Order of the Cosmos',
  '世界完备系统': 'The Complete Systematic World',
  '观察科学': 'Observational Science',
  '崇拜实践与实验': 'Primacy of Practice and Experiment',
  '意志主义倾向': 'Voluntaristic Tendency',
  '哲学与神学分离': 'Separation of Philosophy and Theology',
  '奥卡姆剃刀': 'Ockham\'s Razor',
  '如无必要，勿增实体': 'Plurality should not be posited without necessity',
  '唯名论': 'Nominalism',
  '人文主义之父': 'Father of Humanism',
  '人的尊严': 'Dignity of Man',
  '抒情诗': 'Lyric Poetry',
  '神圣大爱': 'Divine Love',
  '柏拉图式大爱': 'Platonic Love',
  '灵魂中介性': 'Mediating Role of the Soul',
  '论人的尊严': 'Oration on the Dignity of Man',
  '思想兼容主义': 'Syncretism of Thoughts',
  '论有学识的无知': 'On Learned Ignorance (De Docta Ignorantia)',
  '对立面的相印': 'Coincidence of Opposites',
  '我知道什么？（Que sais-je？）': 'What do I know? (Que sais-je?)',
  '随笔集（散文智慧）': 'The Essays',
  '乌托邦': 'Utopia',
  '因信称义': 'Justification by Faith',
  '信徒皆祭司': 'Priesthood of All Believers',
  '拒绝罗马教座': 'Rejection of the Papacy',
  '神定预选论': 'Predestination',
  '神职自治独裁': 'Theocratic Autonomy',
  '知识就是力量': 'Knowledge is Power',
  '新工具（归纳法）': 'Novum Organum (Inductive Method)',
  '四假象说（族类-洞穴-市场-剧场）': 'The Four Idols (Idols of the Tribe/Cave/Market/Theater)',
  '理性的神学信仰': 'Rational Theological Belief',
  '公理不言说': 'Self-evident Axioms',
  '自然状态（人与人互为豺狼）': 'State of Nature (Man is wolf to man)',
  '主权契约论': 'Sovereign Social Contract',
  '利维坦': 'Leviathan',
  '普遍怀疑方法': 'Method of Universal Doubt',
  '我思故我在': 'Cogito, Ergo Sum',
  '心物二元论': 'Mind-Body Dualism',
  '天赋观念': 'Innate Ideas',
  '反诘笛卡尔': 'Rebuttals to Descartes',
  '复兴伊壁鸠鲁原子论': 'Revival of Epicurean Atomism',
  '白板说（Tabula Rasa）': 'Blank Slate (Tabula Rasa)',
  '第一、第二性质': 'Primary and Secondary Qualities',
  '双重分权（议会至上）': 'Separation of Legislative & Executive',
  '自由民主契约': 'Liberal Democratic Contract',
  '神即自然（Deus sive Natura）': 'God or Nature (Deus sive Natura)',
  '唯一无限实体说': 'The One Infinite Substance',
  '心身平行论': 'Mind-Body Parallelism',
  '出于理智的至福之爱': 'Intellectual Love of God',
  '偶因论：物与心上帝在其中作引': 'Occasionalism: God as the Sole True Cause',
  '存在即是被感知（Esse est percipi）': 'To be is to be perceived (Esse est percipi)',
  '观念与物质的不实': 'Non-existence of Material Substance',
  '上帝总在注视世界': 'The Omnipresent Divine Observer',
  '基督教与创世般古老': 'Christianity as Old as the Creation',
  '单子论（不灭的无窗单子）': 'Monadology (Windowless Monads)',
  '充足理由律': 'Principle of Sufficient Reason',
  '前定和谐式世界设计': 'Pre-established Harmony',
  '印象与观念二分': 'Impressions and Ideas',
  '因果关系的习惯联想联络': 'Customary Association of Cause and Effect',
  '理性是激情的奴隶': 'Reason is the slave of the passions',
  '温和的中断论': 'Mitigated Skepticism / Academic Doubt',
  '形而上学分类整合': 'Systematization of Metaphysics',
  '独断主义死角': 'Dead End of Dogmatism',
  '理性崇拜': 'Cult of Reason',
  '自由言论说（誓死捍卫你说话的权利）': 'Defense of Free Speech',
  '若无上帝也要造一个': 'If God did not exist, it would be necessary to invent Him',
  '自由乃意志必然': 'Freedom as Necessity of Will',
  '自然之法学': 'The Spirit of the Laws',
  '君主立宪制': 'Constitutional Monarchy',
  '三权分立（立法/行政/司法）': 'Separation of Powers',
  '法之意境与地理决定说': 'Geographical and Climatic Theory of Laws',
  '自然人之本性': 'Noble Savage (Human State of Nature)',
  '人类不平等起源': 'Discourse on the Origin of Inequality',
  '社会契约精神': 'The Social Contract',
  '文明社会批判说': 'Critique of Civilized Society',
  '社会公意公理': 'The General Will',
  '民主共和体制': 'Democratic Republicanism',
  '自然万象体系': 'System of Nature',
  '万物有机自然说': 'Organic Materialism',
  '唯物反驳玄想': 'Materialist Refutation of Metaphysics',
  '人是机器': 'Man a Machine',
  '灵魂是由大脑 and 感官物质决定的': 'Soul is determined by brain and sensory matter',
  '灵魂是由大脑和感官物质决定的': 'Soul is determined by brain and sensory matter',
  '肉体感受唯一本能': 'Sensory Experience as Sole Principle',
  '利益自爱说': 'Self-interest and Self-love',
  '教育万能理念': 'Omnipotence of Education',
  '自然的体系（唯物圣经）': 'The System of Nature (The Bible of Materialism)',
  '因果必然链条': 'Chain of Causal Necessity',
  '无鬼无神论说': 'Absolute Atheism',
  '功利主义伦理学': 'Utilitarian Ethics',
  '唯一者及其所有物': 'The Ego and Its Own',
  '无视一切国家信仰': 'Disregard of All State Faiths',
  '唯我独尊利己观': 'Egoistic Individualism',
  '实证主义三阶段论': 'Law of Three Stages',
  '科学至尊与人造宗教': 'Supremacy of Science & Religion of Humanity',
  '社会学之祖': 'Father of Sociology',
  '可能感觉的持久群': 'Permanent Possibility of Sensation',
  '合理利己与最大多数幸福': 'Rational Self-interest & Greatest Happiness',
  '论自由（群己权界论）': 'On Liberty',
  '宇宙进化论说': 'Universal Evolutionism',
  '优胜劣汰、适者生存': 'Survival of the Fittest',
  '社会有机体类比': 'Social Organism Analogy',
  '《耶稣传》批判': 'Critique of the Life of Jesus',
  '历史实体即精神': 'Historical Substance as Spirit',
  '自我意识核心说': 'Self-consciousness as Core',
  '彻底无神论宗教批判': 'Radical Atheistic Critique of Religion',
  '极端的无政府和虚无主义倾向': 'Extreme Anarchist and Nihilistic Tendency',
};

