/**
 * OG Image Generator — Server-side dynamic Open Graph image generation
 * Uses satori (JSX → SVG) + sharp (SVG → PNG) for social media preview cards.
 */
import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";

// ---- Font loading ----
// In dev (tsx): use import.meta.url. In prod (esbuild CJS bundle): use process.cwd().
let FONTS_DIR: string;
try {
  FONTS_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), "fonts");
} catch {
  FONTS_DIR = path.join(process.cwd(), "server", "fonts");
}

let _fontRegular: ArrayBuffer | null = null;
let _fontBold: ArrayBuffer | null = null;

function loadFont(filename: string): ArrayBuffer {
  return fs.readFileSync(path.join(FONTS_DIR, filename)).buffer as ArrayBuffer;
}

function getFontRegular(): ArrayBuffer {
  if (!_fontRegular) _fontRegular = loadFont("NotoSerif-Regular.ttf");
  return _fontRegular;
}
function getFontBold(): ArrayBuffer {
  if (!_fontBold) _fontBold = loadFont("NotoSerif-Bold.ttf");
  return _fontBold;
}

// ---- Tiny VDOM helper (avoids JSX / React dependency) ----
type VNode = {
  type: string;
  props: Record<string, any> & { children?: (VNode | string)[] };
};

function h(type: string, props: Record<string, any> = {}, ...children: (VNode | string)[]): VNode {
  return { type, props: { ...props, children } };
}

// ---- Card design constants ----
const CARD_W = 1200;
const CARD_H = 630;
const BG = "linear-gradient(135deg, #0B2545 0%, #152d4a 40%, #0f2a3f 70%, #0B2545 100%)";
const ACCENT = "#c4a87c";
const TEXT_LIGHT = "#d4cfc4";
const TEXT_MUTED = "#8c9bb5";
const TEXT_DIM = "#6b7d95";

// ---- Quote card (philosopher) ----
export interface OGPhilosopherInput {
  name: string;
  nameSub?: string;
  eraSchool?: string;
  quote?: string;
  accent?: string;
}

export async function generatePhilosopherOG(input: OGPhilosopherInput): Promise<Buffer> {
  const { name, nameSub, eraSchool, quote, accent = ACCENT } = input;

  const children: (VNode | string)[] = [];

  // Top accent bar
  children.push(h("div", {
    style: {
      position: "absolute", top: 0, left: 0, width: CARD_W, height: 4,
      background: accent,
    }
  }));

  // Content stack
  const contentChildren: (VNode | string)[] = [];

  // Ornamental divider
  contentChildren.push(h("div", {
    style: {
      width: 80, height: 3, background: accent, borderRadius: 2,
      marginBottom: 32, opacity: 0.7,
    }
  }));

  // Name
  contentChildren.push(h("div", {
    style: {
      fontSize: 52, fontWeight: 700, color: accent,
      fontFamily: "Noto Serif", textAlign: "center",
      maxWidth: 1000, lineHeight: 1.2,
    }
  }, name));

  // Sub name
  if (nameSub) {
    contentChildren.push(h("div", {
      style: {
        fontSize: 24, color: TEXT_MUTED, marginTop: 12,
        fontFamily: "Noto Serif", textAlign: "center",
        fontStyle: "italic",
      }
    }, nameSub));
  }

  // Era + School
  if (eraSchool) {
    contentChildren.push(h("div", {
      style: {
        fontSize: 20, color: TEXT_DIM, marginTop: 18,
        fontFamily: "Noto Serif", textAlign: "center",
        letterSpacing: 1,
      }
    }, eraSchool));
  }

  // Quote
  if (quote) {
    const displayQuote = quote.length > 140 ? quote.slice(0, 137) + "..." : quote;
    contentChildren.push(h("div", {
      style: {
        fontSize: 21, color: TEXT_LIGHT, marginTop: 40,
        fontFamily: "Noto Serif", textAlign: "center",
        fontStyle: "italic", lineHeight: 1.6,
        maxWidth: 900, opacity: 0.85,
      }
    }, `"${displayQuote}"`));
  }

  // Website URL
  contentChildren.push(h("div", {
    style: {
      fontSize: 17, color: TEXT_DIM, marginTop: 48,
      fontFamily: "Noto Serif", textAlign: "center",
      letterSpacing: 2, opacity: 0.7,
    }
  }, "knowphilosophers.site"));

  // Decorative dots
  contentChildren.push(h("div", {
    style: { display: "flex", gap: 8, marginTop: 20, opacity: 0.3, justifyContent: "center" }
  },
    h("div", { style: { width: 4, height: 4, borderRadius: "50%", background: accent } }),
    h("div", { style: { width: 4, height: 4, borderRadius: "50%", background: accent } }),
    h("div", { style: { width: 4, height: 4, borderRadius: "50%", background: accent } }),
  ));

  children.push(h("div", {
    style: {
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      width: CARD_W, height: CARD_H,
      padding: "60px 80px",
    }
  }, ...contentChildren));

  // Bottom accent
  children.push(h("div", {
    style: {
      position: "absolute", bottom: 0, left: 0, width: CARD_W, height: 4,
      background: accent,
    }
  }));

  const tree = h("div", {
    style: {
      width: CARD_W, height: CARD_H, display: "flex",
      background: BG, position: "relative",
      fontFamily: "Noto Serif",
    }
  }, ...children);

  const svg = await satori(tree as any, {
    width: CARD_W, height: CARD_H,
    fonts: [
      { name: "Noto Serif", data: getFontRegular(), weight: 400, style: "normal" },
      { name: "Noto Serif", data: getFontBold(), weight: 700, style: "normal" },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}

// ---- Blog article card ----
export interface OGBlogInput {
  title: string;
  category?: string;
  date?: string;
  accent?: string;
}

export async function generateBlogOG(input: OGBlogInput): Promise<Buffer> {
  const { title, category, date, accent = ACCENT } = input;

  const children: (VNode | string)[] = [];

  children.push(h("div", {
    style: {
      position: "absolute", top: 0, left: 0, width: CARD_W, height: 4,
      background: accent,
    }
  }));

  const contentChildren: (VNode | string)[] = [];

  if (category) {
    contentChildren.push(h("div", {
      style: {
        fontSize: 16, color: accent, fontFamily: "Noto Serif",
        textAlign: "center", letterSpacing: 3, textTransform: "uppercase",
        marginBottom: 28, opacity: 0.8,
      }
    }, category));
  }

  contentChildren.push(h("div", {
    style: {
      fontSize: 42, fontWeight: 700, color: "#f0ebe0",
      fontFamily: "Noto Serif", textAlign: "center",
      maxWidth: 950, lineHeight: 1.3,
    }
  }, title));

  if (date) {
    contentChildren.push(h("div", {
      style: {
        fontSize: 18, color: TEXT_DIM, marginTop: 20,
        fontFamily: "Noto Serif", textAlign: "center",
      }
    }, date));
  }

  contentChildren.push(h("div", {
    style: {
      fontSize: 17, color: TEXT_DIM, marginTop: 44,
      fontFamily: "Noto Serif", textAlign: "center",
      letterSpacing: 2, opacity: 0.7,
    }
  }, "knowphilosophers.site"));

  contentChildren.push(h("div", {
    style: {
      width: 60, height: 2, background: accent, borderRadius: 1,
      marginTop: 20, opacity: 0.5,
    }
  }));

  children.push(h("div", {
    style: {
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      width: CARD_W, height: CARD_H,
      padding: "60px 80px",
    }
  }, ...contentChildren));

  children.push(h("div", {
    style: {
      position: "absolute", bottom: 0, left: 0, width: CARD_W, height: 4,
      background: accent,
    }
  }));

  const tree = h("div", {
    style: {
      width: CARD_W, height: CARD_H, display: "flex",
      background: BG, position: "relative",
      fontFamily: "Noto Serif",
    }
  }, ...children);

  const svg = await satori(tree as any, {
    width: CARD_W, height: CARD_H,
    fonts: [
      { name: "Noto Serif", data: getFontRegular(), weight: 400, style: "normal" },
      { name: "Noto Serif", data: getFontBold(), weight: 700, style: "normal" },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
