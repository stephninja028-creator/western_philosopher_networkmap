export const enrichedEpoch2Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  augustine: {
    lifeAndTimes: "Born in North Africa, Augustine is the foundational saint of medieval philosophy. His youth was marked by sensual indulgence and a period with the Manichean sect, torn between carnal desire and spiritual longing. Later in life he wrote the *Confessions*, the first work in Western literature to excavate the hidden depths of the soul, tracing the psychology of desire and original sin, and inaugurating a new depth in introspective theology.",
    worldviewSummary: "Augustine fused Platonic philosophy with Christian theology. He held that all virtue, order, and illumination flow as radiations of God's grace. Due to original sin, human beings are irreversibly inclined through the flesh toward selfish desire and moral decay; salvation is possible only through total reliance on divine grace. He drew a sharp division between the City of Man (the selfish, fallen world) and the City of God (the sanctified communion of the faithful in the hereafter). His theory of time is profoundly subjectivist: past, present, and future are merely projections of memory, attention, and expectation within the mind — only God dwells in an unchanging, unified eternity.",
    quote: "What then is time? If no one asks me, I know; but if I wish to explain it to one who asks, I know not.",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Augustine followed the Platonic path, devaluing empirical experience and natural reason, urging believers to abandon sensory desires and receive divine illumination through grace alone. Aquinas, working in the era of Aristotle's recovery, vigorously argued that reason and faith do not conflict, granting scientific inquiry a legitimate dignity alongside theological truth.",
        reflectionPrompt: "When pursuing higher truth, should we turn inward through introspection and the will's conversion (Augustine), or rely on systematic logical reasoning and empirical investigation to gradually understand the complex order of the world (Aquinas)?"
      }
    ]
  },
  boethius: {
    lifeAndTimes: "Born into the highest Roman aristocracy and fluent in Greek, Boethius is often called the 'last Roman philosopher' of Late Antiquity. He rose to the rank of consul but fell victim to political intrigue, imprisoned on false charges, and wrote the immortal *Consolation of Philosophy* in his cell while awaiting execution. He faced death with calm dignity, embodying the martyrdom of truth.",
    worldviewSummary: "In the darkness of his death-row cell, Boethius constructed a powerful synthesis of Stoic and Platonic thought. In his vision, Lady Philosophy descends to his prison and teaches him through reason: worldly goods — fortune, wealth, fame, power — are nothing but shifting sand, spun by the indifferent Wheel of Fortune. To cling to external goods is to invite suffering. True, imperishable happiness resides not in the world but in the soul's inner citadel of pure reason and submission to God's eternal design. He also offered a rigorous defense of the compatibility of free will with divine foreknowledge, arguing that God dwells in timeless eternity, like an observer on a high tower watching travelers move along a road below — seeing but not compelling their steps.",
    quote: "Inconstancy is the very essence of Fortune. She turns her wheel with laughing indifference; only those who see through worldly illusion and turn inward to reason can cross any wall or prison and taste true freedom and consolation.",
    comparisons: [
      {
        withName: "St. Augustine",
        coreDifference: "Augustine urged the complete abandonment of worldly reason, seeking the soul's peace through confession of sin, divine miracle, and grace alone. Boethius, facing death, made almost no appeal to religious ritual; instead he wielded the blade of classical Greek rationality, making philosophy itself the direct intellectual sedative for confronting mortality.",
        reflectionPrompt: "When confronted by catastrophic loss or the approach of death, do we need the comfort of faith and miraculous grace (Augustine), or the cool anatomy of necessity and rigorous reason as our highest mental armor (Boethius)?"
      }
    ]
  },
  anselm: {
    lifeAndTimes: "The founding father of medieval Scholasticism and Archbishop of Canterbury. Humble and learned by nature, he nevertheless refused to yield an inch to the raging English king on matters of ecclesiastical sovereignty, suffering repeated exile. He devoted his life to proving the necessary rationality of doctrinal truths through airtight, quasi-algebraic logic, earning him the title 'Second Augustine.'",
    worldviewSummary: "Anselm championed the principle of *faith seeking understanding* (*fides quaerens intellectum*). He originated the most famous — and fiercely debated — argument in metaphysics: the Ontological Argument for God's existence. The argument runs: define God as 'that than which nothing greater can be conceived.' If this supremely perfect being existed merely as a concept in the mind, lacking real objective existence, it would be missing the perfection of actual being. A God that exists in reality is logically greater than one existing only in thought. Therefore, to avoid contradiction, the Being defined as maximally perfect must necessarily exist in objective reality as well. The argument moves from pure conceptual definition to the necessity of real existence through logical consistency alone.",
    quote: "I do not seek to understand so that I may believe, but I believe so that I may understand. For unless I first believe, I shall never understand.",
    comparisons: [
      {
        withName: "René Descartes",
        coreDifference: "Anselm deployed the ontological argument as a retrospective proof supporting already-held faith in sacred mystery. Descartes, centuries later, rebuilt the same argument on the ruins of radical doubt, making it the foundational logical pillar upon which to reconstruct the edifice of scientific knowledge and physical law.",
        reflectionPrompt: "Is the power of deductive reasoning to guarantee external existence from a purely conceptual definition a crowning glory of divine rationality, or a deft cage our own intellect has built — one we still cannot escape?"
      }
    ]
  },
  berengar: {
    lifeAndTimes: "A bold theologian from Tours in medieval France, Berengar was a fiercely eloquent warrior of reason against dogma. Because he publicly wielded logic against the sacred doctrine of transubstantiation — whether the Eucharistic bread and wine literally become Christ's physical flesh and blood — he was repeatedly condemned as a heretic and forced to kneel in humiliating recantation. His life was a chronicle of intellect struggling against institutional nets.",
    worldviewSummary: "Berengar was the high-raised torch of early medieval rational anti-dogmatism. In the 11th century, when the Church fervently proclaimed that the priest's consecration miraculously transformed the bread and wine on the altar into the actual physical body and blood of Christ (the doctrine of transubstantiation), Berengar roared in protest: this is absurd! If a real physical transformation had occurred, our eyes and tongues would register flesh — yet they plainly sense bread and wine. God gave humanity the supreme gift of logical reason (dialectics) precisely for judging truth from falsehood in earthly matters. He insisted: the Eucharistic bread undergoes no change in form or physical essence — it is purely a sacred symbol, leading the mind into spiritual communion with the divine. Reason must defend its inviolable boundary.",
    quote: "If a rigid altar decree demands that we abandon sound logic and believe in manifest sensory contradiction, that is nothing less than a blasphemy against the sacred rational flame that God Himself kindled and placed within our minds. Logic must not be dishonored.",
    comparisons: [
      {
        withName: "St. Augustine",
        coreDifference: "Augustine taught that one should embrace faith's ecstasy, surrendering in the face of miracle and the irrational leap, with reason serving as the handmaid of the true God. Berengar rebelled and cried: if we abandon the guardrail of logic in our pursuit of truth, we forfeit our sacred human dignity and plunge headlong into the abyss of absurdity.",
        reflectionPrompt: "In seeking spiritual grounding, how do we find a balanced middle ground between the non-rational trust that craves miraculous experience and the cold, uncompromising rational scrutiny that refuses to blink at any anomaly?"
      }
    ]
  },
  roscelinus: {
    lifeAndTimes: "An uncompromising scholar from northern France and the undisputed fiery founder of medieval Nominalism. Naturally combative and fearless in debate, he provoked the Church's fury by proposing an extreme version of nominalism and by analyzing the Trinity into three distinct divine substances. Condemned at the Council of Soissons and threatened with total ostracism, he spent his life wandering in exile, his academic fame spreading through the wilderness.",
    worldviewSummary: "Roscelinus was the incendiary who lit the fuse of Nominalism. He boldly challenged the objective reality of universals — general concepts such as 'humanity,' 'justice,' 'virtue,' 'genus and species' — which had reigned unchallenged for over 1,200 years since the Athenian Academy. He proclaimed: universals have not the slightest objective, physical reality. The bedrock of the world is composed of individual, concrete, tangible particular things standing alone. Universal terms are nothing more than a puff of breath, a vibration of air (*flatus vocis*) that we emit after birth for the convenience of vocal labeling. Beyond tangible individual objects, no conceptual reality exists. This question tore open the Scholastic edifice at its physical and logical seams.",
    quote: "Abstract, lofty universal concepts — universals — possess not a shred of objective existence. They are merely sounds produced by the human voice, a weightless breath of air. Beyond the name, there is nothing.",
    comparisons: [
      {
        withName: "Plato",
        coreDifference: "This is the greatest rupture in the history of epistemology. Plato staked all true reality on transcendent, abstract, perfect Forms inhabiting a realm of Ideas. Roscelinus wheeled around and pierced that realm with a single thrust, declaring that only the concrete rabbit, the particular stone, the lump of earth are real — concepts are dead words, and individual living things are the sole reality.",
        reflectionPrompt: "When examining our social and human entanglements, should humanity sacrifice individual lives on the altar of eternal conceptual ideals (Realism), or should the comfort and survival of each individual body be placed above all grandiose slogans (Nominalism)?"
      }
    ]
  },
  abelard: {
    lifeAndTimes: "The unrivaled debating champion of 12th-century Paris, Abelard was a scholar of dazzling brilliance and arrogance, nicknamed the 'undefeated academic assassin' for his relentless victories in disputation. Yet his life was set ablaze by one of the most tragic and celebrated love stories in Western intellectual history: his secret affair with his gifted pupil Héloïse. When discovered, her enraged uncle had him brutally castrated. Broken in body, he withdrew into monastic life and wrote the dialectical masterpiece *Sic et Non* (Yes and No). For the rest of his days, he and Héloïse exchanged letters of profound spiritual intimacy, and he burned the remnants of his life kindling the dawn of Western rational inquiry.",
    worldviewSummary: "Abelard advocated Conceptualism, a mediating middle path in the great debate over universals. He argued that both extremes had gone astray: universals are neither transcendent, independently existing entities in a heavenly realm (contra Realism) nor merely empty puffs of air, *flatus vocis*, without substance (contra Nominalism). Through the mind's activity of classification, universals have been transformed into concepts (*mental concepts*) — subjective-objective mapping forms that possess genuine cognitive unity. These concepts are neither illusory nor false; they are the perfectly calibrated logical tools by which we know and navigate the vast, complex world of objective particulars. In *Sic et Non*, he assembled contradictory doctrinal statements from Church authorities and placed them side by side, demonstrating that doubt is the seedbed of the finest truth, and that self-questioning guided by dialectical reason is the compass that finds the right path. With this, he pushed open the gates to a new era of rational dialectics.",
    quote: "By doubting we come to inquiry, and through inquiry we perceive the truth. The pain of love taught me that it is only through the trial of every bitterness that the soul forges its noblest understanding.",
    comparisons: [
      {
        withName: "Roscelinus",
        coreDifference: "His teacher Roscelinus reduced universals to waste — weightless puffs of vocal air (*flatus vocis*), granting them no dignity whatsoever. Abelard took a major corrective step, arguing that concepts are the intellectual intermediary formed when the mind accurately synthesizes the observable similarities among individual objects. Universals carry genuine cognitive projections in both our minds and the relational networks of the objective world (Conceptualism).",
        reflectionPrompt: "When we think and express summary judgments about things, is it more solid to fixate exclusively on concrete details (particles, pebbles, dust), or should we acknowledge that conceptual relations hold an absolutely indispensable primacy in organizing thought and taming the chaotic torrent of mental data?"
      }
    ]
  },
  albertus: {
    lifeAndTimes: "The 'Universal Doctor' (*Doctor Universalis*), a towering German scholar of the medieval academic revival. He was a polymath versed in zoology, botany, astronomy, chemistry, and mineralogy, and was even said to build fine mechanical devices. Known for his magnanimity and keen eye for talent, when all his peers mocked his student Thomas Aquinas as a lumbering, silent ox, Albert is said to have thundered: 'The bellowing of this ox will one day shake the entire world!'",
    worldviewSummary: "Albert was the founding elder who first granted empirical natural science a legitimate seat within the Scholastic hall. In an age when reading a foreign scientific book could invite accusations of diabolical pacts, he fearlessly declared that the structure of every flower's pistil, the skeletal joints of every swan, and even the thermal reactions of alchemical minerals are all exquisite physics lessons displaying the Creator's supreme craftsmanship. He almost single-handedly retranslated and annotated the vast corpus of Aristotle's natural philosophy, transforming it into a scientific canon legible and safe for Christian academia. He mentored the great Aquinas and cleared the road for the empirical natural science of the early modern era.",
    quote: "The solemn duty of natural philosophy is not to pretend to divine the Creator's miraculous works in heaven through blind faith; its true obligation is to investigate, through honest, solid physical examination, the concrete, objective physical causes behind the changes in the natural world. We must fix our eyes upon the actual facts of nature and measure them.",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Albertus was more of an empirical polymath, brimming with curiosity about the external natural world, collecting strange animal fossils, mineral phenomena, and even building ingenious mechanical devices. Aquinas was a pure genius of precise logical algebra and metaphysical system-building, who sublimated all this raw material into a seamless, flawless metaphysical cathedral without the mess of physical particulars.",
        reflectionPrompt: "In assembling our mosaic of truth, do we need more of the broad, insatiable curiosity that delights in grasping grassroots empirical details, or more of the supreme systems architect who can refine ten thousand strands of raw data into a single, perfectly gilded altar of pure thought and flawless logic?"
      }
    ]
  },
  aquinas: {
    lifeAndTimes: "The universally acknowledged master pillar of Catholic theology. Born into Italian nobility, he was physically imposing yet so quiet and gentle that fellow students nicknamed him the 'Dumb Ox.' His teacher Albertus Magnus saw through the surface and declared: 'The bellowing of this ox will one day resound through all humanity.' He produced the monumental *Summa Theologica*, every word meticulously argued, elevating theology into a logical summit structured by rigorous deductive reasoning with the architecture of a flawless proof.",
    worldviewSummary: "Aquinas accomplished the comprehensive theological-logical transformation of Aristotle in the history of thought. He proclaimed that 'grace does not destroy nature but perfects it' — faith and empirical reason are not mutually hostile but mutually reinforcing. Borrowing Aristotle's physics of motion, he constructed the immortal 'Five Ways' to prove God's existence, beginning entirely from ordinary sensible experience — causal chains, motion, contingency — and tracing them through logical inference to the necessary absolute designing source. He affirmed that the rational order is itself an organic manifestation of the divine cosmic law, providing a theological safeguard for the earliest sprouts of modern science.",
    quote: "To disparage the natural light of reason is to disparage the dignity of the Creator who bestowed it. Grace does not destroy nature; it perfects it.",
    comparisons: [
      {
        withName: "Ockham",
        coreDifference: "Aquinas held that universal concepts (universals) not only have objective reality but are the very substance of divine rationality (Realism). Ockham defended Nominalism, fiercely denouncing universals as nothing more than artificial labels, convenient names coined by human beings for classification. For him, only individual, living things exist — and with his razor, he slashed the grand metaphysical cathedral to pieces.",
        reflectionPrompt: "When we speak of 'collective will,' 'national character,' or 'social justice,' are these independent higher-order entities with their own reality, or are they ultimately nothing more than convenient labels constructed from the aggregation of individual human wills?"
      }
    ]
  },
  roger_bacon: {
    lifeAndTimes: "A singular 13th-century English Franciscan scholar, known as the 'Admirable Doctor' (*Doctor Mirabilis*). He was an eccentric recluse who seemed to race through the monastery corridors clutching acids, gunpowder, and telescope lenses. His scathing mockery of the ignorance of his theological contemporaries, combined with his strangely advanced experimental work in optics and physical sciences, led conservative church authorities to suspect him of practicing diabolical black magic. He endured nearly fourteen years of confinement under monastic house arrest, living a cold and solitary life — yet he had already, remarkably early, begun laying the bridge toward modern experimental science.",
    worldviewSummary: "Roger Bacon was the lonely, proud forerunner of radical empirical experimental science in the Middle Ages. Single-handedly, he launched a devastatingly contemptuous assault on the centuries-old Scholastic method of citing authorities and parsing texts. He argued that to escape ignorance, humanity must shatter four great enemies of truth: (1) submission to false authority; (2) the tyranny of custom and prejudice; (3) the blind prejudices of the unthinking crowd; and (4) the pretense of omniscience to save face. He cried out that the only paths to trustworthy, objective knowledge of the causal order of this dusty, variegated natural world are two: first, rigorously strict experimental science, and second, the supremely precise instrument of mathematics. He even made startlingly prescient predictions about the eventual invention of steam engines, submarines, and flying machines.",
    quote: "Even if the entire library were stuffed with two thousand years of so-called classical authorities, if these books have not been personally verified by us through concrete experiments — through temperatures, balances, the refraction of light through polished lenses in the laboratory — they are nothing more than a heap of waste paper leading our minds into confusion. Experiment! Demand physical proof!",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Aquinas trusted in the power of pure rational deduction and conceptual logic (syllogism, metaphysical reasoning), believing one could mathematically deduce the blueprint of God and the cosmos without leaving one's chair. Bacon snorted with contempt: without the concrete experiment of your hands in the muck of nature, without data measured and felt, all metaphysical speculation is mere flimsy straw men — elegant but incapable of withstanding a breeze.",
        reflectionPrompt: "When tackling your current project or professional skills breakthrough, do you favor spending long hours at the desk refining your logical architecture and perfecting the grand system (Aquinas), or do you roll up your sleeves, head to the marketplace and the front lines, and seek practical advancement through collision with brick walls and massive trial-and-error data (Bacon)?"
      }
    ]
  },
  scotus: {
    lifeAndTimes: "The great Scottish Franciscan master, known as the 'Subtle Doctor' (*Doctor Subtilis*). His intellect was so extraordinarily fine-grained in logical analysis that not even a needle could slip between his distinctions — a metaphysical Swiss watchmaker. He taught on the golden chairs of Oxford and Paris, spending his life in rarefied disputation among the clouds, completing a layout of metaphysical thought of the highest difficulty.",
    worldviewSummary: "Scotus was the champion of heterogeneous particularity at the highest reaches of Scholastic metaphysics. Against Aquinas's doctrine that being is predicated of God and creatures only by analogy — implying an irreducible gap — Scotus stepped forward and sang: 'Being is univocal' (*Univocity of Being*). Whether we speak of the Creator's divine substance or a feather fallen by the roadside, a discarded stone — since they all genuinely exist within the universe, the fundamental term 'being' must carry the same logical meaning and weight for God as for every humble creature. This flattened the metaphysical gap between the divine and the mundane. He went further and tossed into Western philosophy its enduring, singular concept: *Haecceity* or 'thisness.' The essence of a thing does not reside merely in its universal species-membership ('human,' 'table'); it resides in a positive, irreducible principle that makes each concrete entity completely unique, heterogeneous from every other thing in the entire universe, singular and self-standing. Every being possesses its own irreplaceable bone-and-soul aura.",
    quote: "Univocal being encompasses the Creator and the humblest blade of grass. Every thing possesses a 'thisness' that makes it irreplaceable, standing solitary and shining in the wind. No individual can truly be represented by anyone else.",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "To preserve the absolute gap between God and the mundane material order, Aquinas judged that 'being' as applied to God and to creatures is only an analogical or proportional relationship (Analogy of Being). Scotus strode across that boundary, declaring that since everything exists, being simply is being — logically univocal. This stroke pulled the divine into the great continuum, quietly laying the conceptual cornerstone for the future modern scientific project of measuring nature under unified physical law.",
        reflectionPrompt: "When we contemplate the absolute essence of the world, is it a hierarchical pyramid of power in which each level is inviolably separated from the next, or a single, level plain where any tiny atomic particle shares the same inescapable physical causal laws as the most distant star?"
      }
    ]
  },
  ockham: {
    lifeAndTimes: "The supreme master of medieval Nominalism, the logical rebel lord, called the 'demonic foot that kicked down the grand Scholastic temple.' His life was filled with fierce audacity: he was imprisoned and condemned for vehemently denouncing the Pope's extravagant wealth as utterly unworthy of Christ's apostolic poverty. He daringly conspired, escaped from papal custody at night from Avignon, fled through storm and darkness to the court of German Emperor Ludwig, and there made his immortal compact between the sword and the pen: 'You defend my body with your imperial blade, and I shall wield this sharpened quill to carve a bloody path through the truth, destroying the Pope's claims to legitimacy!' He carried his razor-sharp logical edge into the river of history.",
    worldviewSummary: "Ockham was the immortal final street-sweeper of Nominalism and the founding father of the Razor. He forged the ultimate blade that would slice through the history of Western science, logic, and intellectual method: Ockham's Razor. Its golden formula: *Plurality should not be posited without necessity*. With a stance of total and decisive rupture, he smashed the grand metaphysical edifices that had been built over thousands of years by Aquinas, Plato, and their successors — the invisible, intangible hierarchies of 'universal substances, divine forms, grades of universals, the Nous, the realm of Ideas.' He blew the whistle: apart from individual, tangible, calculable physical bodies, everything else is nothing but pseudo-elevated courtesy labels, word-tokens. All this clutter of mental chatter that cannot be verified by concrete physical sensation or direct empirical testing must be shaved off — cleanly, mercilessly, without leaving a single strand — by the razor. This shattered the chains of theological reason, directly ignited the long-imprisoned Western empiricism, and finally released modern science to independently dissect the natural world.",
    quote: "Do not multiply entities beyond necessity! There are no theological or metaphysical universals in this world — only the physical reality of individual, particular things. Take those grand, lofty concepts that cannot be verified by sense or data, and with one bold stroke of the razor, strip them all away!",
    comparisons: [
      {
        withName: "Thomas Aquinas",
        coreDifference: "Aquinas built a vast, exquisitely detailed, all-encompassing Scholastic encyclopedia-universe, covering every species from earth to heaven, with even the angelic hierarchies precisely calculated. Ockham laughed coldly, drew his blade, and declared: apart from physically living individual persons and measurable mineral stones, all those grandiose hierarchical structures are nothing but high-flown delusions concocted by priests to exploit the laity and flatter themselves. With one cut he dragged theology down from its pedestal, severed the knot between faith and science, and released human reason to run wild and free in the wilderness of independent inquiry.",
        reflectionPrompt: "When we examine and construct our own core intellectual frameworks, are we better off assembling all elements and peripheral details into a single, seamless, gilded cathedral of perfect integration, or is it wiser to keep only the minimally essential — a single-edged longsword that can pierce any fog with iron logic?"
      }
    ]
  }
};
