import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { KYCDocument } from '../../types/user';

interface KYCManagerProps {
  documents: KYCDocument[];
  onUploadDocument: (type: KYCDocument['type'], file: File) => Promise<void>;
}

const KYCManager = ({ documents, onUploadDocument }: KYCManagerProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (type: KYCDocument['type'], file: File) => {
    try {
      setUploading(true);
      await onUploadDocument(type, file);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: KYCDocument['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">KYC Documents</h2>

      <div className="space-y-6">
        {[
          { type: 'id_proof', label: 'ID Proof', description: 'Government issued ID (Passport, Driver\'s License)' },
          { type: 'address_proof', label: 'Address Proof', description: 'Utility bill or bank statement' },
          { type: 'profile_photo', label: 'Profile Photo', description: 'Clear photo of your face' }
        ].map(({ type, label, description }) => {
          const document = documents.find(doc => doc.type === type);

          return (
            <div key={type} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{label}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                {document && getStatusIcon(document.status)}
              </div>

              {document ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                    <span className={`capitalize ${
                      document.status === 'verified' ? 'text-green-600' :
                      document.status === 'rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {document.status}
                    </span>
                  </div>
                  {document.status === 'rejected' && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload New Document
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(type as KYCDocument['type'], file);
                        }}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(type as KYCDocument['type'], file);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KYCManager;