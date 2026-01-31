'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import DocumentBrowser from '@/components/DocumentBrowser';
import BookNow from '@/components/BookNow';
import AppMenu from '@/components/AppMenu';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'book' | 'browser'>('chat');
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    console.log('✅ Home component mounted successfully!', 'activeTab:', activeTab);
    console.log('✅ React is working, event handlers should be functional');
    
    // Test if we can add event listeners
    const testClick = () => console.log('✅ Click events are working!');
    document.addEventListener('click', testClick, { once: true });
    
    return () => {
      document.removeEventListener('click', testClick);
    };
  }, [activeTab]);

  const handleAppSelect = (app: string) => {
    setActiveApp(app);
    setActiveTab('chat'); // Reset to default tab when switching apps
  };

  const handleDownloadGuide = async () => {
    try {
      const res = await fetch('/api/guide');
      if (!res?.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.headers?.get?.('Content-Disposition')?.match(/filename="?([^";]+)"?/)?.[1] ?? 'santa-marta-travel-guide.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Guide download failed:', err);
    }
  };

  return (
    <main className="min-h-screen bg-santa-cream" style={{ pointerEvents: 'auto' }}>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <header className="mb-10 text-center relative">
          <div className="absolute top-0 right-0 z-10">
            <AppMenu onSelectApp={handleAppSelect} onDownloadGuide={handleDownloadGuide} />
          </div>
          {/* Cover-style title: THE / SANTA MARTA / TRAVEL GUIDE */}
          <h1 className="mb-3 font-extrabold uppercase tracking-tight">
            <span className="block text-xl sm:text-2xl text-santa-orange">The</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-santa-teal">Santa Marta</span>
            <span className="block text-xl sm:text-2xl text-santa-orange">Travel Guide</span>
          </h1>
          <p className="text-lg text-santa-teal/80 max-w-2xl mx-auto">
            AI-Powered Travel Assistant for Santa Marta, Colombia
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl shadow-lg p-2 border-2 border-santa-teal/30">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat tab clicked');
                setActiveTab('chat');
              }}
              className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-santa-teal text-white shadow-lg transform scale-105'
                  : 'text-santa-teal hover:bg-santa-orange-light border border-santa-teal/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with AI
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('book');
              }}
              className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'book'
                  ? 'bg-santa-teal text-white shadow-lg transform scale-105'
                  : 'text-santa-teal hover:bg-santa-orange-light border border-santa-teal/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book now
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Browser tab clicked');
                setActiveTab('browser');
              }}
              className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'browser'
                  ? 'bg-santa-teal text-white shadow-lg transform scale-105'
                  : 'text-santa-teal hover:bg-santa-orange-light border border-santa-teal/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Vector DB Browser
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border-2 border-santa-teal/20">
            {activeTab === 'chat' ? (
              <ChatInterface />
            ) : activeTab === 'book' ? (
              <BookNow />
            ) : activeTab === 'browser' ? (
              <DocumentBrowser />
            ) : (
              <ChatInterface />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

