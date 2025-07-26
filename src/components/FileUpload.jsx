import { useState } from 'react';
import axios from 'axios';

function FileUpload({ setSubtitleUrl, setLoading }) {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('txt');
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  };

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
    <div className="space-y-6">
      {/* File Upload Area */}
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragOver 
            ? 'border-indigo-400 bg-indigo-50' 
            : file 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          {file ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0v2a1 1 0 01-1 1h-8a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-green-600">File Selected</p>
                <p className="text-sm text-gray-600 truncate max-w-xs mx-auto">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Drop your video here</p>
                <p className="text-sm text-gray-500">or click to browse files</p>
                <p className="text-xs text-gray-400 mt-2">
                  Supports MP4, AVI, MOV, and other video formats
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Output Format
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'txt', label: 'Text', desc: '.txt' },
            { value: 'srt', label: 'SubRip', desc: '.srt' },
            { value: 'vtt', label: 'WebVTT', desc: '.vtt' }
          ].map((option) => (
            <label key={option.value} className="relative">
              <input
                type="radio"
                name="format"
                value={option.value}
                checked={format === option.value}
                onChange={(e) => setFormat(e.target.value)}
                className="sr-only"
              />
              <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all text-center ${
                format === option.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}>
                <div className="font-medium">{option.label}</div>
                <div className="text-sm opacity-75">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
          file 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {file ? '✨ Generate Subtitles' : 'Select a video file first'}
      </button>
    </div>
  );
}

export default FileUpload;
