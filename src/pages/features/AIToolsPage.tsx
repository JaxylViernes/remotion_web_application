import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ViralMotionImg from '../../assets/image/ViralMotion.png';

const AIToolsPage: React.FC = () => {
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

  const steps = [
    {
      number: 1,
      title: 'Upload Your Video',
      description: 'Upload your video or start with a template. Our AI analyzes your content automatically.',
    },
    {
      number: 2,
      title: 'Choose AI Tools',
      description: 'Select the AI features you want: auto-captions, voiceover, background removal, or smart editing.',
    },
    {
      number: 3,
      title: 'Customize Results',
      description: 'Review and fine-tune the AI-generated content. Adjust timing, styles, and preferences.',
    },
    {
      number: 4,
      title: 'Export Your Video',
      description: 'Export your enhanced video with all AI improvements applied. Ready to share!',
    },
  ];

  const benefits = [
    {
      src: 'https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Lightning Fast',
      description: 'AI processes your content in seconds. What used to take hours now takes minutes.',
    },
    {
      src: 'https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'No Experience Needed',
      description: 'Our AI handles the technical work. You focus on creating great content.',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1682309834966-485aedc99be5?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Consistent Quality',
      description: 'AI ensures every video maintains professional quality standards automatically.',
    },
  ];

  const scenarios = [
    {
      src: 'https://images.unsplash.com/photo-1636971828014-0f3493cba88a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Content Creators',
      description: 'Add captions and voiceovers to reach wider audiences and boost engagement.',
    },
    {
      src: 'https://images.unsplash.com/photo-1696041760912-a06e1f747850?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Marketers',
      description: 'Create professional video ads quickly with AI-powered editing and effects.',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1666299772370-b9516c701b8e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Educators',
      description: 'Make educational content more accessible with auto-generated captions and voiceovers.',
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
      <section className="bg-gradient-to-b from-purple-100 via-purple-200 to-[#fafbfc] py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-[3rem] font-bold text-gray-900 mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">AI Tools</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Supercharge your video creation with AI-powered tools. Auto-captions, voiceovers,
              smart editing, and more - let AI handle the heavy lifting while you focus on creativity.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
                Try AI Tools
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="flex gap-6 items-center justify-center">
            <div className="bg-gradient-to-br from-purple-400 via-fuchsia-500 to-pink-500 rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(168,85,247,0.4)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-12px_rgba(168,85,247,0.5)] w-[400px] h-[350px] flex items-center justify-center">
                  <div className="text-white animate-[pulse_2s_ease-in-out_infinite]">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                      <path d="M16 10v1a4 4 0 0 1-8 0v-1" />
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    </svg>
                  </div>
              </div>
              <div className="absolute top-[10%] right-[-20px] bg-white rounded-xl py-4 px-5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-[float_5s_ease-in-out_infinite]">
                <span className="text-xs font-semibold text-gray-900">Auto Captions</span>
                <div className="mt-2 h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-sm w-20"></div>
              </div>
              <div className="absolute bottom-[20%] left-[-30px] bg-white rounded-xl py-4 px-5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-[float_5s_ease-in-out_infinite_0.5s]">
                <span className="text-xs font-semibold text-gray-900">AI Voiceover</span>
                <div className="mt-2 h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-sm w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">How to Use AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {steps.map((step, index) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 border border-gray-100 transition-all hover:border-violet-500 hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)] hover:-translate-y-2 flex flex-col items-center text-center animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-[0_4px_12px_rgba(139,92,246,0.3)]">{step.number}</div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-[0.9rem] text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full max-w-auto rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] bg-gray-100 mt-5">
            <img src={ViralMotionImg} alt="ViralMotion AI Tools" className="w-full h-auto block object-cover" />
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
              Start Using AI Tools
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
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Benefits of AI-Powered Editing</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here's why creators love our AI tools:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="bg-[#fafbfc] rounded-2xl p-8 text-center border border-gray-100 transition-all hover:border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 group animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="w-full h-[200px] rounded-xl overflow-hidden mb-6 bg-gray-100 transition-transform group-hover:scale-105">
                  <img src={benefit.src} alt={benefit.title} className="w-full h-full object-cover block" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
              Try AI Tools
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className="py-20 px-8 bg-[#fafbfc]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Who Uses AI Tools?</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">AI tools are perfect for:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {scenarios.map((scenario, index) => (
              <div key={scenario.title} className="bg-[#fafbfc] rounded-2xl p-8 text-center border border-gray-100 transition-all hover:border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 group animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="w-full h-[200px] rounded-xl overflow-hidden mb-6 bg-gray-100 transition-transform group-hover:scale-105">
                  <img src={scenario.src} alt={scenario.title} className="w-full h-full object-cover block" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-relaxed">{scenario.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
              Get Started Now
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

export default AIToolsPage;
