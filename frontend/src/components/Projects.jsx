import { useEffect, useRef } from 'react';
import { HiSparkles, HiSpeakerphone, HiCube } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCase from './ProjectCase';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'project-skillsphere',
    number: '01',
    title: 'SkillSphere',
    category: 'AI-Powered Career Development Platform',
    summary:
      'A GenAI-powered SaaS platform for skill-gap assessment, career planning, and personalized roadmaps — built to support student career decisions with real guidance instead of generic advice.',
    problem:
      'Students get generic career advice with no way to see the actual gap between where their skills are and where a target role needs them to be.',
    idea:
      'Turn assessment into a guided, personalized roadmap: score a user’s skills, surface the gaps, and use AI to generate a concrete path — not just a list of course links.',
    build:
      'React and Node.js/Express, MongoDB for user and roadmap data, Firebase OAuth and JWT authentication, real-time notifications, and Gemini AI powering the assessment logic and an in-app career chatbot.',
    result:
      'Shipped as a working platform with end-to-end auth, assessment, and AI-guided roadmap generation — the core loop a student would use to go from "where am I" to "what’s next."',
    icon: <HiSparkles size={40} />,
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Gemini AI'],
    github: 'https://github.com/krkunal404',
    live: null,
  },
  {
    id: 'project-civitas',
    number: '02',
    title: 'Civitas',
    category: 'Civic-Tech Platform',
    summary:
      'A full-stack platform for citizens to report and track local civic issues — sanitation, infrastructure — with JWT-secured auth and analytics dashboards.',
    problem:
      'Local civic issues get reported informally and lost in the noise — no shared record of what was raised, by whom, or whether it was resolved.',
    idea:
      'Give citizens a structured way to report issues and watch them tracked, backed by real authentication so reports are accountable rather than anonymous noise.',
    build:
      'A full MERN stack: React frontend, Node/Express REST API, MongoDB for issue records, stateless JWT auth with role-based access for citizens and admins, and Chart.js dashboards visualizing issue trends by category and location.',
    result:
      'A complete citizen-to-resolution flow — report, track, and role-gated admin resolution — with the dashboards to see where issues cluster.',
    icon: <HiSpeakerphone size={40} />,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/krkunal404/Civitas',
    live: null,
  },
  {
    id: 'project-prodtrack',
    number: '03',
    title: 'ProdTrack',
    category: 'Inventory & Product Tracking',
    summary:
      'A full-stack inventory management system for tracking products and stock levels in real time across multiple locations, with a Go backend and bcrypt-hashed auth.',
    problem:
      'Small teams tracking inventory by spreadsheet lose real-time visibility into stock levels across locations and who changed what.',
    idea:
      'A dedicated inventory system with real-time stock tracking and proper authentication, backed by a fast, statically-typed backend instead of another Node service.',
    build:
      'A React frontend talking to a Go REST API, with JWT authentication and bcrypt password hashing, and endpoints designed for concurrent read/write access across locations.',
    result:
      'A working system for real-time stock visibility across locations, and my first production use of Go for an API instead of Node.',
    icon: <HiCube size={40} />,
    tags: ['React', 'Go', 'JWT', 'bcrypt'],
    github: 'https://github.com/krkunal404/Prodtrack',
    live: null,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const headerEl = headerRef.current;
    const containerEl = containerRef.current;
    if (!sectionEl || !headerEl || !containerEl) return;

    // GSAP ScrollTrigger Entrance for Section Header
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerEl,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
          },
        }
      );

      // GSAP ScrollTrigger Staggered Entrance for Project Cases
      const items = containerEl.querySelectorAll('.project-case-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" aria-label="Projects section" className="relative">
      <div className="section-container">
        <div ref={headerRef} className="flex items-end justify-between gap-6 flex-wrap mb-2">
          <div>
            <p className="section-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
              Case Studies
            </p>
            <h2 className="section-title mb-0">Selected Work</h2>
          </div>
          <a
            href="https://github.com/krkunal404"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-sm font-medium text-brand-purple dark:text-brand-cyan hover:underline"
            id="view-all-projects"
          >
            View all projects →
          </a>
        </div>

        <div ref={containerRef}>
          {projects.map((project) => (
            <div key={project.id} className="project-case-item">
              <ProjectCase project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
