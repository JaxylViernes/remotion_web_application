export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  status: 'free_trial' | 'active' | 'trialing' | 'canceled' | 'past_due' | 'incomplete' | 'unpaid' | 'lifetime' | 'company';
  plan: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialStart: string | null;
  trialEnd: string | null;
  metadata: string | null;
  createdAt: string;
  updatedAt: string;
  
  // ✅ Lifetime fields
  isLifetime?: boolean;
  isCompanyAccount?: boolean;
  companyName?: string | null;
  specialNotes?: string | null;
}

export interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  isInTrial: boolean;
  trialDaysRemaining: number;
  status: string | null;
  shouldRedirectToSubscription: boolean;
  isLifetime?: boolean;
}