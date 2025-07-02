import React, { useState } from 'react';
import Spreadsheet from './Spreadsheet';

export default function Layout() {
  const [activeTab, setActiveTab] = useState<'grid' | 'form'>('grid');

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Intern Assignment</h1>
        <div className="space-x-2">
          <button
  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
  onClick={() => console.log('Share clicked')}
>
  Share
</button>
<button
  className="px-3 py-1 text-sm bg-black text-white rounded"
  onClick={() => console.log('Upgrade clicked')}
>
  Upgrade
</button>

        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 px-6 py-2 border-b border-gray-200 flex space-x-4">
        <button
          className={`text-sm font-medium ${
            activeTab === 'grid'
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('grid')}
        >
          Grid
        </button>
        <button
          className={`text-sm font-medium ${
            activeTab === 'form'
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('form')}
        >
          Form
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {activeTab === 'grid' ? (
          <Spreadsheet />
        ) : (
          <div className="text-sm text-gray-500 italic">Form view coming soon...</div>
        )}
      </div>
    </div>
  );
}
