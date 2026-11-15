import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Layers3,
  MoveRight,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import wordmarkImage from "@/assets/hausy-wordmark.png";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/inquiry-form";
import { ServicesSection } from "@/components/services-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hausy System Technologies | House of AI Systems" },
      {
        name: "description",
        content:
          "Hausy builds autonomous AI agents, AI ERP systems, custom software, and AI SEO infrastructure. We build what your business needs.",
      },
      { property: "og:title", content: "Hausy System Technologies | House of AI Systems" },
      {
        property: "og:description",
        content:
          "AI agents, custom software, e-commerce, and AI SEO. We build what your business needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export function HausyIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="92" height="92" stroke="currentColor" strokeWidth="8" />
      <path d="M22 84V36L38 24V84H22Z" fill="currentColor" />
      <rect x="38" y="50" width="26" height="12" fill="currentColor" />
      <rect x="64" y="38" width="16" height="46" fill="currentColor" />
      <polygon points="62,24 82,24 72,36" fill="#C6FF00" />
    </svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-card" data-state={isOpen ? "open" : "closed"}>
      <button
        type="button"
        className="faq-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown className="faq-chevron" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function Index() {
  return (
    <main className="hausy-site">
      {/* 1. Header */}
      <header className="site-header">
        <a className="brand-link" href="#home" aria-label="Hausy System Technologies home">
          <img
            className="brand-wordmark"
            src={wordmarkImage}
            alt="Hausy System Technologies"
            width={775}
            height={245}
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">SERVICES</a>
          <a href="#why-hausy">WHY HAUSY</a>
          <a href="#approach">HOW WE WORK</a>
        </nav>
        <div className="header-actions">
          <Button asChild className="header-cta">
            <a href="#discovery">
              <span>LET'S TALK</span>
              <ArrowRight className="btn-arrow" aria-hidden="true" />
            </a>
          </Button>
          <a className="mobile-header-cta" href="#discovery" aria-label="LET'S TALK">
            <ArrowRight className="btn-arrow" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* 2. Hero Section with Authentic Cobalt H-Grid Pattern */}
      <section id="home" className="hero-section pattern-hgrid-cobalt">
        <div className="hero-copy">
          <div className="hero-kicker">
            HOUSE OF AI SYSTEMS
          </div>
          <h1>
            WE BUILD WHAT<br />YOUR BUSINESS NEEDS
          </h1>
          <div className="hero-actions">
            <Button asChild className="button-lime">
              <a href="#discovery">
                <span>BOOK A DISCOVERY CALL</span>
                <ArrowRight className="btn-arrow" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Services Section (3D AI Services Suite) */}
      <ServicesSection />

      {/* 5. Why Hausy (4 Core Value Differentiators) */}
      <section id="why-hausy" className="why-section">
        <div className="why-container">
          <div className="why-header">
            <span className="eyebrow eyebrow-light">
              WHY HAUSY
            </span>
            <h2 className="why-headline">
              A BETTER WAY TO BUILD,{" "}
              AUTOMATE &amp; GROW.
            </h2>
            <p className="why-desc">
              We bring software, AI and automation together to help businesses
              work smarter, solve real challenges and move forward with confidence.
            </p>
          </div>

          <div className="why-grid">
            <article className="why-card">
              <div className="card-topline-row">
                <span className="card-step-num">01</span>
                <div className="why-icon-badge">
                  <Layers3 className="why-icon" aria-hidden="true" />
                </div>
              </div>
              <h3>EVERYTHING UNDER ONE ROOF</h3>
              <p>
                Software, AI automation and digital visibility working together through one technology partner.
              </p>
            </article>

            <article className="why-card">
              <div className="card-topline-row">
                <span className="card-step-num">02</span>
                <div className="why-icon-badge">
                  <Workflow className="why-icon" aria-hidden="true" />
                </div>
              </div>
              <h3>BUILT AROUND YOUR BUSINESS</h3>
              <p>
                Solutions designed around your actual operations, workflows and business requirements.
              </p>
            </article>

            <article className="why-card">
              <div className="card-topline-row">
                <span className="card-step-num">03</span>
                <div className="why-icon-badge">
                  <BrainCircuit className="why-icon" aria-hidden="true" />
                </div>
              </div>
              <h3>AI WITH A CLEAR PURPOSE</h3>
              <p>
                We focus on using AI where it can make everyday business processes smarter and more efficient.
              </p>
            </article>

            <article className="why-card">
              <div className="card-topline-row">
                <span className="card-step-num">04</span>
                <div className="why-icon-badge">
                  <TrendingUp className="why-icon" aria-hidden="true" />
                </div>
              </div>
              <h3>READY FOR WHAT’S NEXT</h3>
              <p>
                Technology designed with flexibility and future business growth in mind.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. How We Work (Process with Crisp White Canvas) */}
      <section id="approach" className="approach-section">
        <div className="approach-heading">
          <span className="eyebrow">
            A CLEAR PATH FORWARD
          </span>
          <h2>
            FROM “WHAT IF?”<br />
            TO WORKING SOFTWARE.
          </h2>
          <p>
            No rigid off-the-shelf templates. We work alongside your team to build tailored software that solves real business challenges and delivers measurable outcomes.
          </p>
        </div>
        <div className="approach-steps">
          <ApproachStep
            number="01"
            title="DISCOVER & DEFINE"
            text="We understand your business, identify operational challenges, and define the right solution for your needs."
            icon={<BrainCircuit aria-hidden="true" />}
          />
          <ApproachStep
            number="02"
            title="DESIGN & DEVELOP"
            text="We design and build tailored software through focused development cycles, keeping you involved at every stage."
            icon={<Bot aria-hidden="true" />}
          />
          <ApproachStep
            number="03"
            title="DEPLOY & EVOLVE"
            text="We launch your solution, help your team get started, and continuously improve as your business grows."
            icon={<Check aria-hidden="true" />}
          />
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ Accordion) */}
      <section id="faq" className="faq-section section-pad">
        <div className="faq-heading">
          <span className="eyebrow">
            COMMON QUESTIONS
          </span>
          <h2>
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="section-intro">
            Straight answers about how we build, who owns the software, and what it looks like to collaborate with us.
          </p>
        </div>

        <div className="faq-list">
          <FAQItem
            question="How much does it cost to develop a project?"
            answer="Project costs depend on the scope, complexity, features, and requirements. After understanding your needs, we'll discuss the proposed solution and provide a quotation tailored to your project."
          />
          <FAQItem
            question="How long does it take to complete a project?"
            answer="Project timelines depend on the size and complexity of the solution. Once we understand your requirements and finalize the scope, we'll provide an estimated timeline before development begins."
          />
          <FAQItem
            question="Can you build software specifically for my business?"
            answer="Yes. We develop custom solutions based on your business requirements, workflows, and goals rather than forcing your business to adapt to a generic system."
          />
          <FAQItem
            question="Can you integrate AI into our existing systems?"
            answer="Absolutely! We can integrate AI with your existing CRMs, ERPs, databases, APIs, and third-party tools to streamline workflows, automate repetitive tasks, and make your business processes smarter and more efficient."
          />
          <FAQItem
            question="Can Hausy automate my existing business processes?"
            answer="Yes. We identify repetitive and time-consuming tasks where automation can make a meaningful difference. Depending on your requirements, we can design automation solutions to simplify workflows and reduce manual effort."
          />
          <FAQItem
            question="Do you provide support after the project is launched?"
            answer="We can discuss post-launch support and maintenance based on your project requirements. Our goal is to help ensure your solution continues to serve your business effectively."
          />
          <FAQItem
            question="How do I get started with Hausy Technologies?"
            answer="Getting started is simple. Contact us or book a discovery call. We'll discuss your business, understand your challenges, explore possible solutions, and explain the next steps."
          />
        </div>
      </section>

      {/* 7. Discovery Call Section with Hero Cobalt Blue & H-Grid Pattern */}
      <section id="discovery" className="discovery-section pattern-hgrid-cobalt section-pad">
        <div className="discovery-intro">
          <span className="eyebrow eyebrow-light">
            YOUR NEXT STEP STARTS HERE
          </span>
          <h2>
            LET’S FIND YOUR<br />WAY FORWARD.
          </h2>
          <p>
            Bring us the bottleneck, the rough idea, or the workflow that needs to run faster. We’ll listen, understand your challenges, and help you identify the right technical solution.
          </p>
          <div className="discovery-points">
            <div className="discovery-point-item">
              <span className="point-num">01</span>
              <div className="point-content">
                <h4>DIRECT CONVERSATION</h4>
                <p>Talk directly with our team about your business challenges and ideas.</p>
              </div>
            </div>
            <div className="discovery-point-item">
              <span className="point-num">02</span>
              <div className="point-content">
                <h4>CLEAR TECHNICAL DIRECTION</h4>
                <p>Understand possible solutions, technical requirements, and realistic timelines.</p>
              </div>
            </div>
            <div className="discovery-point-item">
              <span className="point-num">03</span>
              <div className="point-content">
                <h4>BUILT AROUND YOUR GOALS</h4>
                <p>Explore practical solutions tailored to your business needs and objectives.</p>
              </div>
            </div>
          </div>
          <div className="discovery-note">
            <span>
              Not sure what you need yet?
              <br />
              <strong>That’s a good place to start.</strong>
            </span>
          </div>
        </div>
        <div className="discovery-form-panel">
          <div className="form-panel-heading">
            <span className="eyebrow">YOUR DISCOVERY CALL</span>
            <h3>TELL US WHERE TO BEGIN.</h3>
            <p>Tell us a little about what you're trying to build or improve. We'll take it from there.</p>
          </div>
          <InquiryForm inquiryType="discovery-call" compact />
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="site-footer">
        <div className="footer-main-row">
          <div className="footer-brand-group">
            <a className="footer-brand" href="#home" aria-label="Back to Hausy home">
              <img
                className="footer-wordmark"
                src={wordmarkImage}
                alt="Hausy System Technologies"
                width={775}
                height={245}
                loading="lazy"
              />
            </a>
            <span className="footer-tagline">HOUSE OF AI SYSTEMS</span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#services">SERVICES</a>
            <a href="#why-hausy">WHY HAUSY</a>
            <a href="#approach">HOW WE WORK</a>
            <a href="#faq">FAQ</a>
            <a href="#discovery">DISCOVERY CALL</a>
          </nav>
        </div>

        <div className="footer-bottom-row text-center">
          <small>© 2026 HAUSY SYSTEM TECHNOLOGIES. ALL RIGHTS RESERVED.</small>
        </div>
      </footer>
    </main>
  );
}

function ApproachStep({
  number,
  title,
  text,
  icon,
}: {
  number: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="approach-step">
      <div className="step-meta">
        <span className="step-number">{number}</span>
        <div className="step-icon-badge" aria-hidden="true">
          {icon}
        </div>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
