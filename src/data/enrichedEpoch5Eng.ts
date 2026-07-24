export const enrichedEpoch5Eng: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  kant: {
    lifeAndTimes: 'The towering watershed figure of Western philosophy, who lived his entire life in Königsberg with a regularity so precise that local residents reportedly set their clocks by his afternoon walks. Behind this rigorously disciplined exterior, however, his mind executed what he himself called a "Copernican revolution" in epistemology—fundamentally reorienting the relationship between the knowing subject and the known world.',
    worldviewSummary: 'Kant\'s critical or transcendental idealism synthesized the warring rationalist and empiricist traditions by demonstrating that the mind is not a passive recipient of sensory data but an active structuring agent. He argued that space, time, and twelve fundamental categories (causality, substance, etc.) are innate forms imposed by the understanding upon the raw manifold of sensation, making experience possible. The "thing-in-itself" (Ding an sich) remains forever inaccessible; we know only phenomena as structured by our cognitive apparatus. In ethics, he formulated the Categorical Imperative: moral action must be governed by maxims that can be universalized, performed purely from duty rather than inclination or consequence. Persons must always be treated as ends in themselves, never merely as means.',
    quote: 'Two things fill the mind with ever new and increasing admiration and awe, the more often and steadily we reflect upon them: the starry heavens above me and the moral law within me. Reason legislates for nature; duty admits of no calculation or compromise. Every person is an end in himself, never a mere instrument.',
    comparisons: [
      {
        withName: 'David Hume',
        coreDifference: 'Hume had reduced causality and scientific necessity to mere psychological habit, threatening the objectivity of knowledge. Kant responded with his transcendental revolution: causal necessity is not an empirical discovery about things-in-themselves but an a priori condition that the human understanding imposes upon experience, thereby securing the foundations of natural science.',
        reflectionPrompt: 'Is your grasp of natural law an objective reach into the world\'s own structure, or is it the imprint of your cognitive architecture projecting order onto an otherwise inaccessible reality?'
      },
      {
        withName: 'Johann Gottlieb Fichte',
        coreDifference: 'Kant deliberately preserved a boundary beyond which reason cannot go, leaving the thing-in-itself as an irreducible, unknowable residue. Fichte found this restraint intolerable and eliminated the thing-in-itself entirely, collapsing all reality into the self-positing activity of the absolute Ego.',
        reflectionPrompt: 'Should we accept Kant\'s epistemic humility—that there are limits to what the human mind can know—or embrace Fichte\'s audacious claim that the self alone constitutes the ultimate ground of all reality?'
      }
    ]
  },
  fichte: {
    lifeAndTimes: 'Born into poverty as the son of a Saxon ribbon-weaver, Fichte\'s prodigious memory—he could recite an entire sermon after a single hearing—attracted a noble patron who funded his education. A fervent disciple of Kant who ultimately sought to surpass his master, he was repeatedly accused of atheism and forced from academic posts. During Napoleon\'s occupation of Prussia, he delivered his electrifying Addresses to the German Nation (1808) in occupied Berlin, galvanizing a generation toward national and philosophical awakening.',
    worldviewSummary: 'Fichte radicalized Kantian idealism into a philosophy of absolute subjective activism. He rejected Kant\'s thing-in-itself as an incoherent remnant of dogmatism, arguing that the sole starting point of all philosophy is the self-positing activity of the "Absolute Ego" (Ich bin Ich). The Ego first posits itself, then posits a "Non-Ego"—the external world of obstacles and resistances—not as an independent reality but as the necessary field for moral striving. The world exists so that the self may overcome it and achieve moral self-realization through action. For Fichte, deed precedes being: the fundamental truth is not passive contemplation but active, will-driven engagement with a world constituted as the arena of ethical struggle.',
    quote: 'The Ego posits itself; the Ego posits the Non-Ego, and through this opposition reveals its own infinite activity. Action is everything. To live is to wage an unrelenting assault, never yielding for a moment to external fate or circumstance, laughing as you subdue every obstacle through sovereign will.',
    comparisons: [
      {
        withName: 'Immanuel Kant',
        coreDifference: 'Kant conceived the self as a transcendental structure that passively organizes sensory input, leaving the thing-in-itself beyond reach. Fichte transformed the self into a dynamic, world-constituting power that actively produces the very obstacles it must then overcome through moral action.',
        reflectionPrompt: 'When confronting life\'s difficulties, should you trust in careful, stepwise rational planning, or in the audacious, self-launching will that leaps into the void to shatter obstacles through sheer force of conviction?'
      }
    ]
  },
  schelling: {
    lifeAndTimes: 'A philosophical prodigy admitted to the Tübingen seminary at sixteen, where he roomed with the older Hegel and the poet Hölderlin. At twenty-three, Goethe personally secured him a full professorship at the University of Jena, making him the youngest professor in Germany. Handsome and charismatic, he became the intellectual heart of German Romanticism, though his later years were overshadowed by Hegel\'s ascendancy and his own turn toward mystical theosophy.',
    worldviewSummary: 'Schelling\'s Naturphilosophie (philosophy of nature) restored dignity to the natural world, which Fichte had reduced to mere raw material for moral striving. He argued that nature is not a dead mechanism but "slumbering spirit"—an unconscious intelligence gradually awakening toward self-consciousness through progressive stages of organization. His Identity Philosophy posited that subject and object, mind and matter, are ultimately manifestations of a single Absolute that transcends and unifies all dualities. Art, rather than abstract reason, provides the highest access to this primordial unity: aesthetic intuition alone can grasp the identity of nature and spirit directly, without the mediation of concepts. Nature is visible Spirit; Spirit is invisible Nature.',
    quote: 'Nature is slumbering spirit, dreaming in stone and soil its luminous visions. Every symphony and poem born in the human mind is nothing other than nature itself, after billions of years of cosmic evolution, suddenly awakening within your neural architecture and erupting into a single flash of sacred beauty. Beauty is the supreme path to redemption.',
    comparisons: [
      {
        withName: 'Johann Gottlieb Fichte',
        coreDifference: 'Fichte subordinated nature entirely to the moral will, treating the external world as inert scaffolding for ethical self-overcoming. Schelling revolted against this instrumentalization, arguing that nature possesses its own independent, creative vitality predating human consciousness by eons, and that the human mind is merely nature\'s most recent expression of its own latent intelligence.',
        reflectionPrompt: 'Should we regard the natural world as a resource to be manipulated for human purposes, or should we preserve a posture of reverent, aesthetic attunement to the living intelligence that Schelling saw suffusing every leaf and stone?'
      }
    ]
  },
  hegel: {
    lifeAndTimes: 'The culminating figure of German Idealism, who rose from an unremarkable early career to dominate European philosophy from his chair at the University of Berlin. He completed the Phenomenology of Spirit in 1806 by candlelight as Napoleon\'s cannons thundered outside Jena. His lectures in Berlin drew students from across Europe with their labyrinthine complexity and vaulting ambition, constructing a total system that claimed to comprehend the rational structure of all reality.',
    worldviewSummary: 'Hegel\'s absolute idealism holds that reality is the self-unfolding of Absolute Spirit (Geist) through a dynamic dialectical process. All things develop through the tension of contradiction: a thesis generates its antithesis, and their conflict is resolved through a higher synthesis (Aufhebung) that both preserves and transcends the opposition. This dialectical logic operates not only in thought but in nature and history itself. World history is the progressive realization of Spirit\'s self-consciousness and freedom, moving through successive civilizations toward full rational self-understanding. The real is rational, and the rational is real: whatever exists must be understood as a necessary moment in the self-development of the Absolute.',
    quote: 'What is rational is actual, and what is actual is rational. Absolute Spirit journeys through the long night of history, colliding and bleeding, only to awaken at the end of its odyssey and sing the luminous hymn of absolute freedom.',
    comparisons: [
      {
        withName: 'Baruch Spinoza',
        coreDifference: 'Spinoza\'s single substance is a static, eternal, geometrically ordered totality without genuine movement or development. Hegel condemned this as lifeless abstraction and insisted that the true Absolute must be a living, self-differentiating process that negates itself, produces internal contradiction, and achieves higher unity through Aufhebung.',
        reflectionPrompt: 'Is the ultimate truth a timeless, motionless mathematical unity, or is it a vast historical drama that grows, suffers, and refines itself through ceaseless dialectical struggle?'
      },
      {
        withName: 'Ludwig Feuerbach',
        coreDifference: 'Hegel treated the material, sensory world as merely the externalization of Absolute Spirit. Feuerbach overturned this entirely, arguing that Spirit is a projection of the concrete, embodied human being who eats, loves, and suffers—and that Hegel\'s Absolute is a ghostly abstraction alienated from real human life.',
        reflectionPrompt: 'Is the foundation of reality an invisible rational principle unfolding through history, or is it simply the concrete, suffering, desiring human body in its material circumstances?'
      }
    ]
  },
  strauss: {
    lifeAndTimes: 'A brilliant young theologian of the Young Hegelian movement whose first major work, Das Leben Jesu (The Life of Jesus, 1835), detonated across European intellectual life. At twenty-seven, he systematically applied historical-critical methods to the Gospels, arguing that their miraculous narratives were not eyewitness reports but mythic expressions of early Christian communities\' collective imagination. The scandal cost him all academic prospects, and he spent the remainder of his life writing in intellectual isolation, never retracting his conclusions.',
    worldviewSummary: 'Strauss applied Hegelian dialectics to biblical criticism with devastating results. He argued that the Gospel miracles are not historical facts but "myths"—products of the collective mythopoetic imagination of early Christian communities who, in their suffering and longing for redemption, unconsciously wove Old Testament motifs and messianic expectations into narrative form around the figure of Jesus. This process was not fraud but a natural, historically conditioned expression of the human spirit at a particular stage of development. Strauss thereby transformed theology into the historical study of human religious consciousness, opening the door to the full secularization of biblical scholarship and the broader critique of religious authority.',
    quote: 'Miracles are not physical facts; they are the sublime mythic projections that a suffering humanity, crushed by worldly injustice, collectively poured forth in its desperate yearning for transcendence. God does not exist as a supernatural being; humanity\'s only true divinity is the immortal rational totality of its own historical development.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel, despite his dialectical method, ultimately reconciled philosophy with Christian doctrine by interpreting the Trinity and Incarnation as symbolic representations of Absolute Spirit. Strauss turned Hegel\'s own dialectical tools against this compromise, demonstrating that the Gospels are not rational truths in symbolic garb but historically conditioned myths, thereby demolishing the theological roof Hegel had carefully preserved.',
        reflectionPrompt: 'When we inherit a powerful intellectual method, should we faithfully preserve its founder\'s conclusions as sacred, or should we wield that method fearlessly against the founder\'s own dogmatic attachments?'
      }
    ]
  },
  bauer_b: {
    lifeAndTimes: 'The most intellectually ferocious of the Young Hegelians, Bruno Bauer began as a conservative theologian before his radical biblical criticism—declaring the Gospels to be literary fictions composed by individual authors—cost him his teaching license. He and the young Marx co-founded the "Doctors\' Club" of radical Hegelians in Berlin before their eventual falling out. Living in embittered obscurity, he continued producing fiercely independent philosophical works until his death, refusing all compromise with church, state, or intellectual fashion.',
    worldviewSummary: 'Bauer\'s "philosophy of pure self-consciousness" radicalized Hegelianism into a philosophy of unceasing critique. He argued that all religious ideas—and indeed all institutionalized beliefs—are alienations of human self-consciousness, projections of our own rational powers onto an imaginary external authority that then tyrannizes us. The task of philosophy is therefore not to reach any final synthesis but to subject every concept, every institution, and every belief to the unsparing fire of critical negation. History is the progressive liberation of self-consciousness from all its self-imposed fetters. No existing order can claim to embody reason definitively; only the permanent revolution of critical thought preserves human freedom. The philosopher is not a system-builder but an insurgent who dissolves every frozen dogma.',
    quote: 'The deity is nothing but a self-inflicted hallucination—a mirror-image projected outward from the human mind, which then turns back to enslave its creator. All things dissolve in the torrent of ceaseless critique! The philosopher\'s supreme dignity lies in wielding the incandescent fire of pure self-conscious critique to melt every dead doctrine into nothingness. The sovereign will of the self is the highest law.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel believed that dialectical development culminates in reconciliation with the existing rational state and the established order. Bauer rejected all such closures as betrayals of the dialectical spirit, insisting that genuine critique can never rest in any institutional settlement—only the permanent negation of every claim to finality preserves authentic freedom.',
        reflectionPrompt: 'In pursuing a just order, should we settle at a stable, moderate equilibrium that satisfies most parties, or must the blade of self-critique remain perpetually drawn, clearing away every comfort that threatens to lull us into complacency?'
      }
    ]
  },
  bauer_e: {
    lifeAndTimes: 'The younger brother of Bruno Bauer and a fellow Young Hegelian, Edgar Bauer distinguished himself by translating philosophical critique into direct political action. While his brother remained a purely theoretical radical, Edgar participated in revolutionary agitation, was imprisoned for sedition, and eventually exiled. He insisted that philosophy without practical engagement in the messy, material struggles of ordinary people was nothing more than intellectual self-indulgence.',
    worldviewSummary: 'Edgar Bauer radicalized the philosophy of self-consciousness into a call for concrete social insurgency. He castigated the academic Hegelians who deployed elaborate dialectical terminology from the safety of university lecterns while refusing to enter the streets, workshops, and prisons where actual oppression occurred. Philosophy, he insisted, is not a contemplative exercise but a weapon: its purpose is to expose exploitation, demystify ideology, and empower the dispossessed to reclaim their autonomy through direct action. Theory without practice is empty; self-consciousness that does not translate into the physical confrontation with unjust institutions is merely another form of self-deception. True liberation requires the fusion of critical thought and bodily resistance.',
    quote: 'Stop being the learned scholar who hides behind stacks of paper in the lecture hall, murmuring abstruse concepts! Philosophy is the sharpest blade of reason—a blade meant to be driven into the flesh of an unjust world, to pierce through every lie of exploitation, and to reclaim equal sovereignty for all in the mud and blood of real struggle.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel constructed his dialectic from the gilded chair of the University of Berlin, wrapping truth in an impenetrable armor of abstract concepts far removed from the sweat and suffering of ordinary people. Edgar Bauer demanded that dialectics descend from the clouds, shedding its academic jargon to become a vernacular weapon of popular insurrection against concrete oppression.',
        reflectionPrompt: 'When confronting difficult challenges, do you retreat into theoretical study and conceptual mastery for inner reassurance, or do you roll up your sleeves and plunge directly into the messy, uncertain arena of practical action?'
      }
    ]
  },
  feuerbach: {
    lifeAndTimes: 'The thinker who decisively broke German philosophy\'s idealist spell and became the direct intellectual father of Marx and Engels—who famously declared that "we all became Feuerbachians overnight." After his early work on death and immortality cost him any hope of an academic career, he spent over two decades in rural poverty, writing in a derelict porcelain workshop owned by his wife\'s family. There, in material hardship, he produced The Essence of Christianity (1841), which fundamentally restructured the relationship between theology and anthropology.',
    worldviewSummary: 'Feuerbach executed a systematic "inversion of Hegelian idealism," arguing that the true starting point of philosophy is not Absolute Spirit but the concrete, sensuous, embodied human being. Spirit is not an autonomous reality but a function of the material brain; thought is a product of nature, not its author. His most revolutionary argument concerned religion: God is not a transcendent being who created humanity, but rather humanity\'s own idealized essence projected outward into an imaginary entity. Human beings, in their suffering and aspiration, unconsciously externalize their own highest attributes—reason, love, moral will—and worship them as a separate divine being, thereby impoverishing themselves. The emancipation of humanity requires reclaiming these projected qualities and recognizing that "the secret of theology is anthropology"—that divine love, properly understood, is human love restored to its rightful earthly dignity.',
    quote: 'Man is what he eats. God did not create humanity; the truth is that humanity, in its desperate need for consolation, projected its own finest virtues—love, reason, and moral courage—onto an imagined being in the sky. Wake from this theological dream! The throne of heaven is empty. Only nature and the living, flesh-and-blood individual who eats, loves, and suffers in this world are real. Restore the divine to its proper home: the human heart.',
    comparisons: [
      {
        withName: 'G. W. F. Hegel',
        coreDifference: 'Hegel held that the material world is the self-externalization of Absolute Spirit—mind is primary, matter its derivative. Feuerbach overturned this completely, arguing that nature and the embodied human being are the fundamental reality, and that Spirit is merely the physiological activity of the brain, a reflection of material existence rather than its ground.',
        reflectionPrompt: 'When you think about the ultimate nature of reality, do you trust Hegel\'s grand system where everything unfolds according to a rational, invisible Idea, or Feuerbach\'s insistence that any philosophy disregarding the concrete needs of a hungry, loving, suffering body is an intellectual fraud?'
      },
      {
        withName: 'Max Stirner',
        coreDifference: 'Feuerbach destroyed the Christian God only to erect a new idol in its place: "Humanity" or "Man" as a universal, sacred essence deserving of universal love. Stirner attacked this humanist replacement as just another "spook"—an abstraction that subjugates the concrete individual to yet another collective phantom.',
        reflectionPrompt: 'Do you believe that even after abandoning religion, we must retain a sense of universal human solidarity and compassion as our moral foundation, or do you find all such collective ideals to be new forms of enslavement of the individual?'
      }
    ]
  },
  stirner: {
    lifeAndTimes: 'A quiet Berlin schoolteacher who, under the pen name Max Stirner, detonated a philosophical hand grenade whose shockwaves are still felt. His book Der Einzige und sein Eigentum (The Ego and Its Own, 1844) was so radical in its nihilistic egoism that it provoked Marx and Engels to dedicate hundreds of pages of The German Ideology to refuting it. Obscure and impoverished, he died in neglect, yet his ruthless unmasking of all ideals as oppressive fictions made him a foundational figure for existentialism and anarcho-individualism.',
    worldviewSummary: 'Stirner executed the most radical negation in philosophical history, declaring that every ideal, value, and collective concept—God, State, Society, Humanity, Morality, Justice, even Truth itself—is a "spook" (Hirngespenst), a mental phantom that has parasitically colonized the individual mind and demands its sacrifice. These spooks are not merely false but tyrannical: they are internalized authority structures that convince the unique individual to subordinate its own concrete interests to abstract fictions. The only reality is the "Unique One" (Der Einzige)—the specific, living, desiring individual ego, which owes nothing to any concept or collective. There is no moral law, no duty to others, no obligation to history or progress. The ego should appropriate whatever it can, serve only its own satisfaction, and recognize that all claims upon it by any abstraction are fraudulent attempts to exploit its life-energy. Freedom is not emancipation through collective action but the dissolution of all ghosts through radical self-ownership.',
    quote: 'All things are nothing to me. Everything in my head—God, sacred virtue, company honor, national destiny, class standing, peer approval, even so-called eternal morality—is nothing but a new species of parasitic ghost haunting my skull, terrifying and enslaving me! There is nothing real in this universe except this individual ego, here and now, breathing and desiring. Cut through every phantom with the merciless blade of egoism. I am the sovereign legislator of my own will, and nothing—absolutely nothing—is worth my submissive worship.',
    comparisons: [
      {
        withName: 'Ludwig Feuerbach',
        coreDifference: 'Feuerbach smashed the divine idol only to erect a new one: "Humanity" as a sacred collective essence demanding universal love. Stirner laughed and trampled this new idol too, declaring that "Humanity" is merely God in secular disguise—another spook designed to extract the individual\'s devotion and energy for a phantom abstraction.',
        reflectionPrompt: 'Does genuine liberation require embracing a warm, universal compassion for all humanity, or is true freedom only achieved by the cold, solitary ego that recognizes every collective ideal as a new form of psychological enslavement?'
      },
      {
        withName: 'Karl Marx',
        coreDifference: 'Stirner dissolved all social bonds into phantoms, advocating pure individual egoism as the escape from oppression. Marx responded with ferocious intensity, arguing that Stirner\'s "unique one" is a petit-bourgeois fantasy that ignores the material reality of class, labor, and production relations—and that real liberation requires collective, structural transformation rather than individual mental negation.',
        reflectionPrompt: 'When confronting oppression, should you follow Stirner\'s path of mentally dissolving all social categories as ghosts and retreating into sovereign self-possession, or Marx\'s call to join with others in the concrete, physical struggle to restructure the material conditions of society?'
      }
    ]
  }
};
