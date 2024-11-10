import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { UserLocation } from '../../types/user';

interface LocationManagerProps {
  location: UserLocation;
  preferredRadius: number;
  onUpdateLocation: (location: UserLocation) => void;
  onUpdateRadius: (radius: number) => void;
}

const LocationManager = ({
  location,
  preferredRadius,
  onUpdateLocation,
  onUpdateRadius
}: LocationManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(location);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // In a real app, use a geocoding service to get address details
            const newLocation: UserLocation = {
              ...currentLocation,
              latitude,
              longitude,
            };
            setCurrentLocation(newLocation);
            onUpdateLocation(newLocation);
          } catch (error) {
            console.error('Error getting location details:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Location Settings
        </h2>
        <button
          onClick={handleGetCurrentLocation}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Get Current Location
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Location
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={currentLocation.address}
              readOnly={!isEditing}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your address"
            />
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Radius for Offline Tasks (km)
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={preferredRadius}
            onChange={(e) => onUpdateRadius(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1 km</span>
            <span>{preferredRadius} km</span>
            <span>50 km</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Location Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">City:</span>
              <span className="ml-2">{currentLocation.city}</span>
            </div>
            <div>
              <span className="text-gray-500">State:</span>
              <span className="ml-2">{currentLocation.state}</span>
            </div>
            <div>
              <span className="text-gray-500">Country:</span>
              <span className="ml-2">{currentLocation.country}</span>
            </div>
            <div>
              <span className="text-gray-500">Pincode:</span>
              <span className="ml-2">{currentLocation.pincode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationManager;