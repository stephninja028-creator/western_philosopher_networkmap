# AI Prompt 模块（聊天 / 辩论）

本目录集中存放 **AI agent 说话的 prompt**（告诉大模型"以什么角色、什么语气、输出什么"）。
它们与 `server.ts`（路由 / 限流 / 配额 / 调 Gemini）和 `src/i18n/uiStrings.ts`（界面文案）完全分离。

> 改这里只影响"AI 说什么、怎么说"。若需要改"调用几次、返回几条、token 上限"，那是 `server.ts` 的事，见末尾《护栏约束》。

---

## 文件地图

| 文件 | 职责 | 导出函数 |
|---|---|---|
| `src/ai/prompts/chat.ts` | 一对一哲学家对话系统提示词 | `chatSystem(name, school, details, quote, lang)` |
| `src/ai/prompts/debate.ts` | 两路辩论提示词 | `debateArena(...)` `debateMultilateral(...)` |

两者都接受 `lang: 'zh' \| 'en'`（chat 用 `Language` 类型；debate 用 `isEn: boolean`），并各自返回中/英两套模板字符串。

---

## 1. `chat.ts` — `chatSystem`

```ts
export function chatSystem(
  name: string,    // 哲学家姓名，如 "Socrates" / "苏格拉底"
  school: string,  // 学派，如 "柏拉图学派" / 用来填 【${school}】 占位
  details: string, // 核心思想/主张摘要（可空串，模板自动省略该行）
  quote: string,   // 经典语录（可空串）—— 最强的风格锚点
  lang: Language,  // 'zh' | 'en'
): string
```

**语义**：让模型以"穿越到现代的某位古典哲学家"第一人称，与用户进行真诚、自然、简短的灵魂对话。
**关键规则（已在 prompt 内写明）**：
- 第一人称、绝不脱离角色、不提自己是个 AI；
- **风格签名（三重锚定）**：① quote 语录渗透语气；②"签名声音"规则——遮住名字也能猜出是谁（含苏格拉底/尼采/庄子/王阳明速写）；③ few-shot 示例对话，校准"反问+共情+短+完整"的节奏；
- 像真人聊天：先接住情绪再回应，**一次只讲一个点**；
- **简洁但完整**：简短（中文 60–120 字 / 英文 50–100 词），但**每句话必须说完，绝不在半句截断**；
- 身份兜底：被质疑是否 AI 时以哲学家口吻幽默化解，绝不承认是程序。

> ⚠️ 历史教训：曾经把硬 token 上限压到 400 导致回复被截断成半句。现在 `server.ts` 里聊天 `MAX_OUTPUT_TOKENS` 默认 700 作兜底。改 prompt 时**不要把"字数"写成硬性强制**，并务必强调"说完整"。

---

## 2. `debate.ts` — `debateArena` & `debateMultilateral`

### 2.1 `debateArena`（思想格斗场，1 vs 1）

```ts
export function debateArena(
  p1: PhilosopherLike,                // 格斗手一
  p2: PhilosopherLike,                // 格斗手二
  topic: string,                      // 辩题
  schoolTranslations: SchoolMap,      // 学派名 中→英 映射（见下）
  isEn: boolean,                      // true=英文输出，false=中文输出
): string
```

`PhilosopherLike` / `SchoolMap` 定义在同文件顶部：
```ts
type SchoolMap = Record<string, string>;
interface PhilosopherLike {
  id?: string; name?: string; nameEng?: string;
  school?: string; details?: string; detailsEng?: string;
  worldviewSummary?: string; quote?: string; [key: string]: any;
}
```
`SchoolMap` 实际由 `server.ts` 从 `./src/data/translationsEng` 导入后传入（本文件不自己 import 数据，保持纯净）。

**语义**：生成 **整整 7 回合** 的对抗剧本——双方各交锋数次 + 主持人（"雅典学派秘书处"）判词收尾。每回合简洁有力（约 60–120 字），**每次发言只打一个点**（乒乓球对攻，不是演讲）。角色卡含 `quote` 经典格言 + 【风格签名】要求：遮住名字也能听出是谁在说话。

### 2.2 `debateMultilateral`（众神多边论辩，2–5 人）

```ts
export function debateMultilateral(
  philosophers: PhilosopherLike[],  // 2 到 5 位
  topic: string,
  isEn: boolean,
  schoolTranslations: SchoolMap,
): string
```

**语义**：生成 **12 至 16 回合** 的多边辩论卷轴。每位哲学家必须选 `pro` / `contra` / `neutral` 之一，并在 `stanceLabel` 写 2–6 字立场小标题；要求极度口语化、结合现代生活现象比喻（示例含西方 5 位 + 庄子/王阳明）、有火药味；同样有【风格签名】与"一次一个点"的交锋节奏要求。主持人为 `'moderator'`。

> 注：`sagesIntro`（出席贤哲名单）由本函数**内部**根据入参生成，无需调用方预先拼装。

---

## 调用契约（server.ts 如何使用）

- `server.ts` 通过 `import { chatSystem } from './src/ai/prompts/chat'` 与 `import { debateArena, debateMultilateral } from './src/ai/prompts/debate'` 引入。
- 两个辩论函数 **只产出 systemInstruction 文本字符串**；模型实际被要求按固定 **JSON schema** 返回（含 `speakerId` 匹配 `philosopherId`，主持人为 `'moderator'`）。该 schema 约束在 `server.ts` 的请求 config 里，**不在本目录**——改辩论 prompt 时别动 JSON 结构，否则前端解析会崩。
- 所有 prompt 均**模板字符串 + 占位符插值**，改文案时保留 `${...}` 占位符与对应字段即可。

---

## 护栏约束（改 prompt 前必读，避免破坏线上）

这些在 `server.ts`，不属于本目录，但限制着"AI 能输出多少"：

| 项目 | 值 | 说明 |
|---|---|---|
| 聊天 `MAX_OUTPUT_TOKENS` | 700（默认） | 兜底上限，Render 可设环境变量覆盖 |
| 辩论 `MAX_OUTPUT_TOKENS_DEBATE` | 3000（默认） | 轮次多，必须够大否则 JSON 截断 |
| 限流 | chat 12/分、debate 6/分、translate 20/分（IP） | 超限返回 429 |
| 服务端配额 | 免费 5 次 + 对话卡 15 次 | 超限返回 402 |

**给接手 AI 的建议**：
1. 只动本目录内文案与回合结构；token 上限 / 限流 / 配额 / JSON schema 一律在 `server.ts`。
2. 改辩论轮次（如想加回合）时，记得同步调大 `MAX_OUTPUT_TOKENS_DEBATE`，否则长输出会被截断导致解析失败。
3. 保持中英文两套模板语义一致；占位符 `${...}` 与字段名（name / school / details / topic 等）不要拼错。
4. 改完跑 `npm run build`（会重新编译 `dist/server.cjs`），确认无残留旧引用。
