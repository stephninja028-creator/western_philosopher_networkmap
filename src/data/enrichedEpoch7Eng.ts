export const enrichedEpoch7Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  frege: {
    lifeAndTimes: 'A German mathematician, logician, and philosopher whose work laid the foundations for analytic philosophy and modern mathematical logic. Working in near-obscurity at the University of Jena for decades, Frege developed the first fully formal axiomatic system for arithmetic. His career was shattered when Bertrand Russell identified a devastating paradox at the heart of his system—Russell\'s Paradox—which showed that Frege\'s Basic Law V led to contradiction. Frege never fully recovered from this blow, but his distinction between sense (Sinn) and reference (Bedeutung), and his analysis of quantification, became the bedrock of all subsequent philosophy of language and logic.',
    worldviewSummary: 'Frege sought to show that arithmetic could be derived purely from logic, a project now called logicism. He invented quantificational logic (the Begriffsschrift, or "concept-script"), enabling the formalization of mathematical reasoning with unprecedented precision. His most enduring philosophical contribution is the sense/reference distinction: the sense of an expression is its mode of presentation, while its reference is the object it picks out. "The Morning Star" and "The Evening Star" have different senses but the same reference (Venus). Frege argued that psychological associations must be banished from logic—a principle he called anti-psychologism—and that numbers are objective, abstract objects, neither mental nor physical.',
    quote: 'The aim of logic is to make clear the conditions under which a thought can be true. The concept-script I have forged is a tool for carving thought at its joints, stripping away the psychological slime that clings to it, and revealing the objective structure of inference itself. What is true is true independently of whether anyone holds it to be so.',
    comparisons: [
      {
        withName: 'Ludwig Wittgenstein',
        coreDifference: 'Frege built a formal logical system whose precision he believed could ground all of mathematics. Wittgenstein, while deeply influenced by Frege, later abandoned the quest for an ideal logical language, arguing that meaning is not found in formal representation but in the fluid practices of ordinary language.',
        reflectionPrompt: 'When analyzing a philosophical problem, should we strive to construct a perfect formal language that mirrors the logical structure of reality, or should we accept that meaning emerges from the messy, context-dependent practices of everyday speech?'
      }
    ]
  },

  russell: {
    lifeAndTimes: 'One of the most influential intellectuals of the twentieth century—a logician, philosopher, mathematician, historian, social critic, and Nobel laureate in literature (1950). Born into British aristocracy, Russell lived to be ninety-eight and remained politically active until the end, campaigning against nuclear weapons and the Vietnam War. His discovery of the paradox that bears his name shook the foundations of set theory. His theory of descriptions revolutionized philosophy of language. His attempt (with Whitehead) to reduce all mathematics to logic in Principia Mathematica was the monumental achievement against which all later logic and philosophy of mathematics measured themselves.',
    worldviewSummary: 'Russell\'s philosophy centered on the conviction that precise logical analysis can dissolve traditional philosophical puzzles. His theory of descriptions showed that sentences like "The present King of France is bald" are not meaningless despite referring to nothing—they are straightforwardly false. This demonstrated that grammar misleads about logical form and that philosophical problems often arise from being seduced by surface grammar. Russell also championed logical atomism: the view that the world consists of atomic facts, and that meaningful propositions are built up from these atomic constituents. He was a fierce advocate of empiricism, skepticism toward metaphysics, and the use of scientific method in all inquiry.',
    quote: 'The point of philosophy is to start with something so simple as to seem not worth stating, and to end with something so paradoxical that no one will believe it. Mathematics may be defined as the subject in which we never know what we are talking about, nor whether what we are saying is true.',
    comparisons: [
      {
        withName: 'Gottlob Frege',
        coreDifference: 'Frege and Russell shared the logicist dream of grounding mathematics in pure logic, but Russell\'s Paradox revealed a fatal flaw in Frege\'s system. Russell continued the quest with Principia Mathematica, but even this monumental work was later shown incomplete by Gödel. Both men demonstrated that the foundations of mathematics are far more fragile than they appear.',
        reflectionPrompt: 'If even the foundations of mathematics cannot be made perfectly secure by logic alone, what does this tell us about the certainty we can hope for in other domains of knowledge?'
      }
    ]
  },

  wittgenstein: {
    lifeAndTimes: 'Perhaps the most enigmatic philosopher of the twentieth century. Born into one of Europe\'s wealthiest and most cultured families in Vienna, he gave away his inheritance, lived in extreme austerity, and worked variously as an engineer, schoolteacher, gardener, and hospital porter. His early Tractatus Logico-Philosophicus, written in the trenches of World War I, was the only book he published in his lifetime. He believed he had solved all philosophical problems—and abandoned philosophy for years. He returned to Cambridge in 1929 and spent his remaining two decades dismantling his own earlier work, producing the Philosophical Investigations posthumously. He died after losing consciousness with the words: "Tell them I\'ve had a wonderful life."',
    worldviewSummary: 'The early Wittgenstein argued that language is a picture of reality: propositions mirror the logical structure of facts, and the limits of language are the limits of the world. "Whereof one cannot speak, thereof one must be silent." The later Wittgenstein demolished this view. He argued that language is not a single unified picture-making system but a family of "language-games"—diverse practices governed by their own internal rules. Meaning is not reference to objects but use within a form of life. Philosophical problems arise when language "goes on holiday"—when words are torn from their ordinary contexts and forced into metaphysical abstraction. The task of philosophy is not to build theories but to dissolve confusions by reminding us how language actually works.',
    quote: 'The limits of my language mean the limits of my world. — (Early) The meaning of a word is its use in the language. Philosophical problems arise when language goes on holiday. — (Late)',
    comparisons: [
      {
        withName: 'Gottlob Frege',
        coreDifference: 'Frege believed that an ideal logical language could perfectly represent the structure of thought. Wittgenstein began in agreement, then executed a stunning reversal: there is no ideal language, only the multiplicity of language-games. Philosophy\'s task is not to perfect a formal system but to untangle the knots we create by misusing ordinary language.',
        reflectionPrompt: 'Is there a single logical structure underlying all meaningful language, or is language an irreducibly plural family of practices, each with its own rules that cannot be reduced to or judged by any one of the others?'
      },
      {
        withName: 'Martin Heidegger',
        coreDifference: 'Heidegger sought to recover the meaning of Being through poetic-phenomenological meditation on existence and language as the "house of Being." Wittgenstein, from the opposite tradition, insisted that philosophical depth is achieved not by gazing into metaphysical mystery but by paying disciplined attention to the ordinary uses of words.',
        reflectionPrompt: 'Is profundity found by plumbing the depths of Being through poetic-philosophical meditation, or by carefully attending to the surface of everyday language and dissolving the illusions that arise when we overstep its boundaries?'
      }
    ]
  },

  quine: {
    lifeAndTimes: 'The dominant figure of American analytic philosophy in the second half of the twentieth century. A Harvard professor for four decades, Quine studied with the logical empiricists in Vienna and returned to reshape their doctrines from within. His essay "Two Dogmas of Empiricism" (1951) is considered the most important paper in twentieth-century American philosophy. A prodigious writer and legendary teacher, he cultivated a distinctive style—lucid, witty, and merciless in argument. He traveled widely and maintained correspondences with logicians and philosophers across the world.',
    worldviewSummary: 'Quine\'s "Two Dogmas" dismantled two pillars of logical empiricism: the analytic/synthetic distinction (the idea that some truths are true by meaning alone, like "all bachelors are unmarried") and reductionism (the idea that individual statements can be verified or falsified in isolation). Quine argued instead for a holistic web of belief: no single statement faces the tribunal of experience alone. The entire web of our beliefs faces experience as a corporate body, and when predictions fail, we are free to adjust any part of the web to restore coherence. This leads to his famous thesis of the "indeterminacy of translation"—there is no fact of the matter about what someone means, only behavioral dispositions. Ontological commitment is a matter of what variables our best scientific theory must quantify over—"to be is to be the value of a bound variable."',
    quote: 'To be is to be the value of a variable. The unit of empirical significance is the whole of science. No statement is immune to revision. The lore of our fathers is a fabric of sentences in our hands. We may alter it as we wish, but a conflict with experience at the periphery will always leave us free to save the fabric by adjusting the interior.',
    comparisons: [
      {
        withName: 'Rudolf Carnap',
        coreDifference: 'Carnap, the leading logical positivist, believed that philosophy could be reconstructed as the logical analysis of language, with a sharp distinction between analytic and synthetic truths. Quine, his student and then his destroyer, argued that this very distinction was a dogma—that all knowledge, including logic and mathematics, forms a continuous web subject to empirical revision.',
        reflectionPrompt: 'Are there truths that hold by virtue of meaning alone and cannot be overturned by experience, or is even logic and mathematics ultimately answerable to the tribunal of experience?'
      }
    ]
  },

  husserl: {
    lifeAndTimes: 'The founder of phenomenology, one of the most influential philosophical movements of the twentieth century. Born in Moravia, Husserl taught at Göttingen and Freiburg, where his students included Heidegger, Levinas, and Sartre. His later years were darkened by the rise of Nazism: he was stripped of his academic position and banned from the university because of his Jewish heritage. He died in 1938, but his manuscripts were smuggled to safety and became the basis for the Husserl Archives. His philosophical development spanned from anti-psychologism in logic, through the transcendental phenomenology of the Ideas, to the genetic phenomenology and the critique of the crisis of European sciences.',
    worldviewSummary: 'Husserl\'s phenomenology begins with the rallying cry "Back to the things themselves!" He sought to overcome the natural attitude—the unreflective assumption that the world simply exists as it appears—through the phenomenological reduction (epoché): suspending judgment about the existence of the external world and attending instead to the phenomena of conscious experience. At the core of consciousness is intentionality: every act of consciousness is consciousness of something. Through eidetic variation—imagining an object from multiple perspectives and abstracting what remains invariant—we grasp the essential structures of experience. Husserl argued that the objective sciences have forgotten their foundation in the life-world (Lebenswelt)—the pre-theoretical, lived experience that is the ground of all scientific abstraction. Philosophy\'s task is to recover this foundation through rigorous phenomenological description.',
    quote: 'We must return to the things themselves! The natural attitude, which naively assumes the world is simply there, must be suspended through the phenomenological epoché. Only by bracketing our dogmatic belief in existence can we attend to the phenomena of experience as they are given—and discover that consciousness is always intentional, always directed toward something.',
    comparisons: [
      {
        withName: 'Martin Heidegger',
        coreDifference: 'Husserl built phenomenology as a transcendental discipline: suspending belief in the world to describe the constituting activity of consciousness. Heidegger, his student, seized phenomenology and turned it existential: instead of asking how consciousness constitutes the world, he asked what it means to be—the being for whom Being is an issue. The student\'s question overthrew the teacher\'s framework.',
        reflectionPrompt: 'Should philosophy begin by analyzing the structures of consciousness that constitute our experience of the world, or by asking the more fundamental question of what it means to be the kind of being for whom existence is a question?'
      }
    ]
  },

  heidegger: {
    lifeAndTimes: 'One of the most influential—and most controversial—philosophers of the twentieth century. His magnum opus Being and Time (1927) transformed philosophy worldwide, but his involvement with National Socialism—he joined the Nazi Party in 1933 and served as rector of Freiburg University—casts a permanent shadow over his legacy. Born in rural Meßkirk, his thought was shaped by the Catholic tradition, medieval scholasticism, and Husserl\'s phenomenology. He lived in a secluded hut in the Black Forest, dressing in traditional peasant clothing, and developed a philosophical style so dense and idiosyncratic that even admirers struggle with it. His later "turn" (Kehre) shifted from existential analysis to meditative reflection on language, poetry, and technology.',
    worldviewSummary: 'Heidegger\'s central question is the "question of Being" (Seinsfrage): what does it mean to be? He argued that Western philosophy since Plato has forgotten this question, mistaking particular beings (entities) for Being itself. To reopen the question, Heidegger analyzed Dasein—the human being, literally "being-there"—as the only being for whom its own being is an issue. Dasein is always already "being-in-the-world": we are not isolated subjects contemplating external objects but are thrown into a world, immersed in practical concerns and equipment. Dasein is also "being-toward-death": an authentic existence requires confronting our own finitude, the certainty of death that individuates us. The call of conscience summons Dasein from the "they" (das Man)—the anonymous public world of conformity—to its ownmost possibility. In his later thought, Heidegger shifted to the "history of Being" (Seinsgeschichte): Being reveals itself in different epochs, and our age is dominated by technology (Gestell), which reduces everything to standing reserve (Bestand)—resources to be optimized. Only art, poetry, and meditative thinking (besinnliches Denken) can open an alternative relation to Being.',
    quote: 'We are still far from pondering the essence of action. Every man is born as many selves and dies as one. Language is the house of Being. In its home man dwells.',
    comparisons: [
      {
        withName: 'Edmund Husserl',
        coreDifference: 'Husserl founded phenomenology as a transcendental discipline, analyzing how consciousness constitutes the world. Heidegger radicalized phenomenology by asking not about consciousness but about Being—and arguing that Dasein\'s existence, not consciousness, is the proper subject of inquiry. He turned the teacher\'s method toward a question the teacher never asked.',
        reflectionPrompt: 'Is the primary philosophical task to analyze the structures of consciousness that constitute our experience of reality, or to ask the more fundamental question of what it means to exist as the being for whom existence itself is always already at issue?'
      },
      {
        withName: 'Jean-Paul Sartre',
        coreDifference: 'Both thinkers took up the question of human existence, but with opposite emphases. Heidegger sought an authentic relation to Being through meditative dwelling. Sartre radicalized the notion of radical freedom—"existence precedes essence"—and insisted that humans are absolutely free, condemned to choose without any ground or essence. Heidegger saw Sartre as still trapped in the metaphysics of subjectivity.',
        reflectionPrompt: 'When confronting the question of who we are, should we seek a meditative openness to Being that precedes all subjectivity, or should we embrace the absolute freedom of a subject that creates itself through choice with no ground beneath it?'
      }
    ]
  },

  sartre: {
    lifeAndTimes: 'The public intellectual face of existentialism—a philosopher, novelist, playwright, and political activist who dominated French intellectual life from the Liberation to May 1968. He refused the Nobel Prize for Literature in 1964 ("a writer should not allow himself to be turned into an institution"). His lifelong partnership with Simone de Beauvoir was one of the most famous intellectual relationships in history. He wrote Being and Nothingness in occupied Paris under the eyes of the Gestapo, and later turned toward Marxism, attempting to reconcile existential freedom with historical determinism.',
    worldviewSummary: 'Sartre\'s existentialism rests on a single principle: "existence precedes essence." Unlike a paper knife, which is designed for a purpose before it exists, a human being first exists, then defines itself through its choices and actions. There is no human nature, no God to conceive us, no predetermined essence—we are radically free, "condemned to be free." This freedom is not a gift but an anguish: in choosing for ourselves, we choose for all humanity, and we bear the total responsibility for who we become. To flee this responsibility is "bad faith" (mauvaise foi)—pretending we are things determined by circumstances, social roles, or psychology. Sartre analyzed the structure of consciousness as nothingness: consciousness is not a thing but a nihilation, a hole in being. The "Look" of the Other is fundamental: when another consciousness regards me, I experience myself as an object, as a being-for-others. "Hell is other people" means that the Other\'s gaze threatens to fix me in a role I did not choose.',
    quote: 'Man is condemned to be free. Existence precedes essence. There is no human nature, because there is no God to conceive it. Man is nothing else but what he makes of himself. Hell is other people.',
    comparisons: [
      {
        withName: 'Martin Heidegger',
        coreDifference: 'Heidegger asked about the meaning of Being itself, treating Dasein as a being for whom existence is a question. Sartre transformed this into an ethic of radical freedom: humans create themselves through choice. Heidegger dismissed Sartre\'s position as still metaphysical—still trapped in the subject-object framework he sought to overcome.',
        reflectionPrompt: 'Is the deepest philosophical question about what it means to be, or about what it means to be free—and does our freedom consist in recognizing a deeper structure of existence, or in creating ourselves through choice with no ground beneath us?'
      }
    ]
  },

  peirce: {
    lifeAndTimes: 'A genius who worked in near-total obscurity despite being arguably America\'s most original philosopher. Trained as a scientist at Harvard, he spent thirty years working for the U.S. Coast and Geodetic Survey, making contributions to astronomy, geodesy, and mathematics. He was the first to use the term "pragmatism" in philosophy. But his personal life was chaotic: difficult, eccentric, plagued by financial disaster, twice divorced, and barred from academic employment. His vast manuscripts were only systematically edited and published decades after his death, revealing a thinker of astonishing range.',
    worldviewSummary: 'Peirce founded pragmatism as a method for clarifying meaning: to understand a concept, consider what practical consequences would follow if it were true. "Consider what effects, that might conceivably have practical bearings, we conceive the object of our conception to have. Then, our conception of these effects is the whole of our conception of the object." Peirce also developed a comprehensive semiotic theory—the study of signs—distinguishing icons, indices, and symbols. His most ambitious contribution was a triadic metaphysics of Firstness (quality/possibility), Secondness (reaction/brute fact), and Thirdness (law/habit/mediation). He argued that the universe evolves from absolute chance toward increasing regularity through the growth of habit—cosmic "tychism" and "synechism." Reality is what the community of inquiry would converge upon in the indefinite long run.',
    quote: 'In order to ascertain the meaning of an intellectual conception, consider the practical effects that might conceivably result from the truth of that conception. The whole function of thought is to produce habits of action. The entire meaning of a concept is the totality of its conceivable practical bearings.',
    comparisons: [
      {
        withName: 'William James',
        coreDifference: 'Peirce invented pragmatism as a method for clarifying the meaning of concepts. James popularized it as a theory of truth: a belief is true if it "works." Peirce was appalled, insisting that pragmatism was never meant to reduce truth to utility but to make meaning precise by tracing it to its practical consequences.',
        reflectionPrompt: 'Is truth what a community of inquirers would converge upon in the long run, or is it what produces satisfactory practical results for the individual?'
      }
    ]
  },

  james: {
    lifeAndTimes: 'Harvard psychologist and philosopher, the younger brother of novelist Henry James. William James suffered from severe depression and existential crisis in his twenties, contemplating suicide. He emerged through a personal discovery: the will to believe—that our convictions shape our reality and that some beliefs must be adopted before evidence can confirm them. His Varieties of Religious Experience (1902) treated religious experience with rare empathy. His Pragmatism (1907) became the defining statement of America\'s most original philosophical movement. He was a celebrated lecturer—warm, vivid, and conversational in style.',
    worldviewSummary: 'James\'s pragmatism holds that the meaning and truth of an idea lie in its practical consequences. A belief is true not because it copies reality but because it "works"—it guides action successfully, satisfies expectations, and proves useful in navigating experience. Truth is not a static property but something that "happens to an idea"—it is made true by events. James defended the "will to believe": in situations where a choice is forced, momentous, and evidentially undecidable (like the question of whether life is worth living), we have the right to believe what our passions and needs incline us toward, for such beliefs may help bring about their own truth. His radical empiricism insisted that experience includes not just discrete sensations but relations, connections, and the "stream of consciousness"—a term he coined.',
    quote: 'Truth happens to an idea. It becomes true, is made true by events. Belief, that sacred faculty which prompts the decisions of our will, and knits into harmonious working the straggling, broken, disjointed fabric of our presentiments, must be free to declare itself.',
    comparisons: [
      {
        withName: 'Charles Sanders Peirce',
        coreDifference: 'Peirce invented pragmatism as a logical method for clarifying meaning. James transformed it into a theory of truth and a defense of the right to believe. Peirce objected that James had vulgarized his method, turning rigorous logical analysis into what looked like a license for wishful thinking.',
        reflectionPrompt: 'When evidence is genuinely insufficient to decide a life-shaping question, do we have the right to let our needs and passions tip the balance, or must we withhold belief until the evidence speaks?'
      }
    ]
  },

  dewey: {
    lifeAndTimes: 'America\'s most influential educational reformer and a philosopher of staggering productivity. Dewey taught at Michigan, Chicago, and Columbia, writing over forty books and hundreds of articles across a career spanning seven decades. He founded the Laboratory School at the University of Chicago, where he put his educational theories into practice. He was deeply engaged in public life—advising on educational policy, defending academic freedom, and writing on democracy, art, and social reform. His influence on American education was profound, if contested: he is both credited and blamed for shaping the progressive education movement.',
    worldviewSummary: 'Dewey called his philosophy "instrumentalism": ideas and theories are tools for solving problems, not mirrors of a fixed reality. The traditional quest for certainty—grounding knowledge in immutable foundations—is a symptom of anxiety about an uncertain world. Instead, intelligence is the capacity to direct change constructively. "Learning by doing" means that education is not preparation for life but life itself: knowledge emerges from active engagement with real problems, not from passive reception of facts. Dewey extended this to democracy: democracy is not just a political system but a way of life that values every individual\'s capacity for growth and participation. Art, for Dewey, is not a luxury but the most intense form of experience—when doing and undergoing are so integrated that meaning is consummated. His naturalism rejected all dualisms (mind/body, fact/value, theory/practice) as artifacts of a bankrupt metaphysics.',
    quote: 'Education is not preparation for life; education is life itself. We do not learn from experience; we learn by reflecting on experience. Intelligence is not a fixed possession but the power of using things as means for solving problems.',
    comparisons: [
      {
        withName: 'Bertrand Russell',
        coreDifference: 'Russell sought timeless logical truths and distrusted the pragmatic elevation of utility over certainty. Dewey argued that the quest for certainty is itself the problem: knowledge is not a fixed mirror of reality but a tool for reconstructing experience. Where Russell sought foundations, Dewey sought growth.',
        reflectionPrompt: 'Should philosophy strive to discover timeless truths that stand outside the flow of experience, or should it equip us to navigate and transform the uncertain, changing world in which we actually live?'
      }
    ]
  },

  foucault: {
    lifeAndTimes: 'One of the most provocative and influential thinkers of the late twentieth century. Foucault held the prestigious Chair of the History of Systems of Thought at the Collège de France. His life was marked by intellectual restlessness—he shifted from archaeology (analyzing the rules governing discourse) to genealogy (tracing the power relations behind our categories) to ethics (the care of the self). His works on madness, the clinic, the prison, and sexuality transformed how scholars across disciplines think about knowledge, power, and subjectivity. He died of AIDS-related complications in 1984, just as he was developing a new ethics of self-fashioning.',
    worldviewSummary: 'Foucault\'s central insight is that knowledge and power are inseparable. Power is not simply repressive (forbidding actions) but productive (constituting subjects, categories, and truths). The modern human sciences—psychiatry, criminology, medicine—do not discover preexisting truths about human nature but produce them through systems of classification and surveillance. The panopticon (Bentham\'s prison design) is Foucault\'s metaphor for modern society: a system of permanent, invisible surveillance that induces individuals to internalize the gaze and discipline themselves. Foucault traced how the modern "subject" was historically constituted through practices of confession, examination, and normalization. His genealogies show that what appears natural and timeless—madness, sexuality, the criminal—is in fact the product of specific historical struggles. "The death of man" means that the human subject, as conceived by the Enlightenment, is a recent invention that may one day be erased "like a face drawn in sand at the edge of the sea."',
    quote: 'Power is not an institution, not a structure, not a certain might. Power is the name we give to a complex strategic situation in a particular society. Where there is power, there is resistance. The individual is not the power\'s other opposite; it is, rather, its first effect.',
    comparisons: [
      {
        withName: 'Jürgen Habermas',
        coreDifference: 'Habermas defended the Enlightenment project of rational communication and universal norms against what he saw as Foucault\'s relativism. Foucault responded that Habermas\'s universal rationality is itself a product of specific power relations. Where Habermas saw emancipation through rational discourse, Foucault saw another form of normalization.',
        reflectionPrompt: 'Is universal rational discourse the path to human emancipation, or does the very ideal of universal rationality conceal historically specific forms of power and normalization?'
      }
    ]
  },

  derrida: {
    lifeAndTimes: 'The most famous—and most vilified—philosopher of the late twentieth century. Born in El Biar, Algeria, to a Jewish family, Derrida experienced anti-Semitism under the Vichy regime, being expelled from school for being Jewish. His deconstructive readings of Plato, Rousseau, Husserl, and Heidegger made him a celebrity in American humanities departments and a target of vicious attacks in the Cambridge affair, when his honorary degree was contested. He remained prolific until his death in 2004, writing on justice, hospitality, friendship, forgiveness, and the animal.',
    worldviewSummary: 'Derrida\'s deconstruction targets the "metaphysics of presence"—the Western philosophical assumption that meaning is grounded in a self-present origin, a pure source outside the play of signs. He showed that every attempt to ground meaning in presence (the voice, consciousness, the transcendental signified) depends on its excluded opposite (writing, the unconscious, the signifier). "There is nothing outside the text" means not that reality is a text but that there is no access to a pure meaning outside systems of signification. Derrida coined différance (a deliberate misspelling) to name the process by which meaning is both differentiated (meanings differ from each other) and deferred (meaning is never fully present but always pushed forward along a chain of signs). Deconstruction is not a method that can be applied mechanically but a practice of reading that attends to the blind spots, tensions, and exclusions that constitute a text\'s coherence. Derrida insisted that deconstruction is justice—not a theory but an infinite demand for openness to the other.',
    quote: 'There is nothing outside the text. Il n\'y a pas de hors-texte. Différance—the name of the play of differences and deferrals—means that meaning is never fully present but always arrives from elsewhere and departs toward elsewhere. Deconstruction is justice.',
    comparisons: [
      {
        withName: 'John Searle',
        coreDifference: 'Searle, an analytic philosopher of language, defended the possibility of determinate meaning against what he saw as Derrida\'s reckless denial of it. Their famous exchange over speech act theory (the "Derrida-Searle debate") became a flashpoint for the culture wars between analytic and continental philosophy.',
        reflectionPrompt: 'Does language communicate because speakers intend determinate meanings that can be faithfully conveyed to listeners, or is every act of communication already marked by ambiguity, deferred meaning, and the impossibility of pure presence?'
      }
    ]
  },

  rorty: {
    lifeAndTimes: 'A Princeton-trained analytic philosopher who became the most prominent American advocate of pragmatism in the late twentieth century. Rorty\'s Philosophy and the Mirror of Nature (1979) was a bombshell: it argued that the entire Western epistemological tradition—from Descartes through Kant to analytic philosophy—was based on a mistake: the idea that the mind mirrors reality. After Princeton, Rorty held positions at Virginia and Stanford, becoming a public intellectual who wrote for broad audiences. He championed a "post-philosophical culture" in which philosophy gives up its privileged role as the tribunal of knowledge.',
    worldviewSummary: 'Rorty argued that philosophy should abandon the quest for foundations. The "mirror of nature" metaphor—the idea that knowledge is accurate representation of an external reality—should be shattered. There is no standpoint outside our practices from which to judge whether our beliefs correspond to reality. What we call truth is not a relation to reality but what our peers let us get away with saying. Rorty combined Wittgenstein\'s therapeutic approach to philosophy, Dewey\'s pragmatism, and Heidegger\'s critique of metaphysics into a vision of "liberal ironism": the ironist recognizes the contingency of her own deepest commitments, while the liberal works to reduce suffering. The goal of intellectual life is not Truth but solidarity—expanding the circle of those we recognize as "us." Philosophy should become cultural politics: redescribing ourselves in new vocabularies that create new possibilities for action and solidarity.',
    quote: 'Truth cannot be out there—cannot exist independently of the human mind—cannot be something toward which we have obligations. Truth is made by human beings, not found. The desire to have one\'s vocabulary hold center stage is one of the chief motives behind philosophy.',
    comparisons: [
      {
        withName: 'Willard Van Orman Quine',
        coreDifference: 'Quine argued that our web of belief is underdetermined by experience, but still believed that the web could be evaluated by pragmatic and empirical criteria. Rorty radicalized this: even the notion of "web of belief" is a vocabulary we have adopted, not a discovery about the nature of mind. There is no fact of the matter about what counts as "better" evidence beyond what our community of language-users accepts.',
        reflectionPrompt: 'Is there a realist constraint that our best theories must answer to, even if we cannot step outside our conceptual schemes to check, or is the very notion of a reality beyond our vocabularies a misleading remnant of the mirror-of-nature tradition?'
      }
    ]
  }
};
