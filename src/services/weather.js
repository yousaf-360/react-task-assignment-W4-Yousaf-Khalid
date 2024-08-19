import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = 'ffdf0b07b0de6f0a2a0fd56369bec234';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',  
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.openweathermap.org/',
    }),
    endpoints: (builder) => ({
        getCityInfo: builder.query({
            query: (city) => ({
                url: `/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`,
                method: 'GET'
            })
        }),
        getWeatherInfo: builder.query({
            query: (cityDetails) => ({
                url: `/data/3.0/onecall?lat=${cityDetails.lat}&lon=${cityDetails.lon}&appid=${apiKey}&units=metric`,
                method: 'GET'
            })
        }),
    })
});

export const { useGetCityInfoQuery, useGetWeatherInfoQuery } = weatherApi;
