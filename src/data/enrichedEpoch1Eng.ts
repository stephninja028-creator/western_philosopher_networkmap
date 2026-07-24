export const enrichedEpoch1Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  thales: {
    lifeAndTimes: 'Founder of the Milesian school and first of the Seven Sages of Greece. Active in the commercial port of Miletus, he was also an astronomer and engineer who reportedly predicted the solar eclipse of 585 BCE. He demonstrated that philosophers could easily grow wealthy if they chose, but his ambition lay in the pursuit of higher truth.',
    worldviewSummary: 'Thales was the first to abandon mythological explanations of the world, declaring that "water is the arche (principle)" of all things. He held that everything arises from water and returns to it, recognizing water as the foundational basis of life across solid, liquid, and gaseous states. By positing a single natural element as the universal substrate, he initiated the tradition of seeking rational, unified explanations of the cosmos.',
    quote: 'Water is the oldest of all things, for it was the first to come into being; and the universe is the greatest, for it encompasses all.',
    comparisons: [
      {
        withName: 'Pythagoras',
        coreDifference: 'Thales sought a concrete material substance (water) as the primitive principle, with a materialist inclination. Pythagoras transcended concrete matter, positing that abstract number and proportion constitute the fundamental order and harmony of the cosmos, representing a form of mathematical realism.',
        reflectionPrompt: 'In understanding phenomena, should we trust the tangible material particles we can touch, or the mathematical proportions and formulas that govern their behavior?'
      }
    ]
  },
  anaximander: {
    lifeAndTimes: 'Student and successor of Thales. He drew the first known world map and introduced astronomical instruments such as the sundial to the Greeks. He boldly proposed that the Earth was cylindrical and floated freely in space, sustained by symmetry rather than physical support.',
    worldviewSummary: 'Anaximander argued that the arche cannot possess any specific sensible quality, naming it "Apeiron" (the Boundless or Infinite). Since any concrete element like water or fire would exclude its opposite, the ultimate principle must be an abstract, indefinite background from which opposites (hot and cold, dry and wet) separate. Things emerge from the Apeiron and eventually return to it, paying penance for their "injustice" of breaking the cosmic balance.',
    quote: 'All things originate from it and must return to it by necessity; things suffer the judgment and punishment of time\'s order for their injustice.',
    comparisons: [
      {
        withName: 'Thales',
        coreDifference: 'Thales identified the principle as the concrete substance water. Anaximander argued that water as arche would eliminate opposites like fire, so the principle must be the fully abstract, boundless Apeiron that embraces all opposites.',
        reflectionPrompt: 'In explaining complex unknowns, should we appeal to tangible physical elements, or to abstract concepts that necessarily underlie them logically?'
      }
    ]
  },
  anaximenes: {
    lifeAndTimes: 'Student of Anaximander and the third master of the Milesian school. He sought to bridge his teacher\'s abstract Apeiron and Thales\' concrete water with a principle that could be explained through observable physical processes.',
    worldviewSummary: 'Anaximenes held that air (pneuma) is the sole arche of the cosmos, carrying life-sustaining and spiritual qualities. He proposed the mechanisms of condensation and rarefaction: when air rarefies it becomes fire, and when it condenses it successively becomes wind, cloud, water, earth, and stone. This was the first attempt to reduce qualitative diversity to quantitative physical processes, laying early groundwork for mechanistic reductionism.',
    quote: 'Just as our soul is air and holds us together, so the whole cosmos is sustained by breath and air.',
    comparisons: [
      {
        withName: 'Anaximander',
        coreDifference: 'Anaximander\'s Apeiron was too abstract to describe its physical process of separation. Anaximenes introduced air with the mechanisms of rarefaction and condensation, making the arche hypothesis observable and capable of explaining qualitative change through quantitative variation.',
        reflectionPrompt: 'Is a perfect but mechanism-deficient ultimate hypothesis, or a humble but testable mechanical model with concrete transformation chains, more valuable in the history of scientific inquiry?'
      }
    ]
  },
  xenophanes: {
    lifeAndTimes: 'A precursor of the Eleatic school who wandered as an itinerant poet-philosopher. He criticized the anthropomorphic gods of Homer and Hesiod, challenged the vanity of athletic hero-worship, and is often called the first free intellectual of the West.',
    worldviewSummary: 'Xenophanes advocated radical monotheism and launched the first sustained critique of anthropomorphic religion. He observed that humans fashion gods in their own image: if horses or lions had hands, they would carve gods resembling themselves. Beyond demolishing mythological idols, he posited a single, non-anthropomorphic divine entity—unborn, unchanging, and transcending human form—that constitutes the absolute "One" underlying the cosmos.',
    quote: 'Mortals suppose that gods are born, wear clothes, and have human voices and faces. But the one true God resembles no mortal.',
    comparisons: [
      {
        withName: 'Socrates',
        coreDifference: 'Xenophanes dismantled polytheism to establish a single supreme natural entity, aiming to cleanse natural philosophy of myth. Socrates accepted the critique of anthropomorphic gods but redirected inquiry toward the human soul and ethics, seeking dialectical definitions of justice and the good.',
        reflectionPrompt: 'Does the death of mythological gods lead us toward abstract speculation about nature, or force us inward toward rigorous moral self-examination?'
      }
    ]
  },
  pythagoras: {
    lifeAndTimes: 'Born on Samos, he emigrated to Croton in southern Italy and founded a semi-religious, semi-scholarly community. The order observed strict rules and venerated number as the highest truth and sacred reality. Legend holds that his disciple Hippasus was drowned for discovering irrational numbers, which shattered the sect\'s faith in integer proportions.',
    worldviewSummary: 'Pythagoras held that "all is number," asserting that the ultimate order of the cosmos is governed by mathematical proportion and geometric ratio. He discovered the harmony of musical intervals through string-length ratios and extended this principle to the heavens, claiming that planetary motions produce a celestial "music of the spheres." The world is a self-consistent formal order of symmetry and harmony, and the immortal soul undergoes transmigration according to mathematical law.',
    quote: 'Number rules the universe. All things are constituted by proportion; the true nature of the world is order and harmony.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Pythagoras explained cosmic structure through geometric proportions and the diversity of numbers. Parmenides pushed this to its extreme, declaring that numerical diversity is illusory and only the abstract, complete, ungenerated, and indivisible One (Being) is truly real.',
        reflectionPrompt: 'Is reality a symphonic order woven from diverse mathematical proportions, or does all diversity dissolve into a single, motionless One?'
      }
    ]
  },
  parmenides: {
    lifeAndTimes: 'Leader of the Eleatic school in southern Italy, revered for his moral authority and legislative work for his city. He presented his rationalist philosophy in a solemn poem narrating a chariot journey to the gates of Night and Day, where the goddess of Justice reveals the truth of Being.',
    worldviewSummary: 'The founding figure of rational metaphysics. Parmenides established the foundational thesis of Western thought: "Being is, Non-being is not." He distinguished the "way of opinion" (sensory perception of generation and decay) from the "way of truth" (pure logical intellect apprehending reality). True Being is one, eternal, ungenerated, indestructible, and perfect like a sphere; all change and temporal passage are illusions born of sensory deception.',
    quote: 'For it is the same thing to think and to be. Truth is the unchanging, perfect, and beginningless One.',
    comparisons: [
      {
        withName: 'Democritus',
        coreDifference: 'Parmenides denied the possibility of void and non-being, insisting that Being is indivisible and wholly static. Democritus rescued the phenomena of change by positing that being is atoms and non-being is void, allowing countless atoms to collide and combine in infinite empty space.',
        reflectionPrompt: 'To account for motion, must we grant logical and physical reality to void and non-being, as Democritus proposed?'
      }
    ]
  },
  heraclitus: {
    lifeAndTimes: 'Born into the ruling family of Ephesus but yielded the throne to his brother, living as a recluse in temples and mountains. Known for his enigmatic, aphoristic prose, he earned the epithets "the Obscure" and "the Weeping Philosopher."',
    worldviewSummary: 'The father of dialectic, Heraclitus held that "everything flows" (panta rhei): the cosmos is not static matter but an ever-living fire, kindling and extinguishing by measure. Change, conflict, and the tension of opposites constitute the fundamental law of existence—"war is the father of all." Yet through ceaseless flux, the universal rational principle Logos remains constant, harmonizing all opposition.',
    quote: 'No man steps in the same river twice. In discord and opposition there dwells the fairest and most living harmony.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Heraclitus maintained that change (Becoming) and dynamic opposition are the essence of reality, while rest is sensory deception. Parmenides held the opposite—that only the absolutely static, ungenerated Being is real, and all motion is pure illusion.',
        reflectionPrompt: 'Do you find truth in Heraclitean flux, recognizing the beauty of constant change, or in Parmenidean stillness, trusting that behind all change lies an eternal, motionless reality?'
      }
    ]
  },
  kratylos: {
    lifeAndTimes: 'A follower of Heraclitus and Plato\'s first philosophical teacher. In his later years he fell into extreme skepticism, believing that since language itself is in constant flux, any utterance is already obsolete. He reportedly abandoned speech entirely, communicating only by moving his thumb.',
    worldviewSummary: 'Cratylus pushed Heraclitus\' doctrine of universal flux to the edge of radical skepticism, declaring that one cannot step into the same river even once. Not only does the river change in every instant, but the wader\'s body and consciousness transform between lifting and placing a foot. No stable subject can be named or identified, and language only distorts reality; silence is the only honest response to radical impermanence.',
    quote: 'One cannot step into the same river even once; for in the instant of speaking, everything has already become something new.',
    comparisons: [
      {
        withName: 'Heraclitus',
        coreDifference: 'Heraclitus held that while all things change, the Logos remains constant and rationally graspable. Cratylus abolished even the Logos, maintaining that change is utterly unordered and instantaneous, collapsing into total skepticism and radical flux.',
        reflectionPrompt: 'In navigating rapid technological and social change, should we seek the constant laws underlying change, or accept that we are caught in an endless, unknowable current?'
      }
    ]
  },
  zeno: {
    lifeAndTimes: 'Parmenides\' devoted disciple and the Eleatic school\'s master of paradox. A fierce dialectician, he deployed his razor-sharp arguments against all critics of his teacher\'s doctrine of motionless Being.',
    worldviewSummary: 'Zeno aimed to defend the thesis that Being is immobile and plurality is illusory. He invented the method of reductio ad absurdum and crafted four immortal paradoxes: the Dichotomy, Achilles and the Tortoise, the Flying Arrow, and the Stadium. He sought to show that once we admit infinite divisibility of space and time, motion leads to irreconcilable logical contradictions—thus motion is not a feature of reality but a sensory fraud.',
    quote: 'The flying arrow is at rest. Achilles, swift as lightning, can never overtake a tortoise given a head start.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Parmenides argued positively through grand axiomatic reasoning that Being is one and motionless. Zeno fought defensively as a logical assassin, using devastating reductio arguments to expose fatal contradictions in the opposing view that motion and plurality are real.',
        reflectionPrompt: 'In defending a cherished idea, is it more effective to articulate its positive doctrine, or to dismantle the self-contradictions of its opponents?'
      }
    ]
  },
  melissus: {
    lifeAndTimes: 'A later Eleatic philosopher and naval commander from Samos who defeated the Athenian fleet. He was a rare figure who practiced philosophy not only in study but also in military command.',
    worldviewSummary: 'Melissus refined Parmenides\' account of Being with rigorous physical reasoning. Parmenides had described Being as a finite, perfect sphere for aesthetic reasons; Melissus exposed this as self-contradictory: if Being has a boundary, what lies beyond? It must be void, which is non-being—but non-being does not exist. Therefore Being must be unlimited in extent, time, and dimension—a single, infinite, all-encompassing reality.',
    quote: 'If Being is finite, it must border on void; but void is non-being, which does not exist. Therefore only the boundless can house Being.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Parmenides, captivated by classical geometric aesthetics, held that Being is a finite, perfectly bounded sphere. Melissus shattered this by arguing that any boundary forces Being to yield to void, so Being must be unlimited in every dimension.',
        reflectionPrompt: 'When should we abandon aesthetically pleasing assumptions of symmetry and perfection to confront the austere, perhaps infinite, reality?'
      }
    ]
  },
  empedocles: {
    lifeAndTimes: 'A native of Acragas in Sicily who combined the roles of philosopher, physician, priest, and wonder-worker. Clad in purple and golden sandals, he was reputed to perform miracles. Legend holds that he leapt into the volcanic crater of Etna to prove his divinity, leaving only a golden sandal behind.',
    worldviewSummary: 'The originator of pluralism, Empedocles sought to reconcile Parmenides with sensory experience. He proposed the "Four Roots": earth, water, air, and fire—four co-eternal, ungenerated elements. All generation and destruction are merely the composition and separation of these roots, driven by two cosmic forces: Love (Philia), which unites, and Strife (Neikos), which divides. The cosmos cycles between total unification under Love and complete dispersion under Strife.',
    quote: 'Nothing is born and nothing truly dies; there is only the intertwining of the four roots in Love\'s embrace and their sundering in Strife.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Parmenides held that Being is wholly static and denied any rearrangement. Empedocles reconciled this with appearances by maintaining that while the four roots are themselves ungenerated and unchanging (as Parmenides required), their spatial recombination through Love and Strife produces the phenomena of change we observe.',
        reflectionPrompt: 'When two supreme but opposed systems collide, is it braver to defend one to the end, or more fruitful to construct a model that integrates both at a deeper level?'
      }
    ]
  },
  anaxagoras: {
    lifeAndTimes: 'A close advisor to Pericles and the first philosopher to bring naturalistic inquiry to Athens. For suggesting that the sun was not a god but a glowing mass of metal larger than the Peloponnese, he was prosecuted for impiety and exiled.',
    worldviewSummary: 'Anaxagoras proposed the theory of "seeds" (homoeomeries), holding that reality is composed of infinitely many qualitative micro-substances rather than four dead elements. "In everything there is a portion of everything"—bread contains invisible particles of hair, bone, and blood, which is how it nourishes the body. Ordering this chaotic sea of particles is Nous (Mind): an independent, pure, and all-seeing causal force that initiates the cosmic vortex. This marks a milestone in Western thought\'s introduction of an external efficient and final cause.',
    quote: 'All things were confounded together, until immortal Mind descended and set the cosmos in vortex motion, bringing forth the order of the stars.',
    comparisons: [
      {
        withName: 'Democritus',
        coreDifference: 'Democritus held that atoms collide mechanically in void without any guiding intelligence. Anaxagoras insisted that material particles require an external, ordering intelligence (Nous) to initiate cosmic order, granting the cosmos inherent rational purpose.',
        reflectionPrompt: 'In explaining nature\'s fine-tuned order, should we trust blind molecular collision and probability, or posit a governing intelligence (Nous)?'
      }
    ]
  },
  democritus: {
    lifeAndTimes: 'A native of Abdera in Thrace, born into great wealth, who traveled widely in pursuit of knowledge and spent his fortune. Known as "the laughing philosopher" for his cheerful detachment, he made contributions across physics, mathematics, zoology, and aesthetics.',
    worldviewSummary: 'The father of ancient materialism and physical reductionism. With his teacher Leucippus he founded atomism: the cosmos consists solely of atoms (indivisible particles) and void. Atoms differ only in size, shape, and arrangement, not in qualitative properties. They collide and combine according to strict mechanical causation, producing the macroscopic world. This system eliminated all supernatural agency, explaining all phenomena as geometric configurations of matter.',
    quote: 'By convention there is sweet and bitter, hot and cold; but in reality there are only atoms and void.',
    comparisons: [
      {
        withName: 'Socrates',
        coreDifference: 'Democritus turned toward the vast natural world and its purposeless mechanical causation. Socrates rejected natural philosophy as irrelevant, redirecting inquiry toward the human soul and insisting that the pursuit of virtue, not physics, is the sole path to wisdom.',
        reflectionPrompt: 'When confronting life\'s anxieties, is it scientific truth about the objective world or moral truth about how to live that offers genuine solace?'
      }
    ]
  },
  protagoras: {
    lifeAndTimes: 'The leading Sophist of ancient Greece, who traveled city-states teaching rhetoric and political debate to ambitious youth. He commanded high fees and was once commissioned by Athens to draft laws for a colony. He was later exiled for expressing agnostic doubts about the gods.',
    worldviewSummary: 'Protagoras championed radical humanistic relativism. His famous declaration—"Man is the measure of all things"—asserts that no objective truth exists independently of human perception. The wind that feels cold to one person feels warm to another. Moral norms and customs are not divinely ordained absolutes but practical conventions forged by social contract for communal convenience. This marks the awakening of philosophical subjectivity in Greek thought.',
    quote: 'Man is the measure of all things: of things that are, that they are; and of things that are not, that they are not. Concerning the gods, I cannot know whether they exist or not.',
    comparisons: [
      {
        withName: 'Socrates',
        coreDifference: 'Protagoras embraced pure relativism, holding that no universal standard of truth exists and that rhetorical victory suffices. Socrates treated this as intellectual poison, insisting that through rigorous dialectical self-examination one can discover objective, unshakeable definitions of justice and virtue.',
        reflectionPrompt: 'In a debate, do you employ rhetoric to defend your current position, or follow the evidence wherever it leads, even if it overturns your assumptions?'
      }
    ]
  },
  gorgias: {
    lifeAndTimes: 'A celebrated Sophist and master rhetorician who rivaled Protagoras. His speeches were famed for their musical elegance and captivated Athenian audiences. He delighted in paradoxical logical displays to demolish the pretensions of earlier natural philosophers.',
    worldviewSummary: 'In his work "On Nature, or On What Is Not," Gorgias pushed rational skepticism to its nihilistic extreme with three radical theses: nothing exists; even if something exists, it cannot be known; even if it can be known, it cannot be communicated to others. He aimed to show that the metaphysical edifices built by philosophers through language and logic are fragile games with concepts—language is never the reality it claims to describe.',
    quote: 'Nothing exists; even if it exists, it is unknowable; even if knowable, it cannot be communicated. Language is never the thing itself.',
    comparisons: [
      {
        withName: 'Parmenides',
        coreDifference: 'Parmenides argued that what can be thought and what can be are identical, establishing Being as the sole truth. Gorgias inverted this, taking the same logical apparatus to prove that Being cannot sustain itself, that the result of the same logic is radical nothingness.',
        reflectionPrompt: 'When the same rigorous logic can both construct grand systems of Being and demolish all reality into nothingness, does this reveal a blind spot in logic itself?'
      }
    ]
  },
  euclides_meg: {
    lifeAndTimes: 'One of Socrates\' most devoted disciples, who witnessed his master\'s death. He later founded the Megarian school. During Athens\' blockade of his native Megara, he risked death by disguising himself in women\'s clothing to sneak into Athens and sit at Socrates\' side in prison. Note: this is Euclides of Megara, not the geometer.',
    worldviewSummary: 'Euclides fused Socrates\' ethical pursuit of "the Good" with Parmenides\' metaphysics of "Being." He argued that only one unchanging reality exists—the Good—whether called God, Wisdom, or Reason, all names pointing to the same substance. Within this absolute Good there is no evil or suffering; all apparent opposition is illusion born of sensory distortion.',
    quote: 'All good is one; though named in countless ways, it is the same reality. The evil and falsehood that oppose the Good in the senses are mere logical nonentities.',
    comparisons: [
      {
        withName: 'Socrates',
        coreDifference: 'Socrates treated the Good as an ethical concept whose definition is sought through dialectical inquiry into human virtue. Euclides elevated it to a metaphysical first principle governing the entirety of nature and Being, fusing ethics with ontology.',
        reflectionPrompt: 'Are goodness and justice merely human constructs in an indifferent cosmos, or are they woven into the ultimate fabric of reality itself?'
      }
    ]
  },
  antisthenes: {
    lifeAndTimes: 'One of Socrates\' most distinguished later disciples and founding figure of Cynicism. Originally a celebrated rhetorician, he was so overwhelmed by Socrates\' character that he abandoned rhetoric, walking barefoot many miles daily to pursue philosophical self-mastery.',
    worldviewSummary: 'Antisthenes pushed Socratic self-control and self-sufficiency to its radical extreme. He rejected the entire apparatus of civic life—wealth, social status, privilege, and convention—as parasitic chains on the soul. The virtuous person should live like a wild dog, stripped of worldly attachments. Virtue alone, achieved through extreme willful self-discipline, is the soul\'s true wealth, sufficient to withstand any worldly adversity.',
    quote: 'I would rather howl in the wilderness than bow before worldly vanity and status. Virtue is the only armor that God esteems.',
    comparisons: [
      {
        withName: 'Aristippus',
        coreDifference: 'Both were students of Socrates, yet Aristippus held that maximizing present sensory pleasure is life\'s highest aim and lived as a courtier to tyrants. Antisthenes denounced pleasure as poison, insisting that yielding to sensory gratification enslaves the soul, and chose austere self-sufficiency instead.',
        reflectionPrompt: 'Is liberation better achieved by maximizing the means to purchase pleasure, or by eliminating desire so that one needs nothing from the world?'
      }
    ]
  },
  diogenes: {
    lifeAndTimes: 'A student of Antisthenes and the most legendary Cynic. Originally a coin-stamper exiled from Sinope, he arrived in Athens destitute and took up residence in a clay jar. He wandered the agora at midday with a lit lamp, claiming to "look for an honest man." He famously mocked both Plato and Alexander the Great without flattery.',
    worldviewSummary: 'Diogenes transformed Cynic doctrine into a performance art of radical civil disobedience. He declared that all human inventions—social hierarchy, legal contracts, refined arts—are artificial constraints corrupting our natural state. By eating, sleeping, and relieving himself in public, he demonstrated that a beggar in a tub could surpass emperors in spiritual freedom, dignity, and inner tranquility, living entirely beyond the reach of social convention.',
    quote: 'Stand out of my sunlight! With a lamp at midday I search in vain for one honest soul among the vain.',
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'Plato sought elaborate metaphysical systems and orderly civic hierarchy. Diogenes mocked Plato\'s abstract definitions—when Plato defined man as a "featherless biped," Diogenes brought a plucked chicken into the Academy, declaring "Behold, Plato\'s man!"',
        reflectionPrompt: 'Should we pursue abstract intellectual systems, or confront our animal nature directly and break through the fences of convention?'
      }
    ]
  },
  aristippus: {
    lifeAndTimes: 'Born in wealthy Cyrene, he was the most pleasure-seeking of Socrates\' disciples. He lived in fine clothes at the luxurious court of the tyrant Dionysius of Syracuse, accepting gifts of money and women without shame, maintaining that a philosopher can enjoy luxury without being enslaved by it.',
    worldviewSummary: 'Founder of the Cyrenaic school of hedonism. Aristippus held that the only certain reality is our immediate bodily pleasure or pain; the past is gone and the future is uncertain. The supreme good is the intensity of present sensory pleasure, with bodily pleasure ranking above mental. Yet the wise hedonist masters rather than is mastered by pleasure: "I possess pleasure, I am not possessed by it." This art of riding the waves of desire without drowning demonstrates philosophy\'s highest rational control.',
    quote: 'I possess pleasure, I am not possessed by it. Pleasure is the only sun: we must enjoy each living moment to the full.',
    comparisons: [
      {
        withName: 'Epicurus',
        coreDifference: 'Aristippus was an active hedonist pursuing maximal intensity of sensory pleasure. Epicurus was a negative hedonist, holding that intensity is merely disturbed desire, and that the highest pleasure is the quiet state of bodily freedom from pain (aponia) and mental tranquility (ataraxia).',
        reflectionPrompt: 'For restoring the self, is it more reliable to pursue intense sensory stimulation, or to find the calm of a quiet afternoon free from disturbance?'
      }
    ]
  },
  pyrrhon: {
    lifeAndTimes: 'Founder of Pyrrhonian skepticism. He accompanied Alexander the Great\'s campaign to India, where he encountered naked ascetic philosophers who sat on thorns indifferent to heat, cold, and death. This encounter profoundly shook his confidence in Western philosophy\'s attachment to definitive claims.',
    worldviewSummary: 'Pyrrho held that human reason and senses are irreparably flawed, and that for any argument an equally forceful counter-argument can always be found (the principle of equipollence). Anyone who dogmatically commits to a belief suffers lasting anxiety. The philosopher\'s path is epochē—suspension of judgment—refusing to assert what things are truly like. This naturally yields ataraxia, the tranquil freedom from disturbance.',
    quote: 'Things are neither this nor that; we cannot say they are or are not. In this unfathomable mystery, only by suspending judgment entirely does the soul find its deepest peace.',
    comparisons: [
      {
        withName: 'Socrates',
        coreDifference: 'Socrates professed ignorance yet spent his life in dialectical pursuit of objective definitions of justice. Pyrrho held that such pursuit is itself unnecessary—genuine ignorance should lead to total suspension of judgment, not further inquiry.',
        reflectionPrompt: 'In confronting an unfathomable problem, do you pursue relentless analysis until the truth emerges, or accept the world\'s complexity and let go in tranquil peace?'
      }
    ]
  },
  epicurus: {
    lifeAndTimes: 'Founder of the Epicurean school. He established "the Garden" on the outskirts of Athens—an egalitarian community open to slaves and women. He suffered chronic kidney stones and digestive ailments throughout his life, yet lived simply on bread, water, and occasional cheese, finding joy that rivaled the gods.',
    worldviewSummary: 'Epicurus advocated rational negative hedonism grounded in Democritean atomism. To dispel fear of divine punishment and death, he argued that the soul is atomic and dissolves at death—there is no hell. "Death is nothing to us: when we are, death is not; when death is, we are not." Ethically, he condemned indulgence, which breeds emptiness. The highest pleasure is the absence of bodily pain (aponia) and mental disturbance (ataraxia); with modest food, shelter, and a few friends, one can live like a god.',
    quote: 'Do not fear God; do not fear death. What is good is easy to obtain; what is terrible is easy to endure. When death comes, we are no longer here.',
    comparisons: [
      {
        withName: 'Aristippus',
        coreDifference: 'The Cyrenaics pursued maximal intensity of active sensory pleasure. Epicurus observed that chasing intensified stimulation is often a disguised ticket to anxiety and suffering, maintaining that the highest and most secure pleasure is simple, undisturbed tranquility.',
        reflectionPrompt: 'In a culture that celebrates maximal sensory consumption, how can we recover the Epicurean art of finding profound pleasure in a cup of water and good conversation?'
      }
    ]
  },
  zeno_citium: {
    lifeAndTimes: 'Founder of Stoicism, from Citium in Cyprus. He lost his entire fortune in a shipwreck and arrived in Athens nearly destitute, where he discovered Socratic dialogues at a bookstall. He began teaching at the Stoa Poikile (Painted Colonnade) in the Athenian agora, drawing followers from across the Greek world.',
    worldviewSummary: 'Zeno held that the cosmos is not random chaos but a living, organic whole governed by Logos—divine rational order. Humans are particles of this universal reason, and the sole aim of life is to live in accordance with Nature. External events—fortune, adversity, even death—are fated necessities beyond our control. The only thing truly within our power is our own judgment, will, and dignified response to whatever befalls us.',
    quote: 'The goal of life is to live in accordance with Nature. Fate drags the reluctant, but guides the willing.',
    comparisons: [
      {
        withName: 'Epicurus',
        coreDifference: 'The Epicureans advocated retreat from public life into private gardens, minimizing disturbance to preserve personal tranquility. The Stoics insisted that the cosmos is a grand commonwealth and that the philosopher must face destiny courageously, bearing civic responsibility with iron self-discipline.',
        reflectionPrompt: 'Faced with heavy social expectations, do you retreat into a private world of self-cultivation, or take up the armor of responsibility and advance regardless of the cost?'
      }
    ]
  },
  cleanthes: {
    lifeAndTimes: 'The second head of the Stoic school. Originally a destitute boxer, he worked nights as a water-carrier to attend Zeno\'s lectures by day. Too poor to afford papyrus, he inscribed his teacher\'s doctrines on bones, oyster shells, and potsherds.',
    worldviewSummary: 'Cleanthes infused Stoicism\'s rigorous logical framework with a religious, hymnic sense of cosmic destiny. In his "Hymn to Zeus," he portrayed the world as a vast net of causal fire woven by divine Logos, with Zeus as its visible manifestation. Every blossom and every extinguished star fulfills a preordained, meaningful design from which nothing can deviate.',
    quote: 'Lead me, Zeus, wherever your destiny requires. Though I resist, I must follow. Destiny cannot be defied.',
    comparisons: [
      {
        withName: 'Zeno of Citium',
        coreDifference: 'Zeno built the intellectual skeleton of Stoicism—its logic, ethics, and physics. Cleanthes clothed that skeleton in devotional poetry and hymn, elevating a rigorous school of thought into a spiritual vision capable of moving ordinary hearts.',
        reflectionPrompt: 'To transmit a rational philosophy to a broad audience, is precise logical argument or soaring devotional sentiment more effective?'
      }
    ]
  },
  chrysippus: {
    lifeAndTimes: 'The third head of the Stoic school and its most prodigious systematizer, credited with over 705 works. So central was his contribution that it was said: "Without Chrysippus, there would have been no Stoa." Legend records that he died laughing at a donkey eating figs.',
    worldviewSummary: 'Chrysippus was the great architect of Stoic theory. He formalized Stoic logic into a system of propositional logic rivaling Aristotle\'s syllogistic. He defended the compatibility of fate with human agency through the "co-fated" argument: illness and seeking a cure are co-fated, so determinism does not license passivity. He thus secured a logical foundation for Stoic moral responsibility within a deterministic cosmos.',
    quote: 'When a cylinder is pushed, the initial impulse is external, but the character of its rolling depends on its own form and structure. So it is with our character.',
    comparisons: [
      {
        withName: 'Aristotle',
        coreDifference: 'Aristotle founded term-based syllogistic logic focused on categorical classification. Chrysippus developed propositional logic—conditional, disjunctive, and hypothetical reasoning—designed to capture the dense causal chains governing the natural world.',
        reflectionPrompt: 'Is reality better understood as neatly classifiable substances in categorical drawers, or as continuous chains of "if...then..." causal connections?'
      }
    ]
  },
  cicero: {
    lifeAndTimes: 'Rome\'s foremost statesman, orator, and philosophical popularizer. He served as consul and exposed the Catiline conspiracy, then opposed Caesar and Antony\'s autocratic ambitions. He was assassinated on Antony\'s orders, extending his neck to the executioner\'s blade. His severed hands were displayed in the Roman Forum.',
    worldviewSummary: 'Cicero was the great translator and synthesizer of Greek philosophy for the Roman world. Though he produced no original metaphysical system, he introduced the thought of Plato, the Stoics, and the Academy to Rome. His central contribution was the theory of natural law: there exists a universal, eternal rational law prior to and above any human legislation, rooted in human dignity and conscience, by which all positive law and tyranny must be judged.',
    quote: 'True law is right reason in agreement with nature; it is of universal application, unchanging and everlasting. Any attempt to alter or abolish it is impiety.',
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'Plato\'s ideal republic and transcendent justice remain largely theoretical, situated beyond reach of ordinary societies. Cicero translated these ideals into the concrete institutions of Roman law, oratory, and civic practice, making justice take root in the legal and political machinery of a real republic.',
        reflectionPrompt: 'In pursuing social reform, do we sketch perfect utopian models in theory, or enter the messy compromise of practical governance and incremental reform?'
      }
    ]
  },
  seneca: {
    lifeAndTimes: 'A Roman Stoic philosopher, playwright, and the wealthiest man of his era, who served as tutor and advisor to the emperor Nero. He lived in extreme contradiction: vast wealth and political complicity alongside private asceticism. When Nero ordered his death, Seneca opened his veins and calmly discussed philosophy with his grieving household until his last breath.',
    worldviewSummary: 'Seneca was Rome\'s most psychologically acute Stoic moralist. In works like "On the Shortness of Life," "On Anger," and the "Moral Epistles," he argued that all external misfortunes—tyranny, loss, death—are inevitable natural events. To rage against necessity is as absurd as berating a mountain. The philosopher\'s task is to rehearse all possible adversities in advance, so that when disaster strikes, one faces it fully armed, fearless, and composed.',
    quote: 'It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult. The whole of life must be a rehearsal for how to make a graceful exit.',
    comparisons: [
      {
        withName: 'Epicurus',
        coreDifference: 'In his Moral Epistles, Seneca broke Stoic orthodoxy by generously quoting Epicurus, treating the rival school as a valuable ally. Both traditions converged on a single insight: only by severing greed for possessions and dread of the future can the soul drink freely from the cup of freedom in each moment.',
        reflectionPrompt: 'Facing death\'s inevitability, do you choose the Stoic\'s resolute engagement with cosmic duty, or the Epicurean\'s quiet contentment among friends in a garden?'
      }
    ]
  },
  epictetus: {
    lifeAndTimes: 'A Roman Stoic philosopher born into slavery in Phrygia, with a permanently damaged leg (said to have been broken by a cruel master). He bore torture without complaint, later gained freedom, and founded a Stoic school in Epirus. He wrote nothing himself; his disciple Arrian recorded his teachings in the "Enchiridion" (Handbook) and the "Discourses."',
    worldviewSummary: 'Epictetus distilled Stoicism to its most practical form through the "dichotomy of control": some things are within our power (our judgments, desires, and aversions), while others are not (our body, reputation, wealth, and external events). All suffering arises from trying to control what is not ours while neglecting what is. Freedom lies in mastering the former and accepting the latter with equanimity.',
    quote: 'It is not events that disturb people, but their judgments about them. No one can harm you unless you assent to being harmed.',
    comparisons: [
      {
        withName: 'Seneca',
        coreDifference: 'Seneca practiced Stoicism amid immense wealth and political power, navigating the tension between riches and inner control. Epictetus, rising from slavery and disability with nothing to his name, demonstrated the most flawless inner mastery from the depths of destitution, showing that freedom requires no material precondition.',
        reflectionPrompt: 'In facing social inequality and pressure, which is more liberating: disciplined restraint amid prosperity, or radical freedom in absolute poverty?'
      }
    ]
  },
  marcus_aurelius: {
    lifeAndTimes: 'Roman emperor at the height of the empire\'s power, revered as the "philosopher king." His reign was marked by plague, rebellion, and barbarian invasions along the Danube frontier. He spent most of his final years in cold military camps, writing his private journal—the "Meditations"—solely for his own moral correction.',
    worldviewSummary: 'Marcus Aurelius embodied the Stoic ideal of the cosmopolis—a universal community governed by reason and natural law. He viewed all misfortunes, betrayals, and sufferings as necessary pieces of nature\'s providential design. The emperor\'s duty was to perform his assigned role without complaint, fear, or compromise, meeting each day\'s injustices with patience, virtue, and compassion until fate called him to exit.',
    quote: 'Stand like a rock against the waves that crash upon you; let them break and fall silent at your feet. The universe is change; life is what your judgments make of it.',
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'Plato dreamed of a philosopher-king ruling an ideal republic and risked his life three times in Syracuse to realize this vision. Marcus Aurelius was the only emperor who actually fulfilled Plato\'s criteria, yet in his tent he reminded himself never to expect a Platonic utopia—only to perform the duty before him with unstained integrity.',
        reflectionPrompt: 'Confronting social injustice, do you pursue the impossible dream of a perfect system, or tend to the patch of ground before you with unpretentious diligence?'
      }
    ]
  },
  philo: {
    lifeAndTimes: 'A Jewish theologian of Alexandria and central figure of Hellenistic philosophy. In old age he led a delegation to Rome to plead before the emperor Caligula on behalf of the persecuted Jewish community. He was deeply versed in both Mosaic law and Greek philosophy, especially Plato and the Stoics.',
    worldviewSummary: 'Philo was the first to systematically bridge Greek philosophy and Hebrew theology through allegorical interpretation. He held that God is absolutely transcendent—beyond all human description and conceptualization. Between God and the material world stands the Logos: the divine rational principle that mediates creation, ordering the cosmos and guiding the soul. This Logos theology laid the foundation for later Christian thought, particularly the Gospel of John.',
    quote: 'The Logos is the immortal bridge to the Most High, the divine radiance by which all things receive their intelligible form from chaos and clay.',
    comparisons: [
      {
        withName: 'Plato',
        coreDifference: 'Plato divided the world into inert material phenomena and cold, lifeless eternal Forms. Philo infused these abstract Forms with divine vitality, reconceiving them as the living, creative thoughts of God within the Logos.',
        reflectionPrompt: 'Is the ultimate principle of reality a cold mathematical formula devoid of subjectivity, or a higher intelligence capable of dialogue with the human mind?'
      }
    ]
  },
  plotinus: {
    lifeAndTimes: 'The founder of Neoplatonism, possessing extraordinary spiritual charisma. He lived in sustained contemplative detachment, reportedly expressing shame that his soul was housed in a mortal body. He several times achieved ecstatic union with the One in the presence of his students.',
    worldviewSummary: 'Plotinus articulated the cosmos as a hierarchy of "emanation" from the supreme One. The One, beyond all being and description, overflows by its own superabundance into successive levels: first the Divine Intellect (Nous), then the World Soul, and finally, where the divine light fades, the darkness of matter. Though embodied in the material world, the soul carries a spark of the One and can return through philosophical discipline, contemplation, and virtue—reascending to fusion with its source.',
    quote: 'The soul\'s journey home is the great triumph of the alone to the Alone. Awaken the inner eye that has long slept—it alone can behold the eternal light of the Good.',
    comparisons: [
      {
        withName: 'Aristotle',
        coreDifference: 'Aristotle located reality in concrete individual substances, insisting that universal forms cannot exist apart from matter. Plotinus rejected this as a capitulation to materialism, holding that even a falling leaf is the last dim projection of the supreme One, and that only absolute spiritual unity can redeem the world.',
        reflectionPrompt: 'In assessing human nature, should we accept our animal embodiment and seek the golden mean, or refuse to bow to bodily instinct and strive for transcendent spiritualization?'
      }
    ]
  },
  porphyrios: {
    lifeAndTimes: 'A leading figure of middle Neoplatonism and Plotinus\' most devoted disciple. It was Porphyry who edited and published his master\'s scattered writings as the "Enneads." He also authored the "Isagoge" (Introduction), a logical primer that shaped medieval philosophy for a thousand years.',
    worldviewSummary: 'Porphyry was the systematizer of later Neoplatonism. His greatest contribution was the "Tree of Porphyry," a hierarchical classification descending from the most general genus through species and differentiae down to the individual. He also posed the "Problem of Universals" that dominated medieval philosophy: do general concepts (like "human," "horse," "justice") exist as independent realities (realism), or are they merely names coined for convenience (nominalism)? This single question opened the door to a millennium of debate.',
    quote: 'All things find their rational index in the branches of a great tree. Conceptual truths are eternal realities above the senses.',
    comparisons: [
      {
        withName: 'Plotinus',
        coreDifference: 'Plotinus was a solitary mystic absorbed in transcendent contemplation, indifferent to systematic detail. Porphyry inherited his master\'s vision but possessed the architect\'s gift—organizing mystical insight through rigorous classification, genus, and logical analysis into a structure others could understand.',
        reflectionPrompt: 'In creative and intellectual work, is brilliant intuitive insight sufficient, or must it be accompanied by the patient labor of systematization and clear exposition?'
      }
    ]
  }
};
