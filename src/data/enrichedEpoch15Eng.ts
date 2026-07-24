export const enrichedEpoch15Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  luo_qinshun: {
    lifeAndTimes: 'Luo Qinshun, courtesy name Yunsheng, sobriquet Zhengzhai, a native of Taihe in Jiangxi. He passed the jinshi examination in the sixth year of Hongzhi and was appointed Hanlin Academy compiler. He served successively as Director of Studies in the Nanjing National Academy, Deputy Chief Minister of the Court of Imperial Sacrifices in Nanjing, and Right Vice Minister of Personnel in Nanjing. He was quiet and studious by nature, unmoved by fame or profit, maintaining independent thinking in officialdom, repeatedly memorializing the throne to remonstrate on current affairs. At a time when Wang Yangming\'s philosophy of mind swept the realm and Zhu Xi\'s learning had ossified into examination-oriented dogma, Luo Qinshun stood apart from both prevailing currents with cool rationality, devoting himself to writing Knowledge in Distress (Kunzhi Ji), systematically reflecting on the core issues of Song-Ming Neo-Confucianism—principle-qi, mind-nature. His learning neither blindly followed authority nor chased the fashion of the times, insisting on examining the principle-qi relationship from the standpoint of actual experience. He displayed extremely rare independent critical spirit and scientific attitude. He retired to his hometown in his later years, devoting himself to writing behind closed doors for over twenty years, and died in the twenty-sixth year of Jiajing, aged eighty-three.',
    worldviewSummary: 'Luo Qinshun takes "qi monism" as the core of his cosmology: the cosmos has only qi filling and flowing; "principle" is not an independent substance outside of qi but the inherent pattern and regularity that qi\'s own movement and change present—"principle is only on qi." Epistemologically, he argues that the mind\'s cognition also cannot be separated from qi\'s function, opposing the mind-learning\'s "mind is principle" as subjective inflation and also opposing Zhu Xi\'s learning which elevates principle to an independent substance above qi. In cultivation theory, he advocates using "reverence" for nourishing and "investigating things" for exhausting principle, but his investigating things is not Zhu Xi\'s outward investigation but rather experiencing qi\'s inherent patterns within its operation. Luo Qinshun\'s qi-based stance laid the materialist foundation for the mid-Ming practical learning trend, profoundly influencing Wang Tingxiang and the early Qing scholars.',
    quote: 'Principle is not separate from qi; principle is only on qi. Qi monism generates all things. — Knowledge in Distress (Kunzhi Ji)',
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Luo Qinshun takes qi as the ground of all existence; Locke takes sensory experience as the source of all knowledge. Both proceed from empirical reality to oppose suspended a priori substances.',
        reflectionPrompt: 'Can empiricism genuinely replace metaphysics as the foundation of knowledge? Do the empiricist philosophies of Luo Qinshun and Locke represent parallel discoveries of the same truth, or fundamentally different intellectual projects?'
      },
      {
        withName: 'Aristotle',
        coreDifference: 'Luo Qinshun pulls Zhu Xi\'s suspended principle back to qi\'s inherent patterns, just as Aristotle pulled Plato\'s suspended Forms back into concrete substances—both are empiricist corrections of their teachers\' teachings.',
        reflectionPrompt: 'Is the empiricist correction of idealist metaphysics a genuine advance? Do the parallel corrections of Luo Qinshun and Aristotle represent the same philosophical move, or fundamentally different intellectual projects?'
      }
    ]
  },

  wang_tingxiang: {
    lifeAndTimes: 'Wang Tingxiang, courtesy name Ziheng, sobriquet Xunchuan, a native of Yifeng in Henan (modern Lankao). He passed the jinshi examination in the fifteenth year of Hongzhi and served successively as supervising secretary in the Office of Scrutiny for War, deputy education intendant of Shandong, surveillance commissioner of Sichuan, vice minister of war, and minister of war in Nanjing, reaching the rank of Junior Guardian of the Heir Apparent. He was both scholar and warrior, mastering not only Confucian philosophy but also military and border defense. As regional commander in Shaanxi and military intendant in Sichuan, he repeatedly distinguished himself in battle. In scholarship, he swept away the empty talk of the mid-Ming with a great spirit of materialist pragmatism, standing alongside Luo Qinshun as the twin peaks of Ming dynasty qi philosophy. His works Shenyan and Yashu systematically elaborate his qi-based philosophy, and he sharply critiqued the mystical tendencies of Wang Yangming\'s mind-learning. His life combined scholarship and governance without contradiction, using practice to verify theory and theory to guide practice—a model of the Ming dynasty\'s practical-use spirit.',
    worldviewSummary: 'Wang Tingxiang takes "original qi and nature" as his cosmological core: the cosmos has only one qi, eternally existing and inexhaustible; heaven, earth, and all things are formed by qi\'s gathering and dispersing: "Before the birth of heaven and earth, there was only original qi." Principle is not a prior independent substance but the regularity and trajectory that qi\'s operation presents; he explicitly主张 "qi precedes principle." Epistemologically, he vehemently attacks the Neo-Confucian practice of sitting in meditation and empty contemplation, advocating a "practice and action" theory of true knowledge: genuine knowledge must come from personal practice and the tempering of affairs; empty talk of mystical principle brings no benefit to self or state. His learning tightly integrates qi theory with practical statecraft, insisting that scholarship must make concrete contributions to public affairs—embodying a remarkably strong materialist spirit and pragmatic character.',
    quote: 'Qi precedes principle; where qi fills, principle adheres. If scholars do not practice and act but merely sit in meditation and talk of the mystical, what benefit is it to the state? — Shenyan',
    comparisons: [
      {
        withName: 'Francis Bacon',
        coreDifference: 'Wang Tingxiang seeks true knowledge through "practice and action"; Bacon breaks idols through experimental induction. Both challenge the metaphysical tradition with the authority of practical experience.',
        reflectionPrompt: 'Can practical experience alone replace systematic philosophical inquiry? Do the pragmatist epistemologies of Wang Tingxiang and Bacon represent the same insight across civilizations, or fundamentally different intellectual projects?'
      },
      {
        withName: 'Thomas Hobbes',
        coreDifference: 'Wang Tingxiang takes qi as the sole reality; Hobbes takes material body as the sole substance. Both hold thoroughgoing materialist monism, denying the existence of independent spiritual substance.',
        reflectionPrompt: 'Is thoroughgoing materialism a sufficient worldview? Do the materialist monisms of Wang Tingxiang and Hobbes represent parallel discoveries of the same truth, or do their different cultural contexts make them fundamentally different?'
      }
    ]
  },

  wang_yangming: {
    lifeAndTimes: 'Wang Shouren, courtesy name Bo\'an, sobriquet Yangming, a native of Yuyao, Zhejiang. Born into an official family, he resolved as a youth to become a sage. He passed the jinshi examination in the twelfth year of Hongzhi and held posts such as secretary in the Ministry of Justice and secretary in the Ministry of War. In the first year of Zhengde, he submitted a memorial defending censors persecuted by the eunuch Liu Jin, angering Liu Jin. He was beaten forty times with a court rod, imprisoned, then exiled as station master of Longchang in Guizhou. Longchang was in the remote southwest, infested with miasma, where death was always possible. In this extremity, Yangming sat day and night in upright stillness, and suddenly in the middle of the night achieved great awakening to the meaning of "investigating things to extend knowledge": "The sage\'s way is inherent in my own nature; it was a mistake to seek it in external things"—the legendary "Longchang Awakening." He later suppressed the rebellion of the Prince of Ning, Zhu Chenhao, and pacified uprisings in Si\'en, Tianzhou, Bazhai, and Duanteng Gorge. His military achievements were extraordinary yet he was repeatedly met with suspicion. His life combined extraordinary military accomplishment with the most luminous movement of spiritual liberation in Chinese intellectual history. His final words: "This mind is bright; what more is there to say?"',
    worldviewSummary: 'Wang Yangming\'s core proposition is "there is no principle outside the mind, no thing outside the mind"—the meaning and order of all cosmic things cannot be separated from the illuminating awareness of the human mind. Within the human mind there innately exists a "conscience" (liang zhi) that needs no external seeking and can independently judge good and evil. This conscience is heavenly principle as present in the human; therefore "extending innate conscience" (zhi liang zhi) means expanding this inner moral intuition to all affairs and things. On the relationship between knowledge and action, he主张 "knowledge is the beginning of action; action is the completion of knowledge"—true knowledge necessarily contains the motive force of action; knowledge without action is not true knowledge; the substance of knowledge and action is one. In his later years he proposed the "Four Sentences" as the summary of his mind-learning: "No good, no evil—the mind\'s substance; good and evil—the movement of intention; knowing good and evil—conscience; doing good and eliminating evil—investigating things," revealing the dialectical unity of the transcendence of the mind\'s substance beyond good and evil with moral practice.',
    quote: 'This mind is bright; what more is there to say? Knowledge and action are one. Extend my mind\'s innate conscience. — Chuan Xi Lu (Instructions for Practical Living)',
    comparisons: [
      {
        withName: 'Immanuel Kant',
        coreDifference: 'Wang Yangming\'s "conscience" and Kant\'s "moral law" are both universal moral laws within the subject; both emphasize the autonomy rather than heteronomy of morality. But conscience has a more intuitive character.',
        reflectionPrompt: 'Can inner moral intuition and rational moral law serve the same function? Do the moral philosophies of Wang Yangming and Kant converge on the same insight about moral autonomy, or do their fundamentally different foundations make them incommensurable?'
      },
      {
        withName: 'Edmund Husserl',
        coreDifference: 'Wang Yangming\'s "there is nothing outside the mind" and Husserl\'s "intentionality" both reveal the constitutive role of consciousness for the world; both redefine the meaning of existence from the standpoint of subjectivity.',
        reflectionPrompt: 'Can the phenomenological and the mind-learning approaches to subjectivity genuinely converse? Do Wang Yangming and Husserl, from radically different starting points, arrive at a shared insight about the relationship between consciousness and world?'
      }
    ]
  },

  wang_gen: {
    lifeAndTimes: 'Wang Gen, courtesy name Ruzhi, sobriquet Xinzhai, a native of Anfeng Field in Taizhou (modern Dongtai, Jiangsu). Born into a salt-boiler family, he was too poor for schooling in his youth and boiled sea salt with his father. At twenty-five he visited the Temple of Confucius in Shandong and was moved to take up the responsibility of the Dao, teaching himself the Analects and Classic of Filial Piety. Hearing that Wang Yangming was teaching in Jiangxi, he traveled a thousand li to meet him. At their first meeting, he wore ancient robes and cap and, occupying the seat of honor, debated with Yangming repeatedly until finally overcome by Yangming\'s profound learning, he bowed and became a disciple. But after retreating, still feeling unresolved, he returned to the seat to debate again—this happening three times. Yangming sighed: "This is truly one whom I could not bend even when I captured Zhu Chenhao." After completing his studies, he built a cart of woven rushes and, wearing ancient robes, traveled the realm, teaching the learning of mind to peddlers, porters, and common folk in markets and villages, making Yangming\'s philosophy a genuinely popular philosophy. The Taizhou school he founded became one of the most socially influential intellectual movements of the mid-to-late Ming.',
    worldviewSummary: 'Wang Gen\'s core proposition is "the daily use of the common people is the Dao" (bai xing ri yong ji dao)—pulling the unattainable Dao of the sage back into the daily labor of ordinary people, from classics and academies to the streets. He主张 that the Dao is not far from people; the sage\'s learning is contained within the orderly patterns of common people\'s daily life. In his theory of "investigating things," he proposes the distinctive "Huainan investigating things" (huai nan ge wu): "to investigate" means "to format"; the self and the world are things, with the self as root and the world as branch; establishing the self is the essence of investigating things. He highly values "body-based theory" (shen ben lun),主张 that "establishing the self" is the foundation of all: protecting, loving, and honoring the self is the starting point of moral practice, opposing the Neo-Confucian "eliminating human desire" that suppresses the body\'s legitimate needs. His thought transforms Yangming\'s moral subjectivity into the dignity of the common person—an early voice of popular rights consciousness in ancient China.',
    quote: 'The orderly patterns of the common people\'s daily use—this is precisely the sage\'s Dao. The self is the root of all things. — Collected Works of Master Wang Xinzhai',
    comparisons: [
      {
        withName: 'Jean-Jacques Rousseau',
        coreDifference: 'Wang Gen takes the daily use of common people as the locus of the Dao; Rousseau takes the natural equality of all in the state of nature as the ideal. Both challenge elite discourse from a commoner\'s standpoint, advocating natural human equality.',
        reflectionPrompt: 'Can popular philosophy genuinely challenge elite systems of knowledge and power? Do the egalitarian philosophies of Wang Gen and Rousseau represent parallel discoveries of the same democratic insight, or fundamentally different projects?'
      },
      {
        withName: 'Diogenes',
        coreDifference: 'Wang Gen makes dressing and eating the sage\'s Dao; Diogenes lives in a barrel and challenges worldly conventions with simplicity. Both oppose institutionalized hypocrisy with the plain truth of daily life.',
        reflectionPrompt: 'Can the embrace of daily simplicity genuinely challenge institutionalized values? Do the anti-conventional philosophies of Wang Gen and Diogenes represent the same philosophical move, or fundamentally different intellectual projects?'
      }
    ]
  },

  wang_ji: {
    lifeAndTimes: 'Wang Ji, courtesy name Ruzhong, sobriquet Longxi, a native of Shanyin in Zhejiang (modern Shaoxing). He passed the jinshi examination in the fifth year of Jiajing but, instead of taking office, became a disciple of Wang Yangming and devoted his life to teaching and transmitting the learning. While Yangming was alive, Wang Ji was a core figure in the lecture assemblies—agile in thought and inexhaustible in debate, deeply valued by Yangming. After Yangming\'s death, Wang Ji and Qian Dehong jointly edited Yangming\'s works including Chuan Xi Lu, and he traveled the land for forty years, opening lecture halls with disciples throughout the realm. His lecturing style was wild and unrestrained, striking directly at the spirit, unconstrained by classical texts, often using Chan-like kung-an to prompt students—a style reminiscent of Wei-Jin pure conversation. Because his "Four Nothings" doctrine was too elevated and mystical, he was criticized by Qian Dehong and others as approaching Chan and deviating from Yangming\'s practical spirit of "tempering through affairs." Yet with his extraordinary insight and talent, he pushed mind-learning to a pure spiritual peak.',
    worldviewSummary: 'Wang Ji\'s philosophy takes the "Four Nothings" (si wu shuo) as the ultimate expression of mind-learning: the substance of mind is originally without good or evil—hence "the mind without mind"; intention is originally empty and still—hence "intention without intention"; conscience\'s knowing is originally luminous and unobstructed—hence "knowing without knowing"; all things are manifestations of mind—hence "things without things." The Four Nothings directly strike at the pure, bright, and empty substance of conscience, pushing Yangming\'s "Four Sentences" from a theory of cultivation to the ultimate of ontology. In practice, he values "sudden awakening" over "gradual cultivation,"主张 that "a single awakening accords with the substance of conscience"—one moment of illuminating awareness comprehends the whole, without needing to be confined to the gradual cultivation of thing-by-thing effort. His thought pushes the spiritual dimension of mind-learning to an extremely elevated realm, but also triggered fierce debate with Qian Dehong and the gradual cultivation faction, forming the "sudden-gradual controversy" within the Wang school.',
    quote: 'Mind without mind; intention, knowing, and things are all without. A single awakening accords with the substance of conscience. — Complete Works of Master Wang Longxi',
    comparisons: [
      {
        withName: 'Plotinus',
        coreDifference: 'Wang Ji\'s "Four Nothings" directly strike at the pure, bright, empty substance of conscience; Plotinus\'s "the One" transcends all determination. Both use apophatic language to indicate the ineffability of the highest reality.',
        reflectionPrompt: 'Can apophatic language genuinely point to the highest reality without distorting it? Do the negative theologies of Wang Ji and Plotinus converge on the same insight about the limits of language, or do their fundamentally different commitments make them incommensurable?'
      },
      {
        withName: 'Zhuangzi',
        coreDifference: 'Wang Ji\'s "present conscience" needs no cultivation; Zhuangzi\'s "free and unfettered wandering" is not burdened by things. Both pursue the absolute freedom of spirit and its natural manifestation.',
        reflectionPrompt: 'Can absolute spiritual freedom be attained without cultivation? Do the anti-gradualist philosophies of Wang Ji and Zhuangzi represent the same insight about spontaneous freedom, or fundamentally different approaches to the same goal?'
      }
    ]
  },

  li_zhi: {
    lifeAndTimes: 'Li Zhi, courtesy name Hongfu, sobriquet Zhuowu, a native of Quanzhou, Fujian. He passed the provincial examination in the thirty-first year of Jiaqing and served as education official in Gongcheng in Henan, National University academician in Nanjing, and prefect of Yao\'an in Yunnan. In office he was known for integrity and uprightness, but he was incompatible with the hypocrisy of officialdom. At fifty-four he resigned in indignation, becoming a tonsured monk without taking precepts, roaming the world in the posture of "wild Chan." After settling at the Zhifo Hermitage by Longhu Lake in Macheng, Hubei, he devoted himself to writing and teaching, publicly accepting female disciples such as Mei Danran, and his discourse grew ever more radical and unbridled. His Book to Burn (Fen Shu) he titled himself, "burning it and then feeling content," knowing his words would not be tolerated in his time. In the thirtieth year of Wanli, he was impeached by Supervising Secretary Zhang Wenda on charges of "daring to promote disorderly teachings and delude the people." He was arrested and imprisoned. In prison, he seized a razor and cut his own throat, using his life to complete the final act of resistance against despotic oppression, becoming a tragic model of dying for one\'s thought in Chinese intellectual history.',
    worldviewSummary: 'Li Zhi takes the "child\'s heart" (tong xin) as the foundation of his thought: "The child\'s heart is the true heart." The child\'s heart is the natural, pure, unconditioned heart, untouched by worldly teachings and utilitarian motives. Li Zhi argues that all hypocritical moralism and false benevolence arise from the loss of the child\'s heart; the Confucian classics—the Six Classics, the Analects, the Mencius—are not absolute truth but "the rhetoric of Dao-learning, the lair of falsehood." In his theory of human nature, he boldly主张 that "humans must have selfishness"—self-interested profit-seeking is human nature, which cannot be suppressed or dissembled, thereby overturning the Neo-Confucian moral premise of "preserving heavenly principle and eliminating human desire." In social thought, he advocates gender equality, accepts female disciples, and argues that women\'s insight is not necessarily inferior to men\'s. His anti-authoritarian, anti-dogmatic, anti-hypocritical critical spirit reached the pinnacle of ancient Chinese thought.',
    quote: 'The child\'s heart is the true heart. If the child\'s heart is lost, the true heart is lost. "If heaven had not given birth to Confucius, ten thousand ages would be like a long night"—all the flattery of false scholars. — Book to Burn (Fen Shu)',
    comparisons: [
      {
        withName: 'Friedrich Nietzsche',
        coreDifference: 'Li Zhi takes the child\'s heart as the pure, natural life-force; Nietzsche takes the Übermensch as the will-to-power transcending all moral bonds. Both challenge hypocritical moral systems with the authenticity of life.',
        reflectionPrompt: 'Can the appeal to natural authenticity genuinely overcome the power of institutionalized morality? Do the anti-moralist philosophies of Li Zhi and Nietzsche represent parallel discoveries of the same insight, or fundamentally different projects?'
      },
      {
        withName: 'Michel Foucault',
        coreDifference: 'Li Zhi exposes Neo-Confucianism as an instrument of power and rule; Foucault reveals the complicity between knowledge and power. Both deconstruct institutionalized truth discourse from a genealogical perspective.',
        reflectionPrompt: 'Can the genealogical critique of truth genuinely liberate, or does it merely replace one form of power with another? Do the power-critiques of Li Zhi and Foucault converge on the same insight about knowledge and power, or do their different contexts make them fundamentally different?'
      }
    ]
  },

  liu_zongzhou: {
    lifeAndTimes: 'Liu Zongzhou, courtesy name Qidong, sobriquet Niantai, a native of Shanyin in Zhejiang (modern Shaoxing). He passed the jinshi examination in the twenty-ninth year of Wanli and served successively as messenger in the Messenger Office, secretary in the Ministry of Rites, assistant director in the Court of Imperial Entertainments, mayor of Shuntian, vice minister of the Ministry of Works, and Left Censor-in-Chief. In the Chongzhen reign he was renowned for his candid remonstrance, repeatedly submitting memorials denouncing current abuses, being dismissed several times for offending the emperor—yet never changing his stance upon reinstatement. His scholarship progressed from Cheng-Zhu Neo-Confucianism, through the baptism of Yangming mind-learning, to a final synthesis in his later years, founding the Jishan school. Huang Zongxi, Chen Que, and other early Qing scholars were his disciples. In the seventeenth year of Chongzhen (1644), the Ming dynasty fell and the Qing entered the pass. Liu Zongzhou, holding that "the state is destroyed and the ruler dead; as a minister I can only die," resolved to die for his country. When disciples urged him to raise an army like Wen Tianxiang, he knew the tide was irreversible, and fasted for twenty days until his death. His final words: "In my breast is all antiquity; before my eyes, not a single person"—completing the last lesson of his life with the highest integrity of the scholar-official.',
    worldviewSummary: 'Liu Zongzhou takes "being watchful over oneself when alone" (shen du) as the comprehensive program of learning. "Alone" does not mean being solitary but the deepest, most authentic substance of intention—the pivot of the unmanifested equilibrium and the manifested harmony. In cultivation theory, he主张 that effort must be implemented at the most subtle point of "intention": intention is the master of the mind, not already-manifested thoughts; one must examine and restrain at the very moment of intention\'s stirring, making it pure and undivided. He integrates Neo-Confucianism\'s "dwelling in reverence" with mind-learning\'s "extending innate conscience," constructing a precise cultivation system centered on "rectifying intention" and "being watchful when alone." Ontologically, he proposes the concept of "human ultimate" (ren ji)—taking humans as the mind of heaven and earth, and the mind as the human\'s ultimate, elevating moral subjectivity to a cosmological height. His learning is both a systematic clearing-away of the empty talk and wild Chan of late-Ming mind-learning followers and a transcendence of the ossified Cheng-Zhu orthodoxy, laying the theoretical foundation for the early Qing turn toward practical learning.',
    quote: 'Those who seek order must first be watchful over themselves when alone. "Alone" is the fundamental substance of the mind\'s intention; it cannot be deceived. — Complete Works of Master Liu',
    comparisons: [
      {
        withName: 'Immanuel Kant',
        coreDifference: 'Liu Zongzhou\'s "being watchful when alone" and Kant\'s "autonomy" both ground morality in the subject\'s inner self-legislation; both require absolute honesty with oneself in the most hidden depths of the mind.',
        reflectionPrompt: 'Can inner moral self-legislation genuinely replace external authority? Do the moral philosophies of Liu Zongzhou and Kant converge on the same insight about moral autonomy, or do their fundamentally different foundations make them incommensurable?'
      },
      {
        withName: 'Augustine',
        coreDifference: 'Liu Zongzhou works at the subtle level of intention; Augustine repents to God in the depths of the soul. Both locate the key to moral cultivation in the deepest examination and purification of inner intention.',
        reflectionPrompt: 'Can the inner examination of intention genuinely transform moral life? Do the introspective practices of Liu Zongzhou and Augustine represent the same spiritual insight, or fundamentally different approaches to the same problem?'
      }
    ]
  }
};
