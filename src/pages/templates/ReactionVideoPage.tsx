import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RV from '../../assets/image/RV.jpeg'
import ProvenImg from '../../assets/image/images/Proven.png';
import BuildImg from '../../assets/image/images/Build.png';
import EasyImg from '../../assets/image/images/Easy.png';
import ReactionImg from '../../assets/image/images/Reaction.png'

const ReactionVideoPage: React.FC = () => {
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
      title: 'Split-Screen Format',
      description: 'Classic side-by-side or top-bottom layout with original video and your reaction.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="12" y1="3" x2="12" y2="21"/>
        </svg>
      ),
    },
    {
      title: 'Picture-in-Picture',
      description: 'Your reaction in a small bubble overlaying the main video content.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <rect x="12" y="12" width="8" height="6" rx="1"/>
        </svg>
      ),
    },
    {
      title: 'Adjustable Placement',
      description: 'Move and resize your reaction video anywhere on the screen.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="5 9 2 12 5 15"/>
          <polyline points="9 5 12 2 15 5"/>
          <polyline points="15 19 12 22 9 19"/>
          <polyline points="19 9 22 12 19 15"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="12" y1="2" x2="12" y2="22"/>
        </svg>
      ),
    },
    {
      title: 'Video Import & Trim',
      description: 'Import any video to react to and trim specific moments with precision.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      title: 'Meme Overlays',
      description: 'Add popular meme templates, stickers, and text overlays to enhance reactions.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
    },
    {
      title: 'Green Screen Mode',
      description: 'Remove your background for a cleaner, more professional look.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="12" cy="10" r="3"/>
          <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/>
        </svg>
      ),
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Import Video to React To',
      description: 'Upload or paste the URL of the video you want to react to.',
    },
    {
      number: 2,
      title: 'Record or Upload Reaction',
      description: 'Record your reaction directly or upload a pre-recorded video.',
    },
    {
      number: 3,
      title: 'Choose Layout & Position',
      description: 'Select split-screen, PIP, or custom placement for your reaction.',
    },
    {
      number: 4,
      title: 'Add Effects & Export',
      description: 'Add meme overlays, trim moments, and export your reaction video.',
    },
  ];

  const benefits = [
    {
      src: ProvenImg,
      title: 'Proven Viral Format',
      description: 'Reaction videos are one of the most engaging content types on every platform.',
    },
    {
      src: BuildImg,
      title: 'Build Connection',
      description: 'Show your personality and connect with your audience through genuine reactions.',
    },
    {
      src: EasyImg,
      title: 'Easy Content Creation',
      description: 'React to trending content for endless video ideas without starting from scratch.',
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
      <section className="bg-gradient-to-b from-[#fce7f3] via-[#fbcfe8] to-[#fafbfc] py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-bold text-[#111827] mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">Reaction Video Templates</h1>
            <p className="text-lg text-[#4b5563] leading-[1.7] mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Create professional reaction videos with ease. Choose from split-screen formats,
              picture-in-picture pop-ups, adjustable video placement, and add meme overlays.
              Import any video and trim the best moments.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-[#111827] text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all duration-200 border-none cursor-pointer hover:bg-[#8b5cf6] hover:-translate-y-0.5">
                Create Reaction Video
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)]" style={{ position: 'relative' }}>
                <img src='https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Reaction Video" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="bg-black/60 rounded-[20%] p-5 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] cursor-pointer hover:scale-110 transition-transform duration-300"
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
                <div
                  className="absolute bottom-5 right-5 bg-black/60 rounded-lg p-2.5 animate-[float_2s_ease-in-out_infinite]"
                >
                  <img src={ReactionImg} alt="Reaction" className="w-20 h-20 object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Variations */}
      <section className="py-20 px-8 bg-[#fafbfc]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Layout Options</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Choose the perfect format for your reaction:</p>
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
            <img src={RV} className="w-full h-auto block object-cover" />
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
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Why Ken Burns Carousels Work</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here's what makes this format special:</p>
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
              Create Your Carousel
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

export default ReactionVideoPage;
