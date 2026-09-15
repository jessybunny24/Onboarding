/**
 * Centralized TypeScript type definitions for TICKET #404 (Ops-Intern-Army)
 */

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/* -------------------------------------------------------------------------- */
/* Navigation & Header Types                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  isAnomalyActive?: boolean;
  onToggleAnomaly?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Hero Section Types                                                        */
/* -------------------------------------------------------------------------- */

export interface HeroProps {
  isAnomalyActive: boolean;
  onToggleAnomaly?: () => void;
}

export interface Ticket404HeroImageProps {
  onGlitchTriggered?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Interactive Terminal & Ticket Mechanics                                   */
/* -------------------------------------------------------------------------- */

export type MiniGameType = "printer" | "cables" | "dial" | "command";

export interface MiniGameDef {
  type: MiniGameType;
  title: string;
  instructions: string;
}

export type TicketCategory = "Printer" | "Network" | "Hardware" | "Reality";

export interface MetricItem {
  label: string;
  value: string;
}

export interface TicketNormalState {
  description: string;
  diagnostic: string;
  metrics: MetricItem[];
}

export interface TicketAnomalyState {
  description: string;
  diagnostic: string;
  glitchWarning: string;
  metrics: MetricItem[];
}

export interface Ticket {
  id: string;
  room: string;
  category: TicketCategory;
  title: string;
  miniGame: MiniGameDef;
  normalState: TicketNormalState;
  anomalyState: TicketAnomalyState;
}

export interface TerminalActionLog {
  text: string;
  type: "success" | "damage" | "warning";
}

export interface InteractiveTerminalProps {
  isGlobalAnomaly?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Features & Intern Roster Types                                             */
/* -------------------------------------------------------------------------- */

export interface FeaturePhaseItem {
  id: string;
  Illustration: ComponentType<{ className?: string }>;
  accentColor: "blue" | "red" | "purple";
  tag: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  previewDetails: string;
}

export interface InternDossier {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  quote: string;
  department: string;
  perception: string;
  status: string;
  accentColor: "cyan" | "amber";
}

/* -------------------------------------------------------------------------- */
/* Editions & Pricing (Services) Types                                        */
/* -------------------------------------------------------------------------- */

export interface PricingEdition {
  id: string;
  name: string;
  badge: string;
  price: string;
  description: string;
  highlighted: boolean;
  buttonText: string;
  buttonStyle: string;
  features: string[];
}

/* -------------------------------------------------------------------------- */
/* Contact & Feedback Types                                                  */
/* -------------------------------------------------------------------------- */

export interface ContactFormData {
  fullName: string;
  badgeId: string;
  station: string;
  incidentType: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/* Footer Types                                                               */
/* -------------------------------------------------------------------------- */

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLinkItem[];
}
