// src/components/SearchBar.js
import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                padding: '0.5rem',
                fontSize: '1rem',
                width: '100%',
                maxWidth: '500px',
                margin: '1rem auto',
                display: 'block',
                borderRadius: '8px',
                border: '1px solid #ccc',
            }}
        />
    );
}

export default SearchBar;
