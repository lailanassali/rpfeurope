"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Filter, Eye } from 'lucide-react';
import { FormSelect } from '@/components/common/FormSelect';
import { Modal } from '@/components/admin/Modal';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  useEffect(() => {
    fetchSubmissions();
  }, [typeFilter]);

  async function fetchSubmissions() {
    try {
      const url = typeFilter ? `/api/admin/submissions?form_type=${typeFilter}` : '/api/admin/submissions';
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      setSubmissions(await res.json());
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  }

  const formatFormType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Form Submissions</h1>
        <p className="text-gray-600 mt-1">View all form submissions from your website</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Filter className="size-5 text-gray-400" />
          <FormSelect
            label="Filter by Form Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: '', label: 'All Forms' },
              { value: 'baptism', label: 'Baptism' },
              { value: 'counselling', label: 'Counselling' },
              { value: 'mentorship', label: 'Mentorship' },
              { value: 'serve', label: 'Serve' },
              { value: 'testimonies', label: 'Testimonies' },
              { value: 'prayer', label: 'Prayer Request' },
              { value: 'children_register', label: 'Children Registration' },
            ]}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
            ) : submissions.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No submissions found</td></tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {formatFormType(sub.form_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(sub.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${sub.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      sub.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={selectedSubmission !== null}
        onClose={() => setSelectedSubmission(null)}
        title={selectedSubmission ? formatFormType(selectedSubmission.form_type) : ''}
        maxWidth="xl"
      >
        {selectedSubmission && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="font-medium">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium capitalize">{selectedSubmission.status}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Submission Data</h4>
              <div className="space-y-2">
                {Object.entries(selectedSubmission.data).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex gap-2">
                    <span className="text-sm font-medium text-gray-600 capitalize min-w-[150px]">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="text-sm text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
