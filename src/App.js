import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCityInfoQuery, useGetWeatherInfoQuery } from './services/weather';
import { useEffect } from 'react';
import { setCity, setCityDetails, setSubmitted, toggleUnit } from './slices/setInfoSlice';
import { addSearch, setRecentSearches } from './slices/recentSearchesSlice';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.setInfo.city);
  const cityDetails = useSelector((state) => state.setInfo.cityDetails);
  const unit = useSelector((state) => state.setInfo.unit);
  const submitted = useSelector((state) => state.setInfo.submitted);
  const recentSearches = useSelector((state) => state.recentSearches);

  const { data: cityData, error: cityError, isLoading: cityLoading } = useGetCityInfoQuery(city, {
    skip: !city
  });

  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetWeatherInfoQuery(cityDetails, {
    skip: !cityDetails
  });

  useEffect(() => {
    dispatch(setRecentSearches());
  }, [dispatch]);

  useEffect(() => {
    if (cityData && cityData.length > 0) {
      dispatch(setCityDetails({
        lat: cityData[0].lat,
        lon: cityData[0].lon,
      }));
    } else {
      dispatch(setCityDetails(null));
    }
  }, [cityData, dispatch]);

  useEffect(() => {
    if (cityData && cityData.length > 0 && !cityError && !weatherError) {
      dispatch(addSearch(city));
    }
  }, [cityData, weatherData, city, cityError, weatherError, dispatch]);

  const handleSearch = (cityInput) => {
    dispatch(setCity(cityInput));
    dispatch(setSubmitted(true));
  };

  const handleRecentSearchClick = (search) => {
    dispatch(setCity(search));
    dispatch(setSubmitted(true));
  };

  const handleUnitToggle = () => {
    dispatch(toggleUnit());
  };

  const isLoading = cityLoading || (cityDetails && weatherLoading);
  const isError = cityError || weatherError;

  // Determine if city data is valid
  const cityNotFound = cityData && cityData.length === 0;
  const shouldShowWeatherInfo = cityData && cityData.length > 0 && weatherData && !isError;

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {recentSearches.length > 0 && (
        <RecentSearches searches={recentSearches} onSearchClick={handleRecentSearchClick} />
      )}
      {!submitted ? (
        <p>Welcome to the Weather App</p>
      ) : (
        <>
          {isLoading && <p>Loading...</p>}
          {isError && !isLoading && <p>Something went wrong. Please try again.</p>}
          {cityNotFound && <p>City not found. Please try another search.</p>}
          {shouldShowWeatherInfo && (
            <WeatherInfo
              weatherData={weatherData}
              unit={unit}
              onUnitToggle={handleUnitToggle}
              cityName={city}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
