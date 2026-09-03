// lib/barc10.ts
// Shared BARC-10 definitions for the public rally version.
// Brief Assessment of Recovery Capital — Vilsaint et al. (2017).
// Mirrors lib/assessments/questionnaires.ts in Peer Support Studio.

export type Barc10Domain = 'human' | 'social' | 'physical' | 'cultural';

export interface Barc10Question {
  id: number;
  text: string;
  domain: Barc10Domain;
  shortLabel: string;
}

export const BARC10_QUESTIONS: Barc10Question[] = [
  { id: 1, text: 'There are more important things to me in life than using substances.', domain: 'human', shortLabel: 'Purpose & Meaning' },
  { id: 2, text: 'In general I am happy with my life.', domain: 'human', shortLabel: 'Life Satisfaction' },
  { id: 3, text: 'I have enough energy to complete the tasks I set myself.', domain: 'human', shortLabel: 'Energy & Vitality' },
  { id: 4, text: 'I am proud of the community I live in and feel part of it.', domain: 'social', shortLabel: 'Community Connection' },
  { id: 5, text: 'I get lots of support from friends.', domain: 'social', shortLabel: 'Friend Support' },
  { id: 6, text: 'I regard my life as challenging and fulfilling without the need for using drugs or alcohol.', domain: 'human', shortLabel: 'Fulfillment in Recovery' },
  { id: 7, text: 'My living space has helped to drive my recovery journey.', domain: 'physical', shortLabel: 'Supportive Environment' },
  { id: 8, text: 'I take full responsibility for my actions.', domain: 'human', shortLabel: 'Personal Responsibility' },
  { id: 9, text: 'I am happy dealing with a range of professional people.', domain: 'cultural', shortLabel: 'Professional Engagement' },
  { id: 10, text: 'I am making good progress on my recovery journey.', domain: 'cultural', shortLabel: 'Recovery Progress' },
];

export const BARC10_RESPONSE_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Somewhat Disagree' },
  { value: 4, label: 'Somewhat Agree' },
  { value: 5, label: 'Agree' },
  { value: 6, label: 'Strongly Agree' },
];

export const BARC10_DOMAINS: Record<Barc10Domain, { name: string; description: string; color: string }> = {
  human: { name: 'Human Capital', description: 'Purpose, health, energy, and personal strengths', color: '#1A73A8' },
  social: { name: 'Social Capital', description: 'Support from friends, family, and community', color: '#7C5CBF' },
  physical: { name: 'Physical Capital', description: 'Housing, environment, and tangible resources', color: '#E85D3A' },
  cultural: { name: 'Cultural Capital', description: 'Values, engagement, and the recovery community', color: '#2AB5A0' },
};

export const BARC10_DOMAIN_ORDER: Barc10Domain[] = ['human', 'social', 'physical', 'cultural'];

export const BARC10_MAX_SCORE = 60;
export const BARC10_MAX_LIKERT = 6;

export type Barc10Answers = Record<string, number>; // { q1: 5, q2: 4, ... }

export interface Barc10DomainScore {
  score: number;
  max: number;
  percentage: number;
}

export interface Barc10Scores {
  total: number;
  max: number;
  percentage: number;
  domains: Record<Barc10Domain, Barc10DomainScore>;
}

export function scoreBarc10(answers: Barc10Answers): Barc10Scores {
  const domains: Record<Barc10Domain, Barc10DomainScore> = {
    human: { score: 0, max: 0, percentage: 0 },
    social: { score: 0, max: 0, percentage: 0 },
    physical: { score: 0, max: 0, percentage: 0 },
    cultural: { score: 0, max: 0, percentage: 0 },
  };
  let total = 0;
  for (const q of BARC10_QUESTIONS) {
    const v = answers[`q${q.id}`];
    domains[q.domain].max += BARC10_MAX_LIKERT;
    if (typeof v !== 'number') continue;
    total += v;
    domains[q.domain].score += v;
  }
  for (const d of BARC10_DOMAIN_ORDER) {
    domains[d].percentage = domains[d].max ? Math.round((domains[d].score / domains[d].max) * 100) : 0;
  }
  return {
    total,
    max: BARC10_MAX_SCORE,
    percentage: Math.round((total / BARC10_MAX_SCORE) * 100),
    domains,
  };
}

export function interpretBarc10(percentage: number): { level: string; detail: string } {
  if (percentage >= 75) {
    return {
      level: 'Strong Recovery Capital',
      detail: 'You have strong personal and social resources supporting your recovery. Keep nurturing those strengths and build on the areas that are still growing.',
    };
  }
  if (percentage >= 50) {
    return {
      level: 'Moderate Recovery Capital',
      detail: 'Your recovery capital is developing. Focus on strengthening the areas that scored lower while holding on to the supports you already have.',
    };
  }
  if (percentage >= 25) {
    return {
      level: 'Building Recovery Capital',
      detail: 'There is real room to grow. Building support networks, stable housing, and personal coping skills can make a big difference. A peer support specialist can help.',
    };
  }
  return {
    level: 'Early Recovery Capital',
    detail: 'You are at the start of building recovery capital, and that is a meaningful place to be. Connecting with support services and a peer specialist is a strong next step.',
  };
}

// Validate a raw answers payload from the client.
export function validateBarc10Answers(input: unknown): Barc10Answers | null {
  if (!input || typeof input !== 'object') return null;
  const out: Barc10Answers = {};
  for (const q of BARC10_QUESTIONS) {
    const v = (input as Record<string, unknown>)[`q${q.id}`];
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 1 || v > BARC10_MAX_LIKERT) return null;
    out[`q${q.id}`] = v;
  }
  return out;
}

// Shape returned by /api/barc10-summary
export interface Barc10Summary {
  overallSummary: string;
  strengths: string[];
  growthOpportunities: string[];
  domainInsights: Partial<Record<Barc10Domain, string>>;
  nextSteps: { title: string; domain: string; description: string }[];
  weeklyChallenge: { title: string; description: string };
  encouragement: string;
}
