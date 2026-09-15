/**
 * Mock JSON fixtures and typed data loaders for TICKET #404
 */

import ticketsData from "./tickets.json";
import internsData from "./interns.json";
import editionsData from "./editions.json";
import incidentReportsData from "./incident-reports.json";

import type {
  Ticket,
  InternDossier,
  PricingEdition,
  ContactFormData,
} from "@/types";

export const mockTickets: Ticket[] = ticketsData as Ticket[];
export const mockInterns: InternDossier[] = internsData as InternDossier[];
export const mockEditions: PricingEdition[] = editionsData as PricingEdition[];
export const mockIncidentReports: ContactFormData[] = incidentReportsData as ContactFormData[];

export {
  ticketsData,
  internsData,
  editionsData,
  incidentReportsData,
};
