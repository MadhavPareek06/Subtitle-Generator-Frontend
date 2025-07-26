function SubtitleDownload({ subtitleUrl }) {
  if (!subtitleUrl) return null;

  return (
    <div className="space-y-4">
      <a
        href={subtitleUrl}
        download
        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Download Subtitle File
      </a>
      
      <p className="text-sm text-gray-500">
        Your subtitle file is ready for download. You can use it with any video player that supports subtitles.
      </p>
    </div>
  );
}

export default SubtitleDownload;
