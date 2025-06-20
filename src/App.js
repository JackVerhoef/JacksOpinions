import React, { useState } from 'react';
import './App.css';
import './components/ToggleButton.css';
import ReviewCard from './components/ReviewCard';
import reviews from './components/reviews.json'; // ✅ import data
import SearchBar from './components/SearchBar';
import OptionsPanel from './components/OptionsPanel';

// Scoring function for "Best Match" search
// This gives higher scores to closer matches for name/brand, partial matches get less weight
function getMatchScore(review, searchTerm) {
    if (!searchTerm) return 0;

    const term = searchTerm.toLowerCase();
    let score = 0;

    // Build regex that looks for the word as a whole word
    const wordRegex = new RegExp(`\\b${term}\\b`, 'i'); // \b = word boundary

    // Exact match bonuses
    if (review.name.toLowerCase() === term) score += 50;
    if (review.brand.toLowerCase() === term) score += 40;

    // Whole word matches (not part of another word like 'crumble')
    if (wordRegex.test(review.name)) score += 20;
    if (wordRegex.test(review.brand)) score += 15;
    if (wordRegex.test(review.category)) score += 30;
    if (review.notes && wordRegex.test(review.notes)) score += 5;

    return score;
}


function App() {
    // State for search term
    const [searchTerm, setSearchTerm] = useState('');

    // State for sorting and filters and default settings
    const [sortOption, setSortOption] = useState('rating');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCritic, setSelectedCritic] = useState('Jack');
    const [showFilters, setShowFilters] = useState(false);

    // Automatically change sort to bestMatch when searching
    const handleSearch = (value) => {
        setSearchTerm(value);

        if (value) {
            if (sortOption !== 'bestMatch') {
                setSortOption('bestMatch');
            }
        } else {
            // Optional: reset to default sort if search is cleared
            setSortOption('rating');
        }
    };

    // Get unique values for dropdowns from the reviews
    const allCategories = [...new Set(reviews.map(r => r.category).filter(Boolean))];
    const allBrands = [...new Set(reviews.map(r => r.brand).filter(Boolean))];
    const allCritics = [...new Set(reviews.map(r => r.critic).filter(Boolean))];

    // Filter reviews based on selected filters and search input
    const filteredReviews = reviews.filter(r => {
        return (
            (!selectedCategory || r.category === selectedCategory) &&
            (!selectedBrand || r.brand === selectedBrand) &&
            (!selectedCritic || r.critic === selectedCritic) &&
            (!searchTerm ||
                r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    // Sort reviews based on selected sort option
    let sortedReviews;

    // If using "best match", use custom score-based sort
    if (sortOption === 'bestMatch') {
        const scored = filteredReviews.map(r => ({
            ...r,
            matchScore: getMatchScore(r, searchTerm)
        }));

        sortedReviews = scored.sort((a, b) => {
            if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore; // sort by score descending
            return b.rating - a.rating; // fallback sort by rating
        });
    } else {
        // Default sorting based on selected property (e.g. rating, taste, etc.)
        sortedReviews = filteredReviews.sort((a, b) => {
            if (sortOption === 'timestamp') {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
            return b[sortOption] - a[sortOption];
        });
    }


    return (
        <div className="App">
            <h1>Jack's Opinions</h1> 

            <div className="top-bar">
                <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />                 {/* Search bar */}
                <button className="toggle-button" onClick={() => setShowFilters(!showFilters)}>     {/* Show/Hide Filters */}
                    {showFilters ? 'Hide Options' : 'Show Options'}
                </button>
            </div>

            {/* Optional filter panel (dropdowns) */}
            {showFilters && (
                <OptionsPanel
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedCritic={selectedCritic}
                    setSelectedCritic={setSelectedCritic}
                    allCategories={allCategories}
                    allBrands={allBrands}
                    allCritics={allCritics}
                />
            )}

            {/* Render sorted + filtered reviews */}
            <div className="review-list">
                {sortedReviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}
            </div>
        </div>
    );
}

export default App;

