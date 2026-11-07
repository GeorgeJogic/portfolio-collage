/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  FileText,
  ArrowUpRight,
  Send,
  Loader2,
  CheckCircle2,
  Camera,
  RotateCcw,
  Search,
  Eye,
  Terminal,
  Award,
  Menu,
  X,
} from 'lucide-react';
import {
  STUDENT_PROFILE,
  SKILL_GROUPS,
  PROJECTS,
  ACHIEVEMENTS,
  ProjectItem,
} from './data/portfolioData';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { AcademicCvModal } from './components/AcademicCvModal';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { AiChatWidget } from './components/AiChatWidget';

export default function App() {
  // Interactive UI State
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Portrait Presentation & Optional Custom Photo Upload
  const [customPortrait, setCustomPortrait] = useState<string | null>(null);
  const [portraitImgError, setPortraitImgError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clipboard Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Web3Forms Contact Transmission State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState<string>('');

  // Project Image Error Tracking (Zero-Broken-Image Policy)
  const [failedProjectImages, setFailedProjectImages] = useState<Record<string, boolean>>({});

  const triggerCopy = async (text: string, label: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToastMessage(`${label} copied to clipboard: ${text}`);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
        setToastMessage(null);
      }, 2600);
    } catch {
      setToastMessage(`Copy value: ${text}`);
      setTimeout(() => setToastMessage(null), 2600);
    }
  };

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPortrait(reader.result);
        setPortraitImgError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setFormStatus('submitting');
    setFormFeedback('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: STUDENT_PROFILE.web3FormsKey,
          from_name: 'New Message',
          replyto: formData.email.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Inquiry for George Jogi Chittilappilly',
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormFeedback(
          `Transmission delivered to ${STUDENT_PROFILE.email}. Thank you for reaching out!`
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
        setFormFeedback(
          result.message || 'Unable to complete transmission right now. Please copy email directly.'
        );
      }
    } catch {
      setFormStatus('error');
      setFormFeedback(
        'Network error while reaching Web3Forms. You can copy georgejogic@gmail.com directly from the panel.'
      );
    }
  };

  // Filtered Skills
  const filteredSkillGroups = SKILL_GROUPS.filter(
    (g) => skillFilter === 'all' || g.id === skillFilter
  ).map((group) => ({
    ...group,
    skills: group.skills.filter(
      (s) =>
        !skillSearch.trim() ||
        s.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
        s.context.toLowerCase().includes(skillSearch.toLowerCase())
    ),
  }));

  // Filtered Projects
  const filteredProjects = PROJECTS.filter(
    (p) => projectCategory === 'All' || p.category === projectCategory
  );

  const activePortraitSrc = customPortrait || STUDENT_PROFILE.portraitImage;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#090A0F] text-[#F8FAFC] relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Interactive Constellation Particle Network Background & Custom Cursor */}
      <ConstellationCanvas />

      {/* Clipboard Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#161922] border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-2xl"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#090A0F]/85 border-b border-slate-800/80">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 sm:gap-8 px-6 py-4">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-[#F8FAFC] font-display whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors"
          >
            GJ. · George Jogi
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94A3B8]"
          >
            <a
              href="#home"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#achievements"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              Achievements
            </a>
            <a
              href="#contact"
              className="hover:text-[#F8FAFC] hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCvModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              Academic CV
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#161922] border border-slate-800/80 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-slate-800/80 bg-[#11131A]/95 backdrop-blur-lg px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-[#94A3B8]"
          >
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#skills', label: 'Skills' },
              { href: '#projects', label: 'Projects' },
              { href: '#achievements', label: 'Achievements' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-[1200px] mx-auto px-6">
        {/* =====================================================================
            SECTION 1: HOME (HERO & IDENTITY)
           ===================================================================== */}
        <section id="home" className="pt-12 pb-20 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Typographic Hierarchy & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                {/* Clean Unboxed Status & Complete Academic Rubric Metadata */}
                <div className="space-y-1.5 text-xs font-mono tabular-nums">
                  <p className="text-emerald-400">
                    Open to AI/ML Research &amp; Vibe Coding Collaborations
                  </p>
                  <p className="text-[#94A3B8] leading-relaxed">
                    <button
                      type="button"
                      onClick={() =>
                        triggerCopy(STUDENT_PROFILE.rollNumber, 'Roll Number', 'hero-roll')
                      }
                      className="text-cyan-400 hover:underline cursor-pointer"
                      title="Click to copy Roll Number"
                    >
                      Roll No: {STUDENT_PROFILE.rollNumber}
                    </button>
                    <span aria-hidden="true" className="mx-2 text-[#64748B]">·</span>
                    <span>Section: A (401)</span>
                    <span aria-hidden="true" className="mx-2 text-[#64748B]">·</span>
                    <span>{STUDENT_PROFILE.school}</span>
                    <span aria-hidden="true" className="mx-2 text-[#64748B]">·</span>
                    <span>Department: {STUDENT_PROFILE.departmentShort}</span>
                  </p>
                </div>

                {/* Display Headline: Name Branding */}
                <div className="space-y-3">
                  <h1
                    className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent"
                    style={{ textWrap: 'balance' }}
                  >
                    {STUDENT_PROFILE.headline}
                  </h1>
                  <p className="text-base sm:text-xl font-medium text-indigo-300/95 tracking-tight">
                    {STUDENT_PROFILE.subHeadline}
                  </p>
                </div>

                {/* Lead Copy */}
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                  {STUDENT_PROFILE.bio}
                </p>
              </div>

              {/* Primary CTAs & Quick Repository / Profile Utilities */}
              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>

                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#11131A] hover:bg-[#161922] text-[#F8FAFC] border border-slate-700/80 hover:border-indigo-500/40 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Contact Transmission</span>
                  </motion.a>
                </div>

                {/* Secondary Action Links (GitHub, LinkedIn, Vercel, Location) */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-[#94A3B8]">
                  <a
                    href={STUDENT_PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
                  >
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                    <span>github.com/GeorgeJogic</span>
                  </a>
                  <a
                    href={STUDENT_PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href={STUDENT_PROFILE.links.vercel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>georgejogic.vercel.app</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Portrait Presentation in Formal Suit Blazer */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="relative rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden aspect-[4/5] w-full max-w-sm mx-auto bg-[#11131A] group">
                {!portraitImgError ? (
                  <img
                    src={activePortraitSrc}
                    alt={`${STUDENT_PROFILE.fullName} — Executive Portrait`}
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitImgError(true)}
                    className="object-cover object-top w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#161922] to-[#090A0F]">
                    <div className="w-24 h-24 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-3xl font-bold font-display text-indigo-400 mb-4">
                      GJ
                    </div>
                    <p className="text-base font-semibold text-[#F8FAFC] font-display">
                      {STUDENT_PROFILE.fullName}
                    </p>
                    <p className="text-xs font-mono text-cyan-400 mt-1">
                      Roll No: {STUDENT_PROFILE.rollNumber}
                    </p>
                  </div>
                )}

                {/* Subtle Top-Right Custom Portrait Uploader Control */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePortraitUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#090A0F]/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-200 hover:text-white cursor-pointer"
                    title="Upload a custom portrait photo"
                  >
                    <Camera className="w-3 h-3 text-cyan-400" />
                    <span>Swap Photo</span>
                  </button>
                  {customPortrait && (
                    <button
                      type="button"
                      onClick={() => setCustomPortrait(null)}
                      className="p-1.5 rounded-lg bg-[#090A0F]/85 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white cursor-pointer"
                      title="Reset to studio portrait"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Measured Scrim & Bottom Vignette Identity Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16 pb-5 px-5">
                  <p className="text-sm font-semibold text-[#F8FAFC] font-display tracking-tight">
                    {STUDENT_PROFILE.fullName}
                  </p>
                  <p className="text-xs font-mono text-[#94A3B8] mt-0.5 tabular-nums">
                    CSE AI · School of Computational Intelligence
                  </p>
                  <p className="text-[11px] font-mono text-cyan-400 mt-0.5 tabular-nums">
                    Joy University · Roll No: {STUDENT_PROFILE.rollNumber} · {STUDENT_PROFILE.sectionShort}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-Width Quantitative & Academic Proof Strip Below Hero Split */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#11131A] border border-slate-800/80">
              <p className="text-xs font-mono text-[#64748B]">Registration &amp; Section</p>
              <p className="text-xl font-bold text-[#F8FAFC] font-mono tabular-nums mt-1">
                2026BTAI069
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Section A (Room 401) · CSE AI
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131A] border border-slate-800/80">
              <p className="text-xs font-mono text-[#64748B]">Degree Cohort</p>
              <p className="text-xl font-bold text-[#F8FAFC] font-mono tabular-nums mt-1">
                2026 – 2030
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                B.Tech AI &amp; ML · Joy University
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131A] border border-slate-800/80">
              <p className="text-xs font-mono text-[#64748B]">Shipped Deployments</p>
              <p className="text-xl font-bold text-cyan-400 font-mono tabular-nums mt-1">
                3 Web Apps + Python
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                PureAir Drive · CampusAid · GroceryCheck
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131A] border border-slate-800/80">
              <p className="text-xs font-mono text-[#64748B]">Prior Academic Benchmarks</p>
              <p className="text-xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
                90% X · 62% XII
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Secondary &amp; Sr. Secondary Boards
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: ABOUT ME & ACADEMIC FOUNDATIONS
           ===================================================================== */}
        <section id="about" className="py-20 border-t border-slate-800/80 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono text-indigo-400">
              Academic Dossier &amp; Engineering Philosophy
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              About Me &amp; Academic Foundations
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Grounded in computational intelligence at Joy University and focused on shipping real-world AI-assisted software systems.
            </p>
          </div>

          {/* Academic Profile & Career Vision Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Academic Profile Card (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#11131A] border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-400 tabular-nums">
                  <span>{STUDENT_PROFILE.standing}</span>
                  <span>{STUDENT_PROFILE.timeline}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] font-display">
                  {STUDENT_PROFILE.university}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Enrolled in the <strong className="text-[#F8FAFC] font-medium">{STUDENT_PROFILE.degree}</strong> under the <strong className="text-[#F8FAFC] font-medium">{STUDENT_PROFILE.school}</strong> ({STUDENT_PROFILE.department}). Actively building full-stack applications and exploring multimodal AI systems from semester one.
                </p>
              </div>

              {/* Structured Academic Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800/80 text-xs font-mono tabular-nums">
                <div>
                  <span className="text-[#64748B] block">Roll Number / Reg. No.</span>
                  <span className="text-[#F8FAFC] font-semibold mt-0.5 block">
                    {STUDENT_PROFILE.rollNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Class Section &amp; Room</span>
                  <span className="text-[#F8FAFC] font-semibold mt-0.5 block">
                    {STUDENT_PROFILE.section}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Secondary (Class X) Score</span>
                  <span className="text-emerald-400 font-semibold mt-0.5 block">
                    {STUDENT_PROFILE.scores.classX}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Senior Secondary (Class XII) Score</span>
                  <span className="text-[#F8FAFC] font-semibold mt-0.5 block">
                    {STUDENT_PROFILE.scores.classXII}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Department</span>
                  <span className="text-[#F8FAFC] mt-0.5 block">
                    CSE AI · Computational Intelligence
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Location Base</span>
                  <span className="text-[#F8FAFC] mt-0.5 block">
                    {STUDENT_PROFILE.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Goals & Career Aspirations Card (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#161922] border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-mono text-amber-400">
                  {STUDENT_PROFILE.careerGoals.shortTerm.label}
                </p>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                  {STUDENT_PROFILE.careerGoals.shortTerm.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {STUDENT_PROFILE.careerGoals.shortTerm.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 space-y-3">
                <p className="text-xs font-mono text-indigo-400">
                  {STUDENT_PROFILE.careerGoals.longTerm.label}
                </p>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                  {STUDENT_PROFILE.careerGoals.longTerm.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {STUDENT_PROFILE.careerGoals.longTerm.description}
                </p>
              </div>
            </div>
          </div>

          {/* Core Passion & Focus Areas (3-Column Row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDENT_PROFILE.focusAreas.map((area) => (
              <div
                key={area.index}
                className="p-6 rounded-2xl bg-[#11131A] border border-slate-800/80 hover:-translate-y-1.5 hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-150 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-indigo-400 tabular-nums">
                    {area.index}. Focus Pillar
                  </span>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                    {area.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {area.description}
                  </p>
                </div>
                <p className="text-xs font-mono text-[#64748B] pt-3 border-t border-slate-800/80">
                  {area.meta}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: SKILLS & TECHNOLOGY MATRIX
           ===================================================================== */}
        <section id="skills" className="py-20 border-t border-slate-800/80 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-mono text-cyan-400">
                Capabilities &amp; Engineering Stack
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Skills &amp; Technology Matrix
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Organized across core programming logic, AI-assisted engineering tools, modern web frameworks, and iterative delivery methodologies.
              </p>
            </div>

            {/* Interactive Filter Controls & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Filter skill or tool..."
                  aria-label="Filter skills by keyword"
                  className="pl-8 pr-3 py-2 text-xs bg-[#11131A] border border-slate-800 rounded-lg text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500 w-full sm:w-48"
                />
              </div>

              <div
                role="tablist"
                aria-label="Skill category filter"
                className="flex items-center gap-1 p-1 bg-[#11131A] border border-slate-800/80 rounded-lg overflow-x-auto"
              >
                {[
                  { id: 'all', label: 'All Domains' },
                  { id: 'languages', label: 'Languages' },
                  { id: 'ai-tools', label: 'AI & ML' },
                  { id: 'web-toolchain', label: 'Web Stack' },
                  { id: 'methodologies', label: 'Methods' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={skillFilter === tab.id}
                    onClick={() => setSkillFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      skillFilter === tab.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Elevated Material 3 Bento Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkillGroups.map((group) => (
              <div
                key={group.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#11131A] border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-6"
              >
                <div className="space-y-1 border-b border-slate-800/80 pb-4">
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                    {group.title}
                  </h3>
                  <p className="text-xs text-[#64748B]">{group.subtitle}</p>
                </div>

                {group.skills.length > 0 ? (
                  <div className="divide-y divide-slate-800/60">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                      >
                        <span className="text-sm font-semibold text-[#F8FAFC] font-mono">
                          {skill.name}
                        </span>
                        <span className="text-xs text-[#94A3B8] sm:text-right">
                          {skill.context}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-[#64748B] py-4">
                    No matching skills in this category for &ldquo;{skillSearch}&rdquo;.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: PROJECTS (FLAGSHIP SHIPPED APPLICATIONS)
           ===================================================================== */}
        <section id="projects" className="py-20 border-t border-slate-800/80 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-mono text-indigo-400">
                Production Deployments &amp; Open-Source Codebases
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Flagship Shipped Projects
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Live web applications and Python repositories engineered from prompt to deployment. Click any card to inspect its architecture or launch the live deployment.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div
              role="tablist"
              aria-label="Project category filter"
              className="flex items-center gap-1 p-1 bg-[#11131A] border border-slate-800/80 rounded-lg self-start md:self-auto overflow-x-auto"
            >
              {['All', 'Web Platforms', 'Accessibility', 'Core Python & Logic'].map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={projectCategory === cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    projectCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const hasImage = project.imagePath && !failedProjectImages[project.id];

              return (
                <article
                  key={project.id}
                  className="group rounded-2xl bg-[#11131A] border border-slate-800/80 hover:-translate-y-1.5 hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-150 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Media Frame or Python Terminal Showcase */}
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="aspect-video w-full bg-[#090A0F] border-b border-slate-800/80 overflow-hidden relative cursor-pointer"
                    >
                      {hasImage ? (
                        <img
                          src={project.imagePath}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedProjectImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#161922] via-[#11131A] to-[#090A0F] font-mono text-xs">
                          <div className="flex items-center justify-between text-[#64748B]">
                            <span>github.com/GeorgeJogic · Python 3.12</span>
                            <Terminal className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div className="space-y-1.5 text-left my-auto py-2">
                            <p className="text-indigo-400">
                              def triangle_area_heron(a: float, b: float, c: float) -&gt; float:
                            </p>
                            <p className="text-[#94A3B8] pl-4">
                              s = (a + b + c) / 2.0
                            </p>
                            <p className="text-emerald-400 pl-4">
                              return (s * (s - a) * (s - b) * (s - c)) ** 0.5
                            </p>
                            <p className="text-cyan-400 pt-2">
                              def check_indian_dl_eligibility(age: int) -&gt; str:
                            </p>
                            <p className="text-[#94A3B8] pl-4">
                              return &quot;Eligible LMV&quot; if age &gt;= 18 else &quot;MCWOG / Pending&quot;
                            </p>
                          </div>
                          <div className="text-[11px] text-amber-400">
                            Click to open Interactive Python Logic Sandbox →
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Text Body */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <p className="text-xs font-mono text-cyan-400">
                        {project.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-[#F8FAFC] font-display">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {project.overview}
                      </p>
                    </div>
                  </div>

                  {/* Stack & Action Bar */}
                  <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-800/80 space-y-4">
                    {/* Unboxed Stack Typography */}
                    <p className="text-xs font-mono text-[#64748B]">
                      {project.stack.join(' · ')}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#161922] hover:bg-slate-800 text-xs font-medium text-[#F8FAFC] border border-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                        <span>
                          {project.id === 'python-repositories'
                            ? 'Run Interactive Logic'
                            : 'Inspect Architecture'}
                        </span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: ACHIEVEMENTS, CERTIFICATIONS & MILESTONES
           ===================================================================== */}
        <section id="achievements" className="py-20 border-t border-slate-800/80 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono text-emerald-400">
              Verified Credentials &amp; National Competitions
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Achievements, Certifications &amp; Milestones
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Recognized participation across Google Developer workshops and national-scale artificial intelligence evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#11131A] border border-slate-800/80 hover:-translate-y-1.5 hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-150 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400">
                    <span>{item.dateAndVenue.split(' · ')[0]}</span>
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-indigo-400">
                    {item.organizer}
                  </p>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono tabular-nums">
                  <p className="text-[#64748B]">{item.dateAndVenue}</p>

                  {item.signatory && (
                    <p className="text-[#94A3B8]">
                      Signatory: <span className="text-[#F8FAFC]">{item.signatory}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-emerald-400">{item.verificationTag}</span>

                    {item.credentialId && (
                      <button
                        type="button"
                        onClick={() =>
                          triggerCopy(item.credentialId!, 'Certificate ID', item.id)
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#161922] hover:bg-slate-800 text-[#F8FAFC] border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-cyan-400" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: CONTACT TRANSMISSION HUB & INTERACTIVE FORM
           ===================================================================== */}
        <section id="contact" className="py-20 border-t border-slate-800/80 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono text-cyan-400">
              Direct Communication Channel
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Contact Transmission Hub
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Available for AI/ML research collaborations, vibe-coding product sprints, and academic inquiries. Copy contact credentials with one click or dispatch a direct message below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Reach-Out Panel (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#11131A] border border-slate-800/80 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                  Direct Reach-Out Panel
                </h3>
                <p className="text-xs text-[#64748B] font-mono mt-1">
                  {STUDENT_PROFILE.fullName} · Roll No: {STUDENT_PROFILE.rollNumber}
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Card */}
                <div className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                      <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Primary Email</span>
                    </div>
                    <a
                      href={`mailto:${STUDENT_PROFILE.email}`}
                      className="text-sm font-mono text-[#F8FAFC] hover:text-indigo-400 truncate block mt-1"
                    >
                      {STUDENT_PROFILE.email}
                    </a>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() =>
                      triggerCopy(STUDENT_PROFILE.email, 'Email', 'copy-email')
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131A] hover:bg-slate-800 text-xs font-mono text-[#F8FAFC] border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === 'copy-email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-xl bg-[#161922] border border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                      <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Contact Phone</span>
                    </div>
                    <a
                      href={`tel:${STUDENT_PROFILE.phoneRaw}`}
                      className="text-sm font-mono text-[#F8FAFC] hover:text-cyan-400 tabular-nums block mt-1"
                    >
                      {STUDENT_PROFILE.phone}
                    </a>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() =>
                      triggerCopy(STUDENT_PROFILE.phone, 'Phone Number', 'copy-phone')
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131A] hover:bg-slate-800 text-xs font-mono text-[#F8FAFC] border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === 'copy-phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Location Base */}
                <div className="p-4 rounded-xl bg-[#161922] border border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Location Base &amp; Campus</span>
                  </div>
                  <p className="text-sm text-[#F8FAFC] mt-1">
                    {STUDENT_PROFILE.location}
                  </p>
                  <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                    {STUDENT_PROFILE.university}
                  </p>
                </div>
              </div>

              {/* Social & Repository Links */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <p className="text-xs font-mono text-[#64748B]">
                  Verified Profiles &amp; Repositories
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <a
                    href={STUDENT_PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#161922] hover:bg-slate-800/80 border border-slate-800 text-[#F8FAFC] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="w-4 h-4 text-indigo-400" />
                      GitHub
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </a>

                  <a
                    href={STUDENT_PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#161922] hover:bg-slate-800/80 border border-slate-800 text-[#F8FAFC] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      LinkedIn
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </a>

                  <a
                    href={STUDENT_PROFILE.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#161922] hover:bg-slate-800/80 border border-slate-800 text-[#F8FAFC] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-amber-400" />
                      Instagram
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </a>

                  <a
                    href={STUDENT_PROFILE.links.vercel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#161922] hover:bg-slate-800/80 border border-slate-800 text-[#F8FAFC] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      Live Hub
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Active Web3Forms Direct Transmission Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#11131A] border border-slate-800/80 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-display">
                    Direct Transmission Form
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Dispatches directly to <span className="font-mono text-cyan-400">{STUDENT_PROFILE.email}</span> via Web3Forms
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  Endpoint Active
                </span>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-[#94A3B8] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Prof. / Collaborator Name"
                      className="w-full px-4 py-3 rounded-xl bg-[#161922] border border-slate-800 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-[#94A3B8] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@institution.edu"
                      className="w-full px-4 py-3 rounded-xl bg-[#161922] border border-slate-800 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-[#94A3B8] mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="AI/ML Research Collaboration / Academic Portfolio Evaluation"
                    className="w-full px-4 py-3 rounded-xl bg-[#161922] border border-slate-800 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-[#94A3B8] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Write your message or project inquiry for George Jogi Chittilappilly..."
                    className="w-full px-4 py-3 rounded-xl bg-[#161922] border border-slate-800 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500 transition-colors resize-y"
                  />
                </div>

                {formStatus === 'success' && (
                  <div
                    role="status"
                    className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-start gap-3 text-xs text-emerald-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-300">Transmission Confirmed</p>
                      <p className="mt-0.5">{formFeedback}</p>
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-xs text-amber-200"
                  >
                    <p className="font-semibold text-amber-300">Transmission Notice</p>
                    <p className="mt-0.5">{formFeedback}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs font-mono text-[#64748B]">
                    Recipient: {STUDENT_PROFILE.email}
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-800/80 py-10 mt-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] font-mono tabular-nums">
          <div>
            <span>© 2026 {STUDENT_PROFILE.fullName}</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Roll No: {STUDENT_PROFILE.rollNumber} ({STUDENT_PROFILE.sectionShort})</span>
          </div>
          <div className="flex items-center gap-5">
            <span>{STUDENT_PROFILE.universityShort}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="text-[#94A3B8] hover:text-[#F8FAFC] underline underline-offset-4 cursor-pointer"
            >
              Printable CV
            </button>
          </div>
        </div>
      </footer>

      {/* Printable Academic CV Modal */}
      <AcademicCvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Project Architecture & Interactive Python Lightbox Modal */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Material 3 AI Chatbot Widget */}
      <AiChatWidget />
    </div>
  );
}
