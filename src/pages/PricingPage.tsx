import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [templatesDropdownOpen, setTemplatesDropdownOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  const featureItems = [
    { name: 'Video Templates', path: '/templates' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Video & Audio Downloader', path: '/downloader' },
  ];

  const templateItems = [
    { name: 'Fake Text Conversation', path: '/templates/fake-text-conversation' },
    { name: 'Relatable Quotes + Viral Sound', path: '/templates/relatable-quotes' },
    { name: 'Reaction Video', path: '/templates/reaction-video' },
    { name: 'Image / Video Collage Edit', path: '/templates/collage-edit' },
    { name: 'Ken Burns Carousel', path: '/templates/ken-burns-carousel' },
  ];

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 9,
      annualPrice: 7,
      description: 'Perfect for trying out ViralMotion',
      workflows: 30,
      exportCredits: 20,
      voiceoverCredits: 15,
      aiImages: 50,
      features: [
        'Basic video templates',
        '720p export quality',
        'Watermark on videos',
        'Email support',
      ],
      cta: 'Choose Starter',
      highlighted: false,
    },
    {
      name: 'Creator',
      monthlyPrice: 19,
      annualPrice: 15,
      description: 'For content creators going viral',
      workflows: 100,
      exportCredits: 60,
      voiceoverCredits: 45,
      aiImages: 200,
      features: [
        'All video templates',
        '1080p HD export',
        'No watermark',
        'Priority support',
        'Batch rendering',
        'Custom branding',
      ],
      cta: 'Choose Creator',
      highlighted: true,
      badge: 'Most popular!',
    },
    {
      name: 'Pro',
      monthlyPrice: 39,
      annualPrice: 31,
      description: 'For professional video creators',
      workflows: 300,
      exportCredits: 180,
      voiceoverCredits: 150,
      aiImages: 1000,
      features: [
        'Everything in Creator',
        '4K export quality',
        'Advanced AI tools',
        '24/7 priority support',
        'Team collaboration',
        'API access',
      ],
      cta: 'Choose Pro',
      highlighted: false,
    },
  ];

  const templateFeatures = [
    { name: 'Fake Text Conversation', starter: false, creator: true, pro: true },
    { name: 'Relatable Quotes + Viral Sound', starter: false, creator: true, pro: true },
    { name: 'Reaction Video', starter: false, creator: true, pro: true },
    { name: 'Image / Video Collage Edit', starter: true, creator: true, pro: true },
    { name: 'Ken Burns Carousel', starter: true, creator: true, pro: true },
  ];

  const toolsFeatures = [
    { name: 'AI Voiceover Generator', starter: '15 minutes', creator: '45 minutes', pro: '150 minutes' },
    { name: 'AI Auto-Captions', starter: false, creator: true, pro: true },
    { name: 'Smart Video Editing', starter: false, creator: true, pro: true },
    { name: 'Video & Audio Downloader', starter: false, creator: true, pro: true },
    { name: 'Multi-platform Download (TikTok, YouTube, Instagram, Twitter)', starter: false, creator: true, pro: true },
    { name: 'Extract Audio from Video (MP3)', starter: false, creator: true, pro: true },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden">
      {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-[20px] border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="max-w-[1200px] mx-auto py-3.5 px-8 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 no-underline font-bold text-xl text-violet-500">
                  <span className="w-[25px] h-[25px] rounded-full bg-[conic-gradient(from_120deg,#8b5cf6,#ec4899,#06b6d4)] shadow-[0_4px_12px_rgba(139,92,246,0.45)]"></span>
                  <span className="font-bold tracking-[0.2px]">ViralMotion</span>
                </Link>
                <div className="flex items-center gap-8">
                  {/* Features Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setFeaturesDropdownOpen(true)}
                    onMouseLeave={() => setFeaturesDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1.5 text-gray-700 text-sm font-medium bg-transparent border-none cursor-pointer py-2 transition-colors hover:text-violet-500 group">
                      Features
                      <svg className="transition-transform group-hover:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {featuresDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-2 min-w-[200px] z-[1000] animate-[dropdownFadeIn_0.2s_ease-out]">
                        {featureItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block w-full py-2 px-3 text-gray-500 no-underline text-xs font-medium rounded-lg transition-all hover:bg-gray-100 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
      
                  {/* Templates Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setTemplatesDropdownOpen(true)}
                    onMouseLeave={() => setTemplatesDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1.5 text-gray-700 text-sm font-medium bg-transparent border-none cursor-pointer py-2 transition-colors hover:text-violet-500 group">
                      Templates
                      <svg className="transition-transform group-hover:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {templatesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-2 min-w-[200px] z-[1000] animate-[dropdownFadeIn_0.2s_ease-out]">
                        {templateItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block w-full py-2 px-3 text-gray-500 no-underline text-xs font-medium rounded-lg transition-all hover:bg-gray-100 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
      
                  <Link to="/pricing" className="text-gray-700 no-underline text-sm font-medium transition-colors hover:text-violet-500">Pricing</Link>
                </div>
                <Link to="/login" className="bg-gray-900 text-white py-2.5 px-5 rounded-lg font-medium text-sm no-underline transition-all hover:bg-violet-500">Login</Link>
              </div>
            </nav>

      {/* Hero Section */}
      <section className="pt-20 px-8 pb-12 text-center animate-[fadeInUp_0.6s_ease]">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-[3.5rem] font-extrabold text-[#111827] mb-4 leading-[1.1]">Create viral videos at any scale</h1>
          <p className="text-xl text-[#6b7280] mb-12 leading-relaxed">Choose the plan that fits your content goals. Start creating engaging videos today and scale as you grow.</p>

          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-[50px] border border-[#e5e7eb] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <span className={`text-[0.9375rem] font-medium px-2 transition-colors duration-300 ${!isAnnual ? 'text-[#111827]' : 'text-[#6b7280]'}`}>Monthly</span>
            <button
              className={`relative w-12 h-6 border-none rounded-[50px] cursor-pointer transition-colors duration-300 p-0 ${isAnnual ? 'bg-[#8b5cf6]' : 'bg-[#e5e7eb]'}`}
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle annual billing"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${isAnnual ? 'translate-x-6' : ''}`}></span>
            </button>
            <span className={`text-[0.9375rem] font-medium px-2 transition-colors duration-300 ${isAnnual ? 'text-[#111827]' : 'text-[#6b7280]'}`}>Annual</span>
            <span className="bg-gradient-to-br from-[#00ffaa] to-[#21c08e] text-white px-3 py-1.5 rounded-[20px] text-[0.8125rem] font-semibold ml-2">Save 20%</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-8 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white border-2 rounded-[20px] p-10 relative transition-all duration-300 animate-[fadeInUp_0.6s_ease] hover:-translate-y-2 ${
                plan.highlighted
                  ? 'border-[#8b5cf6] shadow-[0_20px_60px_rgba(139,92,246,0.15)] lg:scale-[1.03] hover:lg:scale-[1.03] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)]'
                  : 'border-[#e5e7eb] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] text-white px-4 py-1.5 rounded-[20px] text-[0.8125rem] font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(139,92,246,0.3)]">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#111827] mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-[1.75rem] font-bold text-[#111827] mr-1">$</span>
                  <span className="text-[4rem] font-extrabold text-[#111827] leading-none">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-xl font-semibold text-[#6b7280] ml-1">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-[#6b7280] mb-2">
                    Billed yearly at ${plan.annualPrice * 12}
                  </p>
                )}
                <p className="text-[0.9375rem] text-[#6b7280] m-0">{plan.description}</p>
              </div>

              <div className="bg-[#f9fafb] rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3.5 text-[0.9375rem] text-[#374151]">
                  <svg className="text-[#8b5cf6] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{plan.workflows} workflow credits per month</span>
                </div>
                <div className="flex items-center gap-3 mb-3.5 text-[0.9375rem] text-[#374151]">
                  <svg className="text-[#8b5cf6] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{plan.exportCredits} export credits</span>
                </div>
                <div className="flex items-center gap-3 mb-3.5 text-[0.9375rem] text-[#374151]">
                  <svg className="text-[#8b5cf6] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{plan.voiceoverCredits} voiceover credits</span>
                </div>
                <div className="flex items-center gap-3 text-[0.9375rem] text-[#374151]">
                  <svg className="text-[#8b5cf6] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>{plan.aiImages} AI images</span>
                </div>
              </div>

              <ul className="list-none p-0 m-0 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-3 text-[0.9375rem] text-[#374151] border-b border-[#f3f4f6] last:border-b-0">
                    <svg className="text-[#8b5cf6] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`flex items-center justify-center gap-2 w-full p-4 rounded-xl font-semibold text-base no-underline transition-all duration-300 border-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white border-transparent shadow-[0_4px_16px_rgba(139,92,246,0.3)] hover:from-[#7c3aed] hover:to-[#6d28d9] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(139,92,246,0.4)]'
                    : 'bg-white text-[#111827] border-[#e5e7eb] hover:border-[#8b5cf6] hover:text-[#8b5cf6] hover:-translate-y-0.5'
                }`}
              >
                {plan.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2.5rem] font-extrabold text-[#111827] mb-12 text-center">Features</h2>

          <div className="overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white">
            <table className="w-full border-collapse">
              <thead className="bg-[#f9fafb] border-b-2 border-[#e5e7eb]">
                <tr>
                  <th className="p-6 text-left pl-8 font-bold text-lg text-[#111827]">ViralMotion Templates</th>
                  <th className="p-6 text-center font-bold text-lg text-[#111827]">Starter</th>
                  <th className="p-6 text-center font-bold text-lg text-[#8b5cf6] bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-[rgba(236,72,153,0.1)] relative">Creator</th>
                  <th className="p-6 text-center font-bold text-lg text-[#111827]">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f9fafb]">
                  <td className="p-4 pl-8 font-bold text-[#111827] text-left text-base">Video Templates</td>
                  <td className="p-4 text-center font-bold text-[#111827]">30 credits</td>
                  <td className="p-4 text-center font-bold text-[#111827] bg-[rgba(139,92,246,0.02)]">100 credits</td>
                  <td className="p-4 text-center font-bold text-[#111827]">300 credits</td>
                </tr>
                {templateFeatures.map((feature, idx) => (
                  <tr key={idx}>
                    <td className="p-5 pl-8 text-left font-medium text-[#374151] border-b border-[#f3f4f6]">{feature.name}</td>
                    <td className="p-5 text-center border-b border-[#f3f4f6]">
                      {feature.starter ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                    <td className="p-5 text-center border-b border-[#f3f4f6] bg-[rgba(139,92,246,0.02)]">
                      {feature.creator ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                    <td className="p-5 text-center border-b border-[#f3f4f6]">
                      {feature.pro ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#f9fafb]">
                  <td className="p-4 pl-8 font-bold text-[#111827] text-left text-base">AI Tools</td>
                  <td className="p-4 text-center font-bold text-[#111827]">15 credits</td>
                  <td className="p-4 text-center font-bold text-[#111827] bg-[rgba(139,92,246,0.02)]">45 credits</td>
                  <td className="p-4 text-center font-bold text-[#111827]">150 credits</td>
                </tr>
                {toolsFeatures.map((feature, idx) => (
                  <tr key={idx}>
                    <td className="p-5 pl-8 text-left font-medium text-[#374151] border-b border-[#f3f4f6]">{feature.name}</td>
                    <td className="p-5 text-center border-b border-[#f3f4f6]">
                      {typeof feature.starter === 'string' ? (
                        <span className="text-[#8b5cf6] font-semibold text-sm">{feature.starter}</span>
                      ) : feature.starter ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                    <td className="p-5 text-center border-b border-[#f3f4f6] bg-[rgba(139,92,246,0.02)]">
                      {typeof feature.creator === 'string' ? (
                        <span className="text-[#8b5cf6] font-semibold text-sm">{feature.creator}</span>
                      ) : feature.creator ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                    <td className="p-5 text-center border-b border-[#f3f4f6]">
                      {typeof feature.pro === 'string' ? (
                        <span className="text-[#8b5cf6] font-semibold text-sm">{feature.pro}</span>
                      ) : feature.pro ? (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      ) : (
                        <svg className="text-[#8b5cf6] mx-auto block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
