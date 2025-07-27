import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SubtitleDownload from '../components/SubtitleDownload';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [subtitleUrl, setSubtitleUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🎬</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">SubtitleGen</h1>
            </div>
            <div className="text-sm text-slate-600">
              Powered by Whisper AI
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 animate-fade-in-scale">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Subtitle Generation
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Generate Subtitles
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              in Seconds
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload any video file and get accurate, synchronized subtitles in multiple formats. 
            Powered by OpenAI's Whisper technology for exceptional accuracy.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600 text-sm">Generate subtitles in seconds with our optimized processing</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">High Accuracy</h3>
              <p className="text-slate-600 text-sm">Powered by OpenAI's Whisper for industry-leading transcription</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">📁</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Multiple Formats</h3>
              <p className="text-slate-600 text-sm">Export as TXT, SRT, or VTT for any platform or software</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <FileUpload 
            setSubtitleUrl={setSubtitleUrl} 
            setLoading={setLoading}
            showToast={(message, type) => setToast({ message, type })}
          />
          
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <LoadingSpinner size="lg" text="Generating subtitles..." />
              </div>
            </div>
          )}

          <SubtitleDownload 
            subtitleUrl={subtitleUrl} 
            showToast={(message, type) => setToast({ message, type })}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Supports MP4, AVI, MOV, MKV, and other popular video formats</p>
          <p className="mt-1">Maximum file size: 100MB • Processing time varies by video length</p>
        </div>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Home;
