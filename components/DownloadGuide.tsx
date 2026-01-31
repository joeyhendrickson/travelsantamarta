'use client';

import { useState } from 'react';

interface DownloadGuideProps {
  onBack: () => void;
}

export default function DownloadGuide({ onBack }: DownloadGuideProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setError(null);
    setIsDownloading(true);
    try {
      const res = await fetch('/api/guide');
      if (!res.ok) throw new Error('Download failed');
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
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="p-2 rounded-lg hover:bg-santa-orange-light transition-colors mb-6 flex items-center gap-2 text-santa-teal font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-santa-teal/10 text-santa-teal mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-santa-teal mb-3">Download The Guide</h2>
        <p className="text-santa-teal/80 mb-8">
          Get The Santa Marta Travel Guide as a PDF to read offline or share.
        </p>
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-8 py-4 bg-santa-teal text-white font-semibold rounded-xl hover:bg-santa-tealLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg inline-flex items-center gap-2"
        >
          {isDownloading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Preparing…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download The Guide
            </>
          )}
        </button>
      </div>
    </div>
  );
}
