/**
 * i18n configuration — borrowed from bubble.huofengcap.com pattern
 *
 * Triple-fallback language detection:
 *   1. URL ?lang= parameter (shareable links)
 *   2. localStorage 'knowphil-lang' (persists user choice)
 *   3. navigator.languages (auto-detect browser language)
 *   4. Default: 'zh'
 *
 * Supported languages: zh, en (extensible to ja, ko, es, fr, de)
 */

export type Language = 'zh' | 'en';

export const SUPPORTED_LANGS: Language[] = ['zh', 'en'];
export const DEFAULT_LANG: Language = 'zh';
export const STORAGE_KEY = 'knowphil-lang';

export const LANG_NAMES: { code: Language; label: string; locale: string }[] = [
  { code: 'zh', label: '中文 (zh)', locale: 'zh_CN' },
  { code: 'en', label: 'English (en)', locale: 'en_US' },
];

/**
 * Detect language using triple-fallback chain.
 * Works on both client (window) and server (Express req.query).
 */
export function detectLang(urlLang?: string | null, storedLang?: string | null): Language {
  // 1. URL parameter (highest priority — shareable links)
  if (urlLang && SUPPORTED_LANGS.includes(urlLang as Language)) {
    return urlLang as Language;
  }

  // 2. Stored preference
  if (storedLang && SUPPORTED_LANGS.includes(storedLang as Language)) {
    return storedLang as Language;
  }

  // 3. Browser language (client-side only)
  if (typeof navigator !== 'undefined') {
    const navList: string[] = [];
    if (navigator.language) navList.push(navigator.language);
    if (navigator.languages) navList.push(...navigator.languages);

    for (const nav of navList) {
      if (!nav) continue;
      const base = nav.split('-')[0];
      if (base === 'zh') return 'zh';
      if (base === 'en') return 'en';
    }
  }

  // 4. Default
  return DEFAULT_LANG;
}

/**
 * Detect language from an Express request.
 * Server-side version: reads ?lang= from query, falls back to Accept-Language header.
 */
export function detectLangFromRequest(req: { query: Record<string, unknown> }): Language {
  const urlLang = req.query.lang as string | undefined;

  if (urlLang && SUPPORTED_LANGS.includes(urlLang as Language)) {
    return urlLang as Language;
  }

  // Check Accept-Language header
  const acceptLang = req.query['accept-language'] as string | undefined;
  if (acceptLang) {
    if (acceptLang.startsWith('zh')) return 'zh';
    if (acceptLang.startsWith('en')) return 'en';
  }

  return DEFAULT_LANG;
}

/**
 * Build hreflang alternate links for a given canonical URL.
 * Each language gets its own ?lang= variant URL.
 */
export function buildHreflangTags(canonical: string): string {
  const langs: { hreflang: string; href: string }[] = [
    { hreflang: 'zh-CN', href: `${canonical}?lang=zh` },
    { hreflang: 'en', href: `${canonical}?lang=en` },
    { hreflang: 'x-default', href: canonical },
  ];

  return langs
    .map(l => `<link rel="alternate" hreflang="${l.hreflang}" href="${l.href}" />`)
    .join('\n  ');
}

/**
 * Build Open Graph locale tags.
 */
export function buildOgLocaleTags(lang: Language): string {
  const current = lang === 'en' ? 'en_US' : 'zh_CN';
  const alternate = lang === 'en' ? 'zh_CN' : 'en_US';
  return `<meta property="og:locale" content="${current}" />\n  <meta property="og:locale:alternate" content="${alternate}" />`;
}

/**
 * Get the HTML lang attribute for a given language.
 */
export function htmlLangAttr(lang: Language): string {
  return lang === 'en' ? 'en' : 'zh-CN';
}
