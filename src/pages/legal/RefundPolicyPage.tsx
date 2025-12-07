
import { Link } from 'react-router-dom';

const RefundPolicyPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e4e8ec]">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-[20px] border-b border-[#f3f4f6]">
        <div className="max-w-[1200px] mx-auto py-3.5 px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 no-underline font-bold text-xl text-violet-500">
            <span className="logo__dot"></span>
            <span className="logo__text">ViralMotion</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#7c3aed] to-[#f439a3] py-16 px-8 text-center text-white">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-base opacity-90">Last updated: December 6, 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">1. No Refund Policy</h2>
            <div className="bg-[#f3f4f6] border-l-4 border-[#7c3aed] p-6 rounded-r-lg my-6">
              <strong className="block mb-3 text-[#1f2937]">All sales are final. We do not offer refunds for any purchases made on ViralMotion.</strong>
            </div>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              By purchasing a subscription or any service from ViralMotion, you acknowledge and agree that all
              payments are non-refundable. This policy applies to all subscription plans, one-time purchases,
              credit packages, and any other paid services offered on our platform.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">2. Why We Have a No Refund Policy</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              Due to the nature of our digital services and the immediate access provided upon purchase,
              we are unable to offer refunds. When you subscribe to ViralMotion:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">You receive immediate access to all features included in your plan</li>
              <li className="mb-2">Digital services and credits are consumed upon use and cannot be returned</li>
              <li className="mb-2">Our AI-powered tools and rendering services incur costs immediately upon use</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">3. Subscription Cancellation</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              While we do not offer refunds, you may cancel your subscription at any time:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">You will continue to have access to premium features until the end of your current billing period</li>
              <li className="mb-2">Your account will automatically downgrade to the free tier after the billing period ends</li>
              <li className="mb-2">No refunds or credits will be provided for the remaining unused time</li>
              <li className="mb-2">Any unused credits will expire at the end of the billing period</li>
            </ul>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              To cancel your subscription, go to Account Settings &gt; Billing &gt; Cancel Subscription.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">4. Billing Errors</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              In the rare event of a billing error (such as being charged twice for the same subscription),
              please contact our support team immediately. We will investigate and correct any verified
              billing errors.
            </p>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              To report a billing error, email us at <strong>billing@viralmotion.com</strong> with:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">Your account email address</li>
              <li className="mb-2">Transaction details and date</li>
              <li className="mb-2">Description of the billing error</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">5. Try Before You Buy</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We encourage all users to explore our free tier before making a purchase. The free tier allows
              you to test our platform and features to ensure ViralMotion meets your needs before committing
              to a paid subscription.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">6. Third-Party Purchases</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              If you purchased your subscription through a third-party platform (such as the App Store or
              Google Play), their refund policies apply. Please contact the respective platform directly
              for any refund inquiries.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">7. Changes to This Policy</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We reserve the right to modify this refund policy at any time. Changes will be effective
              immediately upon posting to our website. Your continued use of the service after any changes
              indicates your acceptance of the updated policy.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">8. Contact Us</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              If you have any questions about our Refund Policy, please contact us:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">By email: billing@viralmotion.com</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
