import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TemplateImg from '../../assets/image/Template.png';

const VideoTemplatesPage: React.FC = () => {
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
      title: 'Browse Templates',
      description: 'Explore our library and find a template that matches your content style. Filter by category, style, or trending templates.',
    },
    {
      number: 2,
      title: 'Add Your Content',
      description: 'Replace placeholder text and images with your own content. Upload your media or use our stock library.',
    },
    {
      number: 3,
      title: 'Customize the Design',
      description: 'Adjust colors, fonts, and animations. Preview your changes in real-time before exporting.',
    },
    {
      number: 4,
      title: 'Export & Share',
      description: 'Render your video in high quality and download it. Share directly to your favorite social platforms.',
    },
  ];

  const benefits = [
    {
      src: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Save Hours of Work',
      description: 'Skip the learning curve. Our templates let you create professional videos in minutes, not hours.',
    },
    {
      src: 'https://images.unsplash.com/photo-1622151834677-70f982c9adef?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Professional Quality',
      description: 'Every template is designed by professionals to ensure your content looks polished and engaging.',
    },
    {
      src: 'https://images.unsplash.com/photo-1653043586925-cfb4676c69a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Stand Out from Creators',
      description: 'Use unique animations and effects that help your content stand out in crowded social feeds.',
    },
  ];

  const scenarios = [
    {
      src: 'https://res.cloudinary.com/dnxc1lw18/video/upload/v1760794240/FakeTextConversation_og7tke.mp4',
      type: 'video',
      title: 'Text Conversations',
      description: 'Create viral fake text message videos that hook viewers with storytelling.',
    },
    {
      src: 'https://res.cloudinary.com/dnxc1lw18/video/upload/v1760794238/BarGraphAnalytics_ubzzcp.mp4',
      type: 'video',
      title: 'Analytics & Stats',
      description: 'Showcase data and statistics with animated charts and graphs that capture attention.',
    },
    {
      src: 'https://res.cloudinary.com/dcu9xuof0/video/upload/v1763441913/CardFlip_no4k2t.mp4',
      type: 'video',
      title: 'Photo Carousels',
      description: 'Turn image collections into engaging Ken Burns style carousel videos.',
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
      <section className="bg-gradient-to-b from-blue-100 via-indigo-100 to-[#fafbfc] py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-[3rem] font-bold text-gray-900 mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">Video Templates</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Create stunning viral videos with our professionally designed templates.
              Choose from 50+ templates optimized for TikTok, Instagram Reels, and YouTube Shorts.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
                Browse Templates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="flex gap-6 items-center justify-center">
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[200px] transition-all hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]">
                  <video
                    src="https://res.cloudinary.com/dnxc1lw18/video/upload/v1760794238/BarGraphAnalytics_ubzzcp.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)] max-w-[300px]">
                <video
                  src="https://res.cloudinary.com/dnxc1lw18/video/upload/v1760794242/QuoteSpotlight_jn0iya.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[200px] transition-all hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite_1s]">
                  <video
                    src="https://res.cloudinary.com/dnxc1lw18/video/upload/v1760794240/FakeTextConversation_og7tke.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto block"
                  />
                </div>
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
            <img src={TemplateImg} alt="ViralMotion Template" className="w-full h-auto block object-cover" />
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
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Benefits of Using Video Templates</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here are the key benefits of using ViralMotion templates:</p>
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
              Try Templates
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
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Template Categories</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Explore our template categories for different content types:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {scenarios.map((scenario, index) => (
              <div key={scenario.title} className="bg-white rounded-2xl p-8 text-center border border-gray-100 transition-all hover:border-violet-500 hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)] hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="w-full h-[200px] rounded-xl overflow-hidden mb-4 bg-gray-100 transition-transform group-hover:scale-105">
                  {scenario.type === 'video' ? (
                    <video
                      src={scenario.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover block"
                    />
                  ) : (
                    <img src={scenario.src} alt={scenario.title} className="w-full h-full object-cover block" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-[0.9rem] text-gray-500 leading-relaxed">{scenario.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
              Explore All Templates
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

export default VideoTemplatesPage;
