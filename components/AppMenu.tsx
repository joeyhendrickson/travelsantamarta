'use client';

import { useState, useRef, useEffect } from 'react';

interface AppMenuProps {
  onSelectApp: (app: string) => void;
}

export default function AppMenu({ onSelectApp }: AppMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const apps = [
    { id: 'website-scanner', name: 'Website Scanner', icon: '🌐' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'youtube-transcriber', name: 'YouTube Transcriber', icon: '🎥' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-santa-orange-light transition-colors focus:outline-none focus:ring-2 focus:ring-santa-teal"
        aria-label="Apps menu"
      >
        <svg
          className="w-6 h-6 text-santa-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-santa-teal/30 z-[100] overflow-y-auto max-h-96">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-santa-orange uppercase tracking-wider border-b border-santa-teal/20">
              Additional Apps
            </div>
            {apps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  onSelectApp(app.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-santa-teal hover:bg-santa-teal hover:text-white transition-colors flex items-center gap-3"
              >
                <span className="text-xl">{app.icon}</span>
                <span className="font-medium">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
