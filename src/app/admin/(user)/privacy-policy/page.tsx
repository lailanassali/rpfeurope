"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill from the new package
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded border">Loading editor...</div>
});

export default function PrivacyPolicyEditor() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPrivacyPolicy();
  }, []);

  async function fetchPrivacyPolicy() {
    try {
      const res = await fetch('/api/admin/privacy-policy');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContent(data.content || '');
      setLastUpdated(data.last_updated);
    } catch (error) {
      toast.error('Failed to load privacy policy');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/privacy-policy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setLastUpdated(data.last_updated);
      toast.success('Privacy policy updated successfully');
    } catch (error) {
      toast.error('Failed to update privacy policy');
    } finally {
      setIsSaving(false);
    }
  }

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  // Force client-side rendering only to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl" suppressHydrationWarning>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Privacy Policy Editor</h1>
        {lastUpdated && (
          <p className="text-sm text-gray-600" suppressHydrationWarning>
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>

      {/* Editor Mode Toggle */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setEditorMode('visual')}
          className={`px-4 py-2 rounded ${editorMode === 'visual'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Visual Editor
        </button>
        <button
          onClick={() => setEditorMode('html')}
          className={`px-4 py-2 rounded ${editorMode === 'html'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          HTML Editor
        </button>
      </div>

      {/* Editor Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        {editorMode === 'visual' ? (
          <div className="prose max-w-none">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-white"
              style={{ minHeight: '500px' }}
            />
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] p-4 font-mono text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter HTML content..."
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {editorMode === 'visual'
            ? '💡 Use the visual editor for easy formatting'
            : '💻 Edit raw HTML for advanced customization'}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 disabled:opacity-50 font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Privacy Policy'}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-900 mb-2">Editor Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Visual Editor:</strong> Format text using the toolbar - perfect for non-developers</li>
          <li>• <strong>HTML Editor:</strong> Edit raw HTML for precise control - for developers</li>
          <li>• Switch between modes anytime - your content is preserved</li>
          <li>• Changes appear on the live site within 60 seconds after saving</li>
        </ul>
      </div>
    </div>
  );
}
