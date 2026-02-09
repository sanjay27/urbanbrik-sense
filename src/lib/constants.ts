import {
  Signal,
  Clock,
  Puzzle,
  EyeOff,
  Tag,
  Key,
  Users,
  BarChart3,
  Building2,
  Thermometer,
  TrendingUp,
  Home,
  Brain,
  MapPin,
  MessageSquare,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Value", href: "#value" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Audience", href: "#audience" },
  { label: "Contact", href: "#contact" },
];

export interface ProblemCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const problemCards: ProblemCard[] = [
  {
    icon: Signal,
    title: "Missed Signals",
    description:
      "Developers miss early sentiment and demand signals that could shape better projects.",
  },
  {
    icon: Clock,
    title: "Wasted Hours",
    description:
      "Families waste hours comparing commute times, schools, and lifestyle across neighbourhoods.",
  },
  {
    icon: Puzzle,
    title: "No Unified Platform",
    description:
      "No single platform unifies pricing, sentiment, schools, commute, and commercial activity.",
  },
  {
    icon: EyeOff,
    title: "Investor Blind Spots",
    description:
      "Investors lack visibility into future growth corridors or emerging risk zones.",
  },
  {
    icon: Tag,
    title: "Pricing Struggles",
    description:
      "Landlords struggle with accurate pricing, leading to vacancies or undervalued assets.",
  },
];

export interface SignalItem {
  icon: LucideIcon;
  label: string;
}

export const coreSignals: SignalItem[] = [
  { icon: MessageSquare, label: "Sentiment" },
  { icon: Tag, label: "Pricing" },
  { icon: Building2, label: "Schools" },
  { icon: MapPin, label: "Commute" },
  { icon: ShoppingBag, label: "Commercial" },
];

export interface BenefitCard {
  icon: LucideIcon;
  audience: string;
  benefit: string;
  metric: string | null;
}

export const benefitCards: BenefitCard[] = [
  {
    icon: Thermometer,
    audience: "Landlords",
    benefit: "Smarter rent pricing, faster occupancy via our Thermostat engine",
    metric: "+5-10% yields",
  },
  {
    icon: Home,
    audience: "Families",
    benefit: "Commute + school balancing with clearer, data-driven choices",
    metric: null,
  },
  {
    icon: TrendingUp,
    audience: "Investors",
    benefit: "Early growth detection and risk mapping with predictive analytics",
    metric: "+10-20% ROI",
  },
  {
    icon: Brain,
    audience: "Developers",
    benefit: "Smarter launch planning and pricing with real-time demand signals",
    metric: null,
  },
];

export interface PipelineColumn {
  title: string;
  color: string;
  items: string[];
}

export const pipelineData: PipelineColumn[] = [
  {
    title: "INPUT",
    color: "teal",
    items: [
      "Rental Data",
      "Reviews",
      "Schools",
      "Commute",
      "Commercial Activity",
      "Infrastructure",
    ],
  },
  {
    title: "ENGINE",
    color: "blue",
    items: ["ML Forecasting", "LLM Sentiment", "GIS Commute"],
  },
  {
    title: "OUTPUT",
    color: "teal",
    items: [
      "Rent Recommendations",
      "Sentiment Score",
      "Ideal Areas",
      "Appreciation Forecasts",
      "Growth/Risk Maps",
    ],
  },
];

export const feasibilityBadges = [
  "Strong Data",
  "Mature AI Tech",
  "Scalable",
  "Secure & Privacy-safe",
];

export interface AudienceCard {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
}

export const audienceCards: AudienceCard[] = [
  {
    icon: Key,
    title: "Landlords",
    tagline: "Rent Optimisation + Vacancy Reduction",
    description:
      "Maximise yields with AI-driven rent recommendations and reduce vacancy with demand forecasting.",
  },
  {
    icon: Users,
    title: "Families",
    tagline: "Commute + School Match + Social Community",
    description:
      "Balance commute times, school ratings, and neighbourhood sentiment in one unified view.",
  },
  {
    icon: BarChart3,
    title: "Investors",
    tagline: "ROI, Growth & Risk Zones",
    description:
      "Identify high-growth areas early and map risk zones with predictive analytics.",
  },
  {
    icon: Building2,
    title: "Developers",
    tagline: "Demand Signals, Planning & Pricing",
    description:
      "Launch smarter with real-time demand signals and optimal pricing strategies.",
  },
];

export const userTypes = [
  "Landlord",
  "Family",
  "Investor",
  "Developer",
  "Other",
];
