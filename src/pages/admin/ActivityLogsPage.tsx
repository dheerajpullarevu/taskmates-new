import React from 'react';
import ActivityLogViewer from '../../components/admin/ActivityLogViewer';

const ActivityLogsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
      <ActivityLogViewer />
    </div>
  );
};

export default ActivityLogsPage;