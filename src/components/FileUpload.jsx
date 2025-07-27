import { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload({ setSubtitleUrl, setLoading, showToast }) {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('srt');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
        showToast("Video file selected successfully!", "success");
      } else {
        showToast("Please select a valid video file", "error");
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      showToast("Video file selected successfully!", "success");
    } else if (selectedFile) {
      showToast("Please select a valid video file", "error");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showToast("Please select a video file", "warning");
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('format', format);

    setLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const res = await axios.post('http://localhost:5000/api/uploadAndGenerateSubtitles', formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setSubtitleUrl(`http://localhost:5000${res.data.subtitleUrl}`);
      
      showToast("Subtitles generated successfully!", "success");
      
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 2000);
    } catch (err) {
      console.error('Upload error:', err);
      showToast("Failed to generate subtitles. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatOptions = [
    { value: 'srt', label: 'SubRip (.srt)', description: 'Most compatible format' },
    { value: 'vtt', label: 'WebVTT (.vtt)', description: 'Web video standard' },
    { value: 'txt', label: 'Plain Text (.txt)', description: 'Simple text format' }
  ];

  return (
    <div className="space-y-8">
      {/* File Upload Area */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Video</h2>
          <p className="text-slate-600">Drag and drop or click to select a video file</p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50/50' 
              : file 
                ? 'border-green-500 bg-green-50/50' 
                : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="text-center">
            {file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{file.name}</p>
                  <p className="text-sm text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    fileInputRef.current.value = '';
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📹</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-2">
                    Drop your video here, or{' '}
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="text-blue-600 hover:text-blue-700 font-medium underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-slate-500">
                    Supports MP4, AVI, MOV, MKV, and other video formats
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Output Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formatOptions.map((option) => (
            <label
              key={option.value}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                format === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="format"
                value={option.value}
                checked={format === option.value}
                onChange={(e) => setFormat(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  format === option.value
                    ? 'border-blue-500'
                    : 'border-slate-300'
                }`}>
                  {format === option.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{option.label}</p>
                  <p className="text-sm text-slate-500">{option.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Processing...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleUpload}
          disabled={!file || uploadProgress > 0}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
            file && uploadProgress === 0
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {uploadProgress > 0 ? 'Processing...' : 'Generate Subtitles'}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
