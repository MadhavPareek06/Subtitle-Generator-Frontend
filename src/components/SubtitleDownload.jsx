function SubtitleDownload({ subtitleUrl, showToast }) {
  if (!subtitleUrl) return null;

  const getFileExtension = (url) => {
    if (url.includes('.srt')) return 'srt';
    if (url.includes('.vtt')) return 'vtt';
    if (url.includes('.txt')) return 'txt';
    return 'subtitle';
  };

  const getFormatInfo = (format) => {
    switch (format) {
      case 'srt':
        return { name: 'SubRip', icon: '📄', color: 'from-blue-500 to-indigo-500' };
      case 'vtt':
        return { name: 'WebVTT', icon: '🌐', color: 'from-purple-500 to-pink-500' };
      case 'txt':
        return { name: 'Plain Text', icon: '📝', color: 'from-green-500 to-emerald-500' };
      default:
        return { name: 'Subtitle', icon: '📄', color: 'from-gray-500 to-slate-500' };
    }
  };

  const format = getFileExtension(subtitleUrl);
  const formatInfo = getFormatInfo(format);

  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${formatInfo.color} rounded-xl flex items-center justify-center`}>
              <span className="text-white text-xl">{formatInfo.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Subtitles Generated Successfully!</h3>
              <p className="text-sm text-slate-600">
                Your {formatInfo.name} file is ready for download
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href={subtitleUrl}
              download
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download {format.toUpperCase()}
            </a>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(subtitleUrl);
                showToast("Download link copied to clipboard!", "success");
              }}
              className="p-3 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-200"
              title="Copy download link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ready to use</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>High accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Multiple formats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubtitleDownload;
