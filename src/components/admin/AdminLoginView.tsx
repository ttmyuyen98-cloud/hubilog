import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Shield, Lock, User, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginViewProps {
  onBackToSite: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onBackToSite,
  onLoginSuccess,
}) => {
  const { loginAdmin, theme } = useContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(username, password);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu quản trị viên.');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#E6F1FF] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-jakarta">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back shortcut */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#8892B0] hover:text-[#00E5FF] transition-colors p-2 rounded-lg bg-[#112240]/60 border border-[#233554] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ HUBI</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#112240] border border-[#233554] rounded-[20px] p-8 shadow-deep-ocean relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0A192F] border border-[#00E5FF]/40 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <img
              src={theme.logoUrl}
              alt="Logo HUBI"
              className="w-9 h-9 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <Shield className="w-7 h-7 text-[#00E5FF] hidden [img[style*='none']+&]:block" />
          </div>
          <h1 className="font-display text-2xl font-normal text-[#E6F1FF] mb-1 tracking-normal">
            Cổng Quản Trị Viên
          </h1>
          <p className="text-xs text-[#8892B0] tracking-normal">
            HUBI LOGISTICS Management Portal
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5">
              Tên đăng nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8892B0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full bg-[#0A192F] border border-[#233554] rounded-[10px] pl-10 pr-4 py-2.5 text-sm text-[#E6F1FF] placeholder-[#8892B0]/60 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8892B0] mb-1.5">
              Mật khẩu quản trị
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8892B0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full bg-[#0A192F] border border-[#233554] rounded-[10px] pl-10 pr-4 py-2.5 text-sm text-[#E6F1FF] placeholder-[#8892B0]/60 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-[10px] bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A192F] font-bold text-sm tracking-normal transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_28px_rgba(0,229,255,0.7)] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP ADMIN'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#233554] flex items-center justify-center gap-2 text-[11px] text-[#8892B0]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Hệ thống bảo vệ phiên làm việc tự động</span>
        </div>
      </div>
    </div>
  );
};
