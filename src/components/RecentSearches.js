import React from 'react';
import { useSelector } from 'react-redux';

function RecentSearches() {
  const recentSearches = useSelector((state) => state.recentSearches);

  return (
    <div className="recent-searches">
      <h4>Recent Searches</h4>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearches;
