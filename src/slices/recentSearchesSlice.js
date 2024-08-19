import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'recentSearches';

const loadRecentSearches = () => {
  const savedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedSearches ? JSON.parse(savedSearches) : [];
};

const saveRecentSearches = (searches) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searches));
};

const initialState = loadRecentSearches();

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addSearch(state, action) {
      const search = action.payload;
      const updatedSearches = [search, ...state.filter((item) => item !== search)].slice(0, 5);
      saveRecentSearches(updatedSearches);
      return updatedSearches;
    },
    setRecentSearches(state, action) {
      return action.payload;
    },
  },
});

export const { addSearch, setRecentSearches } = recentSearchesSlice.actions;

export default recentSearchesSlice.reducer;
