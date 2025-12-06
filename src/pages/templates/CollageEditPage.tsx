import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PC from '../../assets/image/PC.jpeg';
import CreateImg from '../../assets/image/images/Create.png';
import BeatImg from '../../assets/image/images/Beat.png';

const CollageEditPage: React.FC = () => {
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
      title: 'Thirst-Trap Edits',
      description: 'Slow-motion effects, dreamy filters, and beat-synced transitions for aesthetic content.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      title: 'Aesthetic Montages',
      description: 'Cinematic compilations with smooth transitions, color grading, and ambient vibes.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
    },
    {
      title: 'Trend-Style Photo Grids',
      description: 'Multi-photo layouts that animate in sync with trending TikTok sounds.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
    },
    {
      title: 'Quick-Cut Transitions',
      description: 'Fast-paced cuts synced to beats, perfect for hype videos and energy content.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
    },
    {
      title: 'Vintage Film Filters',
      description: 'Retro VHS, film grain, and nostalgic color effects for that throwback aesthetic.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/>
          <line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      ),
    },
    {
      title: 'Glitch & Distortion',
      description: 'Modern glitch effects, RGB splits, and digital distortion for edgy content.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Upload Your Media',
      description: 'Import photos or video clips from your device or social media.',
    },
    {
      number: 2,
      title: 'Choose Edit Style',
      description: 'Select from thirst-trap, aesthetic, trend-style, or quick-cut templates.',
    },
    {
      number: 3,
      title: 'Add Music & Effects',
      description: 'Pick trending sounds and apply filters, transitions, and visual effects.',
    },
    {
      number: 4,
      title: 'Export & Share',
      description: 'Render your edit and share directly to TikTok, Reels, or YouTube.',
    },
  ];

  const benefits = [
    {
      src: CreateImg,
      title: 'Create in Minutes',
      description: 'What takes hours in traditional editors takes just minutes with our templates.',
    },
    {
      src: 'https://images.unsplash.com/photo-1614963326505-843868e1d83a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Professional Quality',
      description: 'Achieve studio-level edits without expensive software or editing skills.',
    },
    {
      src: BeatImg,
      title: 'Beat-Synced',
      description: 'Our AI automatically syncs transitions and effects to your chosen music.',
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
            <h1 className="text-5xl font-bold text-[#111827] mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">Image / Video Collage Edit Templates</h1>
            <p className="text-lg text-[#4b5563] leading-[1.7] mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Create stunning edits with thirst-trap effects, aesthetic montages, trend-style photo grids,
              quick-cut transitions, and beautiful filters. Perfect for Instagram and TikTok content.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-[#111827] text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all duration-200 border-none cursor-pointer hover:bg-[#8b5cf6] hover:-translate-y-0.5">
                Create Collage Edit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)]" style={{ position: 'relative' }}>
                <div className="p-8 min-h-[300px] bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5]">
                  <div className="grid grid-cols-2 gap-3 h-full">
                    <div className="bg-white rounded-xl aspect-square shadow-[0_4px_15px_rgba(0,0,0,0.08)] animate-[scaleIn_0.5s_ease-out_0.2s_both] transition-transform duration-300 hover:scale-105">
                      <img src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Collage item 1" className="w-full h-full object-cover rounded-[5%]" />
                    </div>
                    <div className="bg-white rounded-xl aspect-square shadow-[0_4px_15px_rgba(0,0,0,0.08)] animate-[scaleIn_0.5s_ease-out_0.3s_both] transition-transform duration-300 hover:scale-105">
                      <img src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Collage item 2" className="w-full h-full object-cover rounded-[5%]" />
                    </div>
                    <div className="bg-white rounded-xl aspect-square shadow-[0_4px_15px_rgba(0,0,0,0.08)] animate-[scaleIn_0.5s_ease-out_0.4s_both] transition-transform duration-300 hover:scale-105">
                      <img src="https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Collage item 3" className="w-full h-full object-cover rounded-[5%]" />
                    </div>
                    <div className="bg-white rounded-xl aspect-square shadow-[0_4px_15px_rgba(0,0,0,0.08)] animate-[scaleIn_0.5s_ease-out_0.5s_both] transition-transform duration-300 hover:scale-105">
                      <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Collage item 4" className="w-full h-full object-cover rounded-[5%]" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 py-5 px-10 rounded-xl backdrop-blur-[4px]">
                    <span className="font-[Playfair_Display,Georgia,serif] text-[30px] font-semibold italic text-black overflow-hidden border-r-2 border-white whitespace-nowrap tracking-[2px] [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] animate-[typing_2s_steps(11)_infinite,blink_0.7s_step-end_infinite]">Travel Goal</span>
                  </div>
                </div>
                <style>{`
                  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
                  @keyframes typing {
                    0%, 90%, 100% {
                      width: 0;
                    }
                    30%, 60% {
                      width: 11ch;
                    }
                  }
                  @keyframes blink {
                    0%, 100% {
                      border-color: white;
                    }
                    50% {
                      border-color: transparent;
                    }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Variations */}
      <section className="py-20 px-8 bg-[#fafbfc]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Edit Styles</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Choose your aesthetic:</p>
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
            <img src={PC} className="w-full h-auto block object-cover" />
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
          <h2 className="text-[2rem] font-bold text-[#111827] mb-3 animate-[fadeInUp_0.6s_ease-out]">Why Use Our Collage Templates</h2>
          <p className="text-[#6b7280] text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here's what makes our edits special:</p>
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
              Create Your Edit
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

export default CollageEditPage;
