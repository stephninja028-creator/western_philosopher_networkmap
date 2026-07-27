import { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Copy, Check, X } from 'lucide-react';
import type { Philosopher } from '../types';

interface ShareCardModalProps {
  philosopher: Philosopher;
  displayQuote: string;
  onClose: () => void;
}

export function ShareCardModal({ philosopher, displayQuote, onClose }: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const name = philosopher.nameEng || philosopher.name;
  const subName = philosopher.nameEng && philosopher.name !== philosopher.nameEng ? philosopher.name : '';
  const eraSchool = `${philosopher.eraDisp} · ${philosopher.school}`;
  const quote = displayQuote || philosopher.quote || '';

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-philosophy-share.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Share card download failed:', err);
    }
    setDownloading(false);
  }, [name]);

  const handleCopyLink = useCallback(async () => {
    const url = `https://www.knowphilosophers.site/philosopher/${philosopher.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback for insecure contexts
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [philosopher]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-[#0B2545] font-sans tracking-tight">Share Card</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Card Preview */}
        <div className="p-4 sm:p-6 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-[480px] aspect-[1.91/1] rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-6 sm:p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, #0B2545 0%, #152d4a 40%, #0f2a3f 70%, #0B2545 100%)',
              fontFamily: "'Noto Serif', Georgia, serif",
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#c4a87c' }} />

            {/* Content wrapper */}
            <div className="flex flex-col items-center z-10 w-full px-4">
              {/* Divider */}
              <div className="w-12 h-[2px] rounded-full mb-5 opacity-60" style={{ background: '#c4a87c' }} />

              {/* Name */}
              <div className="text-3xl sm:text-4xl font-bold mb-1.5 leading-tight" style={{ color: '#c4a87c' }}>
                {name}
              </div>

              {/* Sub name */}
              {subName && (
                <div className="text-lg italic mb-2" style={{ color: '#8c9bb5' }}>
                  {subName}
                </div>
              )}

              {/* Era + School */}
              <div className="text-xs sm:text-sm tracking-wide mb-5" style={{ color: '#6b7d95' }}>
                {eraSchool}
              </div>

              {/* Quote */}
              {quote && (
                <div className="text-sm sm:text-base italic leading-relaxed max-w-[360px] opacity-85" style={{ color: '#d4cfc4' }}>
                  "{quote.length > 120 ? quote.slice(0, 117) + '...' : quote}"
                </div>
              )}
            </div>

            {/* URL */}
            <div className="absolute bottom-3 text-[10px] sm:text-xs tracking-[0.15em] opacity-50" style={{ color: '#6b7d95' }}>
              knowphilosophers.site
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: '#c4a87c' }} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 border-t border-gray-200">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0B2545] text-white rounded-lg font-bold text-sm hover:bg-[#152d4a] transition-colors disabled:opacity-50 font-sans"
          >
            {downloading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloading ? 'Generating...' : 'Download Card'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm border transition-colors font-sans"
            style={{
              background: 'rgba(196, 168, 124, 0.1)',
              borderColor: 'rgba(196, 168, 124, 0.25)',
              color: '#8c7a5e',
            }}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
