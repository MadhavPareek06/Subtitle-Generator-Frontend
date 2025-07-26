function SubtitleDownload({ subtitleUrl }) {
  if (!subtitleUrl) return null;

  return (
    <div className="mt-6">
      <a
        href={subtitleUrl}
        download
        className="text-blue-600 font-medium underline"
      >
        ⬇️ Download Subtitle File
      </a>
    </div>
  );
}

export default SubtitleDownload;
