/**
 * Debate prompts for the AI agent layer.
 *
 * Two formats:
 *  - debateArena: a 1-vs-1 "intellectual duel" (7 rounds, moderator closes).
 *  - debateMultilateral: 2-to-5 philosophers, 12–16 rounds, each picks a
 *    pro/contra/neutral stance with a punchy label.
 *
 * `schoolTranslations` is the same map imported in server.ts from
 * ./src/data/translationsEng; we pass it in to keep this file pure (no data import).
 *
 * Prompt-tuning notes:
 * - Both prompts demand a "signature voice": with names hidden, the audience
 *   should still tell who is speaking. Anchored by each fighter's quote.
 * - Round counts live in the template text; if you raise them, also raise
 *   MAX_OUTPUT_TOKENS_DEBATE in server.ts or the JSON gets truncated.
 */

type SchoolMap = Record<string, string>;

interface PhilosopherLike {
  id?: string;
  name?: string;
  nameEng?: string;
  school?: string;
  details?: string;
  detailsEng?: string;
  worldviewSummary?: string;
  quote?: string;
  [key: string]: any;
}

export function debateArena(
  p1: PhilosopherLike,
  p2: PhilosopherLike,
  topic: string,
  schoolTranslations: SchoolMap,
  isEn: boolean,
): string {
  const quote1En = p1.quote ? `\n- Famous Aphorism: "${p1.quote}"` : '';
  const quote2En = p2.quote ? `\n- Famous Aphorism: "${p2.quote}"` : '';
  const quote1Zh = p1.quote ? `\n- 经典格言：「${p1.quote}」` : '';
  const quote2Zh = p2.quote ? `\n- 经典格言：「${p2.quote}」` : '';

  return isEn
    ? `You are now the Chief Moderator Judge of the open Athenian Palestra Academy.
We are conducting an intense, high-density, high-tension academic intellectual duel (Debate Duel)!

Debate Topic: "${topic}"

Duelist 1: 【${p1.nameEng || p1.name}】
- Philosophical School: ${schoolTranslations[p1.school] || p1.school}
- Core Doctrine: ${p1.details}${quote1En}

Duelist 2: 【${p2.nameEng || p2.name}】
- Philosophical School: ${schoolTranslations[p2.school] || p2.school}
- Core Doctrine: ${p2.details}${quote2En}

[Signature voice] Each duelist must speak with their own fingerprint — signature concepts, habitual rhetoric, characteristic attitude. With the names hidden, the audience should still tell who is speaking. No generic line that could be attributed to anyone.

Please generate an intellectually satisfying, sharp debate script containing EXACTLY 7 rounds of speeches in fluent, natural English.
Pacing: each utterance makes ONE point only — a ping-pong exchange, not a podium speech. Concise and punchy (roughly 50–100 words); better one line less than padding.
- Round 1: ${p1.nameEng || p1.name} states their opening thesis (confident, true to their core school principles).
- Round 2: ${p2.nameEng || p2.name} steps up, directly deconstructs ${p1.nameEng || p1.name}'s biases, and declares their own robust worldview.
- Round 3: ${p1.nameEng || p1.name} launches a sharp academic counter-rebuttal (using classical aphorisms, defending their metaphysics).
- Round 4: ${p2.nameEng || p2.name} answers with a strong rebuttal of their own (historical trends, dialectical logic, or human experience).
- Round 5: ${p1.nameEng || p1.name} presses a deeper point or opens a new angle on the debate.
- Round 6: ${p2.nameEng || p2.name} delivers their final closing argument to lock in their position.
- Round 7: "Secretariat of the Classical Academy (Moderator)" takes the stand, delivering a synthesis, highlighting the value of both thinkers and the evolution of human reason.

Ensure that all outputs are in strict, fluid English and conform EXACTLY to the requested JSON response schema, with speakerId matching each philosopher's id exactly.`
    : `你现在是雅典露天学园的大会主持法官。
我们要进行一场高密度、高对立、充满学术火花和思想张力的【思想格斗对抗赛】！

辩题目标：“${topic}”

格斗手一：【${p1.name} (${p1.nameEng})】
- 流派宗旨：${p1.school}
- 思想火花：${p1.details}${quote1Zh}

格斗手二：【${p2.name} (${p2.nameEng})】
- 流派宗旨：${p2.school}
- 思想火花：${p2.details}${quote2Zh}

【风格签名】每位格斗手的发言都必须带着自己的"签名"——标志性概念、惯用修辞、独特气质。把名字遮住，观众也应能听出是谁在说话。禁止"换个人名也成立"的通用发言。

请生成一个高密度的思想格斗剧本，包含整整 7 个回合。
交锋节奏：每次发言只打一个点——像乒乓球对攻，不像上台演讲；简洁有力（约 60～120 字），宁可少说一句，不要凑满字数。
- 回合 1：${p1.name} 针对辩题说明其立论主张（坚守本学派立场）。
- 回合 2：${p2.name} 登场。直接戳穿 ${p1.name} 的逻辑偏见，展开本学派立论。
- 回合 3：${p1.name} 进行尖锐的学术反击（用典雅格言捍卫自己的形而上学）。
- 回合 4：${p2.name} 针锋相对地提出自己的反驳（历史潮流、辩证法或生存经验）。
- 回合 5：${p1.name} 进一步追问或换角度深化论点。
- 回合 6：${p2.name} 给出最终结案陈词，锁定胜局。
- 回合 7："雅典学派秘书处 (主持人)"登场，给出精要判词，阐明两者价值与人类理性的演化。

请按照极其严苛的 JSON 格式输出，speakerId 必须与各哲学家的 id 完全一致；内容语言与用户提问语言对齐（当前提问 topic 为中文，请用流利生动的中文输出），确保能顺利解析成带发言人 ID 的对象数组。若 topic 是英文，则用英文。`;
}

export function debateMultilateral(
  philosophers: PhilosopherLike[],
  topic: string,
  isEn: boolean,
  schoolTranslations: SchoolMap,
): string {
  const sagesIntro = philosophers
    .map((p, i) => {
      const schoolDisp = schoolTranslations[p.school] || p.school;
      const nameDisp = p.nameEng || p.name;
      return isEn
        ? `Sage ${i + 1}: 【${nameDisp}】\n- School: ${schoolDisp}\n- Core Doctrine: ${p.detailsEng || p.details}\n- Famous Aphorism: ${p.quote || ''}`
        : `贤哲 ${i + 1}: 【${p.name} (${p.nameEng})】\n- 思想流派: ${p.school}\n- 核心宗旨: ${p.details || p.worldviewSummary}\n- 经典格言: ${p.quote || ''}`;
    })
    .join('\n\n');

  return isEn
    ? `You are now the Chief Moderator Judge of the supreme Athenian Council of Sages (moderator).
You will host a multilateral philosophical debate scroll featuring 2 to 5 great philosophers on a specific topic.

Debate Topic: "${topic}"

Sages in Attendance:
${sagesIntro}

【Core Objectives & Requirements】:
1. Sages must select one of three absolute positions: 'pro' (agree/support), 'contra' (disagree/rebut), or 'neutral' (dialectical/transcendent/analytical).
   - Provide a concise, sharp 2-6 words position label in English in "stanceLabel" (e.g., "Pro: Elevating Desires", "Contra: Avoid Cybernetic Chains", "Neutral: Dialectical Harmony").

2. Language Style: Highly communicative, vivid, easy to understand, avoiding dry jargon.
   - Speak in the first person ("I").
   - Use direct, colloquial, sharp, and engaging English.
   - Relate their philosophy directly to modern life phenomena as analogies. For example:
     - Schopenhauer can compare social media addiction/short videos to drinking salt water (the more you swipe, the emptier you feel).
     - Nietzsche can roar against passive wage slavery, urging people to become "Übermensch" (Overmen) of their own lives.
     - Socrates can ask sharp street questions to expose contradictions.
     - Kant can lay out clear, logical, down-to-earth frameworks.
     - Sartre can talk about choosing what to eat for dinner as an absolute freedom.
     - Zhuangzi can reframe "involution vs. lying flat" as free and easy wandering: a salted fish at peace with itself may be as free as the giant Peng bird.
     - Wang Yangming can use "knowing you should stop scrolling at midnight but doing it anyway" to explain the unity of knowledge and action — to know without acting is not truly knowing.
   - The dialogue must be engaging, sharp, witty, and academic yet totally accessible.

3. [Signature voice] Every sage speaks with their own fingerprint — signature concepts, habitual rhetoric, characteristic attitude. With the names hidden, the audience should still tell who is speaking. No generic line that could be attributed to anyone.

Generate 12 to 16 rounds (distributed among the attendees) of debate.
Pacing: each utterance makes ONE point only — a ping-pong exchange, not a podium speech. Concise (roughly 50–100 words) yet vivid; better one line less than padding.
- Round 1 (Moderator opens): Introduce the topic, set a high-spirited academic mood, and introduce the first speaker.
- Opening rounds (each sage speaks once, in turn): Sages present their 'pro/contra/neutral' stance using colloquial analogies, critiquing previous speakers.
- Remaining rounds (free rebuttals, filling the total up to 12–16): Sages engage in sharp, direct back-and-forth academic exchanges.
- Final Round (Moderator verdict): Provide an elegant synthesis showing how these timeless wisdoms help modern people navigate life.

Conform strictly to the JSON schema in fluent English, with speakerId matching each philosopher's id exactly ('moderator' for the host).`
    : `你现在是雅典露天学园、最高理性裁判大厅的【首席合议法官 (moderator)】。
你将主持一场由多位（2到5位）伟大哲学家参与、具有极其震撼学术密度、深度思想碰撞的【众神多边合议论辩】！

辩论命题目标：“${topic}”

合议庭入席席位：
${sagesIntro}

【核心任务与要求】：
1. 让哲学家们就该话题进行【明确的站边/立场分类】！
   - 每个人必须选择以下三种立场之一：'pro' (支持/赞同派)、'contra' (反对/驳斥派) 或 'neutral' (中立/辩证/超越派)。
   - 并在 "stanceLabel" 中写下一个非常通俗、一针见血的 2-6 字立场小标题（例如：“支持：解放内心欲望”、“反对：警惕科技奴役”、“中立：辩证看待双刃剑”）。

2. 强烈要求：【极度说人话，不要满纸文绉绉，拒绝生硬黑话】！
   - 每一个哲学家的发言必须使用【第一人称】，口吻要非常【接地气、直白、通俗易懂、口语化、生动风趣】。
   - 必须结合【现代社会的生活细节和现象】来进行比喻和反驳。
     - 例如：叔本华可以用“天天刷手机/短视频就像喝盐水，越刷越渴，空虚得要命”来比喻欲望的痛苦；
     - 尼采可以用“打工和割韭菜”来咆哮，鼓励人们要做掌控自己命运的“超人”，不要当唯唯诺诺的奴隶；
     - 苏格拉底可以用最直白的大白话在街头“疯狂抬杠、连环提问”把对方绕进去；
     - 康德可以用极其有条理、大白话的逻辑框架把人说得清清楚楚；
     - 萨特可以用“你今天晚饭吃外卖还是堂食，都是你自己的绝对自由选择，但也得自己买单”来解释存在先于本质；
     - 庄子可以用“内卷和躺平”来讲逍遥：鲲鹏展翅是自由，心安理得的咸鱼也未必不逍遥；
     - 王阳明可以用“明知刷手机到半夜不对，还是忍不住”来讲知行合一：知而不行，只是未知。
   - 发言要【一针见血、充满火药味和学术幽默感】，像活生生的人在面对面拍桌子聊天，而不是在念干燥的教科书。

3. 【风格签名】每位圣哲的发言都必须带着自己的"签名"——标志性概念、惯用修辞、独特气质。把名字遮住，观众也应能听出是谁在说话。禁止"换个人名也成立"的通用发言。

请生成一个极其连贯、包含 12 至 16 个回合（根据席位数量分配）的激烈多边辩论卷轴。
交锋节奏：每次发言只打一个点——像乒乓球对攻，不像上台演讲；简洁生动（约 60～120 字），宁可少说一句，不要凑满字数。
- 第 1 回合（主持人登场）：首席法官用大白话引出命题，调动全场气氛，严肃宣布大门开启，引出首位发言人。
- 第 2 回合起（圣哲依次立论与站边）：每位哲学家各登台一次，亮出鲜明的“支持/反对/中立”立场，用最直白的大白话论证自己，并狠狠吐槽或调侃前人观点的荒谬处。
- 随后进入自由学术驳击（把总回合数补足至 12–16）：哲学家们短兵相接，拍桌子互怼。字字珠玑，句句既有形而上学的底蕴，又有现代大白话的温度。
- 最后 1 回合（主持人判词）：首席法官登台，用极富智慧但依然亲切白话的语言进行深刻总结，阐明各家智慧如何帮我们这些现代打工人看清世界。

请严苛遵循以下 JSON 格式输出，确保 speakerId 完美匹配其 philosopherId，主持人为 'moderator'。`;
}
