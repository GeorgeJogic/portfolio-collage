import React from 'react';
import { X, Printer, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { STUDENT_PROFILE, SKILL_GROUPS, PROJECTS, ACHIEVEMENTS } from '../data/portfolioData';

interface AcademicCvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicCvModal: React.FC<AcademicCvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#11131A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#161922] border-b border-slate-800/80 shrink-0">
          <div>
            <h2 id="cv-modal-title" className="text-base font-semibold text-[#F8FAFC] font-display">
              Academic &amp; Technical Curriculum Vitae
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono tabular-nums">
              {STUDENT_PROFILE.fullName} · Roll No: {STUDENT_PROFILE.rollNumber}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              aria-label="Close CV preview"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-cv-area" className="p-6 sm:p-10 overflow-y-auto space-y-8 text-sm">
          {/* Header Block */}
          <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight">
                {STUDENT_PROFILE.fullName}
              </h1>
              <p className="text-sm text-indigo-400 font-medium mt-1">
                {STUDENT_PROFILE.degree}
              </p>
              <p className="text-xs text-[#94A3B8] font-mono tabular-nums mt-1">
                {STUDENT_PROFILE.university} · {STUDENT_PROFILE.school}
              </p>
              <p className="text-xs text-[#64748B] font-mono tabular-nums mt-0.5">
                Roll No: {STUDENT_PROFILE.rollNumber} · {STUDENT_PROFILE.section} · {STUDENT_PROFILE.departmentShort}
              </p>
            </div>
            <div className="text-xs text-[#94A3B8] space-y-1 font-mono tabular-nums">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{STUDENT_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{STUDENT_PROFILE.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{STUDENT_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              01. Academic Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 md:col-span-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-semibold text-[#F8FAFC]">{STUDENT_PROFILE.degree}</h4>
                  <span className="text-xs font-mono text-cyan-400 tabular-nums">{STUDENT_PROFILE.timeline}</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">{STUDENT_PROFILE.university}</p>
                <p className="text-xs text-[#64748B] font-mono mt-2 tabular-nums">
                  {STUDENT_PROFILE.school} · {STUDENT_PROFILE.department} · Roll No: {STUDENT_PROFILE.rollNumber} ({STUDENT_PROFILE.section})
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-[#F8FAFC]">Prior Board Examinations</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">Secondary &amp; Senior Secondary</p>
                </div>
                <div className="mt-3 space-y-1 text-xs font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Class X (Secondary):</span>
                    <span className="text-emerald-400 font-semibold">{STUDENT_PROFILE.scores.classX}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Class XII (Sr. Secondary):</span>
                    <span className="text-[#F8FAFC] font-semibold">{STUDENT_PROFILE.scores.classXII}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipped Projects */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              02. Flagship Shipped Applications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-[#F8FAFC]">{proj.title}</h4>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline font-mono"
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{proj.overview}</p>
                  <p className="text-[11px] font-mono text-[#64748B] pt-1">
                    {proj.stack.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              03. Technical Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.id} className="p-4 rounded-xl bg-[#161922] border border-slate-800/80">
                  <h4 className="text-xs font-semibold text-[#F8FAFC] mb-1.5">{group.title}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {group.skills.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              04. Verified Certifications &amp; Milestones
            </h3>
            <div className="space-y-3">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h4 className="font-semibold text-[#F8FAFC]">{ach.title}</h4>
                    <p className="text-xs text-[#94A3B8]">{ach.organizer} · {ach.dateAndVenue}</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 tabular-nums shrink-0">
                    {ach.verificationTag}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
