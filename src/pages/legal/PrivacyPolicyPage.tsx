import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {

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
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-base opacity-90">Last updated: December 6, 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">1. Introduction</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              Welcome to ViralMotion. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our
              website and use our services, and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">2. Information We Collect</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2"><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
              <li className="mb-2"><strong>Contact Data:</strong> Email address and telephone numbers.</li>
              <li className="mb-2"><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li className="mb-2"><strong>Usage Data:</strong> Information about how you use our website and services.</li>
              <li className="mb-2"><strong>Content Data:</strong> Videos, images, and other content you upload to our platform.</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">3. How We Use Your Information</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">We use your personal data for the following purposes:</p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">To provide and maintain our service</li>
              <li className="mb-2">To notify you about changes to our service</li>
              <li className="mb-2">To provide customer support</li>
              <li className="mb-2">To gather analysis or valuable information to improve our service</li>
              <li className="mb-2">To monitor the usage of our service</li>
              <li className="mb-2">To detect, prevent and address technical issues</li>
              <li className="mb-2">To process your transactions and subscriptions</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">4. Data Security</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We have implemented appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal
              data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">5. Data Retention</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected
              it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              When you delete your account, we will delete or anonymize your personal data within 30 days.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">6. Your Legal Rights</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">Request access to your personal data</li>
              <li className="mb-2">Request correction of your personal data</li>
              <li className="mb-2">Request erasure of your personal data</li>
              <li className="mb-2">Object to processing of your personal data</li>
              <li className="mb-2">Request restriction of processing your personal data</li>
              <li className="mb-2">Request transfer of your personal data</li>
              <li className="mb-2">Right to withdraw consent</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">7. Cookies</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We use cookies and similar tracking technologies to track the activity on our service and hold certain
              information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">8. Third-Party Services</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We may employ third-party companies and individuals to facilitate our service, provide the service on
              our behalf, perform service-related services, or assist us in analyzing how our service is used. These
              third parties have access to your personal data only to perform these tasks on our behalf and are
              obligated not to disclose or use it for any other purpose.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">9. Changes to This Privacy Policy</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">10. Contact Us</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">By email: privacy@viralmotion.com</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
