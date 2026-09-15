import type { Meta, StoryObj } from "@storybook/react";
import Dropdown, { DropdownOption } from "@/components/Dropdown";

const incidentOptions: DropdownOption[] = [
  {
    value: "level-1-environmental",
    label: "Level 1: Environmental Shift",
    badge: "LOW",
    description: "Displaced chairs, shifted clocks, room orientation changes.",
  },
  {
    value: "level-2-technical",
    label: "Level 2: Technical/Hardware Glitch",
    badge: "MEDIUM",
    description: "Printer photo printouts, ghost devices on subnet, rogue cursors.",
  },
  {
    value: "level-3-mimic",
    label: "Level 3: Biological/Mimic Encounter",
    badge: "HIGH",
    description: "Employees returning as different people, supervisor clones.",
  },
  {
    value: "level-4-temporal",
    label: "Level 4: Spatiotemporal Paradox",
    badge: "CRITICAL",
    description: "Tickets logged from 2011, shifting hallways, infinite loops.",
  },
  {
    value: "press-inquiry",
    label: "General Press & Publisher Inquiries",
    badge: "EXTERNAL",
    description: "Media requests, demo keys, and partnership queries.",
  },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#07090e" }],
    },
  },
  argTypes: {
    onChange: { action: "option-selected" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    id: "incident-type-dropdown",
    label: "Incident / Anomaly Type",
    placeholder: "Select anomaly severity category...",
    options: incidentOptions,
    required: true,
  },
  render: (args) => (
    <div className="w-80 md:w-96 p-4">
      <Dropdown {...args} />
    </div>
  ),
};

export const Preselected: Story = {
  args: {
    id: "preselected-dropdown",
    label: "Assigned Clearance Tier",
    options: incidentOptions,
    defaultValue: "level-2-technical",
    helperText: "Incident tier is pre-assigned by supervisor dispatch.",
  },
  render: (args) => (
    <div className="w-80 md:w-96 p-4">
      <Dropdown {...args} />
    </div>
  ),
};

export const WithValidationError: Story = {
  args: {
    id: "error-dropdown",
    label: "Incident Classification",
    options: incidentOptions,
    error: "Please classify the anomaly severity before dispatching technician.",
    required: true,
  },
  render: (args) => (
    <div className="w-80 md:w-96 p-4">
      <Dropdown {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: "disabled-dropdown",
    label: "Quarantine Access Protocol",
    options: incidentOptions,
    defaultValue: "level-4-temporal",
    disabled: true,
    helperText: "Quarantine level locked by supervisor override.",
  },
  render: (args) => (
    <div className="w-80 md:w-96 p-4">
      <Dropdown {...args} />
    </div>
  ),
};
