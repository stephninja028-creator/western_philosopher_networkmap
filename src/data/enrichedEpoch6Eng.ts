export const enrichedEpoch6Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  kierkegaard: {
    lifeAndTimes: 'A melancholic Danish genius widely regarded as the father of existentialism. Physically frail and hunchbacked, he lived in acute isolation, tragically breaking his engagement to Regine Olsen—the love of his life—because he could not reconcile marriage with his philosophical and religious calling. He spent his short life waging a ferocious literary war against the complacency of the Danish state church and the abstract systematizing of Hegelian philosophy, finally collapsing in the street at age forty-two.',
    worldviewSummary: 'Kierkegaard insisted on the irreducibility of the individual existing subject against Hegel\'s totalizing system. He argued that no abstract concept or historical schema can capture the concrete, anxious, choosing self who faces death, dread, and existential decision. He charted three "stages on life\'s way": the aesthetic (pursuit of pleasure and novelty), the ethical (commitment to duty and social responsibility), and the religious (a solitary, passionate leap of faith beyond rational calculation). At its summit, authentic existence demands a "leap of faith"—an irrational, subjective commitment in the face of objective uncertainty. Anxiety (angst) is not a pathology but "the dizziness of freedom," the vertigo the soul experiences when confronting the infinite possibilities of choice.',
    quote: 'Choose! Anxiety is the dizziness of freedom—the vertigo that grips the soul when it peers over the precipice of infinite possibility. Hegel may fill every blackboard in the world with his grand system of concepts. But I am not a piece of that conceptual puzzle; I am a solitary existing individual, shivering in the cold wind, about to leap into the unknown with nothing but faith to catch me.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel constructed a vast conceptual edifice that subsumed every individual life into the grand narrative of Absolute Spirit. Kierkegaard retorted that this system has only one fatal flaw: it has no place for the concrete, anguished individual who weeps in the night, torn between choices, whose existence cannot be dissolved into any dialectical category.',
        reflectionPrompt: 'When you seek meaning, do you look to large systems and collective narratives for your place within a rational whole, or do you accept the solitary burden of making an authentic, ungrounded choice that no system can make for you?'
      }
    ]
  },
  comte: {
    lifeAndTimes: 'Founder of positivism and the father of sociology—a term he coined. A man of fierce intellectual independence, he spent much of his life in poverty after breaking with the academic establishment and surviving on the support of devoted disciples. His later years took a strange turn into the founding of a secular "Religion of Humanity," with himself as high priest, but his core contribution—the systematic application of scientific method to the study of society—permanently reshaped the human sciences.',
    worldviewSummary: 'Comte\'s Law of Three Stages proposed that human intellectual development—both individual and collective—proceeds through three phases: the theological stage, where phenomena are explained by supernatural agency; the metaphysical stage, where abstract essences and forces replace deities; and the positive stage, where inquiry restricts itself to observable facts and their invariable laws of succession. At this final stage, all appeals to unobservable causes are abandoned in favor of empirical investigation and mathematical formulation. Comte argued that sociology, as the science of social order and progress, represents the culmination of this evolution—the highest and most complex science, capable of rationally reorganizing society once freed from theological and metaphysical illusions.',
    quote: 'Abandon the futile search for ultimate causes and transcendent essences! The only reality is the body of empirically verifiable facts and the invariable laws that govern their relations. Sweep away the debris of theology and the fog of metaphysical abstraction with the clean broom of positive science.',
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Locke laid the epistemological groundwork for empiricism—knowledge from sensory experience—within the confines of philosophical discourse. Comte elevated this into a comprehensive historical program that would systematically purge all pre-scientific residues from human culture and establish a new social order grounded entirely in positive science.',
        reflectionPrompt: 'Should intellectual life preserve space for poetic ambiguity, mythic resonance, and metaphysical speculation, or should we commit ourselves exclusively to what can be verified through rigorous empirical investigation?'
      }
    ]
  },
  mill_j: {
    lifeAndTimes: 'The most refined liberal philosopher of nineteenth-century Britain and a towering figure in utilitarian ethics. His father, James Mill, subjected him to an extraordinarily intensive education—Greek at three, the classics at eight—which produced a prodigy but also triggered a severe depressive crisis at twenty. He recovered through the discovery of Romantic poetry, which taught him that human flourishing requires more than rational calculation. He became the first member of Parliament to introduce a bill for women\'s suffrage, living his principles of individual dignity and equal liberty.',
    worldviewSummary: 'Mill refined Bentham\'s quantitative utilitarianism into a qualitative doctrine, arguing that pleasures differ not only in amount but in kind. "It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied"—the higher faculties, even when they produce discontent, constitute a superior form of existence. In On Liberty (1859), he established the "harm principle" as the bedrock of liberal society: the only justification for interfering with an individual\'s liberty is to prevent harm to others. Over his own body and mind, the individual is sovereign. He warned against the "tyranny of the prevailing opinion"—the social pressure to conform that can be more crushing than legal oppression—and defended eccentricity and individuality as essential to human progress.',
    quote: 'In a world where mediocrity and conformist opinion conspire to flatten every independent spirit, each person who dares to live differently, think rebelliously, and shine with unorthodox brilliance is the most sacred miracle of evolution, deserving of absolute protection. Over his own body and mind, the individual is sovereign.',
    comparisons: [
      {
        withName: 'Jean-Jacques Rousseau',
        coreDifference: 'Rousseau\'s General Will possesses formidable coercive power, authorizing the community to "force individuals to be free" by subordinating private interest to the collective good. Mill erected a defensive wall against precisely this danger, arguing that the tyranny of the majority—whether through law or social pressure—must never be permitted to crush individual originality and liberty.',
        reflectionPrompt: 'Should society prioritize the collective moral direction of the community, even at the cost of individual nonconformity, or must every person\'s right to live as they choose—however eccentric—be absolutely protected so long as it harms no one else?'
      }
    ]
  },
  spencer: {
    lifeAndTimes: 'The most influential Victorian-era synthesizer of evolutionary thought and the originator of the phrase "survival of the fittest"—a term Darwin himself later adopted. Rejecting all university appointments, he lived as an independent scholar, constructing a monumental "Synthetic Philosophy" that applied evolutionary principles to biology, psychology, sociology, and ethics. His work epitomized the nineteenth-century faith in progress through competitive struggle, though his reputation declined sharply in the twentieth century.',
    worldviewSummary: 'Spencer extended evolutionary theory far beyond biology into a universal cosmic law. He argued that all phenomena—from nebulae condensing into stars to societies differentiating into specialized institutions—obey a single principle: the movement from homogeneous, undifferentiated simplicity toward heterogeneous, highly organized complexity through continuous adaptation. In the social realm, this manifests as "survival of the fittest": competition weeds out the unfit and allows the most capable to flourish, thereby advancing the species. Government intervention to protect the weak, however well-intentioned, violates this natural law and retards evolutionary progress. Charity, welfare, and state regulation artificially preserve the maladapted, diluting the collective vigor of society. The highest morality is to let nature\'s selective process operate unimpeded.',
    quote: 'Survival of the fittest! Throughout the vast cosmos, the only sacred law is this: natural selection—that coldly elegant mechanism of endless evolution and differentiation. Do not shed weak tears over the elimination of the unfit; competition itself is the universe\'s way of refining the strongest wills and driving life toward ever more brilliant complexity.',
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Locke conceived natural society as a community governed by divine and civic law, safeguarding each person\'s God-given rights within a framework of mutual respect. Spencer recast this moral vision into a brutal evolutionary arena, arguing that rights and freedoms exist primarily to ensure an untainted competitive field where the fittest may thrive without being dragged down by obligations to the weak.',
        reflectionPrompt: 'Should society be organized as a humane community that protects its most vulnerable members against nature\'s indifference, or as a competitive arena where only the most capable deserve to flourish, driving collective progress through the elimination of the weak?'
      }
    ]
  },
  marx: {
    lifeAndTimes: 'The most consequential revolutionary philosopher in modern history and the intellectual architect of scientific socialism. Expelled from Prussia and hounded across Europe by multiple governments, he endured crushing poverty, the deaths of several children, and chronic illness while living in a shabby London apartment. Sustained by Friedrich Engels\' financial support, he poured decades into Das Kapital, a work of staggering erudition that combined economic analysis, historical research, and philosophical critique into an indictment of capitalism and a theory of revolutionary transformation.',
    worldviewSummary: 'Marx\'s historical materialism inverts Hegel\'s idealism: it is not consciousness that determines social being, but social being—specifically, the material forces and relations of production—that determines consciousness. The economic "base" (technology, labor relations, property forms) conditions the entire "superstructure" (law, politics, religion, philosophy). History unfolds through class struggle, driven by contradictions between developing productive forces and existing relations of production. Capitalism, despite its unprecedented productivity, contains a fatal contradiction: it systematically extracts "surplus value" from workers\' labor while concentrating wealth in fewer hands, generating crises of overproduction and class polarization. The emancipation of the working class requires the abolition of private ownership of the means of production and the establishment of a classless society. Philosophy\'s purpose is not merely to interpret the world but to change it.',
    quote: 'The philosophers have only interpreted the world, in various ways; the point, however, is to change it. Workers of the world, unite! You have nothing to lose but your chains, and a world to win.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel made Absolute Spirit the protagonist of world history, treating material reality as Spirit\'s self-externalization. Marx turned this on its head, demonstrating that consciousness and ideas are products of the material brain and the economic base, and that the true driving force of history is the development of productive forces and class struggle.',
        reflectionPrompt: 'When analyzing social change, should we look primarily to the evolution of ideas, values, and cultural movements, or to the material conditions—who owns the means of production, who labors, and how wealth is distributed?'
      },
      {
        withName: 'Max Stirner',
        coreDifference: 'Stirner dissolved all social bonds into "spooks," advocating radical individual egoism as the path to liberation. Marx responded with hundreds of pages of ferocious refutation in The German Ideology, arguing that Stirner\'s isolated ego is a bourgeois fantasy that ignores the real material conditions of labor and class, and that true emancipation requires collective, structural revolution rather than private mental negation.',
        reflectionPrompt: 'When facing oppression, is liberation found through mentally dissolving social categories as illusions and retreating into sovereign self-interest, or through joining with others in the concrete, physical struggle to overthrow the material structures of exploitation?'
      }
    ]
  }
};
