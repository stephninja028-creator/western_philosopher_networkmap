# Western & Eastern Philosopher Network Map

东西方哲学谱系交互式网络图谱 —— 从泰勒斯到福柯，从孔孟到新儒家，一张图看尽 2500 年哲学血脉。

**在线体验**：[knowphilosophers.site](https://knowphilosophers.site)

## 这是什么

一个全栈 Web 应用，将西方哲学（古希腊→后现代）和东方哲学（先秦→近现代）的 150+ 位哲学家按时代排列在纵向时间轴上，用 SVG 连线展示师承关系和思想影响。支持 AI 角色扮演对话、AI 思想辩论、中英双语实时切换。

## 核心功能

| 功能 | 说明 |
|------|------|
| **哲学谱系图** | 纵向时间轴 + SVG 师承连线（实线）和思想影响连线（虚线），覆盖 13 个时代 |
| **哲学家详情** | 双击任意哲学家卡片，查看世界观、生平、金句、代表著作、反思问题、跨哲学家对比 |
| **AI 灵魂对话** | 用 AI 与哲学家进行角色化对话 —— 苏格拉底用产婆术反问，尼采澎湃颠狂 |
| **AI 思想格斗场** | 选择两位哲学家 + 辩题，AI 生成 5 回合激辩；支持多边辩论（最多 5 位哲学家） |
| **中英双语** | 一键切换中英文，通过 Gemini API 实时翻译哲学家详情 |
| **背景音乐** | 德彪西古典音乐环境音，含 Web Audio API 合成的降级方案 |

## 技术栈

| 层面 | 技术 |
|------|------|
| 前端 | React 19 + TypeScript + Vite 6 |
| CSS | Tailwind CSS 4 + Motion（动画） |
| 后端 | Express 4（Node.js） |
| AI | Google Gemini API（对话/翻译/辩论） |
| 部署 | Google Cloud Run，自定义域名 `knowphilosophers.site` |

## 本地运行

```bash
git clone https://github.com/stephninja028-creator/western_philosopher_networkmap.git
cd western_philosopher_networkmap
npm install
```

创建 `.env` 文件：
```
GEMINI_API_KEY=your_api_key_here
```

```bash
npm run dev
```

浏览器打开 `http://localhost:3000`。

## 生产构建

```bash
npm run build
npm start
```

## 项目结构

```
├── src/
│   ├── App.tsx                    # 主组件：页面布局、状态管理、翻译逻辑
│   ├── components/
│   │   ├── PhilosopherCard.tsx     # 哲学家卡片组件
│   │   ├── LineageDiagram.tsx      # 谱系图 SVG 渲染
│   │   ├── SoulChatTerminal.tsx    # AI 灵魂对话终端
│   │   ├── SymposiumPanel.tsx      # 双人辩论面板
│   │   ├── MultilateralSymposium.tsx # 多边辩论场
│   │   ├── PaymentModal.tsx        # 付费激活
│   │   └── GreekBorders.tsx        # 古希腊装饰组件
│   ├── data/
│   │   ├── philosophyData.ts       # 西方哲学数据（7 时代）
│   │   ├── easternPhilosophyData.ts # 东方哲学数据（6 时代）
│   │   ├── enrichedEpoch1-7.ts     # 哲学家深度内容（生平/世界观/对比分析）
│   │   └── symposiumData.ts        # 预设辩论公案
│   └── types.ts                    # 类型定义 + 学术等级评定
├── server.ts                       # Express 后端（AI API + 卡密 + 反馈）
├── public/assets/debussy.mp3       # 背景音乐
└── package.json
```

## 数据规模

- **西方哲学**：7 个时代，约 100+ 位哲学家
- **东方哲学**：6 个时代，约 50+ 位哲学家
- 每位主要哲学家包含：生平、世界观、金句、反思问题、跨哲学家对比分析
- 覆盖公元前 6 世纪到 20 世纪的完整哲学史

## 付费模式

免费体验后，通过微信支付 9.9 元获取卡密激活 AI 对话和辩论功能。

## 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `GEMINI_API_KEY` | 是 | Google Gemini API 密钥 |
| `APP_URL` | 否 | 托管 URL |
| `SMTP_HOST/PORT/USER/PASS` | 否 | 用户反馈邮件转发 |
| `FEEDBACK_RECEIVER_EMAIL` | 否 | 反馈接收邮箱 |

## 注意事项

- AI 功能（对话/翻译/辩论）依赖 Gemini API，没有密钥时返回预设 fallback 回复，不会崩溃
- 本地开发需要 Node.js 18+
- AI Studio 部署时需要将 `DISABLE_HMR=1` 设置为环境变量

## License

MIT
