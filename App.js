import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '29ebae29588bb62eebc4cdf41c63441a';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync();
    getWeather(userLocation);
  };

  const getWeather = async (location) => {
    try {
      const params = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        appid: API_KEY,
        lang: 'fr',
        units: 'metric',
      };
      const response = await axios.get(API_URL, { params });
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserCoordinates();
  }, [data]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {!loading && <CurrentWeather data={data} />}
      {!loading && <Forecasts data={data} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 160
  },
});

