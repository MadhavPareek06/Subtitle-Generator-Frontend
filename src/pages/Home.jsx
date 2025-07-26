import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SubtitleDownload from '../components/SubtitleDownload';
import LoadingBar from '../components/LoadingBar';

function Home() {
  const [subtitleUrl, setSubtitleUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="pt-12 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
            <span className="text-2xl">🎬</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Subtitle Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your videos with AI-powered subtitle generation. Upload your video and get accurate subtitles in multiple formats.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Upload Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Upload Your Video
              </h2>
              <p className="text-gray-600">
                Choose your video file and subtitle format to get started
              </p>
            </div>

            <FileUpload setSubtitleUrl={setSubtitleUrl} setLoading={setLoading} />
            
            <LoadingBar isLoading={loading} />
          </div>

          {/* Download Card */}
          {subtitleUrl && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-in slide-in-from-bottom duration-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Subtitles Ready!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your subtitles have been generated successfully
                </p>
                <SubtitleDownload subtitleUrl={subtitleUrl} />
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">AI-powered processing for quick subtitle generation</p>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Export in TXT, SRT, or VTT formats</p>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">High Accuracy</h3>
              <p className="text-sm text-gray-600">Advanced AI ensures precise transcription</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
