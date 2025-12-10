export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "past_due"
  | "incomplete"
  | "unpaid";

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;

  // Subscription details
  status: SubscriptionStatus;
  plan: string; // e.g., "pro"

  currentPeriodStart: string; // ISO timestamp
  currentPeriodEnd: string; // ISO timestamp
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null; // ISO timestamp
  trialStart: string | null; // ISO timestamp
  trialEnd: string | null; // ISO timestamp
  metadata: string | null; // JSON string
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
