import React, { useState } from 'react';
import { X, ExternalLink, Github, Terminal, CheckCircle2, Calculator } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectLightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({ project, onClose }) => {
  // Interactive Python logic sandbox states for the Python Practice Repositories modal
  const [sideA, setSideA] = useState<string>('5');
  const [sideB, setSideB] = useState<string>('6');
  const [sideC, setSideC] = useState<string>('7');
  const [applicantAge, setApplicantAge] = useState<string>('19');

  if (!project) return null;

  // Compute Triangle Area via Heron's formula
  const a = parseFloat(sideA) || 0;
  const b = parseFloat(sideB) || 0;
  const c = parseFloat(sideC) || 0;
  const isValidTriangle = a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
  const s = (a + b + c) / 2;
  const triangleArea = isValidTriangle ? Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2) : null;

  // Compute Indian Driving Licence Eligibility
  const age = parseInt(applicantAge, 10) || 0;
  const getDlStatus = (yrs: number) => {
    if (yrs < 16) {
      return 'Not Eligible: Minimum age is 16 for gearless motorcycles (<50cc) and 18 for standard Private Light Motor Vehicles (LMV).';
    }
    if (yrs >= 16 && yrs < 18) {
      return 'Provisionally Eligible (MCWOG): Eligible for gearless two-wheelers (<50cc) with parental consent. Wait until 18 for LMV.';
    }
    if (yrs >= 18 && yrs < 20) {
      return 'Eligible (Private LMV & MCWG): Full eligibility for Light Motor Vehicles and Geared Motorcycles in India.';
    }
    return 'Full Eligibility (Private LMV, MCWG & Commercial Transport Badge): Eligible for both private and heavy/commercial transport vehicles.';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#11131A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#161922] border-b border-slate-800/80 shrink-0">
          <div>
            <p className="text-xs font-mono text-indigo-400">{project.subtitle}</p>
            <h2 id="project-modal-title" className="text-lg font-bold text-[#F8FAFC] font-display">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {project.imagePath ? (
            <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-[#090A0F] aspect-video relative">
              <img
                src={project.imagePath}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
              System Overview
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{project.overview}</p>
            <p className="text-xs font-mono text-cyan-400 pt-1">{project.stack.join(' · ')}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
              Engineering &amp; Feature Highlights
            </h3>
            <ul className="space-y-2.5">
              {project.architectureHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[#94A3B8]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Logic Sandbox for Algorithmic & Python Repositories */}
          {project.id === 'python-repositories' && (
            <div className="p-5 rounded-xl bg-[#161922] border border-slate-800 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <Terminal className="w-4 h-4" />
                <span>Interactive Python Logic Verification Sandbox</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Triangle Area Calculator */}
                <div className="p-4 rounded-lg bg-[#090A0F] border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F8FAFC]">
                    <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                    <span>1. Triangle Area Calculator (Heron&apos;s Formula)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-[#64748B] mb-1">Side A</label>
                      <input
                        type="number"
                        min="1"
                        value={sideA}
                        onChange={(e) => setSideA(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#11131A] border border-slate-800 rounded text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#64748B] mb-1">Side B</label>
                      <input
                        type="number"
                        min="1"
                        value={sideB}
                        onChange={(e) => setSideB(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#11131A] border border-slate-800 rounded text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#64748B] mb-1">Side C</label>
                      <input
                        type="number"
                        min="1"
                        value={sideC}
                        onChange={(e) => setSideC(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#11131A] border border-slate-800 rounded text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-mono pt-1">
                    {triangleArea ? (
                      <span className="text-emerald-400 tabular-nums">
                        Computed Area: {triangleArea} sq. units (Semi-perimeter s = {s.toFixed(1)})
                      </span>
                    ) : (
                      <span className="text-amber-400">
                        Invalid triangle inequality (sum of any two sides must exceed the third).
                      </span>
                    )}
                  </div>
                </div>

                {/* Indian DL Eligibility Checker */}
                <div className="p-4 rounded-lg bg-[#090A0F] border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F8FAFC]">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>2. Indian Driving-Licence Age Checker</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] mb-1">
                      Applicant Age (Years)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={applicantAge}
                      onChange={(e) => setApplicantAge(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#11131A] border border-slate-800 rounded text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
                    {getDlStatus(age)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono text-[#64748B]">{project.metrics}</span>
            <div className="flex items-center gap-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F8FAFC] bg-[#161922] hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub Repository
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Launch Live Deployment
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
