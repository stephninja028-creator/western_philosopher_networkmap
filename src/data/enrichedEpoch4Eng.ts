export const enrichedEpoch4Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  diderot: {
    lifeAndTimes: 'The indefatigable chief editor and architect of the French Enlightenment\'s greatest monument, the Encyclopédie (1751–1772). For over two decades, he labored under constant threat of censorship, imprisonment, and book burnings by church and state authorities. He rallied Voltaire, Rousseau, and other luminaries to compile a comprehensive repository of human knowledge across the sciences, arts, and crafts, aiming to liberate the public mind from superstition and ignorance.',
    worldviewSummary: 'Diderot championed the encyclopedic dissemination of rational scientific knowledge as the primary weapon against dogma and tyranny. In natural philosophy, he advanced a dynamic, organic materialism: matter itself possesses inherent vitality and sensitivity, and life arises through spontaneous, continuous material evolution rather than divine design. This proto-evolutionary vision—that all living forms emerge from base matter through heat, motion, and molecular organization—directly anticipated Darwinian biology. For Diderot, the emancipation of the human intellect required that all specialized knowledge be translated into plain language and made universally accessible, erasing the priestly monopoly on truth.',
    quote: 'If there are doctrines that claim to be sacred and immune from public examination, that very claim is, by logic and conscience, the surest mark of a fraud. Until we use factual science to liberate the human mind from the abyss of superstitious terror, humanity will forever remain enslaved.',
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Locke established empiricism as a theory of knowledge, arguing that all ideas derive from sensory experience. Diderot transformed this philosophical premise into a concrete, mass-educational enterprise—translating elite empirical theory into accessible technical articles on metallurgy, weaving, and mechanics, thereby bringing Enlightenment from the salon to the workshop floor.',
        reflectionPrompt: 'Is truth best pursued as refined theoretical discourse for an educated few, or must it be translated into practical, vernacular instruction that empowers every ordinary worker?'
      }
    ]
  },
  mettrie: {
    lifeAndTimes: 'An iconoclastic French physician-philosopher who served as a military surgeon, where direct observation of brain injuries and fever-induced delirium radicalized his thinking. His uncompromising atheistic materialism in L\'Homme Machine (1747) provoked condemnation across France, forcing him into exile. He found refuge at the court of Frederick the Great of Prussia, where, according to legend, he demonstrated his materialist convictions so zealously at a banquet that he died of overindulgence in truffle pie.',
    worldviewSummary: 'La Mettrie advanced the most uncompromising mechanistic reductionism of the Enlightenment: the human being is nothing but a machine (l\'homme machine). Drawing on clinical evidence from fevers, brain trauma, and pharmacological effects, he argued that all mental phenomena—thought, emotion, will—are purely physical functions of the brain and nervous system. Consciousness arises from the organization of matter, just as a clock\'s movement arises from its gears. He dismantled Descartes\' dualist compromise, insisting that if animals are machines without immaterial souls, so too are humans, only more complex in their organic circuitry. This radical position laid essential groundwork for modern neuroscience and biological psychiatry.',
    quote: 'Descartes, your doctrine of an immaterial soul hovering above the body is finished. My surgical scalpel, guided by battlefield neurology, demonstrates plainly: man is a machine—an exquisitely assembled chemical-physical apparatus of blood and flesh. The electrical discharges and pressures within your cranial nerves determine whether you speak tonight of sacred love or incoherent babble. Everything else is metaphysical fantasy.',
    comparisons: [
      {
        withName: 'René Descartes',
        coreDifference: 'Descartes retreated into a dualist compromise, declaring animals mere machines while reserving an immaterial thinking substance for humans alone. La Mettrie tore down this remaining screen, arguing that if animals are machines, then humans are simply more sophisticated organic machines, and the mind is the clockwork function of the brain.',
        reflectionPrompt: 'When reflecting on your own consciousness, do you cling to Descartes\' reservation of a sacred, non-material mental realm beyond physical causation, or do you accept La Mettrie\'s unflinching view of yourself as a finely tuned biological mechanism whose every thought is a neurochemical event?'
      }
    ]
  },
  helvetius: {
    lifeAndTimes: 'A wealthy French philanthropist and radical Enlightenment thinker who used his fortune to relieve peasant taxes and fund indigent scholars. His major work De l\'Esprit (On Mind, 1758) caused a Europe-wide scandal by arguing that virtue and genius are products of environment rather than innate nobility. The book was publicly burned by order of the French Parlement and condemned by the Pope, yet its influence on utilitarian and educational reform was profound.',
    worldviewSummary: 'Helvétius radicalized Lockean empiricism into a comprehensive doctrine of environmental determinism and educational omnipotence. He argued that the mind at birth is a blank slate, and all differences in talent, character, and moral disposition are entirely the product of education and social environment. There is no innate nobility of blood or natural hierarchy of intelligence—only differential exposure to instruction and circumstance. Furthermore, he asserted that all human action is governed by the pursuit of pleasure and avoidance of pain (sensory egoism). The task of legislation and social reform is therefore not to preach virtue but to design institutions that align individual self-interest with collective welfare—a direct precursor to Benthamite utilitarianism.',
    quote: 'There is no such thing as an inborn noble disposition; such talk is pure emptiness. The mind is born blank—education can do all. If we wish to improve society, we must stop moralizing and start demolishing the walls of prejudice through universal public education. Let rational laws harness individual self-interest to forge a just social contract.',
    comparisons: [
      {
        withName: 'John Locke',
        coreDifference: 'Locke introduced the blank slate as a theoretical epistemological premise within genteel philosophical discourse. Helvétius seized it as a radical egalitarian weapon, arguing that education can completely remake any human being regardless of birth, transforming Lockean empiricism into a militant program of social leveling and public instruction.',
        reflectionPrompt: 'Do your present abilities and limitations reflect an innate, fixed intellectual endowment that you must accept, or are they artifacts of your educational environment that can be fundamentally reshaped through deliberate re-training and changed circumstances?'
      }
    ]
  },
  holbach: {
    lifeAndTimes: 'A German-born French baron of immense wealth who hosted the most influential Enlightenment salon in Paris for three decades. At his lavish estate, Grandval, Voltaire, Diderot, Hume, and Rousseau gathered to debate under his generous patronage. His magnum opus Le Système de la Nature (The System of Nature, 1770)—published under a pseudonym to avoid persecution—was condemned by the Vatican as "the bible of atheism" and burned across Europe, establishing him as the foremost systematic materialist of the French Enlightenment.',
    worldviewSummary: 'Holbach constructed the most rigorous and uncompromising materialist system of the Enlightenment, extending Newtonian physics into a total cosmology of mechanistic determinism. He declared that the universe contains nothing but matter in motion, governed by immutable chains of physical cause and effect. There is no soul, no God, no afterlife—these are fabrications devised by priestly classes to terrorize populations into submission. Humans are material particles wholly determined by the unbroken causal network of nature; even our loftiest thoughts and most heroic sacrifices are the necessary products of atomic interactions. The highest liberation is to accept this cold, clear truth and live with serene dignity within the natural order, unafraid of imaginary punishments or illusory rewards.',
    quote: 'The universe holds only one reality: the eternal, self-moving substance of matter! Gods, hells, and heavens are nothing but selfish fictions concocted by priestly castes to extract obedience and dignity from ordinary minds. Humanity is but a particle in nature\'s material organism. The noblest emancipation is to sever this web of deception with the clean edge of scientific fact, and live in sober, honest clarity—returning at death to the star-dust from which we came.',
    comparisons: [
      {
        withName: 'Heraclitus',
        coreDifference: 'Heraclitus glimpsed a cosmic logos of dynamic fire and ceaseless flux, expressed in poetic and mystical language. Holbach recast this intuition within the framework of Newtonian physics, welding the logos into an iron chain of mathematically calculable mechanical necessity, thereby expelling all remnants of divinity and mystery from the natural world.',
        reflectionPrompt: 'In contemplating existence, do you prefer Heraclitus\' poetic vision of cosmic fire and harmonious tension, or Holbach\'s austere, dry, fully deterministic universe governed by unyielding mechanical laws without a trace of transcendent meaning?'
      }
    ]
  }
};
