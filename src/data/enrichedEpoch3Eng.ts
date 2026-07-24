export const enrichedEpoch3Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  petrarca: {
    lifeAndTimes: "The 'Father of Humanism' and pioneering figure of the Italian Renaissance. An avid collector and translator of classical Roman manuscripts, Petrarch famously climbed Mount Ventoux, where the panoramic vista prompted an inward turn — a recognition that the human soul itself holds greater dignity and worth than any external natural grandeur.",
    worldviewSummary: "Petrarch sought to free European thought from the rigid literalism of late Scholastic theology, elevating the dignity of the person and the value of earthly happiness. He argued that philosophy should not be a lifeless exercise in syllogistic dissection conducted in dead Latin, but a living humanistic discipline addressed to actual human emotions, imagination, and the pursuit of excellence. His recovery and advocacy of Cicero and Augustine inaugurated the centuries-long movement of Renaissance humanism.",
    quote: "The vastness of mountains, oceans, and the heavens may provoke wonder; yet all these material spectacles combined cannot rival the abyss of the human soul — solitary, variable, and luminous with pride. Turn your gaze inward!",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Aquinas assembled the *Summa Theologica* as an algebraic architecture of definitions in scholastic Latin, treating the human soul as a component in a deductive system. Petrarch regarded this as a mutilation of living spirit, insisting that poetry, passionate feeling, and Roman civic virtue must restore philosophy to a humanistic light that ordinary people could understand and live by.",
        reflectionPrompt: "In adjudicating life's truths, do we need precise, cold, but perfect logical classifications (Aquinas), or do we need poetry and humanistic emotion that strikes the depths of life and inspires courage under suffering (Petrarch)?"
      }
    ]
  },

  ficino: {
    lifeAndTimes: "The central teacher of the Platonic Academy in Florence, patronized by Cosimo de' Medici. Ficino devoted his life to a single monumental achievement: translating, annotating, and introducing the complete Platonic dialogues into the Latin West, making him the principal engine of the Renaissance 'Platonic revival.'",
    worldviewSummary: "Ficino articulated a vision of 'Platonic love' as the cosmic bond uniting God and creation. He held that the universe is an organic whole welded together by *Amor Platonicus*, with the human soul suspended at its center — turned upward toward divine intelligible forms and downward toward material embodiment. Through disinterested love of truth, beauty, and goodness in the sensible world, the soul refines and elevates material phenomena back toward their divine archetypes, making love the immortal bridge between flesh and spirit.",
    quote: "Love is the sole magnetic force and converging light at the heart of the universe. In the pure gaze of shared intellectual pursuit, the human soul breaks the limits of the body and commingles with the divine.",
    comparisons: [
      {
        withName: "Plotinus",
        coreDifference: "Plotinus regarded the material body and worldly engagement as sources of shame, advocating withdrawal and renunciation toward the One. Ficino took a more romantic and affirming stance: poetry, music, friendship, and worldly beauty are themselves the most beautiful ladders by which the divine light descends into matter, and we should engage the world with aesthetic refinement rather than flee it.",
        reflectionPrompt: "In seeking spiritual nobility, must we sever all ties with worldly pleasure and pursue ascetic purity, or can we move through the world's beauty, music, and friendship with refined aesthetic spirit, transforming them into nourishment for the soul's ascent?"
      }
    ]
  },

  pico: {
    lifeAndTimes: "The most dazzling prodigy of the Renaissance — by his early twenties he had mastered Greek, Latin, Hebrew, Arabic, and several esoteric traditions. At twenty-three he proposed a public disputation in Rome, for which he composed the *Oration on the Dignity of Man*, widely regarded as the inaugural manifesto of Renaissance humanism. He died young, his brilliance already legendary.",
    worldviewSummary: "Pico's worldview centers on the 'cosmic chameleon' hypothesis. God assigned every creature — stones, beasts, angels — a fixed, unalterable place in the cosmic hierarchy. But to humanity alone God gave no determined boundary, declaring that the human being must define itself through free self-fashioning. Humans can degenerate to the level of beasts or ascend toward angelic intellect. Self-sculpting and self-legislation are the singular privilege of the human condition.",
    quote: "God gave you no fixed, rigid boundary. You may determine your own fall and death; you may also, through the pure freedom of spirit, divinize yourself. You are the sole artisan of your destiny.",
    comparisons: [
      {
        withName: "St. Augustine",
        coreDifference: "Augustine held that original sin renders humanity morally incapacitated, able only to await divine grace. Pico proclaimed the opposite: human nature is defined by infinite, divine plasticity, requiring no external determination, and through its own intellect humanity can ascend to the highest reaches of being.",
        reflectionPrompt: "When you examine your own nature, do you believe there exists an ineradicable selfishness and weakness requiring external correction (original sin), or do you hold that your capacity for self-transformation is boundless, and that through genuine effort you can realize moral perfection (human dignity)?"
      }
    ]
  },

  cusanus: {
    lifeAndTimes: "A German cardinal, diplomat, and scientific pioneer of the Renaissance. He anticipated Copernicus by proposing that the Earth moves and that the universe has no fixed physical boundary. Eirenical in temperament, he advocated mutual tolerance among religious traditions and devoted his career to exploring the limits of human intellect.",
    worldviewSummary: "Cusanus advanced the doctrine of 'Learned Ignorance' (*Docta Ignorantia*) and the 'coincidence of opposites' (*Coincidentia Oppositorum*). He argued that human reason operates through division and either/or categories, measuring the world with limited conceptual tools. In the infinite ultimate truth (God), however, maximum and minimum, hot and cold, and all oppositions are unified and reconciled. The true philosopher does not win arguments by definitional force but, through precise logical analysis, discovers the boundary of intellect itself, attaining a 'learned ignorance' that sees through opposition and makes peace with it.",
    quote: "Only when we have thoroughly measured the impassable boundary of our intellect do we step into the most luminous 'learned ignorance.' In this infinite universe, all sharp oppositions will gently unite.",
    comparisons: [
      {
        withName: "Parmenides",
        coreDifference: "Parmenides denied the reality of all change to preserve the static unity of Being. Cusanus argued that the infinite encompasses the diversity of change: all things, as projections of the infinite, can be harmonized through the 'coincidence of opposites,' a mathematical model in which contradiction is resolved at the highest level.",
        reflectionPrompt: "In judging truth and falsity, must we hold to rigid binary classification (Parmenides), or can we adopt a more generous vision that perceives how opposites meet and are unified at the deepest level of reality (Cusanus)?"
      }
    ]
  },

  montaigne: {
    lifeAndTimes: "The 'father of the essay' and Renaissance skeptic, Montaigne retired from public life as mayor of Bordeaux to his tower library, where he composed the immortal *Essays*. Weary of religious bloodshed, he recorded his intellectual wanderings in prose of extraordinary subtlety and candor, punctuated by his signature question: 'Que sais-je?' (What do I know?).",
    worldviewSummary: "Montaigne was the great secular skeptic of the Renaissance, turning a discerning eye on every claim to absolute truth. He held that human reason, law, custom, and history are all limited, parochial, and riddled with bias — even an emperor on his throne sits on an ordinary body. Philosophy should not chase metaphysical abstractions but honestly examine the self in its concrete, imperfect, everyday reality: 'Philosophy is learning how to live well and face one's own incompleteness.'",
    quote: "What do I know? What the world calls 'absolute truth' is merely a bundle of interests dressed in long robes. The finest face of philosophy is to live naturally and at ease. Even the emperor on his throne sits upon nothing but his own ordinary flesh.",
    comparisons: [
      {
        withName: "Socrates",
        coreDifference: "Socratic 'knowing that one does not know' ultimately serves the pursuit of a single objective truth, for which Socrates was willing to die. Montaigne deployed the same skeptical principle to dismantle all grand claims, refusing martyrdom and doctrine, aiming instead to make us comfortable, humane, and free as ordinary people.",
        reflectionPrompt: "When confronting the limits of your knowledge, is the purpose to reconstruct a higher, more invincible truth for which you would sacrifice everything (Socrates), or to deconstruct all grand rhetoric and settle peacefully into ordinary life without slogans (Montaigne)?"
      }
    ]
  },

  more: {
    lifeAndTimes: "Lord Chancellor of England under Henry VIII and a pioneering humanist. When Henry demanded support for his break with Rome and claim of ecclesiastical supremacy, More refused on grounds of conscience and was executed on Tower Hill. His final words to the executioner were characteristically wry: 'See that you cut my neck safely, but spare my beard, for it has committed no treason.'",
    worldviewSummary: "In *Utopia* (1516), More imagined an island commonwealth without private property, greed, or status competition. Gold and jewels are used only for chamber pots and slave fetters, stripping them of symbolic prestige. Citizens work six hours daily and devote the rest to learning, music, and civic life. The community is governed by consent rather than tyranny. This vision became a foundational text for later socialist and utopian thought.",
    quote: "If private property once reigns unchecked, people will trample all justice for the sake of gold. In a true commonwealth, gold is merely the chain on a prisoner's foot or a child's chamber pot. Only virtue and shared leisure are the true wealth of life.",
    comparisons: [
      {
        withName: "Plato",
        coreDifference: "Plato's *Republic* abolishes private property only for the guardian class within a rigid hierarchy ruled by philosopher-kings, where laborers can never ascend. More's *Utopia* is more egalitarian: all citizens share in labor, intellectual pursuits, and self-governance under a humane and democratic ethos.",
        reflectionPrompt: "In pursuing social reform, do you favor a hierarchy of superior minds designing and enforcing a perfect order (Plato), or do you trust the abolition of exploitation and democratic leisure to cultivate the dignity of all citizens (More)?"
      }
    ]
  },

  luther: {
    lifeAndTimes: "The architect of the Protestant Reformation. Outraged by the sale of indulgences, Luther posted his *Ninety-Five Theses* at Wittenberg in 1517, shattering the unity of medieval Christendom. Facing imperial and ecclesiastical condemnation, he stood firm at the Diet of Worms: 'Here I stand. I can do no other.'",
    worldviewSummary: "Luther's doctrine of *Sola Fide* (justification by faith alone) dismantled the priestly mediation that had governed Western Christianity for over a millennium. He declared that the humblest peasant needs no indulgence or ritual to reach God — faith alone suffices, for divine light already dwells in the conscience of every person. 'Every person is their own priest before God.' This liberation of individual conscience from institutional control paved the way for modern individualism and freedom of thought.",
    quote: "Here I stand. I can do no other. Let the titles of the Church blow where they will: every person is a direct recipient of truth and their own priest. Before truth, each person is sacred, independent, and equal.",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Aquinas designed an elaborate hierarchical system in which salvation is mediated through clerical authority and sacramental ritual. Luther demolished this apparatus, declaring that sincere subjective faith alone unites the individual with ultimate truth, radically liberating the spiritual autonomy of ordinary persons.",
        reflectionPrompt: "In pursuing your life's calling, do you seek validation through a graded institutional hierarchy of certifications and approvals (Aquinas), or do you trust that your innermost commitment to your own value is the ultimate anchor in the storm (Luther)?"
      }
    ]
  },

  calvin: {
    lifeAndTimes: "The austere architect of Reformed theology and civic reform in Geneva. Through uncompromising discipline, Calvin transformed a corrupt city into a model of moral order and self-governance. His 'Protestant work ethic' profoundly shaped the spiritual infrastructure of modern capitalism.",
    worldviewSummary: "Calvin advanced the doctrine of predestination: before creation, God eternally and immutably determined who would be saved (the elect) and who damned — a decree beyond human inquiry. The only evidence of one's election is not ritual piety but disciplined, tireless labor in one's worldly calling (*vocation*). Diligent work, sobriety, and productive order become the visible signature of divine favor. Labor itself becomes a form of worship.",
    quote: "Every honest vocation is a divine calling. The laborer who works with clocklike discipline and unyielding excellence in the world bears the first seal of election.",
    comparisons: [
      {
        withName: "Epicurus",
        coreDifference: "Epicurus advocated withdrawing from competitive public life into a garden of minimal wants and tranquil leisure. Calvin inverted this: human beings are called to sweat and excel in worldly vocations, pushing productivity and self-discipline to their limits. To shun labor is corruption of the soul.",
        reflectionPrompt: "Do you find life's meaning in protective withdrawal from competition and ambition (Epicurus), or in pushing your professional craft to the highest excellence despite adversity and toil (Calvin)?"
      }
    ]
  },

  bacon_f: {
    lifeAndTimes: "Lord Chancellor of England and the principal architect of modern experimental science. After political disgrace, Bacon devoted himself wholly to natural philosophy. His death was characteristically empirical: catching pneumonia after stuffing a chicken with snow to test whether cold preserves flesh from decay.",
    worldviewSummary: "Bacon declared 'Knowledge is power' and proposed the *Novum Organum* — a new method of empirical induction to replace Aristotelian syllogism. He identified four 'Idols of the Mind' that distort cognition: Idols of the Tribe (inherent perceptual biases of the species), Idols of the Cave (individual parochialism), Idols of the Marketplace (corruption through language), and Idols of the Theater (dogmatic inherited systems). Only systematic empirical observation and inductive generalization from nature can liberate the mind and make humanity master of the natural world.",
    quote: "Knowledge is power. We cannot redeem ourselves by manipulating abstract concepts in a study. Go to nature, measure its physical responses, and extract immutable laws. Shatter the four Idols — Tribe, Cave, Marketplace, and Theater — that have poisoned reason for centuries!",
    comparisons: [
      {
        withName: "Aristotle",
        coreDifference: "Aristotle's *Organon* proceeds top-down through syllogistic deduction from first principles. Bacon's *Novum Organum* argued that deduction merely protects existing prejudice; only bottom-up induction — from scattered particulars and observed data toward general laws — produces genuinely new knowledge of the physical world.",
        reflectionPrompt: "When investigating complex problems, should we reason downward from fixed premises through syllogistic logic (Aristotle), or build upward from concrete data and observed particulars through inductive generalization (Bacon)?"
      }
    ]
  },

  herbert_cher: {
    lifeAndTimes: "A seventeenth-century English knight, soldier, and diplomat, widely regarded as the 'father of Deism.' A man of fearless physical and intellectual courage, Herbert fought numerous duels in defense of truth and dignity. His *De Veritate* (*On Truth*) is the foundational text of English natural religion.",
    worldviewSummary: "Herbert argued that God is not a capricious deity dispensing miracles and punishments, but the sum of rational and mathematical order governing the universe. Having created this perfect mechanism, God allows it to run by natural necessity without intervention. Humans possess innate 'Common Notions' — universal intuitive truths (God exists, should be worshipped, virtue constitutes worship, repentance is required for sin, and the afterlife rewards good and punishes evil) — accessible without any clerical mediation.",
    quote: "Superstition is the fetter that the weak and their parasitic priests have forged. God scorns miracles, for the physical laws of creation are already perfect. Through the five innate Common Notions, humanity stands independent and noble before the divine.",
    comparisons: [
      {
        withName: "St. Augustine",
        coreDifference: "Augustine placed all hope in miraculous grace and special divine intervention, devaluing the natural order. Herbert inverted this: the rational laws of physics and the universal light of natural reason are the only reliable guides. Miracles are superstition and priestly fraud.",
        reflectionPrompt: "In seeking ultimate meaning, do you long for a transcendent, warm, miraculous encounter that surpasses reason (Augustine), or do you find dignity in an impersonal, impartial, mathematically precise natural order that plays no favorites (Herbert)?"
      }
    ]
  },

  hobbes: {
    lifeAndTimes: "The preeminent political philosopher of seventeenth-century England and a foundational materialist. Born prematurely as the Spanish Armada approached — he joked that fear was his twin — Hobbes witnessed the carnage of the English Civil War, which decisively shaped his stark, mechanistic theory of the state.",
    worldviewSummary: "In *Leviathan*, Hobbes shattered the classical assumption that humans are naturally sociable and political. In the 'state of nature,' absent a sovereign, all are solitary predators locked in a 'war of all against all,' and life is 'solitary, poor, nasty, brutish, and short.' To escape annihilation, rational individuals contract to surrender their natural right of violence to an absolute sovereign — the Leviathan — whose overpowering force alone maintains peace. Civil order is not the fruit of virtue but the product of fear and rational self-interest.",
    quote: "In the state of nature, humans are wolves to one another. Without the sword of sovereignty, all covenants are empty words. The Leviathan is forged from every citizen's surrendered rights; without its invincible blade, no contract can hold.",
    comparisons: [
      {
        withName: "Plato",
        coreDifference: "Plato envisioned an ideal polis governed by philosopher-kings who embody the Form of the Good, aiming to make citizens virtuous. Hobbes dismissed moral idealism as irrelevant to wolflike human nature: the state's mission is not sanctity but the prevention of mutual destruction through overwhelming force.",
        reflectionPrompt: "In designing legal and political order, should we trust in the superior virtue and wisdom of enlightened rulers (Plato), or should we construct an impersonal, formidable system of law that binds all through deterrence (Hobbes)?"
      }
    ]
  },

  descartes: {
    lifeAndTimes: "The founding father of modern philosophy and inventor of analytic geometry. Frail in health, Descartes habitually meditated in bed. During a famous winter spent beside a stove (*poêle*), he resolved to rebuild all knowledge on pure reason. He lived privately and moved to the Swedish court late in life, where early-morning lessons in the cold led to his death from pneumonia.",
    worldviewSummary: "Descartes pioneered methodological radical doubt: if all sensory experience might be deception, what remains indubitable? The act of doubting itself proves the doubter's existence — *Cogito, ergo sum*. From this first certainty he reconstructed knowledge through pure reason, arguing that the universe consists of two fundamentally distinct substances: thinking mind (*res cogitans*) and extended matter (*res extensa*), the latter governed by mechanical laws. This mind-body dualism became the central problem of early modern philosophy.",
    quote: "I think, therefore I am. Before embracing any truth, one must subject all inherited opinions to at least one thoroughgoing act of doubt.",
    comparisons: [
      {
        withName: "Baruch Spinoza",
        coreDifference: "Descartes split the world into mind and matter, awkwardly connecting them through the pineal gland. Spinoza severed this duality entirely: there is only one substance — Nature (or God) — of which thought and extension are merely parallel attributes, completing a grand pantheistic monism.",
        reflectionPrompt: "Are consciousness and body two fundamentally different substances coincidentally joined (Descartes), or are they two faces of a single natural current, intimately fused at the deepest level (Spinoza)?"
      },
      {
        withName: "David Hume",
        coreDifference: "Descartes held that the mind possesses innate ideas placed by God, from which all science can be deductively derived. Hume countered that every idea without sensory origin is empty abstraction; the mind is a blank surface on which scattered impressions are gathered, and even causality is merely habitual expectation.",
        reflectionPrompt: "Is your grasp of reality grounded in innate rational intuition and logical necessity (Descartes), or in the accumulated weight of sensory experience and psychological habit (Hume)?"
      }
    ]
  },

  gassendi: {
    lifeAndTimes: "A seventeenth-century French astronomer, mathematician, and uncompromising empiricist — and Descartes' principal philosophical rival. A Catholic priest by vocation, Gassendi devoted his career to rehabilitating the ancient atomism of Epicurus and Democritus, reconstructing the material foundations of modern science.",
    worldviewSummary: "Gassendi championed a Christianized atomism. He rejected Descartes' separation of soul and body as metaphysical fantasy, declaring that the bedrock of reality is hard, indivisible physical atoms moving through void. Even the human soul, in its sensitive and nutritive functions, is composed of subtle material atoms. God is the supreme physicist who set the atoms in motion. This materialist framework anticipated Newtonian mechanics and chemical reductionism.",
    quote: "Sir, your talk of 'thinking substance' without mass or dimension is word-play. Beyond the divine, nature holds only one truth: hard atoms colliding, pulling, and spinning through the void.",
    comparisons: [
      {
        withName: "René Descartes",
        coreDifference: "Descartes elevated pure reason above the senses, dismissed atomism, and constructed a mind-body dualism. Gassendi countered that science must rest on what the senses can measure — physical atoms — and that all cognition derives from sensory fragments, firing the first major volley of seventeenth-century rationalism versus empiricist materialism.",
        reflectionPrompt: "In judging the existence and nature of things, should we trust mathematical reasoning of pure intellect (Descartes), or should we trust exclusively in what the senses can measure and verify (Gassendi)?"
      }
    ]
  },

  locke: {
    lifeAndTimes: "The most influential English philosopher of the seventeenth century, founding father of liberalism and constitutional government. A close associate of Newton and the intellectual mentor of Voltaire, Locke lived through the Glorious Revolution. His *Essay Concerning Human Understanding* and *Two Treatises of Government* shaped the constitutional foundations of the modern Anglo-American world.",
    worldviewSummary: "In epistemology, Locke demolished the doctrine of innate ideas: at birth the mind is a *tabula rasa*, and all knowledge derives from sensory experience. In politics, he argued that individuals possess natural rights to life, liberty, and property. The state's sole legitimate function is to protect these rights as a fiduciary servant of the people; if it oversteps, citizens retain the right of revolution. This framework became the cornerstone of modern liberal democracy.",
    quote: "The mind at birth is a blank slate. All knowledge is inscribed by experience. The legitimacy of sovereignty rests solely on its duty to protect every person's life, liberty, and property. Should the Leviathan violate these, rebellion is justice.",
    comparisons: [
      {
        withName: "René Descartes",
        coreDifference: "Descartes held that the mind possesses innate ideas stamped by God, from which all truth can be deductively derived. Locke countered that without sensory input the mind is an empty cabinet, establishing the empiricist foundation of modern philosophy.",
        reflectionPrompt: "Do you believe in innate intellectual intuitions given at birth (Descartes), or do you recognize that your every insight has been written by the friction of life's experiences onto a once-blank slate (Locke)?"
      },
      {
        withName: "Thomas Hobbes",
        coreDifference: "Hobbes argued that the state of nature is a war of all against all, requiring unconditional surrender of rights to an absolute sovereign. Locke held that the natural state is governed by reason and moral law; the social contract creates a limited government whose sole duty is to protect property and liberty. If it transgresses, the people retain the right of revolution.",
        reflectionPrompt: "Do you believe order requires an overpowering, fearsome central authority (Hobbes), or that the protection of individual rights and the limitation of state power best cultivate prosperity and civic freedom (Locke)?"
      }
    ]
  },

  spinoza: {
    lifeAndTimes: "The most ethically pure figure in the history of philosophy. Born into a Jewish merchant family, Spinoza was excommunicated at twenty-four for his pantheistic views and severed from his community. He lived quietly, grinding optical lenses for a living, and declined a university chair that would have constrained his freedom. He died of lung disease, likely from glass dust inhalation. His *Ethics* is composed in strict geometric order, with definitions, axioms, and propositions in the manner of Euclid.",
    worldviewSummary: "Spinoza's absolute monism holds that there is only one substance — God or Nature (*Deus sive Natura*) — infinite, self-caused, and governed by necessary causal law. There is no contingency, no personal deity, no room for complaint. Suffering arises from inadequate understanding and passionate attachment to partial perspectives. Freedom consists not in escaping necessity but in comprehending it: when the mind grasps the total causal order *sub specie aeternitatis* (under the aspect of eternity), it attains the highest joy — the intellectual love of God.",
    quote: "God or Nature. Do not weep, do not laugh, do not curse, but understand. Let us view all things under the aspect of eternity.",
    comparisons: [
      {
        withName: "G. W. F. Hegel",
        coreDifference: "Hegel declared that 'to be a philosopher one must first be a Spinozist,' inheriting the vision of a single absolute substance. Yet he found Spinoza's substance static and lifeless — a 'night in which all cows are black' — and transformed it into the dynamic, self-alienating, historically developing Absolute Spirit.",
        reflectionPrompt: "Is the universal law of the cosmos a timeless, static, geometric truth already perfect at the origin (Spinoza), or a dynamic historical process that unfolds through conflict and self-correction over millennia (Hegel)?"
      }
    ]
  },

  malebranche: {
    lifeAndTimes: "A seventeenth-century French Oratorian priest and the most original successor to Cartesian rationalism. Physically frail and severely hunchbacked, Malebranche possessed a spirit of extraordinary purity and intellectual dedication. A chance encounter with Descartes' *Treatise on Man* at a Paris bookstall transformed his life; he devoted decades to the great metaphysical work *The Search After Truth*.",
    worldviewSummary: "Malebranche proposed 'Occasionalism' to resolve the Cartesian mind-body problem. If mind and matter are utterly distinct substances with no causal commerce, how does a mental volition move a physical limb? His answer: it does not. The mental act is merely an 'occasion'; God, in His omniscient unity, synchronously causes the corresponding physical motion. 'We see all things in God.' The divine intellect is the sole nexus binding the otherwise isolated realms of thought and extension, lending the dualism an unprecedented theological grandeur.",
    quote: "Our mental volitions have no physical power to move matter. Each act of will is merely an occasional cause; all activity unfolds within the unified intellect of the Creator, who synchronizes every motion in a single symphony.",
    comparisons: [
      {
        withName: "René Descartes",
        coreDifference: "Descartes posited the pineal gland as a crude physical bridge between mind and body, creating insoluble problems. Malebranche eliminated any material intermediary: God alone is the causal nexus, and mind and body are synchronized through the divine intellect at every instant, without any direct interaction.",
        reflectionPrompt: "Is the mind an isolated, autonomous subject thinking its own thoughts in a cold mechanical shell (Descartes), or is every thought a node synchronized within a vast divine network that encompasses all reality (Malebranche)?"
      }
    ]
  },

  berkeley: {
    lifeAndTimes: "The eighteenth-century Irish idealist philosopher and Anglican bishop. Cultivated, genial, and active in educational reform, Berkeley developed his radical epistemology to combat the rising tide of materialism. The University of California, Berkeley, is named in his honor.",
    worldviewSummary: "Berkeley advanced the principle *esse est percipi* — 'to be is to be perceived.' Pressing Locke's empiricism to its logical conclusion, he argued that if all knowledge comes through the senses, then the notion of a 'material substance' existing independently of perception is a self-contradictory abstraction. We perceive only colors, textures, and sounds — never 'matter' itself. When no human perceives a thing, it continues to exist only because it is perpetually perceived by an omniscient God. Berkeley thus eliminated matter entirely, leaving only minds and their ideas.",
    quote: "To be is to be perceived. Tell me, beyond the colors your eyes see and the textures your fingers feel, what is this 'material substance' you speak of? It is an empty fiction. Without a perceiving mind, the universe dissolves into nothing.",
    comparisons: [
      {
        withName: "John Locke",
        coreDifference: "Locke accepted that behind our sensory ideas there exists an independent material world of atoms and extension. Berkeley turned Locke's own empiricism against him: if we know only our own ideas, the material substrate is a baseless abstraction. Only minds, ideas, and God's perception constitute reality.",
        reflectionPrompt: "Does a hard material world exist independently of all perception, running coldly and indifferently whether or not anyone observes it (Locke)? Or does the world's color and texture come into being only through the participation of a perceiving mind (Berkeley)?"
      }
    ]
  },

  tindal: {
    lifeAndTimes: "An eighteenth-century English jurist and the most uncompromising voice of radical Deism. His *Christianity as Old as the Creation* (1730) was hailed across Europe as the 'Bible of Deism,' detonating a rationalist assault on orthodox theology that forced the church onto the defensive.",
    worldviewSummary: "Tindal argued that true religion and the rational laws of nature are one and the same, equally ancient and coextensive. God established universal, immutable natural law at creation, accessible to all through reason. Christianity is not a supernatural revelation but a restatement of this primordial natural morality. Any doctrine that contradicts reason — miracles, mysteries, ecclesiastical privilege — is priestcraft and fraud, deserving only to be discarded. Reason alone is the sacred light of truth.",
    quote: "True natural religion is coextensive with the laws of nature. Any so-called miracle that defies reason and science is nothing but priestly fraud, fabricated to intimidate the credulous. Logic is the sacred light of truth.",
    comparisons: [
      {
        withName: "John Locke",
        coreDifference: "Locke established rational principles for government but retained a cautious, accommodating tolerance for biblical miracles and supernatural revelation in his theological writings. Tindal stripped away all compromise, applying the rationalist blade to its limit: every miracle that cannot withstand scientific scrutiny must be excised without remainder.",
        reflectionPrompt: "In shaping your deepest convictions, do you preserve a measure of reverential mystery toward inherited traditions for the sake of harmony, or do you insist on purging every unscientific claim with uncompromising rational clarity (Tindal)?"
      }
    ]
  },

  leibniz: {
    lifeAndTimes: "The most universal intellect of the seventeenth century — mathematician, logician, diplomat, and inventor. He independently co-discovered calculus with Newton, invented binary arithmetic, and designed a mechanical calculator capable of all four arithmetic operations. Serving as court counselor, he wrote metaphysics and corresponded on the Chinese *I Ching* from speeding carriages by candlelight.",
    worldviewSummary: "Leibniz's monadology holds that the universe is composed of infinitely many 'monads' — immaterial, windowless, indivisible entities, each a self-contained mirror reflecting the entire cosmos from its own perspective. Having no causal interaction, monads are synchronized by a 'pre-established harmony' ordained by God at creation. God, surveying all possible worlds, actualized the best — one in which maximum variety coexists with maximum order. Even suffering is a necessary note in the cosmic symphony, without which the whole would be less perfect.",
    quote: "Monads have no windows, yet each is a self-sufficient mirror of the entire cosmos. Nothing is accidental; this world is the best of all possible worlds, pre-established in perfect harmony by the divine calculus.",
    comparisons: [
      {
        withName: "John Locke",
        coreDifference: "Locke held that the mind is a blank slate filled only by sensory experience. Leibniz countered in the *New Essays on Human Understanding* that the mind already contains innate dispositions and virtual knowledge — like veined patterns in marble awaiting the sculptor's chisel. Experience activates but does not create these ideas.",
        reflectionPrompt: "Is the mind at birth an empty slate awaiting external data (Locke), or does it contain innate patterns and dispositions that must be drawn out through inward effort and reflection (Leibniz)?"
      },
      {
        withName: "Baruch Spinoza",
        coreDifference: "Spinoza reduced all existence to a single static, geometric substance — God or Nature — without interiority or history. Leibniz found this barren: reality is composed of infinitely many vital monads, each endowed with its own perspective and activity, composing a pluralistic and dynamic symphony of being.",
        reflectionPrompt: "Is the universe a single static substance governed by absolute geometric necessity (Spinoza), or a pluralistic network of countless autonomous centers, each radiating its own life and perspective (Leibniz)?"
      }
    ]
  },

  hume: {
    lifeAndTimes: "The leading figure of the Scottish Enlightenment. Genial and sociable, Hume was beloved in Parisian salons as 'le bon David.' His skepticism and irreligion barred him from academic chairs, but his *History of England* brought literary fame. He faced death with extraordinary composure, discussing classical literature with friends in his final days.",
    worldviewSummary: "Hume reduced epistemology to its empirical foundations. The mind contains only 'impressions' (vivid sensory data) and 'ideas' (their faint copies); any idea lacking an impression is meaningless. He dismantled two pillars of metaphysics: the self (which is merely a bundle of fleeting perceptions, not a substantial entity) and causality (we observe only constant conjunction — one event following another — never necessary connection; causation is psychological habit, not logical necessity). 'Reason is, and ought only to be, the slave of the passions.'",
    quote: "Reason is, and ought only to be, the slave of the passions. Custom is the great guide of human life.",
    comparisons: [
      {
        withName: "Immanuel Kant",
        coreDifference: "Hume's dismantling of causality as mere psychological habit threw the foundations of science into crisis. Kant was roused from his 'dogmatic slumber' and undertook a Copernican revolution: causal necessity is not a feature of things-in-themselves but a category imposed by the mind, structuring experience *a priori*. Science is possible because the mind legislates laws to nature.",
        reflectionPrompt: "Is causal necessity an objective feature of the external world, or is it a mental framework — an 'operating system' the mind installs to organize experience (Kant)?"
      }
    ]
  },

  wolff: {
    lifeAndTimes: "The systematic architect of the German Enlightenment and the foremost codifier of Leibnizian philosophy. For two decades Wolff dominated German academic life, presenting philosophy in rigorously ordered, textbook-style treatises that became standard curricula across the German universities, directly training the generation that included Immanuel Kant.",
    worldviewSummary: "Wolff transformed Leibniz's visionary monadology into a systematic encyclopedia of rational philosophy. He held that philosophy's task is to establish, through formal, contradiction-free reasoning, the first principles of every discipline — cosmology, psychology, ethics, and politics. Pure logic alone can demonstrate the necessary existence of God and the rational order of the world. His meticulously ordered system brought unprecedented clarity to German academic life, replacing theological speculation with disciplined rational inquiry.",
    quote: "Systematic logical definition is the philosopher's shield against intellectual chaos. Under contradiction-free scrutiny, all things reveal their immutable principles. Through rigorous system, the mind is given its road.",
    comparisons: [
      {
        withName: "G. W. Leibniz",
        coreDifference: "Leibniz was a peripatetic genius who scribbled insights on scattered notes and letters, brilliant but unsystematic. Wolff was the master builder: he strung Leibniz's scattered pearls into a coherent, teachable system that dominated German universities for two decades, making rationalism a standard curriculum rather than a private revelation.",
        reflectionPrompt: "In intellectual development, do we need more flashes of genius that illuminate the sky and vanish (Leibniz), or more patient system-builders who forge those flashes into reproducible, trainable frameworks accessible to all (Wolff)?"
      }
    ]
  }
};
