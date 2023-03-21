import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { isSameDay } from 'date-fns';

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const CurrentWeather = ({ data }) => {
  const [actualWeather, setActualWeather] = useState(null);

  useEffect(() => {
    const filteredData = data.list.filter(forecast => {
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
      const forecastDate = new Date(forecast.dt * 1000);
      return isSameDay(today, forecastDate);
    });
    setActualWeather(filteredData[0]);
  }, [data]);

  if (!actualWeather) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClimaTrack</Text>
      <Text style={styles.city}>{data.city.name}</Text>
      <Text style={styles.date}>Aujourd'hui</Text>
      <Image source={{ uri: getIconUrl(actualWeather.weather[0].icon) }} style={styles.icon} />
      <Text style={styles.temperature}>{actualWeather.main.temp.toFixed(0)}°C</Text>
      <Text style={styles.description}>{actualWeather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  city: {
    fontSize: 36,
    fontWeight: '500',
    color: '#0F7B95',
    marginBottom: 10,
  },
  date: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FF5733',
    marginBottom: 20,
  },
  icon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 66,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});

export default CurrentWeather;
