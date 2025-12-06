import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FTC from '../../assets/image/FTC.jpeg';

const FakeTextConversationPage: React.FC = () => {
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [templatesDropdownOpen, setTemplatesDropdownOpen] = useState(false);

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

  const templateVariations = [
    {
      title: 'Facebook Messenger',
      description: 'Classic Facebook chat bubbles with reactions, seen indicators, and typing animations.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.444 5.544 3.72 7.257V22l3.387-1.858c.905.25 1.865.387 2.893.387 5.523 0 10-4.145 10-9.243S17.523 2 12 2z"/>
        </svg>
      ),
    },
    {
      title: 'iMessage / SMS',
      description: 'Apple-style blue and gray bubbles with delivery status, timestamps, and read receipts.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      ),
    },
    {
      title: 'WhatsApp',
      description: 'Green-themed WhatsApp bubbles with double blue ticks, voice message indicators, and emoji reactions.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      title: 'Instagram DM',
      description: 'Instagram Direct Message style with heart reactions, disappearing photos, and story replies.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    },
    {
      title: 'Typing Indicators',
      description: 'Add suspenseful typing bubbles with animated dots to build anticipation in your conversations.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="12" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="18" cy="12" r="1.5"/>
        </svg>
      ),
    },
    {
      title: 'Notification Pop-ups',
      description: 'Phone notification banners that slide in from the top, perfect for dramatic reveals.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Choose Platform Style',
      description: 'Select from Facebook, iMessage, WhatsApp, Instagram DM, or other messaging platforms.',
    },
    {
      number: 2,
      title: 'Write Your Conversation',
      description: 'Add messages, set sender names, and arrange the conversation flow with our easy editor.',
    },
    {
      number: 3,
      title: 'Customize Appearance',
      description: 'Adjust colors, add typing indicators, reactions, and timing between messages.',
    },
    {
      number: 4,
      title: 'Export & Share',
      description: 'Render your conversation video and share it on TikTok, Instagram, or YouTube.',
    },
  ];

  const benefits = [
    {
      src: 'https://images.unsplash.com/photo-1662974770404-468fd9660389?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Hook Viewers Instantly',
      description: 'Text conversation videos grab attention in the first second and keep viewers watching until the end.',
    },
    {
      src: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Tell Stories That Connect',
      description: 'Create relatable scenarios that your audience has experienced, driving engagement and shares.',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1725408044110-eff678909e0a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Go Viral Fast',
      description: 'Fake text conversations are one of the most shared content formats on social media.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden pt-[60px]">
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
      <section className="bg-gradient-to-b from-[#dbeafe] via-[#e0e7ff] to-[#fafbfc] py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-bold text-[#111827] mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">Fake Text Conversation Templates</h1>
            <p className="text-lg text-[#4b5563] leading-[1.7] mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Create viral text message videos that hook viewers instantly. Choose from Facebook chat,
              iMessage, WhatsApp, Instagram DM, and more. Add typing indicators and notification pop-ups
              for maximum engagement.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-[#111827] text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all duration-200 border-none cursor-pointer hover:bg-[#8b5cf6] hover:-translate-y-0.5">
                Create Text Conversation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)]">
                <div className="p-8 flex flex-col gap-4 min-h-[300px] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
                  <div className="max-w-[70%] py-3 px-4 rounded-2xl text-[0.9rem] leading-[1.4] animate-[fadeInUp_0.5s_ease-out_0.3s_both] bg-white text-[#111827] self-start rounded-bl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">Hey, are you coming tonight?</div>
                  <div className="max-w-[70%] py-3 px-4 rounded-2xl text-[0.9rem] leading-[1.4] animate-[fadeInUp_0.5s_ease-out_0.6s_both] bg-[#3b82f6] text-white self-end rounded-br-[4px]">Yeah! What time?</div>
                  <div className="max-w-[70%] py-3 px-4 rounded-2xl text-[0.9rem] leading-[1.4] animate-[fadeInUp_0.5s_ease-out_0.9s_both] bg-white text-[#111827] self-start rounded-bl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">8pm, don't be late! 😄</div>
                  <div className="flex gap-1 self-start py-3 px-4 bg-white rounded-2xl rounded-bl-[4px]">
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-[typingBounce_1.4s_ease-in-out_infinite]"></span>
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-[typingBounce_1.4s_ease-in-out_infinite_0.2s]"></span>
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-[typingBounce_1.4s_ease-in-out_infinite_0.4s]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Variations */}
      <section className="py-20 px-8 bg-[#fafbfc]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Choose Your Platform Style</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Create authentic-looking conversations from any messaging platform:</p>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {templateVariations.map((variation, index) => (
              <div
                key={variation.title}
                className="bg-white rounded-2xl p-8 text-center border border-[#f3f4f6] transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] hover:border-[#8b5cf6] hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)] hover:-translate-y-2 group"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-[rgba(236,72,153,0.1)] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#8b5cf6] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] group-hover:text-white group-hover:scale-110">{variation.icon}</div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">{variation.title}</h3>
                <p className="text-[#6b7280] text-[0.9rem] leading-[1.6]">{variation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">How to Create Text Conversation Videos</h2>
          <div className="grid grid-cols-4 gap-8 mt-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-[#f3f4f6] transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] flex flex-col items-center text-center hover:border-[#8b5cf6] hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)] hover:-translate-y-2"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-[0_4px_12px_rgba(139,92,246,0.3)]">{step.number}</div>
                <div>
                  <h4 className="text-base font-semibold text-[#111827] mb-3">{step.title}</h4>
                  <p className="text-sm text-[#6b7280] leading-[1.6]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] bg-[#f3f4f6] mt-5">
            <img src={FTC} alt="How to create text conversation videos" className="w-full h-auto block object-cover" />
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-[#111827] text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all duration-200 border-none cursor-pointer hover:bg-[#8b5cf6] hover:-translate-y-0.5">
              Start Creating Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Why Text Conversation Videos Go Viral</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here's why creators love this format:</p>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-[#fafbfc] rounded-2xl p-8 text-center border border-[#f3f4f6] transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] hover:border-[#e5e7eb] hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-[5px] group"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-full h-[200px] rounded-xl overflow-hidden mb-6 bg-[#f3f4f6] transition-transform duration-300 group-hover:scale-105">
                  <img src={benefit.src} alt={benefit.title} className="w-full h-full object-cover block" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">{benefit.title}</h3>
                <p className="text-[#6b7280] text-[0.9rem] leading-[1.6]">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-[#111827] text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all duration-200 border-none cursor-pointer hover:bg-[#8b5cf6] hover:-translate-y-0.5">
              Create Your First Video
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FakeTextConversationPage;
