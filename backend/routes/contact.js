const express = require('express');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, email: 254, message: 5000 };

// 5 messages per IP per 15 minutes — plenty for real visitors, stops spam bursts.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many messages sent. Please try again in a few minutes.' },
});

// Escape user input before it goes into the HTML email body.
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[ch]);

// Collapse whitespace and drop control characters (incl. CR/LF) for header-bound values.
const toSingleLine = (value) => value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();

// Lazily initialized Resend client
let resendClient;
function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// SMTP Transporter fallback (Gmail / custom SMTP)
let transporter;
function getTransporter() {
  if (!transporter) {
    if (process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        pool: true,
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_USER,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        pool: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }
  return transporter;
}

router.post('/', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  // Validation
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const cleanName = toSingleLine(name);
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (cleanEmail.length > LIMITS.email || !EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (cleanName.length > LIMITS.name || cleanMessage.length > LIMITS.message) {
    return res.status(400).json({
      message: `Name must be under ${LIMITS.name} characters and message under ${LIMITS.message}.`,
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const hasSmtp = Boolean(
    (process.env.SMTP_USER && process.env.SMTP_PASS) ||
    (process.env.EMAIL_USER && process.env.EMAIL_PASS)
  );

  if (!resendApiKey && !hasSmtp) {
    console.error('Contact form used but neither RESEND_API_KEY nor SMTP credentials configured');
    return res.status(503).json({ message: 'Contact form is temporarily unavailable. Please email me directly.' });
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\r?\n/g, '<br>');

  const toAddress = process.env.EMAIL_TO || process.env.EMAIL_USER || 'krkunnal404@gmail.com';
  // Resend free tier sends from 'onboarding@resend.dev' or your verified domain
  const resendFrom = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';

  try {
    if (resendApiKey) {
      // Send via Resend API
      const resend = getResendClient();

      const { data, error } = await resend.emails.send({
        from: resendFrom,
        to: [toAddress],
        replyTo: cleanEmail,
        subject: `New Portfolio Message from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      });

      if (error) {
        console.error('Resend API error:', JSON.stringify(error, null, 2));
        throw new Error(error.message || 'Resend error');
      }

      // Try to send confirmation email to the visitor (only works if domain is verified on Resend)
      resend.emails.send({
        from: resendFrom,
        to: [cleanEmail],
        subject: 'Message received! | Kunnal',
        text: `Hi ${cleanName},\n\nThank you for reaching out through my portfolio. I have received your message and will review it and get back to you within 24 hours.\n\nBest regards,\nKunnal\nFull Stack Developer`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
            <h2 style="color: #0f172a; margin-bottom: 16px;">Thank You for Reaching Out!</h2>
            <p>Hi <strong>${safeName}</strong>,</p>
            <p>Thank you for getting in touch through my portfolio. I've successfully received your message:</p>
            <blockquote style="margin: 16px 0; padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px; color: #475569; font-style: italic;">
              ${safeMessage}
            </blockquote>
            <p>I typically reply to all inquiries <strong>within 24 hours</strong>. I look forward to speaking with you soon!</p>
            <br/>
            <p style="margin-bottom: 4px;">Best regards,</p>
            <p style="margin-top: 0;"><strong>Kunnal</strong><br/><span style="color: #64748b; font-size: 14px;">Full Stack Developer</span></p>
          </div>
        `,
      }).then((replyRes) => {
        if (replyRes?.error) {
          console.warn('[Auto-Reply Notice]:', replyRes.error.message);
        }
      }).catch((err) => {
        // If unverified domain in Resend test mode or rejected, note it in logs without breaking user submission
        console.warn('[Auto-Reply Notice]:', err.message);
      });
    } else {
      // Send via Nodemailer / SMTP
      const mailer = getTransporter();
      const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;

      const mailToSelf = {
        from: { name: `${cleanName} via Portfolio`, address: fromAddress },
        replyTo: { name: cleanName, address: cleanEmail },
        to: toAddress,
        subject: `New Portfolio Message from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      };

      const mailToVisitor = {
        from: { name: 'Kunnal', address: fromAddress },
        to: { name: cleanName, address: cleanEmail },
        subject: 'Message received! | Kunnal',
        text: `Hi ${cleanName},\n\nThank you for reaching out through my portfolio. I have received your message and will review it and get back to you within 24 hours.\n\nBest regards,\nKunnal\nFull Stack Developer`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
            <h2 style="color: #0f172a; margin-bottom: 16px;">Thank You for Reaching Out!</h2>
            <p>Hi <strong>${safeName}</strong>,</p>
            <p>Thank you for getting in touch through my portfolio. I've successfully received your message:</p>
            <blockquote style="margin: 16px 0; padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px; color: #475569; font-style: italic;">
              ${safeMessage}
            </blockquote>
            <p>I typically reply to all inquiries <strong>within 24 hours</strong>. I look forward to speaking with you soon!</p>
            <br/>
            <p style="margin-bottom: 4px;">Best regards,</p>
            <p style="margin-top: 0;"><strong>Kunnal</strong><br/><span style="color: #64748b; font-size: 14px;">Full Stack Developer</span></p>
          </div>
        `,
      };

      await mailer.sendMail(mailToSelf);
      mailer.sendMail(mailToVisitor).catch((err) => {
        console.warn('Auto-reply failed:', err.message);
      });
    }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
