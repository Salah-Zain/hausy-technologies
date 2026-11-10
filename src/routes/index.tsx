import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  Layers3,
  MoveRight,
  Search,
  Workflow,
} from "lucide-react";
import studioImage from "@/assets/hausy-studio.jpg";
import wordmarkImage from "@/assets/hausy-wordmark.png";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/inquiry-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hausy System Technologies | House of AI Systems" },
      {
        name: "description",
        content:
          "Hausy builds AI automations, custom software, e-commerce platforms and AI SEO systems that help your business move forward.",
      },
      { property: "og:title", content: "Hausy System Technologies | House of AI Systems" },
      {
        property: "og:description",
        content:
          "AI agents, custom software, e-commerce and AI SEO. We build what your business needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="hausy-site">
      <header className="site-header">
        <a className="brand-link" href="#home" aria-label="Hausy System Technologies home">
          <img className="brand-wordmark" src={wordmarkImage} alt="Hausy System Technologies" width={775} height={245} />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">SERVICES</a>
          <a href="#approach">HOW WE WORK</a>
          <a href="#discovery">DISCOVERY CALL</a>
        </nav>
        <Button asChild className="header-cta">
          <a href="#inquiry">START A PROJECT <ArrowUpRight aria-hidden="true" /></a>
        </Button>
        <a className="mobile-header-cta" href="#inquiry" aria-label="Start a project"><ArrowUpRight aria-hidden="true" /></a>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="signal-dot" /> HOUSE OF AI SYSTEMS</div>
          <h1>WE BUILD WHAT<br />YOUR BUSINESS <span>NEEDS.</span></h1>
          <p>AI that does the work. Software made for your business.<br className="desktop-break" /> A team that builds with you, from first idea to what’s next.</p>
          <div className="hero-actions">
            <Button asChild className="button-lime">
              <a href="#discovery">BOOK A DISCOVERY CALL <ArrowRight aria-hidden="true" /></a>
            </Button>
            <a href="#services" className="text-action">SEE WHAT WE BUILD <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="hero-image-wrap">
          <img src={studioImage} alt="The Hausy team planning connected AI systems together" width={1536} height={1024} fetchPriority="high" />
          <figcaption><span>THOUGHTFUL SYSTEMS. REAL-WORLD RESULTS.</span><span>BUILT WITH HAUSY <ArrowUpRight aria-hidden="true" /></span></figcaption>
          <span className="image-index">01 / 04</span>
        </figure>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">WHAT WE BUILD</span>
            <h2>GOOD SYSTEMS GIVE<br />YOUR TEAM ROOM <span>TO GROW.</span></h2>
          </div>
          <p className="section-intro">Practical technology, designed around the way your business already works—and where it wants to go.</p>
        </div>
        <div className="service-grid">
          <ServiceItem index="01" title="AI AUTOMATION" description="AI agents that take repetitive work off your team and keep important tasks moving." icon={<Workflow aria-hidden="true" />} />
          <ServiceItem index="02" title="CUSTOM SOFTWARE" description="Useful tools and connected systems, built around your workflows and goals." icon={<Code2 aria-hidden="true" />} />
          <ServiceItem index="03" title="E-COMMERCE" description="Online stores and buying journeys made easy for your customers and your team." icon={<Layers3 aria-hidden="true" />} />
          <ServiceItem index="04" title="AI SEO" description="Helpful search and AI visibility that makes it easier for the right people to find you." icon={<Search aria-hidden="true" />} />
        </div>
      </section>

      <section id="approach" className="approach-section">
        <div className="approach-heading">
          <span className="eyebrow eyebrow-light">A CLEAR PATH FORWARD</span>
          <h2>FROM “WHAT IF?”<br />TO <span>WORKING SOFTWARE.</span></h2>
          <p>No off-the-shelf answer when your business needs something different. We work alongside you and build toward an outcome you can use.</p>
        </div>
        <div className="approach-steps">
          <ApproachStep number="01" title="START WITH THE REAL PROBLEM" text="We learn how your team works, what needs to change and what a good outcome means to you." icon={<BrainCircuit aria-hidden="true" />} />
          <ApproachStep number="02" title="DESIGN THE RIGHT SYSTEM" text="We map out a clear, practical solution around your business—not a tool in search of a problem." icon={<Bot aria-hidden="true" />} />
          <ApproachStep number="03" title="BUILD, REFINE, MOVE FORWARD" text="We create the system, get it working with your team and keep improving what matters." icon={<Check aria-hidden="true" />} />
        </div>
        <span className="approach-side-note">BUILT FOR THE WAY YOU WORK <MoveRight aria-hidden="true" /></span>
      </section>

      <section id="discovery" className="discovery-section section-pad">
        <div className="discovery-intro">
          <span className="eyebrow"><span className="signal-dot" /> A FIRST CONVERSATION</span>
          <h2>LET’S FIND YOUR<br /><span>WAY FORWARD.</span></h2>
          <p>Bring us the challenge, the rough idea or the workflow that needs to work better. We’ll listen, ask the right questions and talk through a good next step.</p>
          <div className="discovery-points">
            <div><span>01</span> A focused conversation about your business</div>
            <div><span>02</span> Clear next steps, without the hard sell</div>
            <div><span>03</span> Your details go straight to our team</div>
          </div>
          <div className="discovery-note"><span className="note-mark">H.</span><span>Not sure what you need yet?<br /><strong>That’s a good place to start.</strong></span></div>
        </div>
        <div className="discovery-form-panel">
          <div className="form-panel-heading">
            <span className="eyebrow">YOUR DISCOVERY CALL</span>
            <h3>TELL US WHERE TO BEGIN.</h3>
            <p>Share a little about your goals and when’s good to talk.</p>
          </div>
          <InquiryForm inquiryType="discovery-call" compact />
        </div>
      </section>

      <section id="inquiry" className="inquiry-section section-pad">
        <div className="inquiry-heading">
          <span className="eyebrow eyebrow-light">READY TO GET INTO THE DETAILS?</span>
          <h2>LET’S BUILD<br />WHAT’S <span>NEXT.</span></h2>
          <p>Tell us what you want to change, what you’d like to invest and who we should get back to.</p>
          <div className="inquiry-services"><span>AI AUTOMATION</span><span>CUSTOM SOFTWARE</span><span>E-COMMERCE</span><span>AI SEO</span></div>
          <div className="inquiry-footnote"><ArrowRight aria-hidden="true" /> NO PERFECT BRIEF REQUIRED. JUST A PLACE TO START.</div>
        </div>
        <div className="project-form-panel">
          <div className="form-panel-heading">
            <span className="eyebrow">PROJECT INQUIRY</span>
            <h3>WHAT ARE YOU LOOKING TO MAKE POSSIBLE?</h3>
          </div>
          <InquiryForm />
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#home" aria-label="Back to Hausy home">
          <img className="footer-wordmark" src={wordmarkImage} alt="Hausy System Technologies" width={775} height={245} loading="lazy" />
        </a>
        <span>HOUSE OF AI SYSTEMS.</span>
        <a href="#home" className="back-top">BACK TO TOP <ArrowUpRight aria-hidden="true" /></a>
        <small>© 2026 HAUSY SYSTEM TECHNOLOGIES</small>
      </footer>
    </main>
  );
}

function ServiceItem({ index, title, description, icon }: { index: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <a href="#inquiry" className="service-item">
      <span className="service-topline"><span>{index} / WHAT WE BUILD</span><ArrowUpRight aria-hidden="true" /></span>
      <span className="service-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-link">LET’S TALK ABOUT IT <ArrowRight aria-hidden="true" /></span>
    </a>
  );
}

function ApproachStep({ number, title, text, icon }: { number: string; title: string; text: string; icon: React.ReactNode }) {
  return (
    <article className="approach-step">
      <div className="step-meta"><span>{number}</span><span className="step-icon">{icon}</span></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
