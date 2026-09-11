import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import axios from 'axios';
import { API_BASE_URL } from '../lib/api';
import MagneticButton from './MagneticButton';

const contactInfo = [
  {
    id: 'contact-email',
    icon: <HiMail size={18} />,
    label: 'Email',
    value: 'krkunnal404@gmail.com',
    href: 'mailto:krkunnal404@gmail.com',
  },
  {
    id: 'contact-github',
    icon: <FiGithub size={18} />,
    label: 'GitHub',
    value: 'github.com/krkunal404',
    href: 'https://github.com/krkunal404',
  },
  {
    id: 'contact-linkedin',
    icon: <FiLinkedin size={18} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/krkunnal',
    href: 'https://linkedin.com/in/krkunnal',
  },
  {
    id: 'contact-location',
    icon: <HiLocationMarker size={18} />,
    label: 'Location',
    value: 'Bangalore, India',
    href: null,
  },
];

const INITIAL_FORM = { name: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Please add a short message.';
  else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setStatus('loading');
    setErrorMsg('');
    try {
      await axios.post(
        `${API_BASE_URL}/api/contact`,
        form
      );
      setStatus('success');
      setForm(INITIAL_FORM);
      setTouched({});
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const fieldClass = (name, extra = '') =>
    `form-input ${extra} ${touched[name] && errors[name] ? 'ring-2! ring-red-400/70! border-transparent!' : ''}`;

  return (
    <section id="contact" aria-label="Contact section" className="relative">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          Let&rsquo;s Talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title max-w-2xl"
        >
          Have a problem worth solving?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-xl sm:text-2xl font-semibold gradient-text -mt-2 mb-2"
        >
          Let&rsquo;s build something meaningful.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-8 glass-panel p-8 sm:p-10 mt-10"
        >
          {/* Left — Contact info */}
          <div className="min-w-0">
            <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed mb-8">
              I&rsquo;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="flex flex-col gap-5">
              {contactInfo.map(({ id, icon, label, value, href }) => (
                <div key={id} id={id} className="flex items-center gap-4 min-w-0">
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl glass text-brand-purple dark:text-brand-cyan shrink-0">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-light-muted dark:text-dark-muted uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-light-text dark:text-dark-text hover:text-brand-purple dark:hover:text-brand-cyan transition-colors wrap-break-word"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-light-text dark:text-dark-text wrap-break-word">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-14 h-14 rounded-full bg-light-text dark:bg-dark-text flex items-center justify-center mb-4 shadow-xs">
                  <HiPaperAirplane size={22} className="text-light-bg dark:text-dark-bg rotate-90" />
                </div>
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted">
                  Thanks for reaching out. I&rsquo;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 btn-secondary text-sm"
                  id="contact-send-another"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" id="contact-form">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-light-muted dark:text-dark-muted uppercase tracking-wider mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    maxLength={100}
                    autoComplete="name"
                    className={fieldClass('name')}
                    aria-invalid={touched.name && !!errors.name}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email-input"
                    className="block text-xs font-medium text-light-muted dark:text-dark-muted uppercase tracking-wider mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email-input"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your.email@example.com"
                    maxLength={254}
                    autoComplete="email"
                    className={fieldClass('email')}
                    aria-invalid={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-light-muted dark:text-dark-muted uppercase tracking-wider mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your message..."
                    maxLength={5000}
                    className={fieldClass('message', 'resize-none')}
                    aria-invalid={touched.message && !!errors.message}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errorMsg}</p>
                )}

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                  id="contact-submit"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <HiPaperAirplane size={16} className="rotate-90" />
                    </>
                  )}
                </MagneticButton>
                <p className="text-xs text-light-muted dark:text-dark-muted text-center">
                  I typically reply within 24 hours.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
