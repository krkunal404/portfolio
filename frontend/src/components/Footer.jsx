import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck, FiEye } from 'react-icons/fi';
import { useResumeViews } from '../hooks/useResumeViews';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Work', href: '#projects' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { views } = useResumeViews();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('krkunnal404@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer
      className="relative border-t border-light-border dark:border-dark-border rounded-b-2xl sm:rounded-b-3xl bg-light-card dark:bg-dark-card"
      aria-label="Site footer"
    >
      <div className="px-6 sm:px-10 md:px-14 lg:px-24 xl:px-32 py-10 flex flex-col gap-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-sm">
            <a
              href="#hero"
              className="flex items-center gap-2 font-display text-lg font-bold text-light-text dark:text-dark-text hover:opacity-85 transition-opacity w-fit"
            >
              <span className="inline-flex text-light-border dark:text-dark-border transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                <Logo className="w-6 h-6" />
              </span>
              Kunnal
            </a>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              Full Stack Developer & API Craftsman building performant web applications & backends.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors duration-200 text-xs font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links & Email Copy */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/krkunal404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 flex items-center justify-center rounded-lg glass-panel text-light-text dark:text-dark-text hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 transition-all"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://linkedin.com/in/krkunnal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 flex items-center justify-center rounded-lg glass-panel text-light-text dark:text-dark-text hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 transition-all"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="mailto:krkunnal404@gmail.com"
              aria-label="Send Email"
              className="w-9 h-9 flex items-center justify-center rounded-lg glass-panel text-light-text dark:text-dark-text hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 transition-all"
            >
              <FiMail size={16} />
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel text-xs font-medium text-light-text dark:text-dark-text hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 transition-all"
              title="Copy Email to Clipboard"
            >
              {copied ? (
                <>
                  <FiCheck size={13} className="text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <FiCopy size={13} />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-light-muted dark:text-dark-muted font-mono">
          <p>
            © {year} Kunnal. All rights reserved.
          </p>

          {/* Clean, Simple, Live Portfolio Visitor Counter */}
          <div
            className="flex items-center gap-1.5"
            title="Portfolio views counter"
          >
            <FiEye size={13} />
            <span>{views.toLocaleString()} portfolio views</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
