// This component renders the filter/sort UI for the reviews

import React from 'react';
import './OptionsPanel.css'; // Importing related styles

function OptionsPanel({
    sortOption,
    setSortOption,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedCritic,
    setSelectedCritic,
    allCategories,
    allBrands,
    allCritics
}) {
    return (
        <div className="filter-box">
            {/* Dropdown for sorting the reviews by selected metric */}
            <label>
                Sort by:
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="bestMatch">Best Match</option>
                    <option value="rating">Overall Rating</option>
                    <option value="taste">Taste</option>
                    <option value="nose">Nose</option>
                    <option value="finish">Finish</option>
                    <option value="bc">Balance & Complexity</option>
                    <option value="percentage">Alcohol %</option>
                    <option value="timestamp">Newest</option>
                </select>
            </label>

            {/* Dropdown for filtering by category */}
            <label>
                Category:
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All</option>
                    {allCategories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>
            </label>

            {/* Dropdown for filtering by brand */}
            {/*
            <label>
                Brand:
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                    <option value="">All</option>
                    {allBrands.map((brand, i) => (
                        <option key={i} value={brand}>{brand}</option>
                    ))}
                </select>
            </label>
            */}

            {/* Dropdown for filtering by critic */}
            <label>
                Critic:
                <select value={selectedCritic} onChange={(e) => setSelectedCritic(e.target.value)}>
                    <option value="">All</option>
                    {allCritics.map((critic, i) => (
                        <option key={i} value={critic}>{critic}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default OptionsPanel;