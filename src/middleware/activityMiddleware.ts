import { ActivityType } from '../types/activity';
import { useActivityStore } from '../store/activityStore';

export const withActivityLogging = (
  action: (...args: any[]) => Promise<any>,
  type: ActivityType,
  description: string,
  getMetadata?: (...args: any[]) => Record<string, any>
) => {
  return async (...args: any[]) => {
    const { logActivity } = useActivityStore.getState();
    
    try {
      const result = await action(...args);
      
      await logActivity(
        type,
        description,
        getMetadata ? getMetadata(...args) : {}
      );
      
      return result;
    } catch (error) {
      await logActivity(
        type,
        `Error: ${description}`,
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          ...getMetadata?.(...args)
        }
      );
      throw error;
    }
  };
};