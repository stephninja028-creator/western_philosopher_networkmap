import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Sparkles, CreditCard, ShieldCheck, RefreshCw } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (type: 'chat' | 'debate' | 'unlimited', value: number) => void;
  language: 'zh' | 'en';
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, language }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [serverCodes, setServerCodes] = useState<Array<{ code: string; type: string; value: number; used: boolean }>>([]);

  const isEn = language === 'en';

  const fetchCodes = async () => {
    try {
      const res = await fetch('/api/codes-status');
      const data = await res.json();
      if (data.success) {
        setServerCodes(data.codes);
      }
    } catch (e) {
      console.error("Error fetching codes state:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCodes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(txt);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const handleActivate = async (e?: React.FormEvent, codeToUse?: string) => {
    if (e) e.preventDefault();
    const activeCode = codeToUse || code;
    if (!activeCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: activeCode.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || (isEn ? 'Invalid activation code' : '卡密验证不合规'));
      }

      setSuccessMsg(data.message || (isEn ? 'Redeemed successfully!' : '兑换成功！'));
      setCode('');
      // Refresh list to show updated used status
      fetchCodes();
      
      setTimeout(() => {
        onSuccess(data.type, data.value);
        onClose();
        setSuccessMsg('');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(isEn ? 'Invalid activation code' : (err.message || '该卡密已被兑换或网络线路受阻'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 font-serif text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner trims */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/50" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/50" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/50" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/50" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-slate-800 transition-colors p-1 rounded-full hover:bg-black/5 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D5C75]/10 text-[#0D5C75] text-[10px] uppercase tracking-widest font-mono font-bold mb-2">
            <Sparkles className="w-3" />
            {isEn ? 'Unlock Ancient Wisdom' : '点亮先哲意志 · 开启特权'}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2545] tracking-wide">
            {isEn ? 'Premium Academic Features' : '古典学院增值专区'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {isEn 
              ? 'Our web lineage graphs remain completely free. Premium interactive modules operate under an activation code model.'
              : '我们的学术谱系图对大众保持完全免费。AI对谈及自定义格斗场功能由于算力高消耗，采用“卡密卡券”制平稳跑通闭环。'}
          </p>
        </div>

        {/* Tabs & Rates */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-center">
          <div className="bg-[#EBF5F8] border border-[#0D5C75]/35 p-3 rounded-xl flex flex-col justify-between">
            <div className="text-xs font-bold text-[#0D5C75]">{isEn ? '💬 Soul Dialogues' : '💬 灵魂对话充值卡'}</div>
            <div className="text-[10px] text-gray-500 font-sans mt-0.5">{isEn ? '15 Interactions' : '15次自由深度对话'}</div>
            <div className="text-sm font-black text-amber-800 mt-1 font-sans">¥ 9.9</div>
          </div>
          <div className="bg-[#FBF8EF] border border-[#D4AF37]/35 p-3 rounded-xl flex flex-col justify-between">
            <div className="text-xs font-bold text-amber-800">{isEn ? '⚔️ Custom Debates' : '⚔️ 思想格斗充值卡'}</div>
            <div className="text-[10px] text-gray-500 font-sans mt-0.5">{isEn ? '5 Full Custom Matches' : '5次双人自定义大辩论'}</div>
            <div className="text-sm font-black text-amber-800 mt-1 font-sans">¥ 9.9</div>
          </div>
        </div>

        {/* Step-by-Step Payment Instructions */}
        <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/25 shadow-2xs mb-5 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-[#0B2545] border-b border-gray-100 pb-1.5 mb-2.5 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            {isEn ? 'How to Pay & Activate' : '🎨 微信自助获取卡密流程'}
          </h4>
          <ol className="space-y-2 list-decimal list-inside text-[11px] text-slate-600">
            <li>
              <span className="font-bold text-slate-800">{isEn ? 'Add WeChat & Transfer' : '添加微信并转账'}:</span>{' '}
              {isEn 
                ? 'Add our customer service via WeChat ID: ' 
                : '直接添加客服微信号：'}
              <code className="bg-[#FAF0E6] border border-[#D4AF37]/30 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold select-all">courageandpeace</code>
              {isEn ? ' and transfer ¥9.9 directly.' : ' 键入好友，直接进行转账付款（¥9.9）。'}
            </li>
            <li>
              <span className="font-bold text-slate-800">{isEn ? 'Get CD-Key Immediately' : '立即获取卡密'}:</span>{' '}
              {isEn 
                ? 'Our team will instantly reply with a unique Sages Activation CD-key on WeChat. Just paste it below!' 
                : '客服收到后将立即在线为您发送专属激活卡密，复制后粘贴到下方表单激活即可！'}
            </li>
          </ol>
        </div>

        {/* CD-KEY Activation Form */}
        <form onSubmit={handleActivate} className="mb-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">
            {isEn ? '🔑 Enter Activation CD-key:' : '🔑 请粘贴您的专属激活卡密'}
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder={isEn ? "e.g., SOUL-XXXX-XXXX" : "例如：SOUL-E89C-47A1"} 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono tracking-widest shadow-2xs focus:outline-none focus:border-[#0D5C75] focus:ring-1 focus:ring-[#0D5C75]/50"
              required
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0D5C75] text-[#FDFDFB] hover:bg-[#0A4A5E] hover:border-[#D4AF37]/80 disabled:bg-gray-400 font-sans font-semibold text-xs py-2 px-5 rounded-lg border border-transparent shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              {loading ? (isEn ? 'Verifying...' : '验证中...') : (isEn ? 'Redeem' : '立即激活兑换')}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-2 text-red-700 bg-red-50 text-[11px] font-sans p-2 rounded-md border border-red-100">
              ❌ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mt-2 text-green-700 bg-green-50 text-[11px] font-sans p-2 rounded-md border border-green-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{successMsg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
