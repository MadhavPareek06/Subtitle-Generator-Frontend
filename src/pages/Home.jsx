import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SubtitleDownload from '../components/SubtitleDownload';

function Home() {
  const [subtitleUrl, setSubtitleUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">🎬 Subtitle Generator</h1>

        <FileUpload setSubtitleUrl={setSubtitleUrl} setLoading={setLoading} />

        {loading && <p className="text-blue-500 mt-4">Generating subtitles...</p>}

        <SubtitleDownload subtitleUrl={subtitleUrl} />
      </div>
    </div>
  );
}

export default Home;
