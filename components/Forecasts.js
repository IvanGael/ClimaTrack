import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`


const Forecasts = ({ data }) => {
    const [listForecast, setListForecast] = useState([]);
  
    useEffect(() => {
      const forecastsData = data.list.reduce((result, f) => {
        const dt = new Date(f.dt * 1000);
        const day = format(dt, 'EEEE', { locale: fr });
  
        if (!result[day]) {
          result[day] = [];
        }
  
        result[day].push({
          date: dt,
          hour: dt.getHours(),
          temp: Math.round(f.main.temp),
          icon: f.weather[0].icon,
        });
  
        return result;
      }, {});
  
      setListForecast(forecastsData);
    }, [data]);
  
    return (
      <>
        {Object.keys(listForecast).length === 0 && <Text>Pas de données</Text>}
        {Object.keys(listForecast).length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(listForecast).map(([day, forecasts]) => (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.day}>{day.toUpperCase()}</Text>
                {forecasts.map((f, index) => (
                  <View key={index} style={styles.forecast}>
                    <Image
                      source={{ uri: getIconUrl(f.icon) }}
                      style={styles.icon}
                    />
                    <Text style={styles.temp}>{f.temp}°C</Text>
                    <Text style={styles.hour}>{f.hour}h</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
      </>
    );
  };
  
  const styles = StyleSheet.create({
    dayContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    day: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#0F7B95',
      marginBottom: 10,
      marginRight: 15,
      marginLeft: 15
    },
    forecast: {
      alignItems: 'center',
      backgroundColor: '#DEEDF0',
      padding: 10,
      borderRadius: 30,
      margin: 5
    },
    icon: {
      width: 50,
      height: 50,
    },
    temp: {
      fontWeight: 'bold',
      color: 'black',
      marginTop: 10,
    },
    hour: {
      color: 'gray',
      fontSize: 12,
    },
});  

export default Forecasts;
