import { subscriptionData } from "../data/subscriptionData";
import type { Subscription } from "../types/subscription";

export interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  isInTrial: boolean;
  trialDaysRemaining: number;
  status: string | null;
  shouldRedirectToSubscription: boolean;
}

/**
 * Check the current subscription status
 * @param subscription - Optional subscription data (defaults to static subscriptionData)
 * @returns SubscriptionStatus object with subscription details
 */
export function checkSubscriptionStatus(
  subscription: Subscription | null = subscriptionData
): SubscriptionStatus {
  // Default status for no subscription
  if (!subscription) {
    return {
      hasActiveSubscription: false,
      isInTrial: false,
      trialDaysRemaining: 0,
      status: null,
      shouldRedirectToSubscription: true,
    };
  }

  const { status, trialEnd, cancelAtPeriodEnd } = subscription;
  const now = new Date();

  // Calculate trial days remaining
  let trialDaysRemaining = 0;
  let isInTrial = false;

  if (trialEnd) {
    const trialEndDate = new Date(trialEnd);
    const diffTime = trialEndDate.getTime() - now.getTime();
    trialDaysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    isInTrial = status === "trialing" && trialDaysRemaining > 0;
  }

  // Check if subscription is active or in trial
  const hasActiveSubscription =
    status === "active" ||
    (status === "trialing" && isInTrial) ||
    (status === "canceled" && cancelAtPeriodEnd === false);

  // Determine if user should be redirected to subscription page
  // If hasActiveSubscription is false, it already covers past_due, unpaid, and incomplete statuses
  const shouldRedirectToSubscription = !hasActiveSubscription;

  return {
    hasActiveSubscription,
    isInTrial,
    trialDaysRemaining: isInTrial ? trialDaysRemaining : 0,
    status,
    shouldRedirectToSubscription,
  };
}

/**
 * Format subscription status for display
 */
export function formatSubscriptionStatus(status: string | null): string {
  if (!status) return "No subscription";

  const statusMap: Record<string, string> = {
    active: "Active",
    trialing: "Trial",
    canceled: "Canceled",
    past_due: "Past Due",
    incomplete: "Incomplete",
    unpaid: "Unpaid",
  };

  return statusMap[status] || status;
}

/**
 * Get subscription status badge color
 */
export function getSubscriptionStatusColor(
  status: string | null
): "success" | "warning" | "error" | "info" {
  if (!status) return "error";

  const colorMap: Record<string, "success" | "warning" | "error" | "info"> = {
    active: "success",
    trialing: "info",
    canceled: "warning",
    past_due: "error",
    incomplete: "error",
    unpaid: "error",
  };

  return colorMap[status] || "info";
}

/**
 * Calculate days until subscription renewal
 */
export function getDaysUntilRenewal(
  subscription: Subscription | null = subscriptionData
): number {
  if (!subscription || !subscription.currentPeriodEnd) return 0;

  const now = new Date();
  const renewalDate = new Date(subscription.currentPeriodEnd);
  const diffTime = renewalDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if subscription is expiring soon (within 7 days)
 */
export function isSubscriptionExpiringSoon(
  subscription: Subscription | null = subscriptionData
): boolean {
  const daysUntilRenewal = getDaysUntilRenewal(subscription);
  return daysUntilRenewal > 0 && daysUntilRenewal <= 7;
}
