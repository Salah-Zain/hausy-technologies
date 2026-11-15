import React from "react";
import { ArrowRight } from "lucide-react";
import robotIcon from "@/assets/illustrations/ai-automation-robot-icon.svg";
import softwareIcon from "@/assets/illustrations/custom-software-tools-icon-svg-file.svg";
import seoIcon from "@/assets/illustrations/ai-seo-answer-engines-icon.svg";

function Check() {
  return (
    <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4 12.5 5 5L20 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Service {
  number: string;
  title: string;
  description: string;
  features: string[];
  className: string;
  action: string;
  illustration: string;
  artClass: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "AI AUTOMATION & AGENTS",
    description: "Automate repetitive work and run your operations with intelligent AI agents.",
    features: ["Workflow Automation", "Lead & Order Processing", "App Integrations"],
    className: "card-cobalt",
    action: "Explore Automation",
    illustration: robotIcon,
    artClass: "robot-art",
  },
  {
    number: "02",
    title: "CUSTOM SOFTWARE & TOOLS",
    description: "Turn your business needs into powerful, scalable software solutions.",
    features: ["Tailored Business Solutions", "Scalable Architecture", "Full Code Ownership"],
    className: "card-light",
    action: "Build Your Solution",
    illustration: softwareIcon,
    artClass: "code-art",
  },
  {
    number: "03",
    title: "AI SEO & ANSWER ENGINES",
    description: "Get discovered by AI tools and search engines with proven optimization.",
    features: ["AI Search Visibility", "Qualified Traffic", "Continuous Optimization"],
    className: "card-navy",
    action: "Boost Your Visibility",
    illustration: seoIcon,
    artClass: "search-art",
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <a href="#discovery" className={`service-card ${service.className}`}>
      <div className="card-topline">
        <span className="card-number">{service.number}</span>
        <span className="card-mark" aria-hidden="true">
          ✳
        </span>
      </div>

      <h3>{service.title}</h3>
      <p className="card-description">{service.description}</p>

      <ul className="feature-list">
        {service.features.map((feature) => (
          <li key={feature}>
            <Check />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="card-art-stage">
        <img
          src={service.illustration}
          alt={service.title}
          className={`service-art ${service.artClass}`}
          loading="lazy"
          width={1536}
          height={1024}
        />
      </div>
    </a>
  );
}

export function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="services-decor decor-one" aria-hidden="true" />
      <div className="services-decor decor-two" aria-hidden="true" />

      <div className="services-heading">
        <div className="services-eyebrow">
          <span> OUR SERVICES</span>
        </div>
        <h2>
          <span className="services-title-line">Smart AI Solutions for</span>{" "}
          <span className="services-title-highlight">
            Your <span className="highlight-lime">Business Growth</span>
          </span>
        </h2>
        <p>
          Innovative solutions to automate, optimize, and scale your business.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
