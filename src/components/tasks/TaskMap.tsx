import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Task } from '../../types/task';
import { getCurrentLocation, calculateDistance, Location } from '../../services/location';

interface TaskMapProps {
  tasks: Task[];
  onTaskSelect?: (task: Task) => void;
  userLocation?: Location;
  maxRadius?: number;
}

const TaskMap: React.FC<TaskMapProps> = ({
  tasks,
  onTaskSelect,
  userLocation: initialUserLocation,
  maxRadius = 50 // 50km default radius
}) => {
  const [userLocation, setUserLocation] = useState<Location | null>(
    initialUserLocation || null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const location = userLocation || await getCurrentLocation();
      setUserLocation(location);

      const mapInstance = new google.maps.Map(
        document.getElementById('map')!,
        {
          center: {
            lat: location.latitude,
            lng: location.longitude
          },
          zoom: 12
        }
      );

      setMap(mapInstance);

      // Add radius circle
      const radiusCircle = new google.maps.Circle({
        map: mapInstance,
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        radius: maxRadius * 1000, // Convert km to meters
        fillColor: '#2196F3',
        fillOpacity: 0.1,
        strokeColor: '#2196F3',
        strokeOpacity: 0.8,
        strokeWeight: 2
      });

      setCircle(radiusCircle);
    };

    if (!map) {
      initMap();
    }
  }, [userLocation, maxRadius]);

  useEffect(() => {
    if (!map || !userLocation) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Add task markers
    const newMarkers = tasks
      .filter(task => task.location)
      .map(task => {
        const marker = new google.maps.Marker({
          position: {
            lat: task.location!.latitude,
            lng: task.location!.longitude
          },
          map,
          title: task.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#2196F3',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-medium">${task.title}</h3>
              <p class="text-sm text-gray-500">${task.description.slice(0, 100)}...</p>
              <p class="text-sm font-medium mt-1">$${task.budget}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          onTaskSelect?.(task);
        });

        return marker;
      });

    setMarkers(newMarkers);
  }, [map, tasks, userLocation, onTaskSelect]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <div id="map" className="w-full h-full"></div>
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
            <span>Your Location</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {userLocation.address || `${userLocation.latitude}, ${userLocation.longitude}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskMap;