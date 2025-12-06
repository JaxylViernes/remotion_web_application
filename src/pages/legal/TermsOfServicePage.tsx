import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {

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
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-base opacity-90">Last updated: December 6, 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">1. Agreement to Terms</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              By accessing or using ViralMotion's services, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
              using or accessing our services.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">2. Use License</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              Permission is granted to temporarily use ViralMotion's services for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">Modify or copy the materials except for your own video projects</li>
              <li className="mb-2">Use the materials for any commercial purpose without a valid subscription</li>
              <li className="mb-2">Attempt to decompile or reverse engineer any software contained on ViralMotion</li>
              <li className="mb-2">Remove any copyright or other proprietary notations from the materials</li>
              <li className="mb-2">Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">3. Account Terms</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">To use certain features of the service, you must register for an account. When you register:</p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">You must provide accurate and complete information</li>
              <li className="mb-2">You are responsible for maintaining the security of your account and password</li>
              <li className="mb-2">You are responsible for all activities that occur under your account</li>
              <li className="mb-2">You must notify us immediately upon becoming aware of any breach of security</li>
              <li className="mb-2">You must be at least 13 years old to use this service</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">4. Subscription and Payments</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              Some aspects of the service are provided on a subscription basis. You will be billed in advance on a
              recurring and periodic basis, either monthly or annually, depending on the subscription plan you select.
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">Your subscription will automatically renew unless you cancel it</li>
              <li className="mb-2">You can cancel your subscription at any time through your account settings</li>
              <li className="mb-2">Prices are subject to change with 30 days notice</li>
              <li className="mb-2">All fees are exclusive of applicable taxes unless stated otherwise</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">5. Content Ownership</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              You retain ownership of any content you create using our service. However, by uploading content to
              ViralMotion, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and
              display your content solely for the purpose of providing the service to you.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">6. Acceptable Use</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">You agree not to use the service to:</p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">Upload content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
              <li className="mb-2">Infringe on any third party's intellectual property rights</li>
              <li className="mb-2">Transmit any viruses, worms, or malicious code</li>
              <li className="mb-2">Interfere with or disrupt the service or servers</li>
              <li className="mb-2">Collect or store personal data about other users without their consent</li>
              <li className="mb-2">Impersonate any person or entity</li>
            </ul>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">7. Intellectual Property</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              The service and its original content (excluding content provided by users), features, and functionality
              are and will remain the exclusive property of ViralMotion and its licensors. The service is protected
              by copyright, trademark, and other laws.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">8. Termination</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
              breach the Terms. Upon termination, your right to use the service will cease immediately.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">9. Limitation of Liability</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              In no event shall ViralMotion, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">10. Disclaimer</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE"
              basis. The service is provided without warranties of any kind, whether express or implied, including, but
              not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement
              or course of performance.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">11. Changes to Terms</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change
              will be determined at our sole discretion.
            </p>
          </div>

          <div className="mb-10 last:mb-0">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4 pb-2 border-b-2 border-[#e5e7eb]">12. Contact Us</h2>
            <p className="text-[#4b5563] leading-[1.8] mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="text-[#4b5563] leading-[1.8] pl-6 mb-4 list-disc">
              <li className="mb-2">By email: legal@viralmotion.com</li>
              <li className="mb-2">By visiting our Help Center: <Link to="/help-center" className="text-[#7c3aed] no-underline font-medium hover:underline">Help Center</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
