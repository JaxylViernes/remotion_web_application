import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DownloaderImg from '../../assets/image/Downloader.png';

const DownloaderPage: React.FC = () => {
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
      title: 'Copy the Video URL',
      description: 'Find the video you want to download and copy its URL from the address bar or share menu.',
    },
    {
      number: 2,
      title: 'Paste the URL',
      description: 'Paste the URL into our downloader. We\'ll automatically detect the platform and video.',
    },
    {
      number: 3,
      title: 'Choose Format & Quality',
      description: 'Select video or audio format, and pick your preferred quality setting.',
    },
    {
      number: 4,
      title: 'Download',
      description: 'Click download and save the file to your device. It\'s that simple!',
    },
  ];

  const benefits = [
    {
      src: 'https://plus.unsplash.com/premium_photo-1679691281979-0ec8b1e5fc0f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Offline Access',
      description: 'Save videos to watch offline. Perfect for travel, commutes, or areas with poor internet.',
    },
    {
      src: 'https://images.unsplash.com/photo-1758272422057-d8e38d3f2181?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Content Repurposing',
      description: 'Download content to repurpose in your own videos. Great for reaction videos and compilations.',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Archive Important Content',
      description: 'Save videos before they get deleted. Build your personal archive of valuable content.',
    },
  ];

  const platforms = [
    {
      name: 'TikTok',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter/X',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
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
      <section className="bg-gradient-to-b from-pink-100 via-pink-200 to-[#fafbfc] py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl lg:text-[3rem] font-bold text-gray-900 mb-5 leading-[1.2] animate-[fadeInUp_0.8s_ease-out]">Video & Audio Downloader</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              Download videos and audio from your favorite platforms. Save content for offline use,
              repurpose for your projects, or build your personal media library.
            </p>
            <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <Link to="/signup" className="bg-gray-900 text-white py-3.5 px-6 rounded-[10px] font-medium text-[0.9rem] no-underline inline-flex items-center gap-2 transition-all hover:bg-violet-500 hover:-translate-y-0.5">
                Start Downloading
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative animate-[fadeInRight_0.8s_ease-out_0.3s_both]">
            <div className="flex gap-6 items-center justify-center">
              <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(236,72,153,0.4)] animate-[scaleIn_0.8s_ease-out_0.4s_both] transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-12px_rgba(236,72,153,0.5)] w-[400px] h-[380px] flex flex-col items-center justify-center gap-8">
                <div className="text-white animate-[downloadBounce_2s_ease-in-out_infinite]">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div className="flex gap-3">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.1)]" title={platform.name}>
                      {platform.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Supported Platforms</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Download from all major social media platforms:</p>
          <div className="flex justify-center gap-6 flex-wrap mt-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-3 py-4 px-6 bg-[#fafbfc] rounded-xl border border-gray-100 transition-all hover:border-violet-500 hover:shadow-[0_4px_15px_rgba(139,92,246,0.1)]">
                <div className="text-gray-900">{platform.icon}</div>
                <span className="font-medium text-gray-900">{platform.name}</span>
              </div>
            ))}
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
            <img src={DownloaderImg} alt="ViralMotion Template" className="w-full h-auto block object-cover" />
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
          <h2 className="text-[2rem] font-bold text-gray-900 mb-3 animate-[fadeInUp_0.6s_ease-out]">Why Use Our Downloader?</h2>
          <p className="text-gray-500 text-base mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Here's why creators love our downloader:</p>
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
              Try Downloader
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

export default DownloaderPage;
