import type { Meta, StoryObj } from "@storybook/react";
import TeamMemberCard from "@/components/TeamMemberCard";
import { mockInterns } from "@/mocks";

const meta: Meta<typeof TeamMemberCard> = {
  title: "Components/TeamMemberCard",
  component: TeamMemberCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#07090e" },
        { name: "surface", value: "#0c101d" },
      ],
    },
  },
  argTypes: {
    accentColor: {
      control: { type: "select" },
      options: ["cyan", "amber"],
    },
    isAnomalyActive: {
      control: "boolean",
    },
    onSelect: { action: "card-clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof TeamMemberCard>;

export const MayaHardwareSpecialist: Story = {
  name: "Maya (Hardware Specialist)",
  args: {
    ...mockInterns[0],
    isAnomalyActive: false,
  },
};

export const LeoNetworkAnalyst: Story = {
  name: "Leo (Network Analyst)",
  args: {
    ...mockInterns[1],
    isAnomalyActive: false,
  },
};

export const AnomalyBreachMode: Story = {
  name: "Anomaly Breach Mode",
  args: {
    ...mockInterns[0],
    isAnomalyActive: true,
    status: "CRITICAL: Facility Breach Detected",
    perception: "ERROR: Reality Distortion",
  },
};

export const InteractiveRosterGrid: StoryObj = {
  name: "Cohort Roster (2-Column Grid)",
  render: () => (
    <div className="max-w-5xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#07090e]">
      {mockInterns.map((intern) => (
        <TeamMemberCard
          key={intern.id}
          {...intern}
          onSelect={() => alert(`Selected Intern ${intern.id}: ${intern.name}`)}
        />
      ))}
    </div>
  ),
};
