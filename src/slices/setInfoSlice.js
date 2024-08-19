import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  cityDetails: null,
  unit: 'C', 
  submitted: false,
};

const setInfoSlice = createSlice({
  name: 'setInfo', 
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setCityDetails(state, action) {
      state.cityDetails = action.payload;
    },
    setSubmitted(state, action) {
      state.submitted = action.payload;
    },
    toggleUnit(state) {
      state.unit = state.unit === 'C' ? 'F' : 'C';
    },
  },
});

export const { setCity, setCityDetails, setSubmitted, toggleUnit } = setInfoSlice.actions;

export default setInfoSlice.reducer;
