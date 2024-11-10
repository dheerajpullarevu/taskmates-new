import { useCallback } from 'react';
import { useActivityStore } from '../store/activityStore';
import { ActivityType } from '../types/activity';

export const useActivityLogger = () => {
  const { logActivity } = useActivityStore();

  const log = useCallback((
    type: ActivityType,
    description: string,
    metadata?: Record<string, any>
  ) => {
    logActivity(type, description, metadata);
  }, [logActivity]);

  return { log };
};