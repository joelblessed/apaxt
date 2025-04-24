import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalculateDistance = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user location using geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  // Function to get coordinates from address using Google Maps Geocoding API
  const getCoordinates = async (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}AIzaSyA9giO1qEVFOWFmSP92cQ0qqmupQkT8MqI`;

    try {
      const response = await axios.get(geocodeUrl);
      const location = response.data.results[0]?.geometry.location;
      if (location) {
        setDeliveryLocation(location);
      } else {
        alert('Address not found!');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // Function to calculate the distance between two coordinates using Haversine formula
  const calculateDistance = () => {
    if (!userLocation || !deliveryLocation) return;

    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = deliveryLocation.lat;
    const lon2 = deliveryLocation.lng;

    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    setDistance(distance);
  };

  return (
    <div>
      <h2>Calculate Delivery Distance</h2>

      <div>
        <label>Enter Delivery Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <button onClick={() => getCoordinates(address)} disabled={loading}>
          {loading ? 'Loading...' : 'Get Coordinates'}
        </button>
      </div>

      {deliveryLocation && (
        <div>
          <h3>Delivery Location Coordinates:</h3>
          <p>Latitude: {deliveryLocation.lat}</p>
          <p>Longitude: {deliveryLocation.lng}</p>
        </div>
      )}

      <div>
        <h3>User Location Coordinates:</h3>
        {userLocation ? (
          <div>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
        ) : (
          <p>Loading your location...</p>
        )}
      </div>

      <div>
        <button onClick={calculateDistance} disabled={!userLocation || !deliveryLocation}>
          Calculate Distance
        </button>
      </div>

      {distance !== null && (
        <div>
          <h3>Calculated Distance:</h3>
          <p>{distance.toFixed(2)} km</p>
        </div>
      )}
    </div>
  );
};

export default CalculateDistance;