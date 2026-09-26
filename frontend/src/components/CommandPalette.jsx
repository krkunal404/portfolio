import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiHome,
  HiUser,
  HiLightBulb,
  HiCollection,
  HiLightningBolt,
  HiBriefcase,
  HiMail,
  HiSun,
  HiMoon,
  HiDownload,
  HiClipboardCopy,
} from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { scrollToSection } from '../lib/lenis';
import { useTheme } from '../hooks/useTheme';

const EMAIL = 'krkunnal404@gmail.com';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: HiHome },
  { id: 'about', label: 'About', icon: HiUser },
  { id: 'thinking', label: 'How I Think', icon: HiLightBulb },
  { id: 'projects', label: 'Work', icon: HiCollection },
  { id: 'toolbox', label: 'Toolbox', icon: HiLightningBolt },
  { id: 'experience', label: 'Experience & Education', icon: HiBriefcase },
  { id: 'achievements', label: 'Achievements', icon: HiTrophy },
  { id: 'contact', label: 'Contact', icon: HiMail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('command-palette:open', onOpen);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('command-palette:open', onOpen);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToSection(`#${id}`);
  };

  const runAndClose = (fn) => {
    fn();
    setOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — no-op
    }
  };

  const itemClass =
    'group flex items-center gap-3 rounded-control px-3 py-3 text-body-sm text-light-text dark:text-dark-text cursor-pointer data-[selected=true]:bg-light-text data-[selected=true]:text-light-bg dark:data-[selected=true]:bg-dark-text dark:data-[selected=true]:text-dark-bg';
  const iconClass =
    'w-5 shrink-0 text-light-muted dark:text-dark-muted group-data-[selected=true]:text-light-bg dark:group-data-[selected=true]:text-dark-bg';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-start justify-center pt-[12vh] px-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl"
          >
            <Command
              label="Command palette"
              className="glass-panel overflow-hidden rounded-panel! shadow-2xl"
            >
              <div className="flex items-center px-4 border-b border-light-border dark:border-dark-border">
                <Command.Input
                  autoFocus
                  placeholder="Search sections and actions…"
                  className="w-full bg-transparent py-5 text-body text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted focus:outline-hidden"
                />
                <kbd className="font-mono text-micro text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-control px-2 py-1">
                  Esc
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-3 sm:p-4">
                <Command.Empty className="py-10 text-center type-body-muted">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigate" className="px-1 py-1.5 font-mono text-micro font-medium uppercase text-light-muted dark:text-dark-muted">
                  {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                    <Command.Item
                      key={id}
                      onSelect={() => go(id)}
                      className={itemClass}
                    >
                      <Icon className={iconClass} size={18} />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="px-1 py-1.5 mt-5 font-mono text-micro font-medium uppercase text-light-muted dark:text-dark-muted">
                  <Command.Item
                    onSelect={() => runAndClose(toggleTheme)}
                    className={itemClass}
                  >
                    {isDark ? (
                      <HiSun className={iconClass} size={18} />
                    ) : (
                      <HiMoon className={iconClass} size={18} />
                    )}
                    Switch to {isDark ? 'light' : 'dark'} mode
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runAndClose(copyEmail)}
                    className={itemClass}
                  >
                    <HiClipboardCopy className={iconClass} size={18} />
                    {copied ? 'Copied!' : 'Copy email address'}
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runAndClose(() => window.open('/resume.pdf', '_blank'))}
                    className={itemClass}
                  >
                    <HiDownload className={iconClass} size={18} />
                    Download résumé
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runAndClose(() => window.open('https://github.com/krkunal404', '_blank'))}
                    className={itemClass}
                  >
                    <FiGithub className={iconClass} size={18} />
                    Open GitHub profile
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runAndClose(() => window.open('https://linkedin.com/in/krkunnal', '_blank'))}
                    className={itemClass}
                  >
                    <FiLinkedin className={iconClass} size={18} />
                    Open LinkedIn profile
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
