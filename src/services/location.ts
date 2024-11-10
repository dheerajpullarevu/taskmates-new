import { getAnalytics, logEvent } from 'firebase/analytics';
import { Task } from '../types/task';

const analytics = getAnalytics();

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        logEvent(analytics, 'location_accessed');
      },
      (error) => {
        reject(error);
        logEvent(analytics, 'location_access_failed');
      }
    );
  });
};

export const calculateDistance = (
  point1: Location,
  point2: Location
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const toRad = (value: number): number => {
  return value * Math.PI / 180;
};

export const getNearbyTasks = (
  tasks: Task[],
  userLocation: Location,
  radius: number
): Task[] => {
  return tasks.filter(task => {
    if (!task.location) return false;
    
    const distance = calculateDistance(userLocation, {
      latitude: task.location.latitude,
      longitude: task.location.longitude
    });
    
    return distance <= radius;
  });
};

export const verifyLocation = async (
  taskLocation: Location,
  userLocation: Location,
  maxDistance: number = 0.1 // 100 meters
): Promise<boolean> => {
  try {
    const distance = calculateDistance(taskLocation, userLocation);
    const verified = distance <= maxDistance;
    
    logEvent(analytics, 'location_verification', {
      verified,
      distance
    });
    
    return verified;
  } catch (error) {
    console.error('Location verification failed:', error);
    logEvent(analytics, 'location_verification_failed');
    return false;
  }
};