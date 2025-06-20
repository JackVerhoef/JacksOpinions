import React from 'react';
import './ReviewCard.css'; // Optional: add styles here if you want

function ReviewCard({ review }) {
    return (
        <div className="review-card">
            <h2>{review.name}</h2>
            <h3>{review.brand}</h3>
            <p>
                <strong>Category:</strong> {review.category}
                {review.subcategory ? ` - ${review.subcategory}` : ''}
            </p>
            <p><strong>Alc:</strong> {review.percentage}%</p>

            <div className="review-rating"> {review.rating} </div>
    

            <div className="review-scores">
                <div className="score"> {review.nose} </div>
                <div className="score"> {review.taste} </div>
                <div className="score"> {review.finish} </div>
                <div className="score">  {review.bc} </div>

                <div className="label"> Nose </div>
                <div className="label"> Taste </div>
                <div className="label"> Finish </div>
                <div className="label"> Balance & Complexity </div>
            </div>

            <p><strong>Notes:</strong> {review.notes}</p>
            
        </div>
    );
}

export default ReviewCard;
