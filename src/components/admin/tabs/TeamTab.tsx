import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { TeamMember } from '../../../types/content';
import { Users, Plus, Trash2, Check, User, Mail, Briefcase, RefreshCw } from 'lucide-react';

export const TeamTab: React.FC = () => {
  const { team, updateTeam } = useContent();
  const [members, setMembers] = useState<TeamMember[]>([...team]);
  const [saved, setSaved] = useState(false);

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: `team-${Date.now()}`,
        name: 'Thành viên mới',
        role: 'Chức vụ / Vị trí',
        responsibility: 'Mô tả phụ trách công việc trong dự án...',
        email: 'email@hubi.vn',
      },
    ]);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length <= 1) {
      alert('Dự án cần có ít nhất 1 thành viên đại diện.');
      return;
    }
    setMembers((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTeam(members);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0A192F] border border-[#233554]">
        <div>
          <h2 className="font-display text-lg text-[#E6F1FF] font-medium tracking-normal">
            Quản Lý Danh Sách Thành Viên Dự Án
          </h2>
          <p className="text-xs text-[#8892B0] tracking-normal">
            Thông tin sẽ hiển thị trực tiếp tại khối "Thành viên ban dự án" (Slide 2: Giới thiệu).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddMember}
            className="px-3.5 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1b325c] text-xs text-[#00E5FF] border border-[#00E5FF]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm thành viên</span>
          </button>
          <button
            type="submit"
            className="px-5 py-1.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-xs font-bold text-[#0A192F] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <span>Lưu danh sách</span>
            )}
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Danh sách thành viên ban dự án đã được cập nhật thành công!</span>
        </div>
      )}

      {/* Grid of Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, idx) => (
          <div
            key={member.id || idx}
            className="p-5 rounded-[20px] bg-[#112240] border border-[#233554] shadow-deep-ocean flex flex-col justify-between space-y-4 hover:border-[#00E5FF]/40 transition-colors"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#233554]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0A192F] border border-[#00E5FF]/50 flex items-center justify-center font-bold text-xs text-[#00E5FF]">
                  {member.name ? member.name.charAt(0) : idx + 1}
                </div>
                <span className="text-xs font-mono text-[#00E5FF]">
                  Thành viên #0{idx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMember(idx)}
                className="text-[#8892B0] hover:text-red-400 transition-colors p-1 rounded cursor-pointer"
                title="Xóa thành viên"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8892B0] mb-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-[#00E5FF]" />
                  <span>Họ và tên *</span>
                </label>
                <input
                  type="text"
                  required
                  value={member.name}
                  onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-1.5 text-xs text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8892B0] mb-1 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-[#00E5FF]" />
                  <span>Chức danh / Vai trò *</span>
                </label>
                <input
                  type="text"
                  required
                  value={member.role}
                  onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-1.5 text-xs text-[#00E5FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8892B0] mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#00E5FF]" />
                  <span>Địa chỉ Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={member.email}
                  onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg px-3 py-1.5 text-xs text-[#8892B0] focus:text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8892B0] mb-1">
                  Mô tả trách nhiệm chi tiết
                </label>
                <textarea
                  rows={3}
                  value={member.responsibility}
                  onChange={(e) => handleMemberChange(idx, 'responsibility', e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-lg p-2.5 text-xs text-[#8892B0] focus:text-[#E6F1FF] focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
