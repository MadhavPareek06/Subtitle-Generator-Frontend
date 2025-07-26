import { useState } from 'react';
import axios from 'axios';

function FileUpload({ setSubtitleUrl, setLoading }) {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('txt');

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('video', file);
    formData.append('format', format);

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/uploadAndGenerateSubtitles', formData);
      setSubtitleUrl(`http://localhost:5000${res.data.subtitleUrl}`);
    } catch (err) {
      alert("❌ Failed to generate subtitles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="select select-bordered w-full max-w-xs"
      >
        <option value="txt">Text (.txt)</option>
        <option value="srt">SubRip (.srt)</option>
        <option value="vtt">WebVTT (.vtt)</option>
      </select>

      <button
        onClick={handleUpload}
        className="btn btn-primary"
      >
        Generate Subtitles
      </button>
    </div>
  );
}

export default FileUpload;
